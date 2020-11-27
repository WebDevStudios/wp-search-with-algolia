function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { checkRendering, createDocumentationMessageGenerator, isFiniteNumber, find, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'range-input',
  connector: true
}, {
  name: 'range-slider',
  connector: true
});
/**
 * @typedef {Object} CustomRangeWidgetOptions
 * @property {string} attribute Name of the attribute for faceting.
 * @property {number} [min = undefined] Minimal range value, default to automatically computed from the result set.
 * @property {number} [max = undefined] Maximal range value, default to automatically computed from the result set.
 * @property {number} [precision = 2] Number of digits after decimal point to use.
 */

/**
 * @typedef {Object} RangeRenderingOptions
 * @property {function(Array<number, number>)} refine Sets a range to filter the results on. Both values
 * are optional, and will default to the higher and lower bounds. You can use `undefined` to remove a
 * previously set bound or to set an infinite bound.
 * @property {{min: number, max: number}} range Results bounds without the current range filter.
 * @property {Array<number, number>} start Current numeric bounds of the search.
 * @property {{from: function, to: function}} formatter Transform for the rendering `from` and/or `to` values.
 * Both functions take a `number` as input and should output a `string`.
 * @property {Object} widgetParams All original `CustomRangeWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **Range** connector provides the logic to create custom widget that will let
 * the user refine results using a numeric range.
 *
 * This connectors provides a `refine()` function that accepts bounds. It will also provide
 * information about the min and max bounds for the current result set.
 * @type {Connector}
 * @param {function(RangeRenderingOptions, boolean)} renderFn Rendering function for the custom **Range** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomRangeWidgetOptions)} Re-usable widget factory for a custom **Range** widget.
 */

