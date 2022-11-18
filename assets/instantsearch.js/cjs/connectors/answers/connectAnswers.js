"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../lib/utils/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hasFindAnswersMethod(answersIndex) {
  return typeof answersIndex.findAnswers === 'function';
}

var withUsage = (0, _index.createDocumentationMessageGenerator)({
  name: 'answers',
  connector: true
});

var connectAnswers = function connectAnswers(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _index.noop;
  (0, _index.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        queryLanguages = _ref.queryLanguages,
        attributesForPrediction = _ref.attributesForPrediction,
        _ref$nbHits = _ref.nbHits,
        nbHits = _ref$nbHits === void 0 ? 1 : _ref$nbHits,
        _ref$renderDebounceTi = _ref.renderDebounceTime,
        renderDebounceTime = _ref$renderDebounceTi === void 0 ? 100 : _ref$renderDebounceTi,
        _ref$searchDebounceTi = _ref.searchDebounceTime,
        searchDebounceTime = _ref$searchDebounceTi === void 0 ? 100 : _ref$searchDebounceTi,
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$extraParameters = _ref.extraParameters,
        extraParameters = _ref$extraParameters === void 0 ? {} : _ref$extraParameters; // @ts-expect-error checking for the wrong value


    if (!queryLanguages || queryLanguages.length === 0) {
      throw new Error(withUsage('The `queryLanguages` expects an array of strings.'));
    }

    var runConcurrentSafePromise = (0, _index.createConcurrentSafePromise)();
    var lastHits = [];
    var isLoading = false;
    var debouncedRender = (0, _index.debounce)(renderFn, renderDebounceTime); // this does not directly use DebouncedFunction<findAnswers>, since then the generic will disappear

    var debouncedRefine;
    return {
      $$type: 'ais.answers',
      init: function init(initOptions) {
        var state = initOptions.state,
            instantSearchInstance = initOptions.instantSearchInstance;
        var answersIndex = instantSearchInstance.client.initIndex(state.index);

        if (!hasFindAnswersMethod(answersIndex)) {
          throw new Error(withUsage('`algoliasearch` >= 4.8.0 required.'));
        }

        debouncedRefine = (0, _index.debounce)(answersIndex.findAnswers, searchDebounceTime);
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var _this = this;

        var query = renderOptions.state.query;

        if (!query) {
          // renders nothing with empty query
          lastHits = [];
          isLoading = false;
          renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
          return;
        } // render the loader


        lastHits = [];
        isLoading = true;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false); // call /answers API

        runConcurrentSafePromise(debouncedRefine(query, queryLanguages, _objectSpread(_objectSpread({}, extraParameters), {}, {
          nbHits: nbHits,
          attributesForPrediction: attributesForPrediction
        }))).then(function (result) {
          if (!result) {
            // It's undefined when it's debounced.
            return;
          }

          if (escapeHTML && result.hits.length > 0) {
            result.hits = (0, _index.escapeHits)(result.hits);
          }

          var hitsWithAbsolutePosition = (0, _index.addAbsolutePosition)(result.hits, 0, nbHits);
          var hitsWithAbsolutePositionAndQueryID = (0, _index.addQueryID)(hitsWithAbsolutePosition, result.queryID);
          lastHits = hitsWithAbsolutePositionAndQueryID;
          isLoading = false;
          debouncedRender(_objectSpread(_objectSpread({}, _this.getWidgetRenderState(renderOptions)), {}, {
            instantSearchInstance: renderOptions.instantSearchInstance
          }), false);
        });
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          answers: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState() {
        return {
          hits: lastHits,
          isLoading: isLoading,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state;
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        return state;
      }
    };
  };
};

var _default = connectAnswers;
exports.default = _default;