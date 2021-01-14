"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectSearchBox;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
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
 * search.addWidgets([
 *   customSearchBox({
 *     containerNode: $('#custom-searchbox'),
 *   })
 * ]);
 */

function connectSearchBox(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var queryHook = widgetParams.queryHook;

    function clear(helper) {
      return function () {
        helper.setQuery('').search();
      };
    }

    var _clear = function _clear() {};

    function _cachedClear() {
      _clear();
    }

    return {
      $$type: 'ais.searchBox',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread({}, this.getWidgetRenderState(initOptions), {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread({}, this.getWidgetRenderState(renderOptions), {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return state.setQueryParameter('query', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          searchBox: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var helper = _ref2.helper,
            searchMetadata = _ref2.searchMetadata;

        if (!this._refine) {
          var setQueryAndSearch = function setQueryAndSearch(query) {
            if (query !== helper.state.query) {
              helper.setQuery(query).search();
            }
          };

          this._refine = function (query) {
            if (queryHook) {
              queryHook(query, setQueryAndSearch);
              return;
            }

            setQueryAndSearch(query);
          };
        }

        _clear = clear(helper);
        return {
          query: helper.state.query || '',
          refine: this._refine,
          clear: _cachedClear,
          widgetParams: widgetParams,
          isSearchStalled: searchMetadata.isSearchStalled
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref3) {
        var searchParameters = _ref3.searchParameters;
        var query = searchParameters.query || '';

        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref4) {
        var uiState = _ref4.uiState;
        return searchParameters.setQueryParameter('query', uiState.query || '');
      }
    };
  };
}