export default function connectRange(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        minBound = widgetParams.min,
        maxBound = widgetParams.max,
        _widgetParams$precisi = widgetParams.precision,
        precision = _widgetParams$precisi === void 0 ? 2 : _widgetParams$precisi;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    var hasMinBound = isFiniteNumber(minBound);
    var hasMaxBound = isFiniteNumber(maxBound);

    var formatToNumber = function formatToNumber(v) {
      return Number(Number(v).toFixed(precision));
    };

    var rangeFormatter = {
      from: function from(v) {
        return v;
      },
      to: function to(v) {
        return formatToNumber(v).toLocaleString();
      }
    };
    return {
      _getCurrentRange: function _getCurrentRange(stats) {
        var pow = Math.pow(10, precision);
        var min;

        if (hasMinBound) {
          min = minBound;
        } else if (isFiniteNumber(stats.min)) {
          min = stats.min;
        } else {
          min = 0;
        }

        var max;

        if (hasMaxBound) {
          max = maxBound;
        } else if (isFiniteNumber(stats.max)) {
          max = stats.max;
        } else {
          max = 0;
        }

        return {
          min: Math.floor(min * pow) / pow,
          max: Math.ceil(max * pow) / pow
        };
      },
      _getCurrentRefinement: function _getCurrentRefinement(helper) {
        var _ref = helper.getNumericRefinement(attribute, '>=') || [],
            _ref2 = _slicedToArray(_ref, 1),
            minValue = _ref2[0];

        var _ref3 = helper.getNumericRefinement(attribute, '<=') || [],
            _ref4 = _slicedToArray(_ref3, 1),
            maxValue = _ref4[0];

        var min = isFiniteNumber(minValue) ? minValue : -Infinity;
        var max = isFiniteNumber(maxValue) ? maxValue : Infinity;
        return [min, max];
      },
      _refine: function _refine(helper, currentRange) {
        // eslint-disable-next-line complexity
        return function () {
          var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [],
              _ref6 = _slicedToArray(_ref5, 2),
              nextMin = _ref6[0],
              nextMax = _ref6[1];

          var currentRangeMin = currentRange.min,
              currentRangeMax = currentRange.max;

          var _ref7 = helper.getNumericRefinement(attribute, '>=') || [],
              _ref8 = _slicedToArray(_ref7, 1),
              min = _ref8[0];

          var _ref9 = helper.getNumericRefinement(attribute, '<=') || [],
              _ref10 = _slicedToArray(_ref9, 1),
              max = _ref10[0];

          var isResetMin = nextMin === undefined || nextMin === '';
          var isResetMax = nextMax === undefined || nextMax === '';
          var nextMinAsNumber = !isResetMin ? parseFloat(nextMin) : undefined;
          var nextMaxAsNumber = !isResetMax ? parseFloat(nextMax) : undefined;
          var newNextMin;

          if (!hasMinBound && currentRangeMin === nextMinAsNumber) {
            newNextMin = undefined;
          } else if (hasMinBound && isResetMin) {
            newNextMin = minBound;
          } else {
            newNextMin = nextMinAsNumber;
          }

          var newNextMax;

          if (!hasMaxBound && currentRangeMax === nextMaxAsNumber) {
            newNextMax = undefined;
          } else if (hasMaxBound && isResetMax) {
            newNextMax = maxBound;
          } else {
            newNextMax = nextMaxAsNumber;
          }

          var isResetNewNextMin = newNextMin === undefined;
          var isValidNewNextMin = isFiniteNumber(newNextMin);
          var isValidMinCurrentRange = isFiniteNumber(currentRangeMin);
          var isGreaterThanCurrentRange = isValidMinCurrentRange && currentRangeMin <= newNextMin;
          var isMinValid = isResetNewNextMin || isValidNewNextMin && (!isValidMinCurrentRange || isGreaterThanCurrentRange);
          var isResetNewNextMax = newNextMax === undefined;
          var isValidNewNextMax = isFiniteNumber(newNextMax);
          var isValidMaxCurrentRange = isFiniteNumber(currentRangeMax);
          var isLowerThanRange = isValidMaxCurrentRange && currentRangeMax >= newNextMax;
          var isMaxValid = isResetNewNextMax || isValidNewNextMax && (!isValidMaxCurrentRange || isLowerThanRange);
          var hasMinChange = min !== newNextMin;
          var hasMaxChange = max !== newNextMax;

          if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
            helper.clearRefinements(attribute);

            if (isValidNewNextMin) {
              helper.addNumericRefinement(attribute, '>=', formatToNumber(newNextMin));
            }

            if (isValidNewNextMax) {
              helper.addNumericRefinement(attribute, '<=', formatToNumber(newNextMax));
            }

            helper.search();
          }
        };
      },
      getConfiguration: function getConfiguration(currentConfiguration) {
        var configuration = {
          disjunctiveFacets: [attribute]
        };
        var isBoundsDefined = hasMinBound || hasMaxBound;
        var boundsAlreadyDefined = currentConfiguration && currentConfiguration.numericRefinements && currentConfiguration.numericRefinements[attribute] !== undefined;
        var isMinBoundValid = isFiniteNumber(minBound);
        var isMaxBoundValid = isFiniteNumber(maxBound);
        var isAbleToRefine = isMinBoundValid && isMaxBoundValid ? minBound < maxBound : isMinBoundValid || isMaxBoundValid;

        if (isBoundsDefined && !boundsAlreadyDefined && isAbleToRefine) {
          configuration.numericRefinements = _defineProperty({}, attribute, {});

          if (hasMinBound) {
            configuration.numericRefinements[attribute]['>='] = [minBound];
          }

          if (hasMaxBound) {
            configuration.numericRefinements[attribute]['<='] = [maxBound];
          }
        }

        return configuration;
      },
      init: function init(_ref11) {
        var helper = _ref11.helper,
            instantSearchInstance = _ref11.instantSearchInstance;
        var stats = {};

        var currentRange = this._getCurrentRange(stats);

        var start = this._getCurrentRefinement(helper);

        renderFn({
          // On first render pass an empty range
          // to be able to bypass the validation
          // related to it
          refine: this._refine(helper, {}),
          format: rangeFormatter,
          range: currentRange,
          widgetParams: _objectSpread({}, widgetParams, {
            precision: precision
          }),
          start: start,
          instantSearchInstance: instantSearchInstance
        }, true);
      },
      render: function render(_ref12) {
        var results = _ref12.results,
            helper = _ref12.helper,
            instantSearchInstance = _ref12.instantSearchInstance;
        var facetsFromResults = results.disjunctiveFacets || [];
        var facet = find(facetsFromResults, function (facetResult) {
          return facetResult.name === attribute;
        });
        var stats = facet && facet.stats || {};

        var currentRange = this._getCurrentRange(stats);

        var start = this._getCurrentRefinement(helper);

        renderFn({
          refine: this._refine(helper, currentRange),
          format: rangeFormatter,
          range: currentRange,
          widgetParams: _objectSpread({}, widgetParams, {
            precision: precision
          }),
          start: start,
          instantSearchInstance: instantSearchInstance
        }, false);
      },
      dispose: function dispose(_ref13) {
        var state = _ref13.state;
        unmountFn();
        var nextState = state.removeNumericRefinement(attribute).removeDisjunctiveFacet(attribute);
        return nextState;
      },
      getWidgetState: function getWidgetState(uiState, _ref14) {
        var searchParameters = _ref14.searchParameters;

        var _searchParameters$get = searchParameters.getNumericRefinements(attribute),
            _searchParameters$get2 = _searchParameters$get['>='],
            min = _searchParameters$get2 === void 0 ? '' : _searchParameters$get2,
            _searchParameters$get3 = _searchParameters$get['<='],
            max = _searchParameters$get3 === void 0 ? '' : _searchParameters$get3;

        if (min === '' && max === '' || uiState && uiState.range && uiState.range[attribute] === "".concat(min, ":").concat(max)) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          range: _objectSpread({}, uiState.range, _defineProperty({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref15) {
        var uiState = _ref15.uiState;
        var value = uiState && uiState.range && uiState.range[attribute];

        if (!value || value.indexOf(':') === -1) {
          return searchParameters;
        }

        var _searchParameters$get4 = searchParameters.getNumericRefinements(attribute),
            _searchParameters$get5 = _searchParameters$get4['>='],
            previousMin = _searchParameters$get5 === void 0 ? [NaN] : _searchParameters$get5,
            _searchParameters$get6 = _searchParameters$get4['<='],
            previousMax = _searchParameters$get6 === void 0 ? [NaN] : _searchParameters$get6;

        var clearedParams = searchParameters.clearRefinements(attribute);

        var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            lowerBound = _value$split$map2[0],
            upperBound = _value$split$map2[1];

        if (previousMin.includes(lowerBound) && previousMax.includes(upperBound)) {
          return searchParameters;
        }

        if (isFiniteNumber(lowerBound)) {
          clearedParams = clearedParams.addNumericRefinement(attribute, '>=', lowerBound);
        }

        if (isFiniteNumber(upperBound)) {
          clearedParams = clearedParams.addNumericRefinement(attribute, '<=', upperBound);
        }

        return clearedParams;
      }
    };
  };
}