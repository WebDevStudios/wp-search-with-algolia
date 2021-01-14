"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectRatingMenu;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'rating-menu',
  connector: true
});
var $$type = 'ais.ratingMenu';

var createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      getRefinedStar = _ref.getRefinedStar,
      attribute = _ref.attribute;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }

    var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (eventType !== 'click') {
      return;
    }

    var isRefined = getRefinedStar() === Number(facetValue);

    if (!isRefined) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: $$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: ["".concat(attribute, ">=").concat(facetValue)]
        }
      });
    }
  };
};
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
 * search.addWidgets([
 *   customStarRating({
 *     containerNode: $('#custom-rating-menu-container'),
 *     attribute: 'rating',
 *     max: 5,
 *   })
 * ]);
 */


function connectRatingMenu(renderFn) {
  var _this = this;

  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        _widgetParams$max = widgetParams.max,
        max = _widgetParams$max === void 0 ? 5 : _widgetParams$max;
    var sendEvent;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    var _getRefinedStar = function getRefinedStar(state) {
      var refinements = state.getDisjunctiveRefinements(attribute);

      if (!refinements.length) {
        return undefined;
      }

      return Math.min.apply(Math, _toConsumableArray(refinements.map(Number)));
    };

    var toggleRefinement = function toggleRefinement(helper, facetValue) {
      sendEvent('click', facetValue);
      var isRefined = _getRefinedStar(helper.state) === Number(facetValue);
      helper.removeDisjunctiveFacetRefinement(attribute);

      if (!isRefined) {
        for (var val = Number(facetValue); val <= max; ++val) {
          helper.addDisjunctiveFacetRefinement(attribute, val);
        }
      }

      helper.search();
    };

    var connectorState = {
      toggleRefinementFactory: function toggleRefinementFactory(helper) {
        return toggleRefinement.bind(_this, helper);
      },
      createURLFactory: function createURLFactory(_ref2) {
        var state = _ref2.state,
            createURL = _ref2.createURL;
        return function (value) {
          return createURL(state.toggleRefinement(attribute, value));
        };
      }
    };
    return {
      $$type: $$type,
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
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          ratingMenu: _objectSpread({}, renderState.ratingMenu, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var helper = _ref3.helper,
            results = _ref3.results,
            state = _ref3.state,
            instantSearchInstance = _ref3.instantSearchInstance,
            createURL = _ref3.createURL;
        var facetValues = [];

        if (!sendEvent) {
          sendEvent = createSendEvent({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            getRefinedStar: function getRefinedStar() {
              return _getRefinedStar(helper.state);
            },
            attribute: attribute
          });
        }

        if (results) {
          var allValues = {};

          for (var v = max; v >= 0; --v) {
            allValues[v] = 0;
          }

          (results.getFacetValues(attribute) || []).forEach(function (facet) {
            var val = Math.round(facet.name);

            if (!val || val > max) {
              return;
            }

            for (var _v = val; _v >= 1; --_v) {
              allValues[_v] += facet.count;
            }
          });

          var refinedStar = _getRefinedStar(state);

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
        }

        return {
          items: facetValues,
          hasNoResults: results ? results.nbHits === 0 : true,
          refine: connectorState.toggleRefinementFactory(helper),
          sendEvent: sendEvent,
          createURL: connectorState.createURLFactory({
            state: state,
            createURL: createURL
          }),
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;

        var value = _getRefinedStar(searchParameters);

        if (typeof value !== 'number') {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          ratingMenu: _objectSpread({}, uiState.ratingMenu, _defineProperty({}, attribute, value))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var value = uiState.ratingMenu && uiState.ratingMenu[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);
        var withDisjunctiveFacet = withoutRefinements.addDisjunctiveFacet(attribute);

        if (!value) {
          return withDisjunctiveFacet.setQueryParameters({
            disjunctiveFacetsRefinements: _objectSpread({}, withDisjunctiveFacet.disjunctiveFacetsRefinements, _defineProperty({}, attribute, []))
          });
        }

        return (0, _utils.range)({
          start: Number(value),
          end: max + 1
        }).reduce(function (parameters, number) {
          return parameters.addDisjunctiveFacetRefinement(attribute, number);
        }, withDisjunctiveFacet);
      }
    };
  };
}