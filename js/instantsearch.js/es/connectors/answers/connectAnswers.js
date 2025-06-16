function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { checkRendering, createDocumentationMessageGenerator, createConcurrentSafePromise, addQueryID, debounce, addAbsolutePosition, noop, escapeHits } from "../../lib/utils/index.js";
function hasFindAnswersMethod(answersIndex) {
  return typeof answersIndex.findAnswers === 'function';
}
var withUsage = createDocumentationMessageGenerator({
  name: 'answers',
  connector: true
});
/**
 * @deprecated the answers service is no longer offered, and this widget will be removed in InstantSearch.js v5
 */
var connectAnswers = function connectAnswers(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
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
      extraParameters = _ref$extraParameters === void 0 ? {} : _ref$extraParameters;

    // @ts-expect-error checking for the wrong value
    if (!queryLanguages || queryLanguages.length === 0) {
      throw new Error(withUsage('The `queryLanguages` expects an array of strings.'));
    }
    var runConcurrentSafePromise = createConcurrentSafePromise();
    var lastHits = [];
    var isLoading = false;
    var debouncedRender = debounce(renderFn, renderDebounceTime);
    var debouncedRefine;
    return {
      $$type: 'ais.answers',
      init: function init(initOptions) {
        var state = initOptions.state,
          instantSearchInstance = initOptions.instantSearchInstance;
        if (typeof instantSearchInstance.client.initIndex !== 'function') {
          throw new Error(withUsage('`algoliasearch` <5 required.'));
        }
        var answersIndex = instantSearchInstance.client.initIndex(state.index);
        if (!hasFindAnswersMethod(answersIndex)) {
          throw new Error(withUsage('`algoliasearch` >= 4.8.0 required.'));
        }
        debouncedRefine = debounce(answersIndex.findAnswers, searchDebounceTime);
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
        }

        // render the loader
        lastHits = [];
        isLoading = true;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);

        // call /answers API
        runConcurrentSafePromise(debouncedRefine(query, queryLanguages, _objectSpread(_objectSpread({}, extraParameters), {}, {
          nbHits: nbHits,
          attributesForPrediction: attributesForPrediction
        }))).then(function (result) {
          if (!result) {
            // It's undefined when it's debounced.
            return;
          }
          if (escapeHTML && result.hits.length > 0) {
            result.hits = escapeHits(result.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(result.hits, 0, nbHits);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, result.queryID);
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
export default connectAnswers;