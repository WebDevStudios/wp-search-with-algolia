import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import PoweredBy from '../../components/PoweredBy/PoweredBy';
import connectPoweredBy from '../../connectors/powered-by/connectPoweredBy';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var suit = component('PoweredBy');
var withUsage = createDocumentationMessageGenerator({
  name: 'powered-by'
});

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var url = _ref2.url,
        widgetParams = _ref2.widgetParams;

    if (isFirstRendering) {
      var theme = widgetParams.theme;
      render(React.createElement(PoweredBy, {
        cssClasses: cssClasses,
        url: url,
        theme: theme
      }), containerNode);
      return;
    }
  };
};
/**
 * @typedef {Object} PoweredByWidgetCssClasses
 * @property  {string|string[]} [root] CSS classes added to the root element of the widget.
 * @property  {string|string[]} [link] CSS class to add to the link.
 * @property  {string|string[]} [logo] CSS class to add to the SVG logo.
 */

/**
 * @typedef {Object} PoweredByWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {string} [theme] The theme of the logo ("light" or "dark").
 * @property {PoweredByWidgetCssClasses} [cssClasses] CSS classes to add.
 */

/**
 * The `poweredBy` widget is used to display the logo to redirect to Algolia.
 * @type {WidgetFactory}
 * @devNovel PoweredBy
 * @category metadata
 * @param {PoweredByWidgetOptions} $0 PoweredBy widget options. Some keys are mandatory: `container`,
 * @return {Widget} A new poweredBy widget instance
 * @example
 * search.addWidget(
 *   instantsearch.widgets.poweredBy({
 *     container: '#poweredBy-container',
 *     theme: 'dark',
 *   })
 * );
 */


export default function poweredBy() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$theme = _ref3.theme,
      theme = _ref3$theme === void 0 ? 'light' : _ref3$theme;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), suit({
      modifierName: theme === 'dark' ? 'dark' : 'light'
    }), userCssClasses.root),
    link: cx(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    logo: cx(suit({
      descendantName: 'logo'
    }), userCssClasses.logo)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeWidget = connectPoweredBy(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    theme: theme
  });
}