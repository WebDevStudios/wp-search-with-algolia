function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { checkRendering, createDocumentationLink, createDocumentationMessageGenerator, noop, warning } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'rating-menu',
  connector: true
});
var $$type = 'ais.ratingMenu';
var MAX_VALUES_PER_FACET_API_LIMIT = 1000;
var STEP = 1;
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
    var facetValue = args[1],
      _args$ = args[2],
      eventName = _args$ === void 0 ? 'Filter Applied' : _args$;
    var _args$0$split = args[0].split(':'),
      _args$0$split2 = _slicedToArray(_args$0$split, 2),
      eventType = _args$0$split2[0],
      eventModifier = _args$0$split2[1];
    if (eventType !== 'click') {
      return;
    }
    var isRefined = getRefinedStar() === Number(facetValue);
    if (!isRefined) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: $$type,
        eventType: eventType,
        eventModifier: eventModifier,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: ["".concat(attribute, ">=").concat(facetValue)]
        },
        attribute: attribute
      });
    }
  };
};
/**
 * **StarRating** connector provides the logic to build a custom widget that will let
 * the user refine search results based on ratings.
 *
 * The connector provides to the rendering: `refine()` to select a value and
 * `items` that are the values that can be selected. `refine` should be used
 * with `items.value`.
 */
