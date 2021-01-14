"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _escapeHighlight = _interopRequireWildcard(require("../../lib/escape-highlight"));

var _utils = require("../../lib/utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'hits',
  connector: true
});

var connectHits = function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    var sendEvent;
    var bindEvent;
    return {
      $$type: 'ais.hits',
      init: function init(initOptions) {
        renderFn(_objectSpread({}, this.getWidgetRenderState(initOptions), {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderState.sendEvent('view', renderState.hits);
        renderFn(_objectSpread({}, renderState, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
            helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance;

        if (!sendEvent) {
          sendEvent = (0, _utils.createSendEventForHits)({
            instantSearchInstance: instantSearchInstance,
            index: helper.getIndex(),
            widgetType: this.$$type
          });
        }

        if (!bindEvent) {
          bindEvent = (0, _utils.createBindEventForHits)({
            index: helper.getIndex(),
            widgetType: this.$$type
          });
        }

        if (!results) {
          return {
            hits: [],
            results: undefined,
            sendEvent: sendEvent,
            bindEvent: bindEvent,
            widgetParams: widgetParams
          };
        }

        if (escapeHTML && results.hits.length > 0) {
          results.hits = (0, _escapeHighlight.default)(results.hits);
        }

        var initialEscaped = results.hits.__escaped;
        results.hits = (0, _utils.addAbsolutePosition)(results.hits, results.page, results.hitsPerPage);
        results.hits = (0, _utils.addQueryID)(results.hits, results.queryID);
        results.hits = transformItems(results.hits); // Make sure the escaped tag stays, even after mapping over the hits.
        // This prevents the hits from being double-escaped if there are multiple
        // hits widgets mounted on the page.

        results.hits.__escaped = initialEscaped;
        return {
          hits: results.hits,
          results: results,
          sendEvent: sendEvent,
          bindEvent: bindEvent,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();

        if (!escapeHTML) {
          return state;
        }

        return state.setQueryParameters(Object.keys(_escapeHighlight.TAG_PLACEHOLDER).reduce(function (acc, key) {
          return _objectSpread({}, acc, _defineProperty({}, key, undefined));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        if (!escapeHTML) {
          return state;
        }

        return state.setQueryParameters(_escapeHighlight.TAG_PLACEHOLDER);
      }
    };
  };
};

var _default = connectHits;
exports.default = _default;