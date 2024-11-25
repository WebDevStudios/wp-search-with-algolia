function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { escapeHits, TAG_PLACEHOLDER, checkRendering, createDocumentationMessageGenerator, addAbsolutePosition, addQueryID, createSendEventForHits, createBindEventForHits, noop } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'hits',
  connector: true
});
export default (function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
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
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var renderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread(_objectSpread({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
        renderState.sendEvent('view:internal', renderState.items);
      },
      getRenderState: function getRenderState(renderState, renderOptions
      // Type is explicitly redefined, to avoid having the TWidgetParams type in the definition
      ) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          hits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3;
        var results = _ref2.results,
          helper = _ref2.helper,
          instantSearchInstance = _ref2.instantSearchInstance;
        if (!sendEvent) {
          sendEvent = createSendEventForHits({
            instantSearchInstance: instantSearchInstance,
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type
          });
        }
        if (!bindEvent) {
          bindEvent = createBindEventForHits({
            getIndex: function getIndex() {
              return helper.getIndex();
            },
            widgetType: this.$$type,
            instantSearchInstance: instantSearchInstance
          });
        }
        if (!results) {
          return {
            hits: [],
            items: [],
            results: undefined,
            banner: undefined,
            sendEvent: sendEvent,
            bindEvent: bindEvent,
            widgetParams: widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }
        var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
        var items = transformItems(hitsWithAbsolutePositionAndQueryID, {
          results: results
        });
        var banner = (_results$renderingCon = results.renderingContent) === null || _results$renderingCon === void 0 ? void 0 : (_results$renderingCon2 = _results$renderingCon.widgets) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.banners) === null || _results$renderingCon3 === void 0 ? void 0 : _results$renderingCon3[0];
        return {
          hits: items,
          items: items,
          results: results,
          banner: banner,
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
        return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, undefined));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _uiState) {
        if (!escapeHTML) {
          return state;
        }

        // @MAJOR: set this globally, not in the Hits widget to allow Hits to be conditionally used
        return state.setQueryParameters(TAG_PLACEHOLDER);
      }
    };
  };
});