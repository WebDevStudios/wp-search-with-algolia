import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import CurrentRefinements from '../../components/CurrentRefinements/CurrentRefinements';
import connectCurrentRefinements from '../../connectors/current-refinements/connectCurrentRefinements';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'current-refinements'
});
var suit = component('CurrentRefinements');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items;

    if (isFirstRendering) {
      return;
    }

    render(React.createElement(CurrentRefinements, {
      cssClasses: cssClasses,
      items: items
    }), containerNode);
  };
};
/**
 * @typedef {Object} CurrentRefinementsCSSClasses
 * @property {string} [root] CSS classes added to the root element.
 * @property {string} [list] CSS classes added to the list element.
 * @property {string} [item] CSS classes added to the item element.
 * @property {string} [label] CSS classes added to the label element.
 * @property {string} [category] CSS classes added to the category element.
 * @property {string} [categoryLabel] CSS classes added to the categoryLabel element.
 * @property {string} [delete] CSS classes added to the delete element.
 */

/**
 * @typedef {Object} CurrentRefinementsWidgetOptions
 * @property {string|HTMLElement} container The CSS Selector or HTMLElement to insert the widget
 * @property {string[]} [includedAttributes] The attributes to include in the refinements (all by default)
 * @property {string[]} [excludedAttributes = ['query']] The attributes to exclude from the refinements
 * @property {CurrentRefinementsCSSClasses} [cssClasses] The CSS classes to be added
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * The `currentRefinements` widget has two purposes give the user a synthetic view of the current filters
 * and the ability to remove a filter.
 *
 * This widget is usually in the top part of the search UI.
 * @type {WidgetFactory}
 * @devNovel CurrentRefinements
 * @category clear-filter
 * @param {CurrentRefinementsWidgetOptions} $0 The CurrentRefinements widget options.
 * @returns {Object} A new CurrentRefinements widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.currentRefinements({
 *     container: '#current-refinements',
 *     includedAttributes: [
 *       'free_shipping',
 *       'price',
 *       'brand',
 *       'category',
 *     ],
 *   })
 * );
 */


export default function currentRefinements(_ref3) {
  var container = _ref3.container,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      transformItems = _ref3.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    category: cx(suit({
      descendantName: 'category'
    }), userCssClasses.category),
    categoryLabel: cx(suit({
      descendantName: 'categoryLabel'
    }), userCssClasses.categoryLabel),
    delete: cx(suit({
      descendantName: 'delete'
    }), userCssClasses.delete)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeWidget = connectCurrentRefinements(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
}