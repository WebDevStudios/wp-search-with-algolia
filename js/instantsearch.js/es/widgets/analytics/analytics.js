function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createDocumentationMessageGenerator, warning } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'analytics'
});

// @major this widget will be removed from the next major version.
var analytics = function analytics(widgetParams) {
  var _ref = widgetParams || {},
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

  process.env.NODE_ENV === 'development' ? warning(false, "`analytics` widget has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor the migration, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/#analytics-widget") : void 0;
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
              // @ts-ignore somehow 'equal' is a string, even though it's a number?
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
    var serializedRefinements = serializeRefinements(_objectSpread(_objectSpread(_objectSpread({}, analyticsState.state.disjunctiveFacetsRefinements), analyticsState.state.facetsRefinements), analyticsState.state.hierarchicalFacetsRefinements));
    var serializedNumericRefinements = serializeNumericRefinements(analyticsState.state.numericRefinements);

    if (serializedRefinements !== '') {
      serializedParams.push(serializedRefinements);
    }

    if (serializedNumericRefinements !== '') {
      serializedParams.push(serializedNumericRefinements);
    }

    var stringifiedParams = serializedParams.join('&');
    var dataToSend = "Query: ".concat(analyticsState.state.query || '', ", ").concat(stringifiedParams);

    if (pushPagination === true) {
      dataToSend += ", Page: ".concat(analyticsState.state.page || 0);
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
    $$type: 'ais.analytics',
    $$widgetType: 'ais.analytics',
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
    },
    getRenderState: function getRenderState(renderState, renderOptions) {
      return _objectSpread(_objectSpread({}, renderState), {}, {
        analytics: this.getWidgetRenderState(renderOptions)
      });
    },
    getWidgetRenderState: function getWidgetRenderState() {
      return {
        widgetParams: widgetParams
      };
    }
  };
};

export default analytics;