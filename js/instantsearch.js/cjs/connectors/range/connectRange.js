"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../lib/utils");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'range-input',
  connector: true
}, {
  name: 'range-slider',
  connector: true
});
var $$type = 'ais.range';

// @MAJOR: potentially we should consolidate these types

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
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
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
    if ((0, _utils.isFiniteNumber)(minBound) && (0, _utils.isFiniteNumber)(maxBound) && minBound > maxBound) {
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
    };

    // eslint-disable-next-line complexity
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
      if (!(0, _utils.isFiniteNumber)(minBound) && currentRangeMin === nextMinAsNumber) {
        newNextMin = undefined;
      } else if ((0, _utils.isFiniteNumber)(minBound) && isResetMin) {
        newNextMin = minBound;
      } else {
        newNextMin = nextMinAsNumber;
      }
      var newNextMax;
      if (!(0, _utils.isFiniteNumber)(maxBound) && currentRangeMax === nextMaxAsNumber) {
        newNextMax = undefined;
      } else if ((0, _utils.isFiniteNumber)(maxBound) && isResetMax) {
        newNextMax = maxBound;
      } else {
        newNextMax = nextMaxAsNumber;
      }
      var isResetNewNextMin = newNextMin === undefined;
      var isGreaterThanCurrentRange = (0, _utils.isFiniteNumber)(currentRangeMin) && currentRangeMin <= newNextMin;
      var isMinValid = isResetNewNextMin || (0, _utils.isFiniteNumber)(newNextMin) && (!(0, _utils.isFiniteNumber)(currentRangeMin) || isGreaterThanCurrentRange);
      var isResetNewNextMax = newNextMax === undefined;
      var isLowerThanRange = (0, _utils.isFiniteNumber)(newNextMax) && currentRangeMax >= newNextMax;
      var isMaxValid = isResetNewNextMax || (0, _utils.isFiniteNumber)(newNextMax) && (!(0, _utils.isFiniteNumber)(currentRangeMax) || isLowerThanRange);
      var hasMinChange = min !== newNextMin;
      var hasMaxChange = max !== newNextMax;
      if ((hasMinChange || hasMaxChange) && isMinValid && isMaxValid) {
        resolvedState = resolvedState.removeNumericRefinement(attribute);
        if ((0, _utils.isFiniteNumber)(newNextMin)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, '>=', newNextMin);
        }
        if ((0, _utils.isFiniteNumber)(newNextMax)) {
          resolvedState = resolvedState.addNumericRefinement(attribute, '<=', newNextMax);
        }
        return resolvedState.resetPage();
      }
      return null;
    };
    var createSendEvent = function createSendEvent(instantSearchInstance) {
      return function () {
        if (arguments.length === 1) {
          instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? undefined : arguments[0]);
          return;
        }
      };
    };
    function _getCurrentRange(stats) {
      var min;
      if ((0, _utils.isFiniteNumber)(minBound)) {
        min = minBound;
      } else if ((0, _utils.isFiniteNumber)(stats.min)) {
        min = stats.min;
      } else {
        min = 0;
      }
      var max;
      if ((0, _utils.isFiniteNumber)(maxBound)) {
        max = maxBound;
      } else if ((0, _utils.isFiniteNumber)(stats.max)) {
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
      var min = (0, _utils.isFiniteNumber)(minValue) ? minValue : -Infinity;
      var max = (0, _utils.isFiniteNumber)(maxValue) ? maxValue : Infinity;
      return [min, max];
    }
    function _refine(helper, currentRange) {
      return function () {
        var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [undefined, undefined],
          _ref12 = _slicedToArray(_ref11, 2),
          nextMin = _ref12[0],
          nextMax = _ref12[1];
        var refinedState = getRefinedState(helper, currentRange, nextMin, nextMax);
        if (refinedState) {
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
        var facet = (0, _utils.find)(facetsFromResults, function (facetResult) {
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
          refine = _refine(helper, {
            min: undefined,
            max: undefined
          });
        } else {
          refine = _refine(helper, currentRange);
        }
        return {
          refine: refine,
          canRefine: currentRange.min !== currentRange.max,
          format: rangeFormatter,
          range: currentRange,
          sendEvent: createSendEvent(instantSearchInstance),
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
        if ((0, _utils.isFiniteNumber)(minBound)) {
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', minBound);
        }
        if ((0, _utils.isFiniteNumber)(maxBound)) {
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
        if ((0, _utils.isFiniteNumber)(lowerBound) && (!(0, _utils.isFiniteNumber)(minBound) || minBound < lowerBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '>=');
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '>=', lowerBound);
        }
        if ((0, _utils.isFiniteNumber)(upperBound) && (!(0, _utils.isFiniteNumber)(maxBound) || upperBound < maxBound)) {
          widgetSearchParameters = widgetSearchParameters.removeNumericRefinement(attribute, '<=');
          widgetSearchParameters = widgetSearchParameters.addNumericRefinement(attribute, '<=', upperBound);
        }
        return widgetSearchParameters;
      }
    };
  };
};
var _default = exports.default = connectRange;