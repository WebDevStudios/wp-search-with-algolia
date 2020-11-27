import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import connectBreadcrumb from '../../connectors/breadcrumb/connectBreadcrumb';
import defaultTemplates from './defaultTemplates';
import { getContainerNode, prepareTemplateProps, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'breadcrumb'
});
var suit = component('Breadcrumb');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var canRefine = _ref2.canRefine,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        items = _ref2.items,
        refine = _ref2.refine;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(React.createElement(Breadcrumb, {
      canRefine: canRefine,
      cssClasses: cssClasses,
      createURL: createURL,
      items: items,
      refine: refine,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
/**
 * @typedef {Object} BreadcrumbCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element of the widget.
 * @property {string|string[]} [noRefinementRoot] CSS class to add to the root element of the widget if there are no refinements.
 * @property {string|string[]} [list] CSS class to add to the list element.
 * @property {string|string[]} [item] CSS class to add to the items of the list. The items contains the link and the separator.
 * @property {string|string[]} [selectedItem] CSS class to add to the selected item in the list: the last one or the home if there are no refinements.
 * @property {string|string[]} [separator] CSS class to add to the separator.
 * @property {string|string[]} [link] CSS class to add to the links in the items.
 */

/**
 * @typedef {Object} BreadcrumbTemplates
 * @property {string|function(object):string} [home = 'Home'] Label of the breadcrumb's first element.
 * @property {string|function(object):string} [separator = '>'] Symbol used to separate the elements of the breadcrumb.
 */

/**
 * @typedef {Object} BreadcrumbWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string[]} attributes Array of attributes to use to generate the breadcrumb.
 * @property {string} [separator = ' > '] The level separator used in the records.
 * @property {string} [rootPath = null] Prefix path to use if the first level is not the root level.
 * @property {BreadcrumbTemplates} [templates] Templates to use for the widget.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 * @property {BreadcrumbCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 */

/**
 * The breadcrumb widget is a secondary navigation scheme that allows the user to see where the current page is in relation to the facet's hierarchy.
 *
 * It reduces the number of actions a user needs to take in order to get to a higher-level page and improve the discoverability of the app or website's sections and pages.
 * It is commonly used for websites with a large amount of data organized into categories with subcategories.
 *
 * All attributes (lvl0, lvl1 in this case) must be declared as [attributes for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
 * Algolia settings.
 *
 * @requirements
 * Your objects must be formatted in a specific way to be
 * able to display a breadcrumb. Here's an example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": "fruits",
 *     "lvl1": "fruits > citrus"
 *   }
 * }
 * ```
 *
 * Each level must be specified entirely.
 * It's also possible to have multiple values per level, for instance:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": ["fruits", "vitamins"],
 *     "lvl1": ["fruits > citrus", "vitamins > C"]
 *   }
 * }
 * ```
 * @type {WidgetFactory}
 * @devNovel Breadcrumb
 * @category navigation
 * @param {BreadcrumbWidgetOptions} $0 The Breadcrumb widget options.
 * @return {Widget} A new Breadcrumb widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.breadcrumb({
 *     container: '#breadcrumb',
 *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
 *     templates: { home: 'Home Page' },
 *     separator: ' / ',
 *     rootPath: 'Cameras & Camcorders > Digital Cameras',
 *   })
 * );
 */


export default function breadcrumb() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributes = _ref3.attributes,
      separator = _ref3.separator,
      _ref3$rootPath = _ref3.rootPath,
      rootPath = _ref3$rootPath === void 0 ? null : _ref3$rootPath,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinementRoot: cx(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: cx(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    separator: cx(suit({
      descendantName: 'separator'
    }), userCssClasses.separator),
    link: cx(suit({
      descendantName: 'link'
    }), userCssClasses.link)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeBreadcrumb = connectBreadcrumb(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeBreadcrumb({
    attributes: attributes,
    separator: separator,
    rootPath: rootPath,
    transformItems: transformItems
  });
}