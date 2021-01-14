"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectRefinementList;

var _utils = require("../../lib/utils");

var _escapeHighlight = require("../../lib/escape-highlight");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
 * search.addWidgets([
 *   customRefinementList({
 *     containerNode: $('#custom-refinement-list-container'),
 *     attribute: 'categories',
 *     limit: 10,
 *   })
 * ]);
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

    var lastResultsFromMainSearch;
    var lastItemsFromMainSearch = [];
    var hasExhaustiveItems = true;
    var searchForFacetValues;
    var triggerRefine;
    var sendEvent;
    var toggleShowMore;
    /* eslint-disable max-params */

    var createSearchForFacetValues = function createSearchForFacetValues(helper) {
      var _this = this;

      return function (renderOptions) {
        return function (query) {
          var instantSearchInstance = renderOptions.instantSearchInstance;

          if (query === '' && lastItemsFromMainSearch) {
            // render with previous data from the helper.
            renderFn(_objectSpread({}, _this.getWidgetRenderState(_objectSpread({}, renderOptions, {
              results: lastResultsFromMainSearch
            })), {
              instantSearchInstance: instantSearchInstance
            }));
          } else {
            var tags = {
              highlightPreTag: escapeFacetValues ? _escapeHighlight.TAG_PLACEHOLDER.highlightPreTag : _escapeHighlight.TAG_REPLACEMENT.highlightPreTag,
              highlightPostTag: escapeFacetValues ? _escapeHighlight.TAG_PLACEHOLDER.highlightPostTag : _escapeHighlight.TAG_REPLACEMENT.highlightPostTag
            };
            helper.searchForFacetValues(attribute, query, // We cap the `maxFacetHits` value to 100 because the Algolia API
            // doesn't support a greater number.
            // See https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits/
            Math.min(_getLimit(_this.isShowingMore), 100), tags).then(function (results) {
              var facetValues = escapeFacetValues ? (0, _escapeHighlight.escapeFacets)(results.facetHits) : results.facetHits;
              var normalizedFacetValues = transformItems(facetValues.map(function (_ref2) {
                var value = _ref2.value,
                    item = _objectWithoutProperties(_ref2, ["value"]);

                return _objectSpread({}, item, {
                  value: value,
                  label: value
                });
              }));
              var canToggleShowMore = _this.isShowingMore && lastItemsFromMainSearch.length > limit;
              renderFn(_objectSpread({}, _this.getWidgetRenderState(_objectSpread({}, renderOptions, {
                results: lastResultsFromMainSearch
              })), {
                items: normalizedFacetValues,
                canToggleShowMore: canToggleShowMore,
                canRefine: true,
                instantSearchInstance: instantSearchInstance,
                isFromSearch: true
              }));
            });
          }
        };
      };
    };
    /* eslint-enable max-params */


    return {
      $$type: 'ais.refinementList',
      isShowingMore: false,
      // Provide the same function to the `renderFn` so that way the user
      // has to only bind it once when `isFirstRendering` for instance
      toggleShowMore: function toggleShowMore() {},
      cachedToggleShowMore: function cachedToggleShowMore() {
        toggleShowMore();
      },
      createToggleShowMore: function createToggleShowMore(renderOptions) {
        var _this2 = this;

        return function () {
          _this2.isShowingMore = !_this2.isShowingMore;

          _this2.render(renderOptions);
        };
      },
      getLimit: function getLimit() {
        return _getLimit(this.isShowingMore);
      },
      init: function init(initOptions) {
        renderFn(_objectSpread({}, this.getWidgetRenderState(initOptions), {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread({}, this.getWidgetRenderState(renderOptions), {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          refinementList: _objectSpread({}, renderState.refinementList, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var results = renderOptions.results,
            state = renderOptions.state,
            createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance,
            _renderOptions$isFrom = renderOptions.isFromSearch,
            isFromSearch = _renderOptions$isFrom === void 0 ? false : _renderOptions$isFrom,
            helper = renderOptions.helper;
        var items = [];
        var facetValues;

        if (!sendEvent || !triggerRefine || !searchForFacetValues) {
          sendEvent = (0, _utils.createSendEventForFacet)({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: attribute,
            widgetType: this.$$type
          });

          triggerRefine = function triggerRefine(facetValue) {
            sendEvent('click', facetValue);
            helper.toggleRefinement(attribute, facetValue).search();
          };

          searchForFacetValues = createSearchForFacetValues.call(this, helper);
        }

        if (results) {
          if (!isFromSearch) {
            facetValues = results.getFacetValues(attribute, {
              sortBy: sortBy
            }) || [];
            items = transformItems(facetValues.slice(0, this.getLimit()).map(formatItems));
          } else {
            facetValues = escapeFacetValues ? (0, _escapeHighlight.escapeFacets)(results.facetHits) : results.facetHits;
            items = transformItems(facetValues.map(function (_ref3) {
              var value = _ref3.value,
                  item = _objectWithoutProperties(_ref3, ["value"]);

              return _objectSpread({}, item, {
                value: value,
                label: value
              });
            }));
          }

          var maxValuesPerFacetConfig = state.maxValuesPerFacet;
          var currentLimit = this.getLimit(); // If the limit is the max number of facet retrieved it is impossible to know
          // if the facets are exhaustive. The only moment we are sure it is exhaustive
          // is when it is strictly under the number requested unless we know that another
          // widget has requested more values (maxValuesPerFacet > getLimit()).
          // Because this is used for making the search of facets unable or not, it is important
          // to be conservative here.

          hasExhaustiveItems = maxValuesPerFacetConfig > currentLimit ? facetValues.length <= currentLimit : facetValues.length < currentLimit;
          lastResultsFromMainSearch = results;
          lastItemsFromMainSearch = items;
          toggleShowMore = this.createToggleShowMore(renderOptions);
        } // Compute a specific createURL method able to link to any facet value state change


        var _createURL = function _createURL(facetValue) {
          return createURL(state.toggleRefinement(attribute, facetValue));
        }; // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
        // function


        var searchFacetValues = searchForFacetValues && searchForFacetValues(renderOptions);
        var canShowLess = this.isShowingMore && lastItemsFromMainSearch.length > limit;
        var canShowMore = showMore && !isFromSearch && !hasExhaustiveItems;
        var canToggleShowMore = canShowLess || canShowMore;
        return {
          createURL: _createURL,
          items: items,
          refine: triggerRefine,
          searchForItems: searchFacetValues,
          isFromSearch: isFromSearch,
          canRefine: isFromSearch || items.length > 0,
          widgetParams: widgetParams,
          isShowingMore: this.isShowingMore,
          canToggleShowMore: canToggleShowMore,
          toggleShowMore: this.cachedToggleShowMore,
          sendEvent: sendEvent,
          hasExhaustiveItems: hasExhaustiveItems
        };
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        var withoutMaxValuesPerFacet = state.setQueryParameter('maxValuesPerFacet', undefined);

        if (operator === 'and') {
          return withoutMaxValuesPerFacet.removeFacet(attribute);
        }

        return withoutMaxValuesPerFacet.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = operator === 'or' ? searchParameters.getDisjunctiveRefinements(attribute) : searchParameters.getConjunctiveRefinements(attribute);

        if (!values.length) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          refinementList: _objectSpread({}, uiState.refinementList, _defineProperty({}, attribute, values))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var isDisjunctive = operator === 'or';
        var values = uiState.refinementList && uiState.refinementList[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);
        var withFacetConfiguration = isDisjunctive ? withoutRefinements.addDisjunctiveFacet(attribute) : withoutRefinements.addFacet(attribute);
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

        if (!values) {
          var key = isDisjunctive ? 'disjunctiveFacetsRefinements' : 'facetsRefinements';
          return withMaxValuesPerFacet.setQueryParameters(_defineProperty({}, key, _objectSpread({}, withMaxValuesPerFacet[key], _defineProperty({}, attribute, []))));
        }

        return values.reduce(function (parameters, value) {
          return isDisjunctive ? parameters.addDisjunctiveFacetRefinement(attribute, value) : parameters.addFacetRefinement(attribute, value);
        }, withMaxValuesPerFacet);
      }
    };
  };
}