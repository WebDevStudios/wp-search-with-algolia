function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import Pagination from '../../components/Pagination/Pagination';
import connectPagination from '../../connectors/pagination/connectPagination';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'pagination'
});
var suit = component('Pagination');
var defaultTemplates = {
  previous: '‹',
  next: '›',
  first: '«',
  last: '»'
};

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      totalPages = _ref.totalPages,
      showFirst = _ref.showFirst,
      showLast = _ref.showLast,
      showPrevious = _ref.showPrevious,
      showNext = _ref.showNext,
      scrollToNode = _ref.scrollToNode;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        currentRefinement = _ref2.currentRefinement,
        nbHits = _ref2.nbHits,
        nbPages = _ref2.nbPages,
        pages = _ref2.pages,
        isFirstPage = _ref2.isFirstPage,
        isLastPage = _ref2.isLastPage,
        refine = _ref2.refine;
    if (isFirstRendering) return;

    var setCurrentPage = function setCurrentPage(pageNumber) {
      refine(pageNumber);

      if (scrollToNode !== false) {
        scrollToNode.scrollIntoView();
      }
    };

    render(React.createElement(Pagination, {
      createURL: createURL,
      cssClasses: cssClasses,
      currentPage: currentRefinement,
      templates: templates,
      nbHits: nbHits,
      nbPages: nbPages,
      pages: pages,
      totalPages: totalPages,
      isFirstPage: isFirstPage,
      isLastPage: isLastPage,
      setCurrentPage: setCurrentPage,
      showFirst: showFirst,
      showLast: showLast,
      showPrevious: showPrevious,
      showNext: showNext
    }), containerNode);
  };
};
/**
 * @typedef {Object} PaginationCSSClasses
 * @property  {string|string[]} [root] CSS classes added to the root element of the widget.
 * @property {string|string[]} [noRefinementRoot] CSS class to add to the root element of the widget if there are no refinements.
 * @property  {string|string[]} [list] CSS classes added to the wrapping `<ul>`.
 * @property  {string|string[]} [item] CSS classes added to each `<li>`.
 * @property  {string|string[]} [firstPageItem] CSS classes added to the first `<li>`.
 * @property  {string|string[]} [lastPageItem] CSS classes added to the last `<li>`.
 * @property  {string|string[]} [previousPageItem] CSS classes added to the previous `<li>`.
 * @property  {string|string[]} [nextPageItem] CSS classes added to the next `<li>`.
 * @property  {string|string[]} [pageItem] CSS classes added to page `<li>`.
 * @property  {string|string[]} [selectedItem] CSS classes added to the selected `<li>`.
 * @property  {string|string[]} [disabledItem] CSS classes added to the disabled `<li>`.
 * @property  {string|string[]} [link] CSS classes added to each link.
 */

/**
 * @typedef {Object} PaginationTemplates
 * @property  {string} [previous] Label for the Previous link.
 * @property  {string} [next] Label for the Next link.
 * @property  {string} [first] Label for the First link.
 * @property  {string} [last] Label for the Last link.
 */

/**
 * @typedef {Object} PaginationWidgetOptions
 * @property  {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property  {number} [totalPages] The max number of pages to browse.
 * @property  {number} [padding=3] The number of pages to display on each side of the current page.
 * @property  {string|HTMLElement|boolean} [scrollTo='body'] Where to scroll after a click, set to `false` to disable.
 * @property  {boolean} [showFirst=true] Whether to show the “first page” control
 * @property  {boolean} [showLast=true] Whether to show the last page” control
 * @property  {boolean} [showNext=true] Whether to show the “next page” control
 * @property  {boolean} [showPrevious=true] 	Whether to show the “previous page” control
 * @property  {PaginationTemplates} [templates] Text to display in the links.
 * @property  {PaginationCSSClasses} [cssClasses] CSS classes to be added.
 */

/**
 * The pagination widget allow the user to switch between pages of the results.
 *
 * This is an alternative to using the *show more* pattern, that allows the user
 * only to display more items. The *show more* pattern is usually preferred
 * because it is simpler to use, and it is more convenient in a mobile context.
 * See the infinite hits widget, for more information.
 *
 * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
 * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
 *
 * @type {WidgetFactory}
 * @devNovel Pagination
 * @category navigation
 * @param {PaginationWidgetOptions} $0 Options for the Pagination widget.
 * @return {Widget} A new instance of Pagination widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.pagination({
 *     container: '#pagination-container',
 *     totalPages: 20,
 *     // default is to scroll to 'body', here we disable this behavior
 *     scrollTo: false,
 *     showFirst: false,
 *     showLast: false,
 *   })
 * );
 */


export default function pagination() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      totalPages = _ref3.totalPages,
      padding = _ref3.padding,
      _ref3$showFirst = _ref3.showFirst,
      showFirst = _ref3$showFirst === void 0 ? true : _ref3$showFirst,
      _ref3$showLast = _ref3.showLast,
      showLast = _ref3$showLast === void 0 ? true : _ref3$showLast,
      _ref3$showPrevious = _ref3.showPrevious,
      showPrevious = _ref3$showPrevious === void 0 ? true : _ref3$showPrevious,
      _ref3$showNext = _ref3.showNext,
      showNext = _ref3$showNext === void 0 ? true : _ref3$showNext,
      _ref3$scrollTo = _ref3.scrollTo,
      userScrollTo = _ref3$scrollTo === void 0 ? 'body' : _ref3$scrollTo;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var scrollTo = userScrollTo === true ? 'body' : userScrollTo;
  var scrollToNode = scrollTo !== false ? getContainerNode(scrollTo) : false;
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
    firstPageItem: cx(suit({
      descendantName: 'item',
      modifierName: 'firstPage'
    }), userCssClasses.firstPageItem),
    lastPageItem: cx(suit({
      descendantName: 'item',
      modifierName: 'lastPage'
    }), userCssClasses.lastPageItem),
    previousPageItem: cx(suit({
      descendantName: 'item',
      modifierName: 'previousPage'
    }), userCssClasses.previousPageItem),
    nextPageItem: cx(suit({
      descendantName: 'item',
      modifierName: 'nextPage'
    }), userCssClasses.nextPageItem),
    pageItem: cx(suit({
      descendantName: 'item',
      modifierName: 'page'
    }), userCssClasses.pageItem),
    selectedItem: cx(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    disabledItem: cx(suit({
      descendantName: 'item',
      modifierName: 'disabled'
    }), userCssClasses.disabledItem),
    link: cx(suit({
      descendantName: 'link'
    }), userCssClasses.link)
  };

  var templates = _objectSpread({}, defaultTemplates, {}, userTemplates);

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    showFirst: showFirst,
    showLast: showLast,
    showPrevious: showPrevious,
    showNext: showNext,
    padding: padding,
    scrollToNode: scrollToNode
  });
  var makeWidget = connectPagination(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    totalPages: totalPages,
    padding: padding
  });
}