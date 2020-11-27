"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectRefinementList;

var _utils = require("../../lib/utils");

var _escapeHighlight = require("../../lib/escape-highlight");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'refinement-list',
  connector: true
});
/**
 * @typedef {Object} RefinementListItem
 * @property {string} value The value of the refinement list item.
 * @property {string} label Human-readable value of the refinement list item.
 * @property {number} count Number of matched results after refinement is applied.
 * @property {boolean} isRefined Indicates if the list item is refined.
 */

/**
 * @typedef {Object} CustomRefinementListWidgetOptions
 * @property {string} attribute The name of the attribute in the records.
 * @property {"and"|"or"} [operator = 'or'] How the filters are combined together.
 * @property {number} [limit = 10] The max number of items to display when
 * `showMoreLimit` is not set or if the widget is showing less value.
 * @property {boolean} [showMore = false] Whether to display a button that expands the number of items.
 * @property {number} [showMoreLimit = 20] The max number of items to display if the widget
 * is showing more items.
 * @property {string[]|function} [sortBy = ['isRefined', 'count:desc', 'name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
 * @property {boolean} [escapeFacetValues = true] Escapes the content of the facet values.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} RefinementListRenderingOptions
 * @property {RefinementListItem[]} items The list of filtering values returned from Algolia API.
 * @property {function(item.value): string} createURL Creates the next state url for a selected refinement.
 * @property {function(item.value)} refine Action to apply selected refinements.
 * @property {function} searchForItems Searches for values inside the list.
 * @property {boolean} isFromSearch `true` if the values are from an index search.
 * @property {boolean} canRefine `true` if a refinement can be applied.
 * @property {boolean} canToggleShowMore `true` if the toggleShowMore button can be activated (enough items to display more or
 * already displaying more than `limit` items)
 * @property {Object} widgetParams All original `CustomRefinementListWidgetOptions` forwarded to the `renderFn`.
 * @property {boolean} isShowingMore True if the menu is displaying all the menu items.
 * @property {function} toggleShowMore Toggles the number of values displayed between `limit` and `showMoreLimit`.
 */

/**
 * **RefinementList** connector provides the logic to build a custom widget that will let the
 * user filter the results based on the values of a specific facet.
 *
 * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
 * function to select an item.
 * @type {Connector}
 * @param {function(RefinementListRenderingOptions, boolean)} renderFn Rendering function for the custom **RefinementList** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomRefinementListWidgetOptions)} Re-usable widget factory for a custom **RefinementList** widget.
 * @example
 * // custom `renderFn` to render the custom RefinementList widget
 * function renderFn(RefinementListRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     RefinementListRenderingOptions.widgetParams.containerNode
 *       .html('<ul></ul>')
 *   }
 *
 *     RefinementListRenderingOptions.widgetParams.containerNode
 *       .find('li[data-refine-value]')
 *       .each(function() { $(this).off('click'); });
 *
 *   if (RefinementListRenderingOptions.canRefine) {
 *     var list = RefinementListRenderingOptions.items.map(function(item) {
 *       return `
 *         <li data-refine-value="${item.value}">
 *           <input type="checkbox" value="${item.value}" ${item.isRefined ? 'checked' : ''} />
 *           <a href="${RefinementListRenderingOptions.createURL(item.value)}">
 *             ${item.label} (${item.count})
 *           </a>
 *         </li>
 *       `;
 *     });
 *
 *     RefinementListRenderingOptions.widgetParams.containerNode.find('ul').html(list);
 *     RefinementListRenderingOptions.widgetParams.containerNode
 *       .find('li[data-refine-value]')
 *       .each(function() {
 *         $(this).on('click', function(event) {
 *           event.stopPropagation();
 *           event.preventDefault();
 *
 *           RefinementListRenderingOptions.refine($(this).data('refine-value'));
 *         });
 *       });
 *   } else {
 *     RefinementListRenderingOptions.widgetParams.containerNode.find('ul').html('');
 *   }
 * }
 *
 * // connect `renderFn` to RefinementList logic
 * var customRefinementList = instantsearch.connectors.connectRefinementList(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customRefinementList({
 *     containerNode: $('#custom-refinement-list-container'),
 *     attribute: 'categories',
 *     limit: 10,
 *   })
 * );
 */