var connectRatingMenu = function connectRatingMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
      attribute = _ref2.attribute,
      _ref2$max = _ref2.max,
      max = _ref2$max === void 0 ? 5 : _ref2$max;
    var sendEvent;
    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }
    var _getRefinedStar = function getRefinedStar(state) {
      var _values$;
      var values = state.getNumericRefinements(attribute);
      if (!((_values$ = values['>=']) !== null && _values$ !== void 0 && _values$.length)) {
        return undefined;
      }
      return values['>='][0];
    };
    var getFacetsMaxDecimalPlaces = function getFacetsMaxDecimalPlaces(facetResults) {
      var maxDecimalPlaces = 0;
      facetResults.forEach(function (facetResult) {
        var _facetResult$name$spl = facetResult.name.split('.'),
          _facetResult$name$spl2 = _slicedToArray(_facetResult$name$spl, 2),
          _facetResult$name$spl3 = _facetResult$name$spl2[1],
          decimal = _facetResult$name$spl3 === void 0 ? '' : _facetResult$name$spl3;
        maxDecimalPlaces = Math.max(maxDecimalPlaces, decimal.length);
      });
      return maxDecimalPlaces;
    };
    var getFacetValuesWarningMessage = function getFacetValuesWarningMessage(_ref3) {
      var maxDecimalPlaces = _ref3.maxDecimalPlaces,
        maxFacets = _ref3.maxFacets,
        maxValuesPerFacet = _ref3.maxValuesPerFacet;
      var maxDecimalPlacesInRange = Math.max(0, Math.floor(Math.log10(MAX_VALUES_PER_FACET_API_LIMIT / max)));
      var maxFacetsInRange = Math.min(MAX_VALUES_PER_FACET_API_LIMIT, Math.pow(10, maxDecimalPlacesInRange) * max);
      var solutions = [];
      if (maxFacets > MAX_VALUES_PER_FACET_API_LIMIT) {
        solutions.push("- Update your records to lower the precision of the values in the \"".concat(attribute, "\" attribute (for example: ").concat(5.123456789.toPrecision(maxDecimalPlaces + 1), " to ").concat(5.123456789.toPrecision(maxDecimalPlacesInRange + 1), ")"));
      }
      if (maxValuesPerFacet < maxFacetsInRange) {
        solutions.push("- Increase the maximum number of facet values to ".concat(maxFacetsInRange, " using the \"configure\" widget ").concat(createDocumentationLink({
          name: 'configure'
        }), " and the \"maxValuesPerFacet\" parameter https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/"));
      }
      return "The ".concat(attribute, " attribute can have ").concat(maxFacets, " different values (0 to ").concat(max, " with a maximum of ").concat(maxDecimalPlaces, " decimals = ").concat(maxFacets, ") but you retrieved only ").concat(maxValuesPerFacet, " facet values. Therefore the number of results that match the refinements can be incorrect.\n    ").concat(solutions.length ? "To resolve this problem you can:\n".concat(solutions.join('\n')) : "");
    };
    function getRefinedState(state, facetValue) {
      var isRefined = _getRefinedStar(state) === Number(facetValue);
      var emptyState = state.resetPage().removeNumericRefinement(attribute);
      if (!isRefined) {
        return emptyState.addNumericRefinement(attribute, '<=', max).addNumericRefinement(attribute, '>=', Number(facetValue));
      }
      return emptyState;
    }
    var toggleRefinement = function toggleRefinement(helper, facetValue) {
      sendEvent('click:internal', facetValue);
      helper.setState(getRefinedState(helper.state, facetValue)).search();
    };
    var connectorState = {
      toggleRefinementFactory: function toggleRefinementFactory(helper) {
        return toggleRefinement.bind(null, helper);
      },
      createURLFactory: function createURLFactory(_ref4) {
        var state = _ref4.state,
          createURL = _ref4.createURL,
          getWidgetUiState = _ref4.getWidgetUiState,
          helper = _ref4.helper;
        return function (value) {
          return createURL(function (uiState) {
            return getWidgetUiState(uiState, {
              searchParameters: getRefinedState(state, value),
              helper: helper
            });
          });
        };
      }
    };
    return {
      $$type: $$type,
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
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          ratingMenu: _objectSpread(_objectSpread({}, renderState.ratingMenu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var helper = _ref5.helper,
          results = _ref5.results,
          state = _ref5.state,
          instantSearchInstance = _ref5.instantSearchInstance,
          createURL = _ref5.createURL;
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
        var refinementIsApplied = false;
        var totalCount = 0;
        var facetResults = results === null || results === void 0 ? void 0 : results.getFacetValues(attribute, {});
        if (results && facetResults) {
          var maxValuesPerFacet = facetResults.length;
          var maxDecimalPlaces = getFacetsMaxDecimalPlaces(facetResults);
          var maxFacets = Math.pow(10, maxDecimalPlaces) * max;
          process.env.NODE_ENV === 'development' ? warning(maxFacets <= maxValuesPerFacet || Boolean(results.__isArtificial), getFacetValuesWarningMessage({
            maxDecimalPlaces: maxDecimalPlaces,
            maxFacets: maxFacets,
            maxValuesPerFacet: maxValuesPerFacet
          })) : void 0;
          var refinedStar = _getRefinedStar(state);
          var _loop = function _loop(star) {
            var isRefined = refinedStar === star;
            refinementIsApplied = refinementIsApplied || isRefined;
            var count = facetResults.filter(function (f) {
              return Number(f.name) >= star && Number(f.name) <= max;
            }).map(function (f) {
              return f.count;
            }).reduce(function (sum, current) {
              return sum + current;
            }, 0);
            totalCount += count;
            if (refinedStar && !isRefined && count === 0) {
              // skip count==0 when at least 1 refinement is enabled
              // eslint-disable-next-line no-continue
              return "continue";
            }
            var stars = _toConsumableArray(new Array(Math.floor(max / STEP))).map(function (_v, i) {
              return i * STEP < star;
            });
            facetValues.push({
              stars: stars,
              name: String(star),
              label: String(star),
              value: String(star),
              count: count,
              isRefined: isRefined
            });
          };
          for (var star = STEP; star < max; star += STEP) {
            var _ret = _loop(star);
            if (_ret === "continue") continue;
          }
        }
        facetValues = facetValues.reverse();
        var hasNoResults = results ? results.nbHits === 0 : true;
        return {
          items: facetValues,
          hasNoResults: hasNoResults,
          canRefine: (!hasNoResults || refinementIsApplied) && totalCount > 0,
          refine: connectorState.toggleRefinementFactory(helper),
          sendEvent: sendEvent,
          createURL: connectorState.createURLFactory({
            state: state,
            createURL: createURL,
            helper: helper,
            getWidgetUiState: this.getWidgetUiState
          }),
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref6) {
        var state = _ref6.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref7) {
        var searchParameters = _ref7.searchParameters;
        var value = _getRefinedStar(searchParameters);
        return removeEmptyRefinementsFromUiState(_objectSpread(_objectSpread({}, uiState), {}, {
          ratingMenu: _objectSpread(_objectSpread({}, uiState.ratingMenu), {}, _defineProperty({}, attribute, typeof value === 'number' ? value : undefined))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref8) {
        var uiState = _ref8.uiState;
        var value = uiState.ratingMenu && uiState.ratingMenu[attribute];
        var withDisjunctiveFacet = searchParameters.addDisjunctiveFacet(attribute).removeNumericRefinement(attribute).removeDisjunctiveFacetRefinement(attribute);
        if (!value) {
          return withDisjunctiveFacet.setQueryParameters({
            numericRefinements: _objectSpread(_objectSpread({}, withDisjunctiveFacet.numericRefinements), {}, _defineProperty({}, attribute, {}))
          });
        }
        return withDisjunctiveFacet.addNumericRefinement(attribute, '<=', max).addNumericRefinement(attribute, '>=', value);
      }
    };
  };
};
function removeEmptyRefinementsFromUiState(indexUiState, attribute) {
  if (!indexUiState.ratingMenu) {
    return indexUiState;
  }
  if (typeof indexUiState.ratingMenu[attribute] !== 'number') {
    delete indexUiState.ratingMenu[attribute];
  }
  if (Object.keys(indexUiState.ratingMenu).length === 0) {
    delete indexUiState.ratingMenu;
  }
  return indexUiState;
}
export default connectRatingMenu;