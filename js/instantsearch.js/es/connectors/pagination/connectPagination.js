function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
import Paginator from './Paginator';
var withUsage = createDocumentationMessageGenerator({
  name: 'pagination',
  connector: true
});

/**
 * **Pagination** connector provides the logic to build a widget that will let the user
 * choose the current page of the results.
 *
 * When using the pagination with Algolia, you should be aware that the engine won't provide you pages
 * beyond the 1000th hits by default. You can find more information on the [Algolia documentation](https://www.algolia.com/doc/guides/searching/pagination/#pagination-limitations).
 */
var connectPagination = function connectPagination(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        totalPages = _ref.totalPages,
        _ref$padding = _ref.padding,
        padding = _ref$padding === void 0 ? 3 : _ref$padding;

    var pager = new Paginator({
      currentPage: 0,
      total: 0,
      padding: padding
    });
    var connectorState = {};

    function getMaxPage(_ref2) {
      var nbPages = _ref2.nbPages;
      return totalPages !== undefined ? Math.min(totalPages, nbPages) : nbPages;
    }

    return {
      $$type: 'ais.pagination',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQueryParameter('page', undefined);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var page = searchParameters.page || 0;

        if (!page) {
          return uiState;
        }

        return _objectSpread(_objectSpread({}, uiState), {}, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var page = uiState.page ? uiState.page - 1 : 0;
        return searchParameters.setQueryParameter('page', page);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var results = _ref6.results,
            helper = _ref6.helper,
            createURL = _ref6.createURL;

        if (!connectorState.refine) {
          connectorState.refine = function (page) {
            helper.setPage(page);
            helper.search();
          };
        }

        if (!connectorState.createURL) {
          connectorState.createURL = function (state) {
            return function (page) {
              return createURL(state.setPage(page));
            };
          };
        }

        var state = helper.state;
        var page = state.page || 0;
        var nbPages = getMaxPage(results || {
          nbPages: 0
        });
        pager.currentPage = page;
        pager.total = nbPages;
        return {
          createURL: connectorState.createURL(state),
          refine: connectorState.refine,
          canRefine: nbPages > 1,
          currentRefinement: page,
          nbHits: (results === null || results === void 0 ? void 0 : results.nbHits) || 0,
          nbPages: nbPages,
          pages: results ? pager.pages() : [],
          isFirstPage: pager.isFirstPage(),
          isLastPage: pager.isLastPage(),
          widgetParams: widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          pagination: this.getWidgetRenderState(renderOptions)
        });
      }
    };
  };
};

export default connectPagination;