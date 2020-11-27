function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
import Paginator from './Paginator';
var withUsage = createDocumentationMessageGenerator({
  name: 'pagination',
  connector: true
});
/**
 * @typedef {Object} CustomPaginationWidgetOptions
 * @property {number} [totalPages] The total number of pages to browse.
 * @property {number} [padding = 3] The padding of pages to show around the current page
 */

/**
 * @typedef {Object} PaginationRenderingOptions
 * @property {function(page): string} createURL Creates URLs for the next state, the number is the page to generate the URL for.
 * @property {number} currentRefinement The number of the page currently displayed.
 * @property {number} nbHits The number of hits computed for the last query (can be approximated).
 * @property {number} nbPages The number of pages for the result set.
 * @property {number[]} pages The actual pages relevant to the current situation and padding
 * @property {boolean} isFirstPage true if the current page is also the first page
 * @property {boolean} isLastPage true if the current page is also the last page
 * @property {function(page)} refine Sets the current page and trigger a search.
 * @property {Object} widgetParams All original `CustomPaginationWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **Pagination** connector provides the logic to build a widget that will let the user
 * choose the current page of the results.
 *
 * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
 * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
 *
 * @type {Connector}
 * @param {function(PaginationRenderingOptions, boolean)} renderFn Rendering function for the custom **Pagination** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomPaginationWidgetOptions)} Re-usable widget factory for a custom **Pagination** widget.
 * @example
 * // custom `renderFn` to render the custom Pagination widget
 * function renderFn(PaginationRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     PaginationRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
 *   }
 *
 *   // remove event listeners before replacing markup
 *   PaginationRenderingOptions.widgetParams.containerNode
 *     .find('a[data-page]')
 *     .each(function() { $(this).off('click'); });
 *
 *   var pages = PaginationRenderingOptions.pages
 *     .map(function(page) {
 *       return '<li style="display: inline-block; margin-right: 10px;">' +
 *         '<a href="' + PaginationRenderingOptions.createURL(page) + '" data-page="' + page + '">' +
 *         (parseInt(page) + 1) + '</a></li>';
 *     });
 *
 *   PaginationRenderingOptions.widgetParams.containerNode
 *     .find('ul')
 *     .html(pages);
 *
 *   PaginationRenderingOptions.widgetParams.containerNode
 *     .find('a[data-page]')
 *     .each(function() {
 *       $(this).on('click', function(event) {
 *         event.preventDefault();
 *         PaginationRenderingOptions.refine($(this).data('page'));
 *       });
 *     });
 * }
 *
 * // connect `renderFn` to Pagination logic
 * var customPagination = instantsearch.connectors.connectPagination(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customPagination({
 *     containerNode: $('#custom-pagination-container'),
 *     totalPages: 20,
 *     padding: 4,
 *   })
 * );
 */

export default function connectPagination(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var totalPages = widgetParams.totalPages,
        _widgetParams$padding = widgetParams.padding,
        padding = _widgetParams$padding === void 0 ? 3 : _widgetParams$padding;
    var pager = new Paginator({
      currentPage: 0,
      total: 0,
      padding: padding
    });
    return {
      init: function init(_ref) {
        var helper = _ref.helper,
            createURL = _ref.createURL,
            instantSearchInstance = _ref.instantSearchInstance;

        this.refine = function (page) {
          helper.setPage(page);
          helper.search();
        };

        this.createURL = function (state) {
          return function (page) {
            return createURL(state.setPage(page));
          };
        };

        renderFn({
          createURL: this.createURL(helper.state),
          currentRefinement: helper.getPage() || 0,
          nbHits: 0,
          nbPages: 0,
          pages: [],
          isFirstPage: true,
          isLastPage: true,
          refine: this.refine,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, true);
      },
      getMaxPage: function getMaxPage(_ref2) {
        var nbPages = _ref2.nbPages;
        return totalPages !== undefined ? Math.min(totalPages, nbPages) : nbPages;
      },
      render: function render(_ref3) {
        var results = _ref3.results,
            state = _ref3.state,
            instantSearchInstance = _ref3.instantSearchInstance;
        var nbPages = this.getMaxPage(results);
        pager.currentPage = state.page;
        pager.total = nbPages;
        renderFn({
          createURL: this.createURL(state),
          currentRefinement: state.page,
          refine: this.refine,
          nbHits: results.nbHits,
          nbPages: nbPages,
          pages: pager.pages(),
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getWidgetState: function getWidgetState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var page = searchParameters.page;
        if (page === 0 || page + 1 === uiState.page) return uiState;
        return _objectSpread({}, uiState, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var uiPage = uiState.page;
        if (uiPage) return searchParameters.setQueryParameter('page', uiState.page - 1);
        return searchParameters.setQueryParameter('page', 0);
      }
    };
  };
}