function connectRefinementList(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        _widgetParams$operato = widgetParams.operator,
        operator = _widgetParams$operato === void 0 ? 'or' : _widgetParams$operato,
        _widgetParams$limit = widgetParams.limit,
        limit = _widgetParams$limit === void 0 ? 10 : _widgetParams$limit,
        _widgetParams$showMor = widgetParams.showMore,
        showMore = _widgetParams$showMor === void 0 ? false : _widgetParams$showMor,
        _widgetParams$showMor2 = widgetParams.showMoreLimit,
        showMoreLimit = _widgetParams$showMor2 === void 0 ? 20 : _widgetParams$showMor2,
        _widgetParams$sortBy = widgetParams.sortBy,
        sortBy = _widgetParams$sortBy === void 0 ? ['isRefined', 'count:desc', 'name:asc'] : _widgetParams$sortBy,
        _widgetParams$escapeF = widgetParams.escapeFacetValues,
        escapeFacetValues = _widgetParams$escapeF === void 0 ? true : _widgetParams$escapeF,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    if (!/^(and|or)$/.test(operator)) {
      throw new Error(withUsage("The `operator` must one of: `\"and\"`, `\"or\"` (got \"".concat(operator, "\").")));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage('`showMoreLimit` should be greater than `limit`.'));
    }

    var formatItems = function formatItems(_ref) {
      var label = _ref.name,
          item = _objectWithoutProperties(_ref, ["name"]);

      return _objectSpread({}, item, {
        label: label,
        value: label,
        highlighted: label
      });
    };

    var _getLimit = function getLimit(isShowingMore) {
      return isShowingMore ? showMoreLimit : limit;
    };

    var lastResultsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var searchForFacetValues;
    var triggerRefine;

    var _render = function render(_ref2) {
      var items = _ref2.items,
          state = _ref2.state,
          createURL = _ref2.createURL,
          helperSpecializedSearchFacetValues = _ref2.helperSpecializedSearchFacetValues,
          refine = _ref2.refine,
          isFromSearch = _ref2.isFromSearch,
          isFirstSearch = _ref2.isFirstSearch,
          isShowingMore = _ref2.isShowingMore,
          toggleShowMore = _ref2.toggleShowMore,
          instantSearchInstance = _ref2.instantSearchInstance;

      // Compute a specific createURL method able to link to any facet value state change
      var _createURL = function _createURL(facetValue) {
        return createURL(state.toggleRefinement(attribute, facetValue));
      }; // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
      // function


      var searchFacetValues = helperSpecializedSearchFacetValues && helperSpecializedSearchFacetValues(state, createURL, helperSpecializedSearchFacetValues, refine, instantSearchInstance, isShowingMore);
      var canShowLess = isShowingMore && lastResultsFromMainSearch.length > limit;
      var canShowMore = showMore && !isFromSearch && !hasExhaustiveItems;
      var canToggleShowMore = canShowLess || canShowMore;
      renderFn({
        createURL: _createURL,
        items: items,
        refine: refine,
        searchForItems: searchFacetValues,
        instantSearchInstance: instantSearchInstance,
        isFromSearch: isFromSearch,
        canRefine: isFromSearch || items.length > 0,
        widgetParams: widgetParams,
        isShowingMore: isShowingMore,
        canToggleShowMore: canToggleShowMore,
        toggleShowMore: toggleShowMore,
        hasExhaustiveItems: hasExhaustiveItems
      }, isFirstSearch);
    };
    /* eslint-disable max-params */


    var createSearchForFacetValues = function createSearchForFacetValues(helper, toggleShowMore) {
      return function (state, createURL, helperSpecializedSearchFacetValues, toggleRefinement, instantSearchInstance, isShowingMore) {
        return function (query) {
          if (query === '' && lastResultsFromMainSearch) {
            // render with previous data from the helper.
            _render({
              items: lastResultsFromMainSearch,
              state: state,
              createURL: createURL,
              helperSpecializedSearchFacetValues: helperSpecializedSearchFacetValues,
              refine: toggleRefinement,
              isFromSearch: false,
              isFirstSearch: false,
              instantSearchInstance: instantSearchInstance,
              toggleShowMore: toggleShowMore,
              // and yet it will be
              isShowingMore: isShowingMore // so we need to restore in the state of show more as well

            });
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? _escapeHighlight.TAG_PLACEHOLDER.highlightPreTag : _escapeHighlight.TAG_REPLACEMENT.highlightPreTag,
              highlightPostTag: escapeFacetValues ? _escapeHighlight.TAG_PLACEHOLDER.highlightPostTag : _escapeHighlight.TAG_REPLACEMENT.highlightPostTag
            };
            helper.searchForFacetValues(attribute, query, _getLimit(isShowingMore), tags).then(function (results) {
              var facetValues = escapeFacetValues ? (0, _escapeHighlight.escapeFacets)(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function (_ref3) {
                var value = _ref3.value,
                    item = _objectWithoutProperties(_ref3, ["value"]);

                return _objectSpread({}, item, {
                  value: value,
                  label: value
                });
              }));

              _render({
                items: normalizedFacetValues,
                state: state,
                createURL: createURL,
                helperSpecializedSearchFacetValues: helperSpecializedSearchFacetValues,
                refine: toggleRefinement,
                isFromSearch: true,
                isFirstSearch: false,
                instantSearchInstance: instantSearchInstance,
                isShowingMore: isShowingMore
              });
            });
          }
        };
      };
    };
    /* eslint-enable max-params */


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
        return _getLimit(this.isShowingMore);
      },
      getConfiguration: function getConfiguration() {
        var configuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var widgetConfiguration = _defineProperty({}, operator === 'and' ? 'facets' : 'disjunctiveFacets', [attribute]);

        var currentMaxValuesPerFacet = configuration.maxValuesPerFacet || 0;
        widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        return widgetConfiguration;
      },
      init: function init(_ref4) {
        var helper = _ref4.helper,
            createURL = _ref4.createURL,
            instantSearchInstance = _ref4.instantSearchInstance;
        this.cachedToggleShowMore = this.cachedToggleShowMore.bind(this);

        triggerRefine = function triggerRefine(facetValue) {
          return helper.toggleRefinement(attribute, facetValue).search();
        };

        searchForFacetValues = createSearchForFacetValues(helper, this.cachedToggleShowMore);

        _render({
          items: [],
          state: helper.state,
          createURL: createURL,
          helperSpecializedSearchFacetValues: searchForFacetValues,
          refine: triggerRefine,
          isFromSearch: false,
          isFirstSearch: true,
          instantSearchInstance: instantSearchInstance,
          isShowingMore: this.isShowingMore,
          toggleShowMore: this.cachedToggleShowMore
        });
      },
      render: function render(renderOptions) {
        var results = renderOptions.results,
            state = renderOptions.state,
            createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance;
        var facetValues = results.getFacetValues(attribute, {
          sortBy: sortBy
        });
        var items = transformItems(facetValues.slice(0, this.getLimit()).map(formatItems));
        var maxValuesPerFacetConfig = state.getQueryParameter('maxValuesPerFacet');
        var currentLimit = this.getLimit(); // If the limit is the max number of facet retrieved it is impossible to know
        // if the facets are exhaustive. The only moment we are sure it is exhaustive
        // is when it is strictly under the number requested unless we know that another
        // widget has requested more values (maxValuesPerFacet > getLimit()).
        // Because this is used for making the search of facets unable or not, it is important
        // to be conservative here.

        hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
        lastResultsFromMainSearch = items;
        this.toggleShowMore = this.createToggleShowMore(renderOptions);

        _render({
          items: items,
          state: state,
          createURL: createURL,
          helperSpecializedSearchFacetValues: searchForFacetValues,
          refine: triggerRefine,
          isFromSearch: false,
          isFirstSearch: false,
          instantSearchInstance: instantSearchInstance,
          isShowingMore: this.isShowingMore,
          toggleShowMore: this.cachedToggleShowMore
        });
      },
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();

        if (operator === 'and') {
          return state.removeFacetRefinement(attribute).removeFacet(attribute);
        } else {
          return state.removeDisjunctiveFacetRefinement(attribute).removeDisjunctiveFacet(attribute);
        }
      },
      getWidgetState: function getWidgetState(uiState, _ref6) {
        var searchParameters = _ref6.searchParameters;
        var values = operator === 'or' ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);

        if (values.length === 0 || uiState.refinementList && (0, _utils.isEqual)(values, uiState.refinementList[attribute])) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          refinementList: _objectSpread({}, uiState.refinementList, _defineProperty({}, attribute, values))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref7) {
        var uiState = _ref7.uiState;
        var values = uiState.refinementList && uiState.refinementList[attribute];
        if (values === undefined) return searchParameters;
        return values.reduce(function (sp, v) {
          return operator === 'or' ? sp.addDisjunctiveFacetRefinement(attribute, v) : sp.addFacetRefinement(attribute, v);
        }, searchParameters.clearRefinements(attribute));
      }
    };
  };
}