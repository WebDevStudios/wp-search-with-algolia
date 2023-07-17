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
  var helper = search.mainHelper;
  helper.searchOnlyWithDerivedHelpers();
  return new Promise(function (resolve, reject) {
    // All derived helpers resolve in the same tick so we're safe only relying
    // on the first one.
    helper.derivedHelpers[0].on('result', function () {
      resolve();
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
export function getInitialResults(rootIndex) {
  var initialResults = {};
  walkIndex(rootIndex, function (widget) {
    var searchResults = widget.getResults();
    initialResults[widget.getIndexId()] = {
      // We convert the Helper state to a plain object to pass parsable data
      // structures from server to client.
      state: _objectSpread({}, searchResults._state),
      results: searchResults._rawResults
    };
  });
  return initialResults;
}