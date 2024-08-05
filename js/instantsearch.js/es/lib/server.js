function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { walkIndex } from "./utils/index.js";
/**
 * Waits for the results from the search instance to coordinate the next steps
 * in `getServerState()`.
 */
export function waitForResults(search) {
  var skipRecommend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var helper = search.mainHelper;

  // Extract search parameters from the search client to use them
  // later during hydration.
  var requestParamsList;
  var client = helper.getClient();
  helper.setClient(_objectSpread(_objectSpread({}, client), {}, {
    search: function search(queries) {
      requestParamsList = queries.map(function (_ref) {
        var params = _ref.params;
        return params;
      });
      return client.search(queries);
    }
  }));
  search._hasSearchWidget && helper.searchOnlyWithDerivedHelpers();
  !skipRecommend && search._hasRecommendWidget && helper.recommend();
  return new Promise(function (resolve, reject) {
    var searchResultsReceived = !search._hasSearchWidget;
    var recommendResultsReceived = !search._hasRecommendWidget || skipRecommend;
    // All derived helpers resolve in the same tick so we're safe only relying
    // on the first one.
    helper.derivedHelpers[0].on('result', function () {
      searchResultsReceived = true;
      if (recommendResultsReceived) {
        resolve(requestParamsList);
      }
    });
    helper.derivedHelpers[0].on('recommend:result', function () {
      recommendResultsReceived = true;
      if (searchResultsReceived) {
        resolve(requestParamsList);
      }
    });

    // However, we listen to errors that can happen on any derived helper because
    // any error is critical.
    helper.on('error', function (error) {
      reject(error);
    });
    search.on('error', function (error) {
      reject(error);
    });
    helper.derivedHelpers.forEach(function (derivedHelper) {
      return derivedHelper.on('error', function (error) {
        reject(error);
      });
    });
  });
}

/**
 * Walks the InstantSearch root index to construct the initial results.
 */
export function getInitialResults(rootIndex,
/**
 * Search parameters sent to the search client,
 * returned by `waitForResults()`.
 */
requestParamsList) {
  var initialResults = {};
  var requestParamsIndex = 0;
  walkIndex(rootIndex, function (widget) {
    var _widget$getHelper;
    var searchResults = widget.getResults();
    var recommendResults = (_widget$getHelper = widget.getHelper()) === null || _widget$getHelper === void 0 ? void 0 : _widget$getHelper.lastRecommendResults;
    if (searchResults || recommendResults) {
      var _searchResults$_rawRe;
      var resultsCount = (searchResults === null || searchResults === void 0 ? void 0 : (_searchResults$_rawRe = searchResults._rawResults) === null || _searchResults$_rawRe === void 0 ? void 0 : _searchResults$_rawRe.length) || 0;
      var requestParams = resultsCount ? requestParamsList === null || requestParamsList === void 0 ? void 0 : requestParamsList.slice(requestParamsIndex, requestParamsIndex + resultsCount) : [];
      requestParamsIndex += resultsCount;
      initialResults[widget.getIndexId()] = _objectSpread(_objectSpread(_objectSpread({}, searchResults && {
        state: _objectSpread({}, searchResults._state),
        results: searchResults._rawResults
      }), recommendResults && {
        recommendResults: {
          // We have to stringify + parse because of some explicitly undefined values.
          params: JSON.parse(JSON.stringify(recommendResults._state.params)),
          results: recommendResults._rawResults
        }
      }), requestParams && {
        requestParams: requestParams
      });
    }
  });
  if (Object.keys(initialResults).length === 0) {
    throw new Error('The root index does not have any results. Make sure you have at least one widget that provides results.');
  }
  return initialResults;
}