function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { serializePayload } from "./serializer.js";

function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var chunks = [];

  for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
    chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  return chunks;
}

var buildPayloads = function buildPayloads(_ref) {
  var index = _ref.index,
      widgetType = _ref.widgetType,
      methodName = _ref.methodName,
      args = _ref.args,
      isSearchStalled = _ref.isSearchStalled;

  // when there's only one argument, that means it's custom
  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return [args[0]];
  }

  var eventType = args[0];
  var hits = args[1];
  var eventName = args[2];

  if (!hits) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error("You need to pass hit or hits as the second argument like:\n  ".concat(methodName, "(eventType, hit);\n  "));
    } else {
      return [];
    }
  }

  if ((eventType === 'click' || eventType === 'conversion') && !eventName) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error("You need to pass eventName as the third argument for 'click' or 'conversion' events like:\n  ".concat(methodName, "('click', hit, 'Product Purchased');\n\n  To learn more about event naming: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/in-depth/clicks-conversions-best-practices/\n  "));
    } else {
      return [];
    }
  }

  var hitsArray = Array.isArray(hits) ? removeEscapedFromHits(hits) : [hits];

  if (hitsArray.length === 0) {
    return [];
  }

  var queryID = hitsArray[0].__queryID;
  var hitsChunks = chunk(hitsArray);
  var objectIDsByChunk = hitsChunks.map(function (batch) {
    return batch.map(function (hit) {
      return hit.objectID;
    });
  });
  var positionsByChunk = hitsChunks.map(function (batch) {
    return batch.map(function (hit) {
      return hit.__position;
    });
  });

  if (eventType === 'view') {
    if (isSearchStalled) {
      return [];
    }

    return hitsChunks.map(function (batch, i) {
      return {
        insightsMethod: 'viewedObjectIDs',
        widgetType: widgetType,
        eventType: eventType,
        payload: {
          eventName: eventName || 'Hits Viewed',
          index: index,
          objectIDs: objectIDsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (eventType === 'click') {
    return hitsChunks.map(function (batch, i) {
      return {
        insightsMethod: 'clickedObjectIDsAfterSearch',
        widgetType: widgetType,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: index,
          queryID: queryID,
          objectIDs: objectIDsByChunk[i],
          positions: positionsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (eventType === 'conversion') {
    return hitsChunks.map(function (batch, i) {
      return {
        insightsMethod: 'convertedObjectIDsAfterSearch',
        widgetType: widgetType,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: index,
          queryID: queryID,
          objectIDs: objectIDsByChunk[i]
        },
        hits: batch
      };
    });
  } else if (process.env.NODE_ENV === 'development') {
    throw new Error("eventType(\"".concat(eventType, "\") is not supported.\n    If you want to send a custom payload, you can pass one object: ").concat(methodName, "(customPayload);\n    "));
  } else {
    return [];
  }
};

function removeEscapedFromHits(hits) {
  // remove `hits.__escaped` without mutating
  return hits.slice();
}

export function createSendEventForHits(_ref2) {
  var instantSearchInstance = _ref2.instantSearchInstance,
      index = _ref2.index,
      widgetType = _ref2.widgetType;

  var sendEventForHits = function sendEventForHits() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var payloads = buildPayloads({
      widgetType: widgetType,
      index: index,
      methodName: 'sendEvent',
      args: args,
      isSearchStalled: instantSearchInstance._isSearchStalled
    });
    payloads.forEach(function (payload) {
      return instantSearchInstance.sendEventToInsights(payload);
    });
  };

  return sendEventForHits;
}
export function createBindEventForHits(_ref3) {
  var index = _ref3.index,
      widgetType = _ref3.widgetType;

  var bindEventForHits = function bindEventForHits() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var payloads = buildPayloads({
      widgetType: widgetType,
      index: index,
      methodName: 'bindEvent',
      args: args,
      isSearchStalled: false
    });
    return payloads.length ? "data-insights-event=".concat(serializePayload(payloads)) : '';
  };

  return bindEventForHits;
}