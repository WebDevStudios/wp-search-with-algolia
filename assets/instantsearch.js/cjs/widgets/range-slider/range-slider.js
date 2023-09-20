"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _Slider = _interopRequireDefault(require("../../components/Slider/Slider"));
var _connectRange = _interopRequireDefault(require("../../connectors/range/connectRange"));
var _suit = require("../../lib/suit");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'range-slider'
});
var suit = (0, _suit.component)('RangeSlider');
var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
    cssClasses = _ref.cssClasses,
    pips = _ref.pips,
    step = _ref.step,
    tooltips = _ref.tooltips;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
      range = _ref2.range,
      start = _ref2.start;
    if (isFirstRendering) {
      // There's no information at this point, let's render nothing.
      return;
    }
    var minRange = range.min,
      maxRange = range.max;
    var _start = _slicedToArray(start, 2),
      minStart = _start[0],
      maxStart = _start[1];
    var minFinite = minStart === -Infinity ? minRange : minStart;
    var maxFinite = maxStart === Infinity ? maxRange : maxStart;

    // Clamp values to the range for avoid extra rendering & refinement
    // Should probably be done on the connector side, but we need to stay
    // backward compatible so we still need to pass [-Infinity, Infinity]
    var values = [minFinite > maxRange ? maxRange : minFinite, maxFinite < minRange ? minRange : maxFinite];
    (0, _preact.render)((0, _preact.h)(_Slider.default, {
      cssClasses: cssClasses,
      refine: refine,
      min: minRange,
      max: maxRange,
      values: values,
      tooltips: tooltips,
      step: step,
      pips: pips
    }), containerNode);
  };
};
/**
 * The range slider is a widget which provides a user-friendly way to filter the
 * results based on a single numeric range.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 */
var rangeSlider = function rangeSlider(widgetParams) {
  var _ref3 = widgetParams || {},
    container = _ref3.container,
    attribute = _ref3.attribute,
    min = _ref3.min,
    max = _ref3.max,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
    step = _ref3.step,
    _ref3$pips = _ref3.pips,
    pips = _ref3$pips === void 0 ? true : _ref3$pips,
    _ref3$precision = _ref3.precision,
    precision = _ref3$precision === void 0 ? 0 : _ref3$precision,
    _ref3$tooltips = _ref3.tooltips,
    tooltips = _ref3$tooltips === void 0 ? true : _ref3$tooltips;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root),
    disabledRoot: (0, _uiComponentsShared.cx)(suit({
      modifierName: 'disabled'
    }), userCssClasses.disabledRoot)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    step: step,
    pips: pips,
    tooltips: tooltips,
    cssClasses: cssClasses
  });
  var makeWidget = (0, _connectRange.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attribute: attribute,
    min: min,
    max: max,
    precision: precision
  })), {}, {
    $$type: 'ais.rangeSlider',
    $$widgetType: 'ais.rangeSlider'
  });
};
var _default = rangeSlider;
exports.default = _default;