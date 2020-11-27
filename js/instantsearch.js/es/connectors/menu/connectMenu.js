function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'menu',
  connector: true
});
/**
 * @typedef {Object} MenuItem
 * @property {string} value The value of the menu item.
 * @property {string} label Human-readable value of the menu item.
 * @property {number} count Number of results matched after refinement is applied.
 * @property {boolean} isRefined Indicates if the refinement is applied.
 */

/**
 * @typedef {Object} CustomMenuWidgetOptions
 * @property {string} attribute Name of the attribute for faceting (eg. "free_shipping").
 * @property {number} [limit = 10] How many facets values to retrieve.
 * @property {boolean} [showMore = false] Whether to display a button that expands the number of items.
 * @property {number} [showMoreLimit = 20] How many facets values to retrieve when `toggleShowMore` is called, this value is meant to be greater than `limit` option.
 * @property {string[]|function} [sortBy = ['isRefined', 'name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} MenuRenderingOptions
 * @property {MenuItem[]} items The elements that can be refined for the current search results.
 * @property {function(item.value): string} createURL Creates the URL for a single item name in the list.
 * @property {function(item.value)} refine Filter the search to item value.
 * @property {boolean} canRefine True if refinement can be applied.
 * @property {Object} widgetParams All original `CustomMenuWidgetOptions` forwarded to the `renderFn`.
 * @property {boolean} isShowingMore True if the menu is displaying all the menu items.
 * @property {function} toggleShowMore Toggles the number of values displayed between `limit` and `showMore.limit`.
 * @property {boolean} canToggleShowMore `true` if the toggleShowMore button can be activated (enough items to display more or
 * already displaying more than `limit` items)
 */

/**
 * **Menu** connector provides the logic to build a widget that will give the user the ability to choose a single value for a specific facet. The typical usage of menu is for navigation in categories.
 *
 * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
 * function to select an item. While selecting a new element, the `refine` will also unselect the
 * one that is currently selected.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
 * @type {Connector}
 * @param {function(MenuRenderingOptions, boolean)} renderFn Rendering function for the custom **Menu** widget. widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomMenuWidgetOptions)} Re-usable widget factory for a custom **Menu** widget.
 * @example
 * // custom `renderFn` to render the custom Menu widget
 * function renderFn(MenuRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     MenuRenderingOptions.widgetParams.containerNode
 *       .html('<select></select');
 *
 *     MenuRenderingOptions.widgetParams.containerNode
 *       .find('select')
 *       .on('change', function(event) {
 *         MenuRenderingOptions.refine(event.target.value);
 *       });
 *   }
 *
 *   var options = MenuRenderingOptions.items.map(function(item) {
 *     return item.isRefined
 *       ? '<option value="' + item.value + '" selected>' + item.label + '</option>'
 *       : '<option value="' + item.value + '">' + item.label + '</option>';
 *   });
 *
 *   MenuRenderingOptions.widgetParams.containerNode
 *     .find('select')
 *     .html(options);
 * }
 *
 * // connect `renderFn` to Menu logic
 * var customMenu = instantsearch.connectors.connectMenu(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customMenu({
 *     containerNode: $('#custom-menu-container'),
 *     attribute: 'categories',
 *     limit: 10,
 *   })
 * );
 */

