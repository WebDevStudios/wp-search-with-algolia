'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Pushes analytics data to any analytic service
 * @function analytics
 * @param  {Function} [options.pushFunction] Push function called when data are supposed to be pushed to analytic service
 * @param  {int} [options.delay=3000] Number of milliseconds between last search key stroke and calling pushFunction
 * @param  {boolean} [options.triggerOnUIInteraction=false] Trigger pushFunction after click on page or redirecting the page
 * @param  {boolean} [options.pushInitialSearch=true] Trigger pushFunction after the initial search
 * @return {Object}
 */
var usage = 'Usage:\nanalytics({\n  pushFunction,\n  [ delay=3000 ],\n  [ triggerOnUIInteraction=false ],\n  [ pushInitialSearch=true ]\n})';
function analytics() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      pushFunction = _ref.pushFunction,
      _ref$delay = _ref.delay,
      delay = _ref$delay === undefined ? 3000 : _ref$delay,
      _ref$triggerOnUIInter = _ref.triggerOnUIInteraction,
      triggerOnUIInteraction = _ref$triggerOnUIInter === undefined ? false : _ref$triggerOnUIInter,
      _ref$pushInitialSearc = _ref.pushInitialSearch,
      pushInitialSearch = _ref$pushInitialSearc === undefined ? true : _ref$pushInitialSearc;

  if (!pushFunction) {
    throw new Error(usage);
  }

  var cachedState = null;

  var serializeRefinements = function serializeRefinements(obj) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        var values = obj[p].join('+');
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(p) + '_' + encodeURIComponent(values));
      }
    }

    return str.join('&');
  };

  var serializeNumericRefinements = function serializeNumericRefinements(numericRefinements) {
    var numericStr = [];

    for (var attr in numericRefinements) {
      if (numericRefinements.hasOwnProperty(attr)) {
        var filter = numericRefinements[attr];

        if (filter.hasOwnProperty('>=') && filter.hasOwnProperty('<=')) {
          if (filter['>='][0] === filter['<='][0]) {
            numericStr.push(attr + '=' + attr + '_' + filter['>=']);
          } else {
            numericStr.push(attr + '=' + attr + '_' + filter['>='] + 'to' + filter['<=']);
          }
        } else if (filter.hasOwnProperty('>=')) {
          numericStr.push(attr + '=' + attr + '_from' + filter['>=']);
        } else if (filter.hasOwnProperty('<=')) {
          numericStr.push(attr + '=' + attr + '_to' + filter['<=']);
        } else if (filter.hasOwnProperty('=')) {
          var equals = [];
          for (var equal in filter['=']) {
            if (filter['='].hasOwnProperty(equal)) {
              // eslint-disable-line max-depth
              equals.push(filter['='][equal]);
            }
          }

          numericStr.push(attr + '=' + attr + '_' + equals.join('-'));
        }
      }
    }

    return numericStr.join('&');
  };

  var lastSentData = '';
  var sendAnalytics = function sendAnalytics(state) {
    if (state === null) {
      return;
    }

    var formattedParams = [];

    var serializedRefinements = serializeRefinements(Object.assign({}, state.state.disjunctiveFacetsRefinements, state.state.facetsRefinements, state.state.hierarchicalFacetsRefinements));

    var serializedNumericRefinements = serializeNumericRefinements(state.state.numericRefinements);

    if (serializedRefinements !== '') {
      formattedParams.push(serializedRefinements);
    }

    if (serializedNumericRefinements !== '') {
      formattedParams.push(serializedNumericRefinements);
    }

    formattedParams = formattedParams.join('&');

    var dataToSend = 'Query: ' + state.state.query + ', ' + formattedParams;

    if (lastSentData !== dataToSend) {
      pushFunction(formattedParams, state.state, state.results);

      lastSentData = dataToSend;
    }
  };

  var pushTimeout = void 0;

  var isInitialSearch = true;
  if (pushInitialSearch === true) {
    isInitialSearch = false;
  }

  return {
    init: function init() {
      if (triggerOnUIInteraction === true) {
        document.addEventListener('click', function () {
          sendAnalytics(cachedState);
        });

        window.addEventListener('beforeunload', function () {
          sendAnalytics(cachedState);
        });
      }
    },
    render: function render(_ref2) {
      var results = _ref2.results,
          state = _ref2.state;

      if (isInitialSearch === true) {
        isInitialSearch = false;

        return;
      }

      cachedState = { results: results, state: state };

      if (pushTimeout) {
        clearTimeout(pushTimeout);
      }

      pushTimeout = setTimeout(function () {
        return sendAnalytics(cachedState);
      }, delay);
    }
  };
}

exports.default = analytics;