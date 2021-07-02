"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSendEventForHits = createSendEventForHits;
exports.createBindEventForHits = createBindEventForHits;

var _serializer = require("../../lib/utils/serializer");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var buildPayload = function buildPayload(_ref) {
  var index = _ref.index,
      widgetType = _ref.widgetType,
      methodName = _ref.methodName,
      args = _ref.args;

  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return args[0];
  }

  var eventType = args[0];
  var hits = args[1];
  var eventName = args[2];

  if (!hits) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error("You need to pass hit or hits as the second argument like:\n  ".concat(methodName, "(eventType, hit);\n  "));
    } else {
      return null;
    }
  }

  if ((eventType === 'click' || eventType === 'conversion') && !eventName) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error("You need to pass eventName as the third argument for 'click' or 'conversion' events like:\n  ".concat(methodName, "('click', hit, 'Product Purchased');\n\n  To learn more about event naming: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/in-depth/clicks-conversions-best-practices/\n  "));
    } else {
      return null;
    }
  }

  var hitsArray = Array.isArray(hits) ? removeEscapedFromHits(hits) : [hits];

  if (hitsArray.length === 0) {
    return null;
  }

  var queryID = hitsArray[0].__queryID;
  var objectIDs = hitsArray.map(function (hit) {
    return hit.objectID;
  });
  var positions = hitsArray.map(function (hit) {
    return hit.__position;
  });

  if (eventType === 'view') {
    return {
      insightsMethod: 'viewedObjectIDs',
      widgetType: widgetType,
      eventType: eventType,
      payload: {
        eventName: eventName || 'Hits Viewed',
        index: index,
        objectIDs: objectIDs
      },
      hits: hitsArray
    };
  } else if (eventType === 'click') {
    return {
      insightsMethod: 'clickedObjectIDsAfterSearch',
      widgetType: widgetType,
      eventType: eventType,
      payload: {
        eventName: eventName,
        index: index,
        queryID: queryID,
        objectIDs: objectIDs,
        positions: positions
      },
      hits: hitsArray
    };
  } else if (eventType === 'conversion') {
    return {
      insightsMethod: 'convertedObjectIDsAfterSearch',
      widgetType: widgetType,
      eventType: eventType,
      payload: {
        eventName: eventName,
        index: index,
        queryID: queryID,
        objectIDs: objectIDs
      },
      hits: hitsArray
    };
  } else if (process.env.NODE_ENV === 'development') {
    throw new Error("eventType(\"".concat(eventType, "\") is not supported.\n    If you want to send a custom payload, you can pass one object: ").concat(methodName, "(customPayload);\n    "));
  } else {
    return null;
  }
};

function removeEscapedFromHits(hits) {
  // this returns without `hits.__escaped`
  // and this way it doesn't mutate the original `hits`
  return hits.map(function (hit) {
    return hit;
  });
}

function createSendEventForHits(_ref2) {
  var instantSearchInstance = _ref2.instantSearchInstance,
      index = _ref2.index,
      widgetType = _ref2.widgetType;

  var sendEventForHits = function sendEventForHits() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var payload = buildPayload({
      widgetType: widgetType,
      index: index,
      methodName: 'sendEvent',
      args: args
    });

    if (payload) {
      instantSearchInstance.sendEventToInsights(payload);
    }
  };

  return sendEventForHits;
}

function createBindEventForHits(_ref3) {
  var index = _ref3.index,
      widgetType = _ref3.widgetType;

  var bindEventForHits = function bindEventForHits() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var payload = buildPayload({
      widgetType: widgetType,
      index: index,
      methodName: 'bindEvent',
      args: args
    });
    return payload ? "data-insights-event=".concat((0, _serializer.serializePayload)(payload)) : '';
  };

  return bindEventForHits;
}