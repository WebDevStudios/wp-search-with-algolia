function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'search-box',
  connector: true
});
/**
 * @typedef {Object} CustomSearchBoxWidgetOptions
 * @property {function(string, function(string))} [queryHook = undefined] A function that will be called every time
 * a new value for the query is set. The first parameter is the query and the second is a
 * function to actually trigger the search. The function takes the query as the parameter.
 *
 * This queryHook can be used to debounce the number of searches done from the searchBox.
 */

/**
 * @typedef {Object} SearchBoxRenderingOptions
 * @property {string} query The query from the last search.
 * @property {function(string)} refine Sets a new query and searches.
 * @property {function()} clear Remove the query and perform search.
 * @property {Object} widgetParams All original `CustomSearchBoxWidgetOptions` forwarded to the `renderFn`.
 * @property {boolean} isSearchStalled `true` if the search results takes more than a certain time to come back
 * from Algolia servers. This can be configured on the InstantSearch constructor with the attribute
 * `stalledSearchDelay` which is 200ms, by default.
 */

/**
 * **SearchBox** connector provides the logic to build a widget that will let the user search for a query.
 *
 * The connector provides to the rendering: `refine()` to set the query. The behaviour of this function
 * may be impacted by the `queryHook` widget parameter.
 * @type {Connector}
 * @param {function(SearchBoxRenderingOptions, boolean)} renderFn Rendering function for the custom **SearchBox** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomSearchBoxWidgetOptions)} Re-usable widget factory for a custom **SearchBox** widget.
 * @example
 * // custom `renderFn` to render the custom SearchBox widget
 * function renderFn(SearchBoxRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     SearchBoxRenderingOptions.widgetParams.containerNode.html('<input type="text" />');
 *     SearchBoxRenderingOptions.widgetParams.containerNode
 *       .find('input')
 *       .on('keyup', function() {
 *         SearchBoxRenderingOptions.refine($(this).val());
 *       });
 *     SearchBoxRenderingOptions.widgetParams.containerNode
 *       .find('input')
 *       .val(SearchBoxRenderingOptions.query);
 *   }
 * }
 *
 * // connect `renderFn` to SearchBox logic
 * var customSearchBox = instantsearch.connectors.connectSearchBox(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customSearchBox({
 *     containerNode: $('#custom-searchbox'),
 *   })
 * );
 */

export default function connectSearchBox(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var queryHook = widgetParams.queryHook;

    function clear(helper) {
      return function () {
        helper.setQuery('');
        helper.search();
      };
    }

    return {
      _clear: function _clear() {},
      _cachedClear: function _cachedClear() {
        this._clear();
      },
      init: function init(_ref) {
        var helper = _ref.helper,
            instantSearchInstance = _ref.instantSearchInstance;
        this._cachedClear = this._cachedClear.bind(this);
        this._clear = clear(helper);

        this._refine = function () {
          var previousQuery;

          var setQueryAndSearch = function setQueryAndSearch(q) {
            var doSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (q !== helper.state.query) {
              previousQuery = helper.state.query;
              helper.setQuery(q);
            }

            if (doSearch && previousQuery !== undefined && previousQuery !== q) helper.search();
          };

          return queryHook ? function (q) {
            return queryHook(q, setQueryAndSearch);
          } : setQueryAndSearch;
        }();

        renderFn({
          query: helper.state.query,
          refine: this._refine,
          clear: this._cachedClear,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, true);
      },
      render: function render(_ref2) {
        var helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance,
            searchMetadata = _ref2.searchMetadata;
        this._clear = clear(helper);
        renderFn({
          query: helper.state.query,
          refine: this._refine,
          clear: this._cachedClear,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance,
          isSearchStalled: searchMetadata.isSearchStalled
        }, false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        return state.setQuery('');
      },
      getWidgetState: function getWidgetState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var query = searchParameters.query;

        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQuery(uiState.query || '');
      }
    };
  };
}