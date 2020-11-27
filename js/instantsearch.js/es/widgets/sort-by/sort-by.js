import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import Selector from '../../components/Selector/Selector';
import connectSortBy from '../../connectors/sort-by/connectSortBy';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'sort-by'
});
var suit = component('SortBy');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var currentRefinement = _ref2.currentRefinement,
        options = _ref2.options,
        refine = _ref2.refine;

    if (isFirstRendering) {
      return;
    }

    render(React.createElement("div", {
      className: cssClasses.root
    }, React.createElement(Selector, {
      cssClasses: cssClasses,
      currentValue: currentRefinement,
      options: options,
      setValue: refine
    })), containerNode);
  };
};
/**
 * @typedef {Object} SortByWidgetCssClasses
 * @property {string|string[]} [root] CSS classes added to the outer `<div>`.
 * @property {string|string[]} [select] CSS classes added to the parent `<select>`.
 * @property {string|string[]} [option] CSS classes added to each `<option>`.
 */

/**
 * @typedef {Object} SortByIndexDefinition
 * @property {string} value The name of the index to target.
 * @property {string} label The label of the index to display.
 */

/**
 * @typedef {Object} SortByWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {SortByIndexDefinition[]} items Array of objects defining the different indices to choose from.
 * @property {SortByWidgetCssClasses} [cssClasses] CSS classes to be added.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * Sort by selector is a widget used for letting the user choose between different
 * indices that contains the same data with a different order / ranking formula.
 *
 * For the users it is like they are selecting a new sort order.
 * @type {WidgetFactory}
 * @devNovel SortBy
 * @category sort
 * @param {SortByWidgetOptions} $0 Options for the SortBy widget
 * @return {Widget} Creates a new instance of the SortBy widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.sortBy({
 *     container: '#sort-by-container',
 *     items: [
 *       {value: 'instant_search', label: 'Most relevant'},
 *       {value: 'instant_search_price_asc', label: 'Lowest price'},
 *       {value: 'instant_search_price_desc', label: 'Highest price'}
 *     ]
 *   })
 * );
 */


export default function sortBy() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      items = _ref3.items,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      transformItems = _ref3.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    select: cx(suit({
      descendantName: 'select'
    }), userCssClasses.select),
    option: cx(suit({
      descendantName: 'option'
    }), userCssClasses.option)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeWidget = connectSortBy(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    items: items,
    transformItems: transformItems
  });
}