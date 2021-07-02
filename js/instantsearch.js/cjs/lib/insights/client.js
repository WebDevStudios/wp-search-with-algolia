"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withInsights;
exports.inferPayload = void 0;

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSelectedHits = function getSelectedHits(hits, selectedObjectIDs) {
  return selectedObjectIDs.map(function (objectID) {
    var hit = (0, _utils.find)(hits, function (h) {
      return h.objectID === objectID;
    });

    if (typeof hit === 'undefined') {
      throw new Error("Could not find objectID \"".concat(objectID, "\" passed to `clickedObjectIDsAfterSearch` in the returned hits. This is necessary to infer the absolute position and the query ID."));
    }

    return hit;
  });
};

var getQueryID = function getQueryID(selectedHits) {
  var queryIDs = (0, _utils.uniq)(selectedHits.map(function (hit) {
    return hit.__queryID;
  }));

  if (queryIDs.length > 1) {
    throw new Error('Insights currently allows a single `queryID`. The `objectIDs` provided map to multiple `queryID`s.');
  }

  var queryID = queryIDs[0];

  if (typeof queryID !== 'string') {
    throw new Error("Could not infer `queryID`. Ensure InstantSearch `clickAnalytics: true` was added with the Configure widget.\n\nSee: https://alg.li/lNiZZ7");
  }

  return queryID;
};

var getPositions = function getPositions(selectedHits) {
  return selectedHits.map(function (hit) {
    return hit.__position;
  });
};

var inferPayload = function inferPayload(_ref) {
  var method = _ref.method,
      results = _ref.results,
      hits = _ref.hits,
      objectIDs = _ref.objectIDs;
  var index = results.index;
  var selectedHits = getSelectedHits(hits, objectIDs);
  var queryID = getQueryID(selectedHits);

  switch (method) {
    case 'clickedObjectIDsAfterSearch':
      {
        var positions = getPositions(selectedHits);
        return {
          index: index,
          queryID: queryID,
          objectIDs: objectIDs,
          positions: positions
        };
      }

    case 'convertedObjectIDsAfterSearch':
      return {
        index: index,
        queryID: queryID,
        objectIDs: objectIDs
      };

    default:
      throw new Error("Unsupported method passed to insights: \"".concat(method, "\"."));
  }
};

exports.inferPayload = inferPayload;

var wrapInsightsClient = function wrapInsightsClient(aa, results, hits) {
  return function (method, payload) {
    process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, "`insights` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;

    if (!aa) {
      var withInstantSearchUsage = (0, _utils.createDocumentationMessageGenerator)({
        name: 'instantsearch'
      });
      throw new Error(withInstantSearchUsage('The `insightsClient` option has not been provided to `instantsearch`.'));
    }

    if (!Array.isArray(payload.objectIDs)) {
      throw new TypeError('Expected `objectIDs` to be an array.');
    }

    var inferredPayload = inferPayload({
      method: method,
      results: results,
      hits: hits,
      objectIDs: payload.objectIDs
    });
    aa(method, _objectSpread(_objectSpread({}, inferredPayload), payload));
  };
};
/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 * It passes `insights` to `HitsWithInsightsListener` and `InfiniteHitsWithInsightsListener`.
 */


function withInsights(connector) {
  return function (renderFn, unmountFn) {
    return connector(function (renderOptions, isFirstRender) {
      var results = renderOptions.results,
          hits = renderOptions.hits,
          instantSearchInstance = renderOptions.instantSearchInstance;

      if (results && hits && instantSearchInstance) {
        var insights = wrapInsightsClient(instantSearchInstance.insightsClient, results, hits);
        return renderFn(_objectSpread(_objectSpread({}, renderOptions), {}, {
          insights: insights
        }), isFirstRender);
      }

      return renderFn(renderOptions, isFirstRender);
    }, unmountFn);
  };
}