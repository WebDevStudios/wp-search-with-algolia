function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import Slider from '../../components/Slider/Slider';
import connectRange from '../../connectors/range/connectRange';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'range-slider'
});
var suit = component('RangeSlider');

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
    var maxFinite = maxStart === Infinity ? maxRange : maxStart; // Clamp values to the range for avoid extra rendering & refinement
    // Should probably be done on the connector side, but we need to stay
    // backward compatible so we still need to pass [-Infinity, Infinity]

    var values = [minFinite > maxRange ? maxRange : minFinite, maxFinite < minRange ? minRange : maxFinite];
    render(h(Slider, {
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
 * @typedef {Object} RangeSliderCssClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [disabledRoot] CSS class to add to the disabled root element.
 */

/**
 * @typedef {Object} RangeSliderTooltipOptions
 * @property {function(number):string} format The function takes the raw value as input, and should return
 * a string for the label that should be used for this value.
 * `format: function(rawValue) {return '$' + Math.round(rawValue).toLocaleString()}`
 */

/**
 * @typedef {Object} RangeSliderWidgetOptions
 * @property  {string|HTMLElement} container CSS Selector or DOMElement to insert the widget.
 * @property  {string} attribute Name of the attribute for faceting.
 * @property  {boolean|RangeSliderTooltipOptions} [tooltips=true] Should we show tooltips or not.
 * The default tooltip will show the raw value.
 * You can also provide an object with a format function as an attribute.
 * So that you can format the tooltip display value as you want
 * @property  {RangeSliderCssClasses} [cssClasses] CSS classes to add to the wrapping elements.
 * @property  {boolean} [pips=true] Show slider pips.
 * @property  {number} [precision = 0] Number of digits after decimal point to use.
 * @property  {number} [step] Every handle move will jump that number of steps.
 * @property  {number} [min] Minimal slider value, default to automatically computed from the result set.
 * @property  {number} [max] Maximal slider value, defaults to automatically computed from the result set.
 */

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
 *
 * @type {WidgetFactory}
 * @devNovel RangeSlider
 * @category filter
 * @param {RangeSliderWidgetOptions} $0 RangeSlider widget options.
 * @return {Widget} A new RangeSlider widget instance.
 * @example
 * search.addWidgets([
 *   instantsearch.widgets.rangeSlider({
 *     container: '#price',
 *     attribute: 'price',
 *     tooltips: {
 *       format: function(rawValue) {
 *         return '$' + Math.round(rawValue).toLocaleString();
 *       }
 *     }
 *   })
 * ]);
 */


export default function rangeSlider() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
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

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    disabledRoot: cx(suit({
      modifierName: 'disabled'
    }), userCssClasses.disabledRoot)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    step: step,
    pips: pips,
    tooltips: tooltips,
    renderState: {},
    cssClasses: cssClasses
  });
  var makeWidget = connectRange(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread({}, makeWidget({
    attribute: attribute,
    min: min,
    max: max,
    precision: precision
  }), {
    $$type: 'ais.rangeSlider'
  });
}