"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'analytics'
});

function analytics() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      pushFunction = _ref.pushFunction,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 3000 : _ref$delay,
      _ref$triggerOnUIInter = _ref.triggerOnUIInteraction,
      triggerOnUIInteraction = _ref$triggerOnUIInter === void 0 ? false : _ref$triggerOnUIInter,
      _ref$pushInitialSearc = _ref.pushInitialSearch,
      pushInitialSearch = _ref$pushInitialSearc === void 0 ? true : _ref$pushInitialSearc,
      _ref$pushPagination = _ref.pushPagination,
      pushPagination = _ref$pushPagination === void 0 ? false : _ref$pushPagination;

  if (!pushFunction) {
    throw new Error(withUsage('The `pushFunction` option is required.'));
  }

  var cachedState = null;

  var serializeRefinements = function serializeRefinements(parameters) {
    var refinements = [];

    for (var parameter in parameters) {
      if (parameters.hasOwnProperty(parameter)) {
        var values = parameters[parameter].join('+');
        refinements.push("".concat(encodeURIComponent(parameter), "=").concat(encodeURIComponent(parameter), "_").concat(encodeURIComponent(values)));
      }
    }

    return refinements.join('&');
  };

  var serializeNumericRefinements = function serializeNumericRefinements(numericRefinements) {
    var refinements = [];

    for (var attribute in numericRefinements) {
      if (numericRefinements.hasOwnProperty(attribute)) {
        var filter = numericRefinements[attribute];

        if (filter.hasOwnProperty('>=') && filter.hasOwnProperty('<=')) {
          if (filter['>='] && filter['>='][0] === filter['<='] && filter['<='][0]) {
            refinements.push("".concat(attribute, "=").concat(attribute, "_").concat(filter['>=']));
          } else {
            refinements.push("".concat(attribute, "=").concat(attribute, "_").concat(filter['>='], "to").concat(filter['<=']));
          }
        } else if (filter.hasOwnProperty('>=')) {
          refinements.push("".concat(attribute, "=").concat(attribute, "_from").concat(filter['>=']));
        } else if (filter.hasOwnProperty('<=')) {
          refinements.push("".concat(attribute, "=").concat(attribute, "_to").concat(filter['<=']));
        } else if (filter.hasOwnProperty('=')) {
          var equals = [];

          for (var equal in filter['=']) {
            // eslint-disable-next-line max-depth
            if (filter['='].hasOwnProperty(equal)) {
              equals.push(filter['='][equal]);
            }
          }

          refinements.push("".concat(attribute, "=").concat(attribute, "_").concat(equals.join('-')));
        }
      }
    }

    return refinements.join('&');
  };

  var lastSentData = '';

  var sendAnalytics = function sendAnalytics(analyticsState) {
    if (analyticsState === null) {
      return;
    }

    var serializedParams = [];
    var serializedRefinements = serializeRefinements(_objectSpread({}, analyticsState.state.disjunctiveFacetsRefinements, {}, analyticsState.state.facetsRefinements, {}, analyticsState.state.hierarchicalFacetsRefinements));
    var serializedNumericRefinements = serializeNumericRefinements(analyticsState.state.numericRefinements);

    if (serializedRefinements !== '') {
      serializedParams.push(serializedRefinements);
    }

    if (serializedNumericRefinements !== '') {
      serializedParams.push(serializedNumericRefinements);
    }

    var stringifiedParams = serializedParams.join('&');
    var dataToSend = "Query: ".concat(analyticsState.state.query, ", ").concat(stringifiedParams);

    if (pushPagination === true) {
      dataToSend += ", Page: ".concat(analyticsState.state.page);
    }

    if (lastSentData !== dataToSend) {
      pushFunction(stringifiedParams, analyticsState.state, analyticsState.results);
      lastSentData = dataToSend;
    }
  };

  var pushTimeout;
  var isInitialSearch = true;

  if (pushInitialSearch === true) {
    isInitialSearch = false;
  }

  var onClick = function onClick() {
    sendAnalytics(cachedState);
  };

  var onUnload = function onUnload() {
    sendAnalytics(cachedState);
  };

  return {
    init: function init() {
      if (triggerOnUIInteraction === true) {
        document.addEventListener('click', onClick);
        window.addEventListener('beforeunload', onUnload);
      }
    },
    render: function render(_ref2) {
      var results = _ref2.results,
          state = _ref2.state;

      if (isInitialSearch === true) {
        isInitialSearch = false;
        return;
      }

      cachedState = {
        results: results,
        state: state
      };

      if (pushTimeout) {
        clearTimeout(pushTimeout);
      }

      pushTimeout = window.setTimeout(function () {
        return sendAnalytics(cachedState);
      }, delay);
    },
    dispose: function dispose() {
      if (triggerOnUIInteraction === true) {
        document.removeEventListener('click', onClick);
        window.removeEventListener('beforeunload', onUnload);
      }
    }
  };
}

var _default = analytics;
exports.default = _default;