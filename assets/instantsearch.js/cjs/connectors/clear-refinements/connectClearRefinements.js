"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../lib/utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'clear-refinements',
  connector: true
});
var connectClearRefinements = function connectClearRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
      _ref$includedAttribut = _ref.includedAttributes,
      includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut,
      _ref$excludedAttribut = _ref.excludedAttributes,
      excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
      _ref$transformItems = _ref.transformItems,
      transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems;
    if (widgetParams && widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }
    var connectorState = {
      refine: _utils.noop,
      createURL: function createURL() {
        return '';
      },
      attributesToClear: []
    };
    var cachedRefine = function cachedRefine() {
      return connectorState.refine();
    };
    var cachedCreateURL = function cachedCreateURL() {
      return connectorState.createURL();
    };
    return {
      $$type: 'ais.clearRefinements',
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
          clearRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var createURL = _ref2.createURL,
          scopedResults = _ref2.scopedResults,
          results = _ref2.results;
        connectorState.attributesToClear = scopedResults.reduce(function (attributesToClear, scopedResult) {
          return attributesToClear.concat(getAttributesToClear({
            scopedResult: scopedResult,
            includedAttributes: includedAttributes,
            excludedAttributes: excludedAttributes,
            transformItems: transformItems,
            results: results
          }));
        }, []);
        connectorState.refine = function () {
          connectorState.attributesToClear.forEach(function (_ref3) {
            var indexHelper = _ref3.helper,
              items = _ref3.items;
            indexHelper.setState((0, _utils.clearRefinements)({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };
        connectorState.createURL = function () {
          return createURL(_utils.mergeSearchParameters.apply(void 0, _toConsumableArray(connectorState.attributesToClear.map(function (_ref4) {
            var indexHelper = _ref4.helper,
              items = _ref4.items;
            return (0, _utils.clearRefinements)({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };
        var canRefine = connectorState.attributesToClear.some(function (attributeToClear) {
          return attributeToClear.items.length > 0;
        });
        return {
          canRefine: canRefine,
          hasRefinements: canRefine,
          refine: cachedRefine,
          createURL: cachedCreateURL,
          widgetParams: widgetParams
        };
      }
    };
  };
};
function getAttributesToClear(_ref5) {
  var scopedResult = _ref5.scopedResult,
    includedAttributes = _ref5.includedAttributes,
    excludedAttributes = _ref5.excludedAttributes,
    transformItems = _ref5.transformItems,
    results = _ref5.results;
  var includesQuery = includedAttributes.indexOf('query') !== -1 || excludedAttributes.indexOf('query') === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems((0, _utils.uniq)((0, _utils.getRefinements)(scopedResult.results, scopedResult.helper.state, includesQuery).map(function (refinement) {
      return refinement.attribute;
    }).filter(function (attribute) {
      return (
        // If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 ||
        // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function (attribute) {
      return (
        // If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === 'query' && includesQuery ||
        // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })), {
      results: results
    })
  };
}
var _default = connectClearRefinements;
exports.default = _default;