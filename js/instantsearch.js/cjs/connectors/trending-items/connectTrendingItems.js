"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../lib/utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'trending-items',
  connector: true
});
var connectTrendingItems = function connectTrendingItems(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
      facetName = _ref.facetName,
      facetValue = _ref.facetValue,
      limit = _ref.limit,
      threshold = _ref.threshold,
      fallbackParameters = _ref.fallbackParameters,
      queryParameters = _ref.queryParameters,
      _ref$escapeHTML = _ref.escapeHTML,
      escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
      _ref$transformItems = _ref.transformItems,
      transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems;
    if (facetName && !facetValue || !facetName && facetValue) {
      throw new Error(withUsage("When you provide facetName (received type ".concat((0, _utils.getObjectType)(facetName), "), you must also provide facetValue (received type ").concat((0, _utils.getObjectType)(facetValue), ").")));
    }
    return {
      dependsOn: 'recommend',
      $$type: 'ais.trendingItems',
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
      },
      getRenderState: function getRenderState(renderState) {
        return renderState;
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results;
        if (results === null || results === undefined) {
          return {
            items: [],
            widgetParams: widgetParams
          };
        }
        if (escapeHTML && results.hits.length > 0) {
          results.hits = (0, _utils.escapeHits)(results.hits);
        }
        return {
          items: transformItems(results.hits, {
            results: results
          }),
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var recommendState = _ref3.recommendState;
        unmountFn();
        return recommendState.removeParams(this.$$id);
      },
      getWidgetParameters: function getWidgetParameters(state) {
        return state.removeParams(this.$$id).addTrendingItems({
          facetName: facetName,
          facetValue: facetValue,
          maxRecommendations: limit,
          threshold: threshold,
          fallbackParameters: _objectSpread(_objectSpread({}, fallbackParameters), escapeHTML ? _utils.TAG_PLACEHOLDER : {}),
          queryParameters: _objectSpread(_objectSpread({}, queryParameters), escapeHTML ? _utils.TAG_PLACEHOLDER : {}),
          $$id: this.$$id
        });
      }
    };
  };
};
exports.default = connectTrendingItems;