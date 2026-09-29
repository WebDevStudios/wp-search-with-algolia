"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._buildEventPayloadsForHits = _buildEventPayloadsForHits;
exports.createBindEventForHits = createBindEventForHits;
exports.createSendEventForHits = createSendEventForHits;
var _serializer = require("./serializer");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function chunk(arr) {
  var chunkSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var chunks = [];
  for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
    chunks.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
  }
  return chunks;
}
function _buildEventPayloadsForHits(_ref) {
  var helper = _ref.helper,
    widgetType = _ref.widgetType,
    methodName = _ref.methodName,
    args = _ref.args,
    instantSearchInstance = _ref.instantSearchInstance;
  // when there's only one argument, that means it's custom
  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return [args[0]];
  }
  var _args$0$split = args[0].split(':'),
    _args$0$split2 = _slicedToArray(_args$0$split, 2),
    eventType = _args$0$split2[0],
    eventModifier = _args$0$split2[1];
  var hits = args[1];
  var eventName = args[2];
  var additionalData = args[3] || {};
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
  var hitsArray = Array.isArray(hits) ? hits : [hits];
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
    if (instantSearchInstance.status !== 'idle') {
      return [];
    }
    return hitsChunks.map(function (batch, i) {
      var _helper$lastResults;
      return {
        insightsMethod: 'viewedObjectIDs',
        widgetType: widgetType,
        eventType: eventType,
        payload: _objectSpread({
          eventName: eventName || 'Hits Viewed',
          index: ((_helper$lastResults = helper.lastResults) === null || _helper$lastResults === void 0 ? void 0 : _helper$lastResults.index) || helper.state.index,
          objectIDs: objectIDsByChunk[i]
        }, additionalData),
        hits: batch,
        eventModifier: eventModifier
      };
    });
  } else if (eventType === 'click') {
    return hitsChunks.map(function (batch, i) {
      var _helper$lastResults2;
      return {
        insightsMethod: 'clickedObjectIDsAfterSearch',
        widgetType: widgetType,
        eventType: eventType,
        payload: _objectSpread({
          eventName: eventName || 'Hit Clicked',
          index: ((_helper$lastResults2 = helper.lastResults) === null || _helper$lastResults2 === void 0 ? void 0 : _helper$lastResults2.index) || helper.state.index,
          queryID: queryID,
          objectIDs: objectIDsByChunk[i],
          positions: positionsByChunk[i]
        }, additionalData),
        hits: batch,
        eventModifier: eventModifier
      };
    });
  } else if (eventType === 'conversion') {
    return hitsChunks.map(function (batch, i) {
      var _helper$lastResults3;
      return {
        insightsMethod: 'convertedObjectIDsAfterSearch',
        widgetType: widgetType,
        eventType: eventType,
        payload: _objectSpread({
          eventName: eventName || 'Hit Converted',
          index: ((_helper$lastResults3 = helper.lastResults) === null || _helper$lastResults3 === void 0 ? void 0 : _helper$lastResults3.index) || helper.state.index,
          queryID: queryID,
          objectIDs: objectIDsByChunk[i]
        }, additionalData),
        hits: batch,
        eventModifier: eventModifier
      };
    });
  } else if (process.env.NODE_ENV === 'development') {
    throw new Error("eventType(\"".concat(eventType, "\") is not supported.\n    If you want to send a custom payload, you can pass one object: ").concat(methodName, "(customPayload);\n    "));
  } else {
    return [];
  }
}
function createSendEventForHits(_ref2) {
  var instantSearchInstance = _ref2.instantSearchInstance,
    helper = _ref2.helper,
    widgetType = _ref2.widgetType;
  var sentEvents = {};
  var timer = undefined;
  var sendEventForHits = function sendEventForHits() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType: widgetType,
      helper: helper,
      methodName: 'sendEvent',
      args: args,
      instantSearchInstance: instantSearchInstance
    });
    payloads.forEach(function (payload) {
      if (payload.eventType === 'click' && payload.eventModifier === 'internal' && sentEvents[payload.eventType]) {
        return;
      }
      sentEvents[payload.eventType] = true;
      instantSearchInstance.sendEventToInsights(payload);
    });
    clearTimeout(timer);
    timer = setTimeout(function () {
      sentEvents = {};
    }, 0);
  };
  return sendEventForHits;
}
function createBindEventForHits(_ref3) {
  var helper = _ref3.helper,
    widgetType = _ref3.widgetType,
    instantSearchInstance = _ref3.instantSearchInstance;
  var bindEventForHits = function bindEventForHits() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var payloads = _buildEventPayloadsForHits({
      widgetType: widgetType,
      helper: helper,
      methodName: 'bindEvent',
      args: args,
      instantSearchInstance: instantSearchInstance
    });
    return payloads.length ? "data-insights-event=".concat((0, _serializer.serializePayload)(payloads)) : '';
  };
  return bindEventForHits;
}