function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { checkRendering, createDocumentationMessageGenerator, noop } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'stats',
  connector: true
});

/**
 * **Stats** connector provides the logic to build a custom widget that will displays
 * search statistics (hits number and processing time).
 */

var connectStats = function connectStats(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    return {
      $$type: 'ais.stats',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          stats: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref) {
        var results = _ref.results,
          state = _ref.state;
        if (!results) {
          return {
            hitsPerPage: state.hitsPerPage,
            nbHits: 0,
            nbSortedHits: undefined,
            areHitsSorted: false,
            nbPages: 0,
            page: state.page || 0,
            processingTimeMS: -1,
            query: state.query || '',
            widgetParams: widgetParams
          };
        }
        return {
          hitsPerPage: results.hitsPerPage,
          nbHits: results.nbHits,
          nbSortedHits: results.nbSortedHits,
          areHitsSorted: typeof results.appliedRelevancyStrictness !== 'undefined' && results.appliedRelevancyStrictness > 0 && results.nbSortedHits !== results.nbHits,
          nbPages: results.nbPages,
          page: results.page,
          processingTimeMS: results.processingTimeMS,
          query: results.query,
          widgetParams: widgetParams
        };
      }
    };
  };
};
export default connectStats;