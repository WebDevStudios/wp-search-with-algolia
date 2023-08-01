function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["page"],
  _excluded2 = ["clickAnalytics", "userToken"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { escapeHits, TAG_PLACEHOLDER, checkRendering, createDocumentationMessageGenerator, isEqual, addAbsolutePosition, addQueryID, noop, createSendEventForHits, createBindEventForHits, walkIndex } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'infinite-hits',
  connector: true
});
function getStateWithoutPage(state) {
  var _ref = state || {},
    page = _ref.page,
    rest = _objectWithoutProperties(_ref, _excluded);
  return rest;
}
function normalizeState(state) {
  var _ref2 = state || {},
    clickAnalytics = _ref2.clickAnalytics,
    userToken = _ref2.userToken,
    rest = _objectWithoutProperties(_ref2, _excluded2);
  return rest;
}
function getInMemoryCache() {
  var cachedHits = null;
  var cachedState = null;
  return {
    read: function read(_ref3) {
      var state = _ref3.state;
      return isEqual(cachedState, getStateWithoutPage(state)) ? cachedHits : null;
    },
    write: function write(_ref4) {
      var state = _ref4.state,
        hits = _ref4.hits;
      cachedState = getStateWithoutPage(state);
      cachedHits = hits;
    }
  };
}
function extractHitsFromCachedHits(cachedHits) {
  return Object.keys(cachedHits).map(Number).sort(function (a, b) {
    return a - b;
  }).reduce(function (acc, page) {
    return acc.concat(cachedHits[page]);
  }, []);
}
var connectInfiniteHits = function connectInfiniteHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());

  // @TODO: this should be a generic, but a Connector can not yet be generic itself

  return function (widgetParams) {
    var _ref5 = widgetParams || {},
      _ref5$escapeHTML = _ref5.escapeHTML,
      escapeHTML = _ref5$escapeHTML === void 0 ? true : _ref5$escapeHTML,
      _ref5$transformItems = _ref5.transformItems,
      transformItems = _ref5$transformItems === void 0 ? function (items) {
        return items;
      } : _ref5$transformItems,
      _ref5$cache = _ref5.cache,
      cache = _ref5$cache === void 0 ? getInMemoryCache() : _ref5$cache;
    var showPrevious;
    var showMore;
    var sendEvent;
    var bindEvent;
    var getFirstReceivedPage = function getFirstReceivedPage(state, cachedHits) {
      var _state$page = state.page,
        page = _state$page === void 0 ? 0 : _state$page;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.min.apply(Math, [page].concat(_toConsumableArray(pages)));
      }
    };
    var getLastReceivedPage = function getLastReceivedPage(state, cachedHits) {
      var _state$page2 = state.page,
        page = _state$page2 === void 0 ? 0 : _state$page2;
      var pages = Object.keys(cachedHits).map(Number);
      if (pages.length === 0) {
        return page;
      } else {
        return Math.max.apply(Math, [page].concat(_toConsumableArray(pages)));
      }
    };
    var getShowPrevious = function getShowPrevious(helper) {
      return function () {
        // Using the helper's `overrideStateWithoutTriggeringChangeEvent` method
        // avoid updating the browser URL when the user displays the previous page.
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread(_objectSpread({}, helper.state), {}, {
          page: getFirstReceivedPage(helper.state, cache.read({
            state: normalizeState(helper.state)
          }) || {}) - 1
        })).searchWithoutTriggeringOnStateChange();
      };
    };
    var getShowMore = function getShowMore(helper) {
      return function () {
        helper.setPage(getLastReceivedPage(helper.state, cache.read({
          state: normalizeState(helper.state)
        }) || {}) + 1).search();
      };
    };
    return {
      $$type: 'ais.infiniteHits',
      init: function init(initOptions) {
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(renderOptions);
        renderFn(_objectSpread(_objectSpread({}, widgetRenderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
        sendEvent('view:internal', widgetRenderState.currentPageHits);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          infiniteHits: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var results = _ref6.results,
          helper = _ref6.helper,
          parent = _ref6.parent,
          existingState = _ref6.state,
          instantSearchInstance = _ref6.instantSearchInstance;
        var isFirstPage;
        var currentPageHits = [];
        /**
         * We bail out of optimistic UI here, as the cache is based on search
         * parameters, and we don't want to invalidate the cache when the search
         * is loading.
         */
        var state = parent.getPreviousState() || existingState;
        var cachedHits = cache.read({
          state: normalizeState(state)
        }) || {};
        if (!results) {
          showPrevious = getShowPrevious(helper);
          showMore = getShowMore(helper);
          sendEvent = createSendEventForHits({
            instantSearchInstance: instantSearchInstance,
            index: helper.getIndex(),
            widgetType: this.$$type
          });
          bindEvent = createBindEventForHits({
            index: helper.getIndex(),
            widgetType: this.$$type,
            instantSearchInstance: instantSearchInstance
          });
          isFirstPage = state.page === undefined || getFirstReceivedPage(state, cachedHits) === 0;
        } else {
          var _state$disjunctiveFac, _state$hierarchicalFa;
          var _state$page3 = state.page,
            _page = _state$page3 === void 0 ? 0 : _state$page3;
          if (escapeHTML && results.hits.length > 0) {
            results.hits = escapeHits(results.hits);
          }
          var hitsWithAbsolutePosition = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
          var hitsWithAbsolutePositionAndQueryID = addQueryID(hitsWithAbsolutePosition, results.queryID);
          var transformedHits = transformItems(hitsWithAbsolutePositionAndQueryID, {
            results: results
          });

          /*
            With dynamic widgets, facets are not included in the state before their relevant widgets are mounted. Until then, we need to bail out of writing this incomplete state representation in cache.
          */
          var hasDynamicWidgets = false;
          walkIndex(instantSearchInstance.mainIndex, function (indexWidget) {
            if (!hasDynamicWidgets && indexWidget.getWidgets().some(function (_ref7) {
              var $$type = _ref7.$$type;
              return $$type === 'ais.dynamicWidgets';
            })) {
              hasDynamicWidgets = true;
            }
          });
          var hasNoFacets = !((_state$disjunctiveFac = state.disjunctiveFacets) !== null && _state$disjunctiveFac !== void 0 && _state$disjunctiveFac.length) && !(state.facets || []).filter(function (f) {
            return f !== '*';
          }).length && !((_state$hierarchicalFa = state.hierarchicalFacets) !== null && _state$hierarchicalFa !== void 0 && _state$hierarchicalFa.length);
          if (cachedHits[_page] === undefined && !results.__isArtificial && instantSearchInstance.status === 'idle' && !(hasDynamicWidgets && hasNoFacets)) {
            cachedHits[_page] = transformedHits;
            cache.write({
              state: normalizeState(state),
              hits: cachedHits
            });
          }
          currentPageHits = transformedHits;
          isFirstPage = getFirstReceivedPage(state, cachedHits) === 0;
        }
        var hits = extractHitsFromCachedHits(cachedHits);
        var isLastPage = results ? results.nbPages <= getLastReceivedPage(state, cachedHits) + 1 : true;
        return {
          hits: hits,
          currentPageHits: currentPageHits,
          sendEvent: sendEvent,
          bindEvent: bindEvent,
          results: results,
          showPrevious: showPrevious,
          showMore: showMore,
          isFirstPage: isFirstPage,
          isLastPage: isLastPage,
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref8) {
        var state = _ref8.state;
        unmountFn();
        var stateWithoutPage = state.setQueryParameter('page', undefined);
        if (!escapeHTML) {
          return stateWithoutPage;
        }
        return stateWithoutPage.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, undefined));
        }, {}));
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref9) {
        var searchParameters = _ref9.searchParameters;
        var page = searchParameters.page || 0;
        if (!page) {
          // return without adding `page` to uiState
          // because we don't want `page=1` in the URL
          return uiState;
        }
        return _objectSpread(_objectSpread({}, uiState), {}, {
          // The page in the UI state is incremented by one
          // to expose the user value (not `0`).
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref10) {
        var uiState = _ref10.uiState;
        var widgetSearchParameters = searchParameters;
        if (escapeHTML) {
          widgetSearchParameters = searchParameters.setQueryParameters(TAG_PLACEHOLDER);
        }

        // The page in the search parameters is decremented by one
        // to get to the actual parameter value from the UI state.
        var page = uiState.page ? uiState.page - 1 : 0;
        return widgetSearchParameters.setQueryParameter('page', page);
      }
    };
  };
};
export default connectInfiniteHits;