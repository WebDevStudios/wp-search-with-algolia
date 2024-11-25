"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hydrateSearchClient = hydrateSearchClient;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function hydrateSearchClient(client, results) {
  if (!results) {
    return;
  }

  // Disable cache hydration on:
  // - Algoliasearch API Client < v4 with cache disabled
  // - Third party clients (detected by the `addAlgoliaAgent` function missing)

  if ((!('transporter' in client) || client._cacheHydrated) && (!client._useCache || typeof client.addAlgoliaAgent !== 'function')) {
    return;
  }
  var cachedRequest = [Object.keys(results).reduce(function (acc, key) {
    var _results$key = results[key],
      state = _results$key.state,
      requestParams = _results$key.requestParams,
      serverResults = _results$key.results;
    var mappedResults = serverResults && state ? serverResults.map(function (result, idx) {
      return _objectSpread({
        indexName: state.index || result.index
      }, requestParams !== null && requestParams !== void 0 && requestParams[idx] || result.params ? {
        params: serializeQueryParameters((requestParams === null || requestParams === void 0 ? void 0 : requestParams[idx]) || deserializeQueryParameters(result.params))
      } : {});
    }) : [];
    return acc.concat(mappedResults);
  }, [])];
  var cachedResults = Object.keys(results).reduce(function (acc, key) {
    var res = results[key].results;
    if (!res) {
      return acc;
    }
    return acc.concat(res);
  }, []);

  // Algoliasearch API Client >= v4
  // To hydrate the client we need to populate the cache with the data from
  // the server (done in `hydrateSearchClientWithMultiIndexRequest` or
  // `hydrateSearchClientWithSingleIndexRequest`). But since there is no way
  // for us to compute the key the same way as `algoliasearch-client` we need
  // to populate it on a custom key and override the `search` method to
  // search on it first.
  if ('transporter' in client && !client._cacheHydrated) {
    client._cacheHydrated = true;
    var baseMethod = client.search;
    // @ts-ignore wanting type checks for v3 on this would make this too complex
    client.search = function (requests) {
      for (var _len = arguments.length, methodArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        methodArgs[_key - 1] = arguments[_key];
      }
      var requestsWithSerializedParams = requests.map(function (request) {
        return _objectSpread(_objectSpread({}, request), {}, {
          params: serializeQueryParameters(request.params)
        });
      });
      return client.transporter.responsesCache.get({
        method: 'search',
        args: [requestsWithSerializedParams].concat(methodArgs)
      }, function () {
        return baseMethod.apply(void 0, [requests].concat(methodArgs));
      });
    };
    client.transporter.responsesCache.set({
      method: 'search',
      args: cachedRequest
    }, {
      results: cachedResults
    });
  }

  // Algoliasearch API Client < v4
  // Prior to client v4 we didn't have a proper API to hydrate the client
  // cache from the outside. The following code populates the cache with
  // a single-index result. You can find more information about the
  // computation of the key inside the client (see link below).
  // https://github.com/algolia/algoliasearch-client-javascript/blob/c27e89ff92b2a854ae6f40dc524bffe0f0cbc169/src/AlgoliaSearchCore.js#L232-L240
  if (!('transporter' in client)) {
    var cacheKey = "/1/indexes/*/queries_body_".concat(JSON.stringify({
      requests: cachedRequest
    }));
    client.cache = _objectSpread(_objectSpread({}, client.cache), {}, _defineProperty({}, cacheKey, JSON.stringify({
      results: Object.keys(results).map(function (key) {
        return results[key].results;
      })
    })));
  }
}
function deserializeQueryParameters(parameters) {
  return parameters.split('&').reduce(function (acc, parameter) {
    var _parameter$split = parameter.split('='),
      _parameter$split2 = _slicedToArray(_parameter$split, 2),
      key = _parameter$split2[0],
      value = _parameter$split2[1];
    acc[key] = value ? decodeURIComponent(value) : '';
    return acc;
  }, {});
}

// This function is copied from the algoliasearch v4 API Client. If modified,
// consider updating it also in `serializeQueryParameters` from `@algolia/transporter`.
function serializeQueryParameters(parameters) {
  var isObjectOrArray = function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]';
  };
  var encode = function encode(format) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    var i = 0;
    return format.replace(/%s/g, function () {
      return encodeURIComponent(args[i++]);
    });
  };
  return Object.keys(parameters).map(function (key) {
    return encode('%s=%s', key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]);
  }).join('&');
}