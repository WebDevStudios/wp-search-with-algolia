"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectSortBy;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'sort-by',
  connector: true
});
/**
 * @typedef {Object} SortByItem
 * @property {string} value The name of the index to target.
 * @property {string} label The label of the index to display.
 */

/**
 * @typedef {Object} CustomSortByWidgetOptions
 * @property {SortByItem[]} items Array of objects defining the different indices to choose from.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} SortByRenderingOptions
 * @property {string} currentRefinement The currently selected index.
 * @property {SortByItem[]} options All the available indices
 * @property {function(string)} refine Switches indices and triggers a new search.
 * @property {boolean} hasNoResults `true` if the last search contains no result.
 * @property {Object} widgetParams All original `CustomSortByWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * The **SortBy** connector provides the logic to build a custom widget that will display a
 * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
 * a user to change how the hits are being sorted.
 *
 * This connector provides the `refine` function that allows to switch indices.
 * The connector provides to the rendering: `refine()` to switch the current index and
 * `options` that are the values that can be selected. `refine` should be used
 * with `options.value`.
 * @type {Connector}
 * @param {function(SortByRenderingOptions, boolean)} renderFn Rendering function for the custom **SortBy** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomSortByWidgetOptions)} Re-usable widget factory for a custom **SortBy** widget.
 * @example
 * // custom `renderFn` to render the custom SortBy widget
 * function renderFn(SortByRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     SortByRenderingOptions.widgetParams.containerNode.html('<select></select>');
 *     SortByRenderingOptions.widgetParams.containerNode
 *       .find('select')
 *       .on('change', function(event) {
 *         SortByRenderingOptions.refine(event.target.value);
 *       });
 *   }
 *
 *   var optionsHTML = SortByRenderingOptions.options.map(function(option) {
 *     return `
 *       <option
 *         value="${option.value}"
 *         ${SortByRenderingOptions.currentRefinement === option.value ? 'selected' : ''}
 *       >
 *         ${option.label}
 *       </option>
 *     `;
 *   });
 *
 *   SortByRenderingOptions.widgetParams.containerNode
 *     .find('select')
 *     .html(optionsHTML);
 * }
 *
 * // connect `renderFn` to SortBy logic
 * var customSortBy = instantsearch.connectors.connectSortBy(renderFn);
 *
 * // mount widget on the page
 * search.addWidgets([
 *   customSortBy({
 *     containerNode: $('#custom-sort-by-container'),
 *     items: [
 *       { value: 'instant_search', label: 'Most relevant' },
 *       { value: 'instant_search_price_asc', label: 'Lowest price' },
 *       { value: 'instant_search_price_desc', label: 'Highest price' },
 *     ],
 *   })
 * ]);
 */

function connectSortBy(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var items = widgetParams.items,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (x) {
      return x;
    } : _widgetParams$transfo;

    if (!Array.isArray(items)) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }

    return {
      $$type: 'ais.sortBy',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(initOptions);
        var currentIndex = widgetRenderState.currentRefinement;
        var isCurrentIndexInItems = (0, _utils.find)(items, function (item) {
          return item.value === currentIndex;
        });
        process.env.NODE_ENV === 'development' ? (0, _utils.warning)(isCurrentIndexInItems, "The index named \"".concat(currentIndex, "\" is not listed in the `items` of `sortBy`.")) : void 0;
        renderFn(_objectSpread({}, widgetRenderState, {
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
        return state.setIndex(this.initialIndex);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          sortBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
            helper = _ref2.helper,
            parent = _ref2.parent;

        if (!this.initialIndex) {
          this.initialIndex = parent.getIndexName();
        }

        if (!this.setIndex) {
          this.setIndex = function (indexName) {
            helper.setIndex(indexName).search();
          };
        }

        return {
          currentRefinement: helper.state.index,
          options: transformItems(items),
          refine: this.setIndex,
          hasNoResults: results ? results.nbHits === 0 : true,
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref3) {
        var searchParameters = _ref3.searchParameters;
        var currentIndex = searchParameters.index;
        var isInitialIndex = currentIndex === this.initialIndex;

        if (isInitialIndex) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          sortBy: currentIndex
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref4) {
        var uiState = _ref4.uiState;
        return searchParameters.setQueryParameter('index', uiState.sortBy || this.initialIndex || searchParameters.index);
      }
    };
  };
}