export default function connectMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        _widgetParams$limit = widgetParams.limit,
        limit = _widgetParams$limit === void 0 ? 10 : _widgetParams$limit,
        _widgetParams$showMor = widgetParams.showMore,
        showMore = _widgetParams$showMor === void 0 ? false : _widgetParams$showMor,
        _widgetParams$showMor2 = widgetParams.showMoreLimit,
        showMoreLimit = _widgetParams$showMor2 === void 0 ? 20 : _widgetParams$showMor2,
        _widgetParams$sortBy = widgetParams.sortBy,
        sortBy = _widgetParams$sortBy === void 0 ? ['isRefined', 'name:asc'] : _widgetParams$sortBy,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage('The `showMoreLimit` option must be greater than `limit`.'));
    }

    return {
      isShowingMore: false,
      // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance
      toggleShowMore: function toggleShowMore() {},
      cachedToggleShowMore: function cachedToggleShowMore() {
        this.toggleShowMore();
      },
      createToggleShowMore: function createToggleShowMore(_ref) {
        var _this = this;

        var results = _ref.results,
            instantSearchInstance = _ref.instantSearchInstance;
        return function () {
          _this.isShowingMore = !_this.isShowingMore;

          _this.render({
            results: results,
            instantSearchInstance: instantSearchInstance
          });
        };
      },
      getLimit: function getLimit() {
        return this.isShowingMore ? showMoreLimit : limit;
      },
      refine: function refine(helper) {
        return function (facetValue) {
          var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute),
              _helper$getHierarchic2 = _slicedToArray(_helper$getHierarchic, 1),
              refinedItem = _helper$getHierarchic2[0];

          helper.toggleRefinement(attribute, facetValue ? facetValue : refinedItem).search();
        };
      },
      getConfiguration: function getConfiguration(configuration) {
        var widgetConfiguration = {
          hierarchicalFacets: [{
            name: attribute,
            attributes: [attribute]
          }]
        };
        var currentMaxValuesPerFacet = configuration.maxValuesPerFacet || 0;
        widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        return widgetConfiguration;
      },
      init: function init(_ref2) {
        var helper = _ref2.helper,
            createURL = _ref2.createURL,
            instantSearchInstance = _ref2.instantSearchInstance;
        this.cachedToggleShowMore = this.cachedToggleShowMore.bind(this);

        this._createURL = function (facetValue) {
          return createURL(helper.state.toggleRefinement(attribute, facetValue));
        };

        this._refine = this.refine(helper);
        renderFn({
          items: [],
          createURL: this._createURL,
          refine: this._refine,
          instantSearchInstance: instantSearchInstance,
          canRefine: false,
          widgetParams: widgetParams,
          isShowingMore: this.isShowingMore,
          toggleShowMore: this.cachedToggleShowMore,
          canToggleShowMore: false
        }, true);
      },
      render: function render(_ref3) {
        var results = _ref3.results,
            instantSearchInstance = _ref3.instantSearchInstance;
        var facetItems = results.getFacetValues(attribute, {
          sortBy: sortBy
        }).data || [];
        var items = transformItems(facetItems.slice(0, this.getLimit()).map(function (_ref4) {
          var label = _ref4.name,
              value = _ref4.path,
              item = _objectWithoutProperties(_ref4, ["name", "path"]);

          return _objectSpread({}, item, {
            label: label,
            value: value
          });
        }));
        this.toggleShowMore = this.createToggleShowMore({
          results: results,
          instantSearchInstance: instantSearchInstance
        });
        renderFn({
          items: items,
          createURL: this._createURL,
          refine: this._refine,
          instantSearchInstance: instantSearchInstance,
          canRefine: items.length > 0,
          widgetParams: widgetParams,
          isShowingMore: this.isShowingMore,
          toggleShowMore: this.cachedToggleShowMore,
          canToggleShowMore: showMore && (this.isShowingMore || facetItems.length > this.getLimit())
        }, false);
      },
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();
        var nextState = state;

        if (state.isHierarchicalFacetRefined(attribute)) {
          nextState = state.removeHierarchicalFacetRefinement(attribute);
        }

        nextState = nextState.removeHierarchicalFacet(attribute);

        if (nextState.maxValuesPerFacet === limit || showMoreLimit && nextState.maxValuesPerFacet === showMoreLimit) {
          nextState.setQueryParameters('maxValuesPerFacet', undefined);
        }

        return nextState;
      },
      getWidgetState: function getWidgetState(uiState, _ref6) {
        var searchParameters = _ref6.searchParameters;

        var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute),
            _searchParameters$get2 = _slicedToArray(_searchParameters$get, 1),
            refinedItem = _searchParameters$get2[0];

        if (!refinedItem || uiState.menu && uiState.menu[attribute] === refinedItem) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          menu: _objectSpread({}, uiState.menu, _defineProperty({}, attribute, refinedItem))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
        var uiState = _ref7.uiState;

        if (uiState.menu && uiState.menu[attribute]) {
          var uiStateRefinedItem = uiState.menu[attribute];
          var isAlreadyRefined = searchParameters.isHierarchicalFacetRefined(attribute, uiStateRefinedItem);
          if (isAlreadyRefined) return searchParameters;
          return searchParameters.toggleRefinement(attribute, uiStateRefinedItem);
        }

        if (searchParameters.isHierarchicalFacetRefined(attribute)) {
          var _searchParameters$get3 = searchParameters.getHierarchicalFacetBreadcrumb(attribute),
              _searchParameters$get4 = _slicedToArray(_searchParameters$get3, 1),
              refinedItem = _searchParameters$get4[0];

          return searchParameters.toggleRefinement(attribute, refinedItem);
        }

        return searchParameters;
      }
    };
  };
}