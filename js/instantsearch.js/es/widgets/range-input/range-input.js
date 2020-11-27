function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import RangeInput from '../../components/RangeInput/RangeInput';
import connectRange from '../../connectors/range/connectRange';
import { prepareTemplateProps, getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'range-input'
});
var suit = component('RangeInput');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        range = _ref2.range,
        start = _ref2.start,
        widgetParams = _ref2.widgetParams,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var rangeMin = range.min,
        rangeMax = range.max;

    var _start = _slicedToArray(start, 2),
        minValue = _start[0],
        maxValue = _start[1];

    var step = 1 / Math.pow(10, widgetParams.precision);
    var values = {
      min: minValue !== -Infinity && minValue !== rangeMin ? minValue : undefined,
      max: maxValue !== Infinity && maxValue !== rangeMax ? maxValue : undefined
    };
    render(React.createElement(RangeInput, {
      min: rangeMin,
      max: rangeMax,
      step: step,
      values: values,
      cssClasses: cssClasses,
      refine: refine,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
/**
 * @typedef {Object} RangeInputClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [noRefinement] CSS class to add to the root element when there's no refinements.
 * @property {string|string[]} [form] CSS class to add to the form element.
 * @property {string|string[]} [label] CSS class to add to the label element.
 * @property {string|string[]} [input] CSS class to add to the input element.
 * @property {string|string[]} [inputMin] CSS class to add to the min input element.
 * @property {string|string[]} [inputMax] CSS class to add to the max input element.
 * @property {string|string[]} [separator] CSS class to add to the separator of the form.
 * @property {string|string[]} [submit] CSS class to add to the submit button of the form.
 */

/**
 * @typedef {Object} RangeInputTemplates
 * @property {string} [separatorText = "to"] The label of the separator, between min and max.
 * @property {string} [submitText = "Go"] The label of the submit button.
 */

/**
 * @typedef {Object} RangeInputWidgetOptions
 * @property {string|HTMLElement} container Valid CSS Selector as a string or DOMElement.
 * @property {string} attribute Name of the attribute for faceting.
 * @property {number} [min] Minimal slider value, default to automatically computed from the result set.
 * @property {number} [max] Maximal slider value, defaults to automatically computed from the result set.
 * @property {number} [precision = 0] Number of digits after decimal point to use.
 * @property {RangeInputTemplates} [templates] Labels to use for the widget.
 * @property {RangeInputClasses} [cssClasses] CSS classes to add.
 */

/**
 * The range input widget allows a user to select a numeric range using a minimum and maximum input.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 * @type {WidgetFactory}
 * @devNovel RangeInput
 * @category filter
 * @param {RangeInputWidgetOptions} $0 The RangeInput widget options.
 * @return {Widget} A new instance of RangeInput widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.rangeInput({
 *     container: '#range-input',
 *     attribute: 'price',
 *     templates: {
 *       separatorText: 'to',
 *       submitText: 'Go'
 *     },
 *   })
 * );
 */


export default function rangeInput() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      min = _ref3.min,
      max = _ref3.max,
      _ref3$precision = _ref3.precision,
      precision = _ref3$precision === void 0 ? 0 : _ref3$precision,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);

  var templates = _objectSpread({
    separatorText: 'to',
    submitText: 'Go'
  }, userTemplates);

  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinement: cx(suit({
      modifierName: 'noRefinement'
    })),
    form: cx(suit({
      descendantName: 'form'
    }), userCssClasses.form),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    input: cx(suit({
      descendantName: 'input'
    }), userCssClasses.input),
    inputMin: cx(suit({
      descendantName: 'input',
      modifierName: 'min'
    }), userCssClasses.inputMin),
    inputMax: cx(suit({
      descendantName: 'input',
      modifierName: 'max'
    }), userCssClasses.inputMax),
    separator: cx(suit({
      descendantName: 'separator'
    }), userCssClasses.separator),
    submit: cx(suit({
      descendantName: 'submit'
    }), userCssClasses.submit)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {}
  });
  var makeWidget = connectRange(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    attribute: attribute,
    min: min,
    max: max,
    precision: precision
  });
}