function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'rating-menu',
  connector: true
});
/**
 * @typedef {Object} StarRatingItems
 * @property {string} name Name corresponding to the number of stars.
 * @property {string} value Number of stars as string.
 * @property {number} count Count of matched results corresponding to the number of stars.
 * @property {boolean[]} stars Array of length of maximum rating value with stars to display or not.
 * @property {boolean} isRefined Indicates if star rating refinement is applied.
 */

/**
 * @typedef {Object} CustomStarRatingWidgetOptions
 * @property {string} attribute Name of the attribute for faceting (eg. "free_shipping").
 * @property {number} [max = 5] The maximum rating value.
 */

/**
 * @typedef {Object} StarRatingRenderingOptions
 * @property {StarRatingItems[]} items Possible star ratings the user can apply.
 * @property {function(string): string} createURL Creates an URL for the next
 * state (takes the item value as parameter). Takes the value of an item as parameter.
 * @property {function(string)} refine Selects a rating to filter the results
 * (takes the filter value as parameter). Takes the value of an item as parameter.
 * @property {boolean} hasNoResults `true` if the last search contains no result.
 * @property {Object} widgetParams All original `CustomStarRatingWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **StarRating** connector provides the logic to build a custom widget that will let
 * the user refine search results based on ratings.
 *
 * The connector provides to the rendering: `refine()` to select a value and
 * `items` that are the values that can be selected. `refine` should be used
 * with `items.value`.
 * @type {Connector}
 * @param {function(StarRatingRenderingOptions, boolean)} renderFn Rendering function for the custom **StarRating** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomStarRatingWidgetOptions)} Re-usable widget factory for a custom **StarRating** widget.
 * @example
 * // custom `renderFn` to render the custom StarRating widget
 * function renderFn(StarRatingRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     StarRatingRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
 *   }
 *
 *   StarRatingRenderingOptions.widgetParams.containerNode
 *     .find('li[data-refine-value]')
 *     .each(function() { $(this).off('click'); });
 *
 *   var listHTML = StarRatingRenderingOptions.items.map(function(item) {
 *     return '<li data-refine-value="' + item.value + '">' +
 *       '<a href="' + StarRatingRenderingOptions.createURL(item.value) + '">' +
 *       item.stars.map(function(star) { return star === false ? '☆' : '★'; }).join(' ') +
 *       '& up (' + item.count + ')' +
 *       '</a></li>';
 *   });
 *
 *   StarRatingRenderingOptions.widgetParams.containerNode
 *     .find('ul')
 *     .html(listHTML);
 *
 *   StarRatingRenderingOptions.widgetParams.containerNode
 *     .find('li[data-refine-value]')
 *     .each(function() {
 *       $(this).on('click', function(event) {
 *         event.preventDefault();
 *         event.stopPropagation();
 *
 *         StarRatingRenderingOptions.refine($(this).data('refine-value'));
 *       });
 *     });
 * }
 *
 * // connect `renderFn` to StarRating logic
 * var customStarRating = instantsearch.connectors.connectRatingMenu(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customStarRating({
 *     containerNode: $('#custom-rating-menu-container'),
 *     attribute: 'rating',
 *     max: 5,
 *   })
 * );
 */

export default function connectRatingMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        _widgetParams$max = widgetParams.max,
        max = _widgetParams$max === void 0 ? 5 : _widgetParams$max;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    return {
      getConfiguration: function getConfiguration() {
        return {
          disjunctiveFacets: [attribute]
        };
      },
      init: function init(_ref) {
        var helper = _ref.helper,
            createURL = _ref.createURL,
            instantSearchInstance = _ref.instantSearchInstance;
        this._toggleRefinement = this._toggleRefinement.bind(this, helper);

        this._createURL = function (state) {
          return function (facetValue) {
            return createURL(state.toggleRefinement(attribute, facetValue));
          };
        };

        renderFn({
          instantSearchInstance: instantSearchInstance,
          items: [],
          hasNoResults: true,
          refine: this._toggleRefinement,
          createURL: this._createURL(helper.state),
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref2) {
        var helper = _ref2.helper,
            results = _ref2.results,
            state = _ref2.state,
            instantSearchInstance = _ref2.instantSearchInstance;
        var facetValues = [];
        var allValues = {};

        for (var v = max; v >= 0; --v) {
          allValues[v] = 0;
        }

        results.getFacetValues(attribute).forEach(function (facet) {
          var val = Math.round(facet.name);

          if (!val || val > max) {
            return;
          }

          for (var _v = val; _v >= 1; --_v) {
            allValues[_v] += facet.count;
          }
        });

        var refinedStar = this._getRefinedStar(helper.state);

        for (var star = max - 1; star >= 1; --star) {
          var count = allValues[star];

          if (refinedStar && star !== refinedStar && count === 0) {
            // skip count==0 when at least 1 refinement is enabled
            // eslint-disable-next-line no-continue
            continue;
          }

          var stars = [];

          for (var i = 1; i <= max; ++i) {
            stars.push(i <= star);
          }

          facetValues.push({
            stars: stars,
            name: String(star),
            value: String(star),
            count: count,
            isRefined: refinedStar === star
          });
        }

        renderFn({
          instantSearchInstance: instantSearchInstance,
          items: facetValues,
          hasNoResults: results.nbHits === 0,
          refine: this._toggleRefinement,
          createURL: this._createURL(state),
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();
        var nextState = state.removeDisjunctiveFacetRefinement(attribute).removeDisjunctiveFacet(attribute);
        return nextState;
      },
      getWidgetState: function getWidgetState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;

        var refinedStar = this._getRefinedStar(searchParameters);

        if (refinedStar === undefined || uiState && uiState.ratingMenu && uiState.ratingMenu[attribute] === refinedStar) return uiState;
        return _objectSpread({}, uiState, {
          ratingMenu: _objectSpread({}, uiState.ratingMenu, _defineProperty({}, attribute, refinedStar))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var starRatingFromURL = uiState.ratingMenu && uiState.ratingMenu[attribute];

        var refinedStar = this._getRefinedStar(searchParameters);

        if (starRatingFromURL === refinedStar) return searchParameters;
        var clearedSearchParam = searchParameters.clearRefinements(attribute);

        if (starRatingFromURL !== undefined) {
          for (var val = Number(starRatingFromURL); val <= max; ++val) {
            clearedSearchParam = clearedSearchParam.addDisjunctiveFacetRefinement(attribute, val);
          }
        }

        return clearedSearchParam;
      },
      _toggleRefinement: function _toggleRefinement(helper, facetValue) {
        var isRefined = this._getRefinedStar(helper.state) === Number(facetValue);
        helper.clearRefinements(attribute);

        if (!isRefined) {
          for (var val = Number(facetValue); val <= max; ++val) {
            helper.addDisjunctiveFacetRefinement(attribute, val);
          }
        }

        helper.search();
      },
      _getRefinedStar: function _getRefinedStar(searchParameters) {
        var refinedStar = undefined;
        var refinements = searchParameters.getDisjunctiveRefinements(attribute);
        refinements.forEach(function (r) {
          if (!refinedStar || Number(r) < refinedStar) {
            refinedStar = Number(r);
          }
        });
        return refinedStar;
      }
    };
  };
}