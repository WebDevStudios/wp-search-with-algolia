"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectHierarchicalMenu;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'hierarchical-menu',
  connector: true
});
/**
 * @typedef {Object} HierarchicalMenuItem
 * @property {string} value Value of the menu item.
 * @property {string} label Human-readable value of the menu item.
 * @property {number} count Number of matched results after refinement is applied.
 * @property {isRefined} boolean Indicates if the refinement is applied.
 * @property {Object} [data = undefined] n+1 level of items, same structure HierarchicalMenuItem (default: `undefined`).
 */

/**
 * @typedef {Object} CustomHierarchicalMenuWidgetOptions
 * @property {string[]} attributes Attributes to use to generate the hierarchy of the menu.
 * @property {string} [separator = '>'] Separator used in the attributes to separate level values.
 * @property {string} [rootPath = null] Prefix path to use if the first level is not the root level.
 * @property {boolean} [showParentLevel=false] Show the siblings of the selected parent levels of the current refined value. This
 * does not impact the root level.
 * @property {number} [limit = 10] Max number of values to display.
 * @property {boolean} [showMore = false] Whether to display the "show more" button.
 * @property {number} [showMoreLimit = 20] Max number of values to display when showing more.
 * @property  {string[]|function} [sortBy = ['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} HierarchicalMenuRenderingOptions
 * @property {function(item.value): string} createURL Creates an url for the next state for a clicked item.
 * @property {HierarchicalMenuItem[]} items Values to be rendered.
 * @property {function(item.value)} refine Sets the path of the hierarchical filter and triggers a new search.
 * @property {Object} widgetParams All original `CustomHierarchicalMenuWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **HierarchicalMenu** connector provides the logic to build a custom widget
 * that will give the user the ability to explore facets in a tree-like structure.
 *
 * This is commonly used for multi-level categorization of products on e-commerce
 * websites. From a UX point of view, we suggest not displaying more than two
 * levels deep.
 *
 * There's a complete example available on how to write a custom **HierarchicalMenu**:
 *  [hierarchicalMenu.js](https://github.com/algolia/instantsearch.js/blob/develop/storybook/app/jquery/widgets/hierarchicalMenu.js)
 * @type {Connector}
 * @param {function(HierarchicalMenuRenderingOptions)} renderFn Rendering function for the custom **HierarchicalMenu** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomHierarchicalMenuWidgetOptions)} Re-usable widget factory for a custom **HierarchicalMenu** widget.
 */

function connectHierarchicalMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attributes = widgetParams.attributes,
        _widgetParams$separat = widgetParams.separator,
        separator = _widgetParams$separat === void 0 ? ' > ' : _widgetParams$separat,
        _widgetParams$rootPat = widgetParams.rootPath,
        rootPath = _widgetParams$rootPat === void 0 ? null : _widgetParams$rootPat,
        _widgetParams$showPar = widgetParams.showParentLevel,
        showParentLevel = _widgetParams$showPar === void 0 ? true : _widgetParams$showPar,
        _widgetParams$limit = widgetParams.limit,
        limit = _widgetParams$limit === void 0 ? 10 : _widgetParams$limit,
        _widgetParams$showMor = widgetParams.showMore,
        showMore = _widgetParams$showMor === void 0 ? false : _widgetParams$showMor,
        _widgetParams$showMor2 = widgetParams.showMoreLimit,
        showMoreLimit = _widgetParams$showMor2 === void 0 ? 20 : _widgetParams$showMor2,
        _widgetParams$sortBy = widgetParams.sortBy,
        sortBy = _widgetParams$sortBy === void 0 ? ['name:asc'] : _widgetParams$sortBy,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage('The `attributes` option expects an array of strings.'));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage('The `showMoreLimit` option must be greater than `limit`.'));
    } // we need to provide a hierarchicalFacet name for the search state
    // so that we can always map $hierarchicalFacetName => real attributes
    // we use the first attribute name


    var _attributes = _slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];

    return {
      isShowingMore: false,
      // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance
      toggleShowMore: function toggleShowMore() {},
      cachedToggleShowMore: function cachedToggleShowMore() {
        this.toggleShowMore();
      },
      createToggleShowMore: function createToggleShowMore(renderOptions) {
        var _this = this;

        return function () {
          _this.isShowingMore = !_this.isShowingMore;

          _this.render(renderOptions);
        };
      },
      getLimit: function getLimit() {
        return this.isShowingMore ? showMoreLimit : limit;
      },
      getConfiguration: function getConfiguration(currentConfiguration) {
        if (currentConfiguration.hierarchicalFacets) {
          var isFacetSet = (0, _utils.find)(currentConfiguration.hierarchicalFacets, function (_ref) {
            var name = _ref.name;
            return name === hierarchicalFacetName;
          });
          var isAttributesEqual = isFacetSet && (0, _utils.isEqual)(isFacetSet.attributes, attributes);
          var isSeparatorEqual = isFacetSet && isFacetSet.separator === separator;
          var isRootPathEqual = isFacetSet && isFacetSet.rootPath === rootPath;
          var isHierarchicalOptionsEqual = isAttributesEqual && isSeparatorEqual && isRootPathEqual;

          if (isFacetSet && !isHierarchicalOptionsEqual) {
            (0, _utils.warning)(false, 'Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.');
            return {};
          }
        }

        var widgetConfiguration = {
          hierarchicalFacets: [{
            name: hierarchicalFacetName,
            attributes: attributes,
            separator: separator,
            rootPath: rootPath,
            showParentLevel: showParentLevel
          }]
        };
        var currentMaxValuesPerFacet = currentConfiguration.maxValuesPerFacet || 0;
        widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        return widgetConfiguration;
      },
      init: function init(_ref2) {
        var helper = _ref2.helper,
            createURL = _ref2.createURL,
            instantSearchInstance = _ref2.instantSearchInstance;
        this.cachedToggleShowMore = this.cachedToggleShowMore.bind(this);

        this._refine = function (facetValue) {
          helper.toggleRefinement(hierarchicalFacetName, facetValue).search();
        }; // Bind createURL to this specific attribute


        function _createURL(facetValue) {
          return createURL(helper.state.toggleRefinement(hierarchicalFacetName, facetValue));
        }

        renderFn({
          items: [],
          createURL: _createURL,
          refine: this._refine,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams,
          isShowingMore: false,
          toggleShowMore: this.cachedToggleShowMore,
          canToggleShowMore: false
        }, true);
      },
      _prepareFacetValues: function _prepareFacetValues(facetValues, state) {
        var _this2 = this;

        return facetValues.slice(0, this.getLimit()).map(function (_ref3) {
          var label = _ref3.name,
              value = _ref3.path,
              subValue = _objectWithoutProperties(_ref3, ["name", "path"]);

          if (Array.isArray(subValue.data)) {
            subValue.data = _this2._prepareFacetValues(subValue.data, state);
          }

          return _objectSpread({}, subValue, {
            label: label,
            value: value
          });
        });
      },
      render: function render(renderOptions) {
        var results = renderOptions.results,
            state = renderOptions.state,
            createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance;
        var facetValues = results.getFacetValues(hierarchicalFacetName, {
          sortBy: sortBy
        }).data || [];
        var items = transformItems(this._prepareFacetValues(facetValues), state); // Bind createURL to this specific attribute

        function _createURL(facetValue) {
          return createURL(state.toggleRefinement(hierarchicalFacetName, facetValue));
        }

        var maxValuesPerFacetConfig = state.getQueryParameter('maxValuesPerFacet');
        var currentLimit = this.getLimit(); // If the limit is the max number of facet retrieved it is impossible to know
        // if the facets are exhaustive. The only moment we are sure it is exhaustive
        // is when it is strictly under the number requested unless we know that another
        // widget has requested more values (maxValuesPerFacet > getLimit()).
        // Because this is used for making the search of facets unable or not, it is important
        // to be conservative here.

        var hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
        this.toggleShowMore = this.createToggleShowMore(renderOptions);
        renderFn({
          items: items,
          refine: this._refine,
          createURL: _createURL,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams,
          isShowingMore: this.isShowingMore,
          toggleShowMore: this.cachedToggleShowMore,
          canToggleShowMore: showMore && (this.isShowingMore || !hasExhaustiveItems)
        }, false);
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        // unmount widget from DOM
        unmountFn(); // compute nextState for the search

        var nextState = state;

        if (state.isHierarchicalFacetRefined(hierarchicalFacetName)) {
          nextState = state.removeHierarchicalFacetRefinement(hierarchicalFacetName);
        }

        nextState = nextState.removeHierarchicalFacet(hierarchicalFacetName);

        if (nextState.maxValuesPerFacet === limit) {
          nextState.setQueryParameters('maxValuesPerFacet', undefined);
        }

        return nextState;
      },
      getWidgetState: function getWidgetState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var path = searchParameters.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);
        if (!path || path.length === 0) return uiState;

        if (uiState.hierarchicalMenu && (0, _utils.isEqual)(path, uiState.hierarchicalMenu[hierarchicalFacetName])) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          hierarchicalMenu: _objectSpread({}, uiState.hierarchicalMenu, _defineProperty({}, hierarchicalFacetName, path))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;

        if (uiState.hierarchicalMenu && uiState.hierarchicalMenu[hierarchicalFacetName]) {
          return searchParameters.clearRefinements(hierarchicalFacetName).toggleRefinement(hierarchicalFacetName, uiState.hierarchicalMenu[hierarchicalFacetName].join(separator));
        } else {
          return searchParameters;
        }
      }
    };
  };
}