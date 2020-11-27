function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import escapeHits, { TAG_PLACEHOLDER } from '../../lib/escape-highlight';
import { checkRendering, createDocumentationMessageGenerator, isEqual, addAbsolutePosition, addQueryID, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'infinite-hits',
  connector: true
});

var connectInfiniteHits = function connectInfiniteHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$escapeHTML = _ref.escapeHTML,
        escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems,
        _ref$showPrevious = _ref.showPrevious,
        hasShowPrevious = _ref$showPrevious === void 0 ? false : _ref$showPrevious;

    var hitsCache = [];
    var firstReceivedPage = Infinity;
    var lastReceivedPage = -1;
    var prevState;
    var showPrevious;
    var showMore;

    var getShowPrevious = function getShowPrevious(helper) {
      return function () {
        // Using the helper's `overrideStateWithoutTriggeringChangeEvent` method
        // avoid updating the browser URL when the user displays the previous page.
        helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread({}, helper.state, {
          page: firstReceivedPage - 1
        })).search();
      };
    };

    var getShowMore = function getShowMore(helper) {
      return function () {
        helper.setPage(lastReceivedPage + 1).search();
      };
    };

    return {
      getConfiguration: function getConfiguration() {
        return escapeHTML ? TAG_PLACEHOLDER : {};
      },
      init: function init(_ref2) {
        var instantSearchInstance = _ref2.instantSearchInstance,
            helper = _ref2.helper;
        showPrevious = getShowPrevious(helper);
        showMore = getShowMore(helper);
        firstReceivedPage = helper.state.page;
        lastReceivedPage = helper.state.page;
        renderFn({
          hits: hitsCache,
          results: undefined,
          showPrevious: showPrevious,
          showMore: showMore,
          isFirstPage: firstReceivedPage === 0,
          isLastPage: true,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref3) {
        var results = _ref3.results,
            state = _ref3.state,
            instantSearchInstance = _ref3.instantSearchInstance;

        // Reset cache and received pages if anything changes in the
        // search state, except for the page.
        //
        // We're doing this to "reset" the widget if a refinement or the
        // query changes between renders, but we want to keep it as is
        // if we only change pages.
        var page = state.page,
            currentState = _objectWithoutProperties(state, ["page"]);

        if (!isEqual(currentState, prevState)) {
          hitsCache = [];
          firstReceivedPage = page;
          lastReceivedPage = page;
          prevState = currentState;
        }

        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }

        var initialEscaped = results.hits.__escaped;
        results.hits = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        results.hits = addQueryID(results.hits, results.queryID);
        results.hits = transformItems(results.hits); // Make sure the escaped tag stays after mapping over the hits.
        // This prevents the hits from being double-escaped if there are multiple
        // hits widgets mounted on the page.

        results.hits.__escaped = initialEscaped;

        if (lastReceivedPage < page || !hitsCache.length) {
          hitsCache = [].concat(_toConsumableArray(hitsCache), _toConsumableArray(results.hits));
          lastReceivedPage = page;
        } else if (firstReceivedPage > page) {
          hitsCache = [].concat(_toConsumableArray(results.hits), _toConsumableArray(hitsCache));
          firstReceivedPage = page;
        }

        var isFirstPage = firstReceivedPage === 0;
        var isLastPage = results.nbPages <= results.page + 1;
        renderFn({
          hits: hitsCache,
          results: results,
          showPrevious: showPrevious,
          showMore: showMore,
          isFirstPage: isFirstPage,
          isLastPage: isLastPage,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getWidgetState: function getWidgetState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var page = searchParameters.page;

        if (!hasShowPrevious || page === 0 || page + 1 === uiState.page) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          page: page + 1
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;

        if (!hasShowPrevious) {
          return searchParameters;
        }

        var uiPage = uiState.page;

        if (uiPage) {
          return searchParameters.setQueryParameter('page', uiPage - 1);
        }

        return searchParameters.setQueryParameter('page', 0);
      }
    };
  };
};

export default connectInfiniteHits;