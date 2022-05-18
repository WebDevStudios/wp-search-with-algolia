function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { checkRendering, createDocumentationMessageGenerator, convertNumericRefinementsToFilters, isFiniteNumber, find, noop } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'range-input',
  connector: true
}, {
  name: 'range-slider',
  connector: true
});
var $$type = 'ais.range';

function toPrecision(_ref) {
  var min = _ref.min,
      max = _ref.max,
      precision = _ref.precision;
  var pow = Math.pow(10, precision);
  return {
    min: min ? Math.floor(min * pow) / pow : min,
    max: max ? Math.ceil(max * pow) / pow : max
  };
}
/**
 * **Range** connector provides the logic to create custom widget that will let
 * the user refine results using a numeric range.
 *
 * This connectors provides a `refine()` function that accepts bounds. It will also provide
 * information about the min and max bounds for the current result set.
 */


var connectRange = function connectRange(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
        minBound = _ref2.min,
        maxBound = _ref2.max,
        _ref2$precision = _ref2.precision,
        precision = _ref2$precision === void 0 ? 0 : _ref2$precision;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    if (isFiniteNumber(minBound) && isFiniteNumber(maxBound) && minBound > maxBound) {
      throw new Error(withUsage("The `max` option can't be lower than `min`."));
    }

    var formatToNumber = function formatToNumber(v) {
      return Number(Number(v).toFixed(precision));
    };

    var rangeFormatter = {
      from: function from(v) {
        return v.toLocaleString();
      },
      to: function to(v) {
        return formatToNumber(v).toLocaleString();
      }
    }; // eslint-disable-next-line complexity

    var getRefinedState = function getRefinedState(helper, currentRange, nextMin, nextMax) {
      var resolvedState = helper.state;
      var currentRangeMin = currentRange.min,
          currentRangeMax = currentRange.max;

      var _ref3 = resolvedState.getNumericRefinement(attribute, '>=') || [],
          _ref4 = _slicedToArray(_ref3, 1),
          min = _ref4[0];

      var _ref5 = resolvedState.getNumericRefinement(attribute, '<=') || [],
          _ref6 = _slicedToArray(_ref5, 1),
          max = _ref6[0];

      var isResetMin = nextMin === undefined || nextMin === '';
      var isResetMax = nextMax === undefined || nextMax === '';

      var _toPrecision = toPrecision({
        min: !isResetMin ? parseFloat(nextMin) : undefined,
        max: !isResetMax ? parseFloat(nextMax) : undefined,
        precision: precision
      }),
          nextMinAsNumber = _toPrecision.min,
          nextMaxAsNumber = _toPrecision.max;

      var newNextMin;

      if (!isFiniteNumber(minBound) && currentRangeMin === nextMinAsNumber) {
        newNextMin = undefined;
      } else if (isFiniteNumber(minBound) && isResetMin) {
        newNextMin = minBound;
      } else {
        newNextMin = nextMinAsNumber;
      }

      var newNextMax;

      if (!isFiniteNumber(maxBound) && currentRangeMax === nextMaxAsNumber) {
        newNextMax = undefined;
      } else if (isFiniteNumber(maxBound) && isResetMax) {
        newNextMax = maxBound;
      } else {
        newNextMax = nextMaxAsNumber;
      }

      var isResetNewNextMin = newNextMin === undefined;
      var isGreaterThanCurrentRange = isFiniteNumber(currentRangeMin) && currentRangeMin <= newNextMin;
      var isMinValid = isResetNewNextMin || isFiniteNumber(newNextMin) && (!isFiniteNumber(currentRangeMin) || isGreaterThanCurrentRange);
      var isResetNewNextMax = newNextMax === undefined;
      var isLowerThanRange = isFiniteNumber(newNextMax) && currentRangeMax >= newNextMax;
      var isMaxValid = isResetNewNextMax || isFiniteNumber(newNextMax) && (!isFiniteNumber(currentRangeMax) || isLowerThanRange);
      var hasMinChange = min !== newNextMin;
      var hasMaxChange = max !== newNextMax;

      if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
        resolvedState = resolvedState.removeNumericRefinement(attribute);

        if (isFiniteNumber(newNextMin)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, '>=', newNextMin);
        }

        if (isFiniteNumber(newNextMax)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, '<=', newNextMax);
        }

        return resolvedState.resetPage();
      }

      return null;
    };

    var sendEventWithRefinedState = function sendEventWithRefinedState(refinedState, instantSearchInstance, helper) {
      var eventName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Filter Applied';
      var filters = convertNumericRefinementsToFilters(refinedState, attribute);

      if (filters && filters.length > 0) {
        instantSearchInstance.sendEventToInsights({
          insightsMethod: 'clickedFilters',
          widgetType: $$type,
          eventType: 'click',
          payload: {
            eventName: eventName,
            index: helper.getIndex(),
            filters: filters
          },
          attribute: attribute
        });
      }
    };

    var createSendEvent = function createSendEvent(instantSearchInstance, helper, currentRange) {
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
            eventName = args[2];

        if (eventType !== 'click') {
          return;
        }

        var _facetValue = _slicedToArray(facetValue, 2),
            nextMin = _facetValue[0],
            nextMax = _facetValue[1];

        var refinedState = getRefinedState(helper, currentRange, nextMin, nextMax);
        sendEventWithRefinedState(refinedState, instantSearchInstance, helper, eventName);
      };
    };

    function _getCurrentRange(stats) {
      var min;

      if (isFiniteNumber(minBound)) {
        min = minBound;
      } else if (isFiniteNumber(stats.min)) {
        min = stats.min;
      } else {
        min = 0;
      }

      var max;

      if (isFiniteNumber(maxBound)) {
        max = maxBound;
      } else if (isFiniteNumber(stats.max)) {
        max = stats.max;
      } else {
        max = 0;
      }

      return toPrecision({
        min: min,
        max: max,
        precision: precision
      });
    }

    function _getCurrentRefinement(helper) {
      var _ref7 = helper.getNumericRefinement(attribute, '>=') || [],
          _ref8 = _slicedToArray(_ref7, 1),
          minValue = _ref8[0];

      var _ref9 = helper.getNumericRefinement(attribute, '<=') || [],
          _ref10 = _slicedToArray(_ref9, 1),
          maxValue = _ref10[0];

      var min = isFiniteNumber(minValue) ? minValue : -Infinity;
      var max = isFiniteNumber(maxValue) ? maxValue : Infinity;
      return [min, max];
    }

    function _refine(instantSearchInstance, helper, currentRange) {
      return function () {
        var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [undefined, undefined],
            _ref12 = _slicedToArray(_ref11, 2),
            nextMin = _ref12[0],
            nextMax = _ref12[1];

        var refinedState = getRefinedState(helper, currentRange, nextMin, nextMax);

        if (refinedState) {
          sendEventWithRefinedState(refinedState, instantSearchInstance, helper);
          helper.setState(refinedState).search();
        }
      };
    }

    return {
      $$type: $$type,
      init: function init(initOptions) {
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          range: _objectSpread(_objectSpread({}, renderState.range), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref13) {
        var results = _ref13.results,
            helper = _ref13.helper,
            instantSearchInstance = _ref13.instantSearchInstance;
        var facetsFromResults = results && results.disjunctiveFacets || [];
        var facet = find(facetsFromResults, function (facetResult) {
          return facetResult.name === attribute;
        });
        var stats = facet && facet.stats || {
          min: undefined,
          max: undefined
        };

        var currentRange = _getCurrentRange(stats);

        var start = _getCurrentRefinement(helper);

        var refine;

        if (!results) {
          // On first render pass an empty range
          // to be able to bypass the validation
          // related to it
          refine = _refine(instantSearchInstance, helper, {
            min: undefined,
            max: undefined
          });
        } else {
          refine = _refine(instantSearchInstance, helper, currentRange);
        }

        return {
          refine: refine,
          canRefine: currentRange.min !== currentRange.max,
          format: rangeFormatter,
          range: currentRange,
          sendEvent: createSendEvent(instantSearchInstance, helper, currentRange),
          widgetParams: _objectSpread(_objectSpread({}, widgetParams), {}, {
            precision: precision
          }),
          start: start
        };
      },
      dispose: function dispose(_ref14) {
        var state = _ref14.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute).removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref15) {
        var searchParameters = _ref15.searchParameters;

        var _searchParameters$get = searchParameters.getNumericRefinements(attribute),
            _searchParameters$get2 = _searchParameters$get['>='],
            min = _searchParameters$get2 === void 0 ? [] : _searchParameters$get2,
            _searchParameters$get3 = _searchParameters$get['<='],
            max = _searchParameters$get3 === void 0 ? [] : _searchParameters$get3;

        if (min.length === 0 && max.length === 0) {
          return uiState;
        }

        return _objectSpread(_objectSpread({}, uiState), {}, {
          range: _objectSpread(_objectSpread({}, uiState.range), {}, _defineProperty({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref16) {
        var uiState = _ref16.uiState;
        var widgetSearchParameters = searchParameters.addDisjunctiveFacet(attribute).setQueryParameters({
          numericRefinements: _objectSpread(_objectSpread({}, searchParameters.numericRefinements), {}, _defineProperty({}, attribute, {}))
        });

        if (isFiniteNumber(minBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', minBound);
        }

        if (isFiniteNumber(maxBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', maxBound);
        }

        var value = uiState.range && uiState.range[attribute];

        if (!value || value.indexOf(':') === -1) {
          return widgetSearchParameters;
        }

        var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            lowerBound = _value$split$map2[0],
            upperBound = _value$split$map2[1];

        if (isFiniteNumber(lowerBound) && (!isFiniteNumber(minBound) || minBound < lowerBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '>=');
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', lowerBound);
        }

        if (isFiniteNumber(upperBound) && (!isFiniteNumber(maxBound) || upperBound < maxBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '<=');
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', upperBound);
        }

        return widgetSearchParameters;
      }
    };
  };
};

export default connectRange;