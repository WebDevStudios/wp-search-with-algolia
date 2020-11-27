function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import { getContainerNode, prepareTemplateProps, warning, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import Panel from '../../components/Panel/Panel';
var withUsage = createDocumentationMessageGenerator({
  name: 'panel'
});
var suit = component('Panel');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      bodyContainerNode = _ref.bodyContainerNode,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
  return function (_ref2) {
    var options = _ref2.options,
        hidden = _ref2.hidden,
        collapsible = _ref2.collapsible,
        collapsed = _ref2.collapsed;
    render(React.createElement(Panel, {
      cssClasses: cssClasses,
      hidden: hidden,
      collapsible: collapsible,
      collapsed: collapsed,
      templateProps: templateProps,
      data: options,
      bodyElement: bodyContainerNode
    }), containerNode);
  };
};
/**
 * @typedef {Object} PanelWidgetCSSClasses
 * @property  {string|string[]} [root] CSS classes added to the root element of the widget.
 * @property  {string|string[]} [noRefinementRoot] CSS classes added to the root element of the widget when there's no refinements.
 * @property  {string|string[]} [collapsibleRoot] CSS classes added to the root element when collapsible.
 * @property  {string|string[]} [collapsedRoot] CSS classes added to the root element when collapsed.
 * @property  {string|string[]} [collapseButton] CSS classes added to the collapse button element.
 * @property  {string|string[]} [collapseIcon] CSS classes added to the collapse icon of the button.
 * @property  {string|string[]} [header] CSS class to add to the header.
 * @property  {string|string[]} [footer] CSS class to add to the SVG footer.
 */

/**
 * @typedef {Object} PanelTemplates
 * @property {string|function} [header = ''] Template to use for the header.
 * @property {string|function} [footer = ''] Template to use for the footer.
 * @property {string|function} [collapseButtonText] Template to use for collapse button. It is given the collapsed state.
 */

/**
 * @typedef {Object} PanelWidgetOptions
 * @property {function} [hidden] This function is called on each render to determine from the render options if the panel have to be hidden or not. If the value is `true` the CSS class `noRefinementRoot` is applied and the wrapper is hidden.
 * @property {PanelTemplates} [templates] Templates to use for the widgets.
 * @property {PanelWidgetCSSClasses} [cssClasses] CSS classes to add.
 */

/**
 * The panel widget wraps other widgets in a consistent panel design. It also reacts, indicates and sets CSS classes when widgets are no more relevant for refining.
 *
 * @type {WidgetFactory}
 * @devNovel Panel
 * @category metadata
 * @param {PanelWidgetOptions} $0 Panel widget options.
 * @return {function} A new panel widget instance
 * @example
 * const refinementListWithPanel = instantsearch.widgets.panel({
 *   templates: {
 *     header: 'Brand',
 *   },
 * })(instantsearch.widgets.refinementList);
 *
 * search.addWidget(
 *   refinementListWithPanel({
 *     container: '#refinement-list',
 *     attribute: 'brand',
 *   })
 * );
 */


export default function panel() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$hidden = _ref3.hidden,
      hidden = _ref3$hidden === void 0 ? function () {
    return false;
  } : _ref3$hidden,
      collapsed = _ref3.collapsed,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  warning(typeof hidden === 'function', "The `hidden` option in the \"panel\" widget expects a function returning a boolean (received \"".concat(_typeof(hidden), "\" type)."));
  warning(typeof collapsed === 'undefined' || typeof collapsed === 'function', "The `collapsed` option in the \"panel\" widget expects a function returning a boolean (received \"".concat(_typeof(collapsed), "\" type)."));
  var bodyContainerNode = document.createElement('div');
  var collapsible = Boolean(collapsed);
  var collapsedFn = typeof collapsed === 'function' ? collapsed : function () {
    return false;
  };
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinementRoot: cx(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    collapsibleRoot: cx(suit({
      modifierName: 'collapsible'
    }), userCssClasses.collapsibleRoot),
    collapsedRoot: cx(suit({
      modifierName: 'collapsed'
    }), userCssClasses.collapsedRoot),
    collapseButton: cx(suit({
      descendantName: 'collapseButton'
    }), userCssClasses.collapseButton),
    collapseIcon: cx(suit({
      descendantName: 'collapseIcon'
    }), userCssClasses.collapseIcon),
    body: cx(suit({
      descendantName: 'body'
    }), userCssClasses.body),
    header: cx(suit({
      descendantName: 'header'
    }), userCssClasses.header),
    footer: cx(suit({
      descendantName: 'footer'
    }), userCssClasses.footer)
  };
  return function (widgetFactory) {
    return function () {
      var widgetOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var container = widgetOptions.container;

      if (!container) {
        throw new Error(withUsage("The `container` option is required in the widget within the panel."));
      }

      var defaultTemplates = {
        header: '',
        footer: '',
        collapseButtonText: function collapseButtonText(_ref4) {
          var isCollapsed = _ref4.collapsed;
          return "<svg\n          class=\"".concat(cssClasses.collapseIcon, "\"\n          width=\"1em\"\n          height=\"1em\"\n          viewBox=\"0 0 500 500\"\n        >\n        <path d=\"").concat(isCollapsed ? 'M100 250l300-150v300z' : 'M250 400l150-300H100z', "\" fill=\"currentColor\" />\n        </svg>");
        }
      };
      var templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templates: templates
      });
      var renderPanel = renderer({
        containerNode: getContainerNode(container),
        bodyContainerNode: bodyContainerNode,
        cssClasses: cssClasses,
        templateProps: templateProps
      });
      renderPanel({
        options: {},
        hidden: true,
        collapsible: collapsible,
        collapsed: false
      });
      var widget = widgetFactory(_objectSpread({}, widgetOptions, {
        container: bodyContainerNode
      }));
      return _objectSpread({}, widget, {
        dispose: function dispose() {
          unmountComponentAtNode(getContainerNode(container));

          if (typeof widget.dispose === 'function') {
            var _widget$dispose;

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return (_widget$dispose = widget.dispose).call.apply(_widget$dispose, [this].concat(args));
          }

          return undefined;
        },
        render: function render() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var options = args[0];
          renderPanel({
            options: options,
            hidden: Boolean(hidden(options)),
            collapsible: collapsible,
            collapsed: Boolean(collapsedFn(options))
          });

          if (typeof widget.render === 'function') {
            var _widget$render;

            (_widget$render = widget.render).call.apply(_widget$render, [this].concat(args));
          }
        }
      });
    };
  };
}