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
  name: 'frequently-bought-together',
  connector: true
});
var connectFrequentlyBoughtTogether = function connectFrequentlyBoughtTogether(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
      _ref$escapeHTML = _ref.escapeHTML,
      escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
      _ref$transformItems = _ref.transformItems,
      transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems,
      objectIDs = _ref.objectIDs,
      limit = _ref.limit,
      threshold = _ref.threshold,
      queryParameters = _ref.queryParameters;
    if (!objectIDs || objectIDs.length === 0) {
      throw new Error(withUsage('The `objectIDs` option is required.'));
    }
    return {
      dependsOn: 'recommend',
      $$type: 'ais.frequentlyBoughtTogether',
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
        var transformedItems = transformItems(results.hits, {
          results: results
        });
        return {
          items: transformedItems,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref3) {
        var recommendState = _ref3.recommendState;
        unmountFn();
        return recommendState.removeParams(this.$$id);
      },
      getWidgetParameters: function getWidgetParameters(state) {
        var _this = this;
        return objectIDs.reduce(function (acc, objectID) {
          return acc.addFrequentlyBoughtTogether({
            objectID: objectID,
            threshold: threshold,
            maxRecommendations: limit,
            queryParameters: _objectSpread(_objectSpread({}, queryParameters), escapeHTML ? _utils.TAG_PLACEHOLDER : {}),
            $$id: _this.$$id
          });
        }, state.removeParams(this.$$id));
      }
    };
  };
};
exports.default = connectFrequentlyBoughtTogether;