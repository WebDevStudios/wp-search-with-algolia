function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import EventEmitter from '@algolia/events';
import algoliasearchHelper from 'algoliasearch-helper';
import { createInsightsMiddleware } from "../middlewares/createInsightsMiddleware.js";
import { createMetadataMiddleware, isMetadataEnabled } from "../middlewares/createMetadataMiddleware.js";
import { createRouterMiddleware } from "../middlewares/createRouterMiddleware.js";
import index from "../widgets/index/index.js";
import createHelpers from "./createHelpers.js";
import { createDocumentationMessageGenerator, createDocumentationLink, defer, hydrateRecommendCache, hydrateSearchClient, noop, warning, setIndexHelperState, isIndexWidget } from "./utils/index.js";
import version from "./version.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'instantsearch'
});
function defaultCreateURL() {
  return '#';
}

// this purposely breaks typescript's type inference to ensure it's not used
// as it's used for a default parameter for example
// source: https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546

/**
 * Global options for an InstantSearch instance.
 */

export var INSTANTSEARCH_FUTURE_DEFAULTS = {
  preserveSharedStateOnUnmount: false,
  persistHierarchicalRootCount: false
};

/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * It emits the 'render' event every time a search is done
 */
var InstantSearch = /*#__PURE__*/function (_EventEmitter) {
  _inherits(InstantSearch, _EventEmitter);
  var _super = _createSuper(InstantSearch);
  function InstantSearch(options) {
    var _options$future2;
    var _this;
    _classCallCheck(this, InstantSearch);
    _this = _super.call(this);

    // prevent `render` event listening from causing a warning
    _defineProperty(_assertThisInitialized(_this), "client", void 0);
    _defineProperty(_assertThisInitialized(_this), "indexName", void 0);
    _defineProperty(_assertThisInitialized(_this), "compositionID", void 0);
    _defineProperty(_assertThisInitialized(_this), "insightsClient", void 0);
    _defineProperty(_assertThisInitialized(_this), "onStateChange", null);
    _defineProperty(_assertThisInitialized(_this), "future", void 0);
    _defineProperty(_assertThisInitialized(_this), "helper", void 0);
    _defineProperty(_assertThisInitialized(_this), "mainHelper", void 0);
    _defineProperty(_assertThisInitialized(_this), "mainIndex", void 0);
    _defineProperty(_assertThisInitialized(_this), "started", void 0);
    _defineProperty(_assertThisInitialized(_this), "templatesConfig", void 0);
    _defineProperty(_assertThisInitialized(_this), "renderState", {});
    _defineProperty(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);
    _defineProperty(_assertThisInitialized(_this), "_searchStalledTimer", void 0);
    _defineProperty(_assertThisInitialized(_this), "_initialUiState", void 0);
    _defineProperty(_assertThisInitialized(_this), "_initialResults", void 0);
    _defineProperty(_assertThisInitialized(_this), "_createURL", void 0);
    _defineProperty(_assertThisInitialized(_this), "_searchFunction", void 0);
    _defineProperty(_assertThisInitialized(_this), "_mainHelperSearch", void 0);
    _defineProperty(_assertThisInitialized(_this), "_hasSearchWidget", false);
    _defineProperty(_assertThisInitialized(_this), "_hasRecommendWidget", false);
    _defineProperty(_assertThisInitialized(_this), "_insights", void 0);
    _defineProperty(_assertThisInitialized(_this), "middleware", []);
    _defineProperty(_assertThisInitialized(_this), "sendEventToInsights", void 0);
    /**
     * The status of the search. Can be "idle", "loading", "stalled", or "error".
     */
    _defineProperty(_assertThisInitialized(_this), "status", 'idle');
    /**
     * The last returned error from the Search API.
     * The error gets cleared when the next valid search response is rendered.
     */
    _defineProperty(_assertThisInitialized(_this), "error", undefined);
    _defineProperty(_assertThisInitialized(_this), "scheduleSearch", defer(function () {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));
    _defineProperty(_assertThisInitialized(_this), "scheduleRender", defer(function () {
      var _this$mainHelper;
      var shouldResetStatus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!((_this$mainHelper = _this.mainHelper) !== null && _this$mainHelper !== void 0 && _this$mainHelper.hasPendingRequests())) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        if (shouldResetStatus) {
          _this.status = 'idle';
          _this.error = undefined;
        }
      }
      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized(_this)
      });
      _this.emit('render');
    }));
    _defineProperty(_assertThisInitialized(_this), "onInternalStateChange", defer(function () {
      var nextUiState = _this.mainIndex.getWidgetUiState({});
      _this.middleware.forEach(function (_ref) {
        var instance = _ref.instance;
        instance.onStateChange({
          uiState: nextUiState
        });
      });
    }));
    _this.setMaxListeners(100);
    var _options$indexName = options.indexName,
      indexName = _options$indexName === void 0 ? '' : _options$indexName,
      compositionID = options.compositionID,
      numberLocale = options.numberLocale,
      _options$initialUiSta = options.initialUiState,
      initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta,
      _options$routing = options.routing,
      routing = _options$routing === void 0 ? null : _options$routing,
      _options$insights = options.insights,
      insights = _options$insights === void 0 ? undefined : _options$insights,
      searchFunction = options.searchFunction,
      _options$stalledSearc = options.stalledSearchDelay,
      stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
      _options$searchClient = options.searchClient,
      searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
      _options$insightsClie = options.insightsClient,
      insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie,
      _options$onStateChang = options.onStateChange,
      onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang,
      _options$future = options.future,
      future = _options$future === void 0 ? _objectSpread(_objectSpread({}, INSTANTSEARCH_FUTURE_DEFAULTS), options.future || {}) : _options$future;
    if (searchClient === null) {
      throw new Error(withUsage('The `searchClient` option is required.'));
    }
    if (typeof searchClient.search !== 'function') {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }
    if (typeof searchClient.addAlgoliaAgent === 'function') {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(version, ")"));
    }
    process.env.NODE_ENV === 'development' ? warning(insightsClient === null, "`insightsClient` property has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `insights` middleware.\n\nFor more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/") : void 0;
    if (insightsClient && typeof insightsClient !== 'function') {
      throw new Error(withUsage('The `insightsClient` option should be a function.'));
    }
    process.env.NODE_ENV === 'development' ? warning(!options.searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(options.searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat(createDocumentationLink({
      name: 'configure'
    }))) : void 0;
    if (process.env.NODE_ENV === 'development' && ((_options$future2 = options.future) === null || _options$future2 === void 0 ? void 0 : _options$future2.preserveSharedStateOnUnmount) === undefined) {
      // eslint-disable-next-line no-console
      console.info("Starting from the next major version, InstantSearch will change how widgets state is preserved when they are removed. InstantSearch will keep the state of unmounted widgets to be usable by other widgets with the same attribute.\n\nWe recommend setting `future.preserveSharedStateOnUnmount` to true to adopt this change today.\nTo stay with the current behaviour and remove this warning, set the option to false.\n\nSee documentation: ".concat(createDocumentationLink({
        name: 'instantsearch'
      }), "#widget-param-future\n          "));
    }
    _this.client = searchClient;
    _this.future = future;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.compositionID = compositionID;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = index({
      // we use an index widget to render compositions
      // this only works because there's only one composition index allow for now
      indexName: _this.compositionID || _this.indexName
    });
    _this.onStateChange = onStateChange;
    _this.started = false;
    _this.templatesConfig = {
      helpers: createHelpers({
        numberLocale: numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;
    _this._searchStalledTimer = null;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;
    _this._initialResults = null;
    _this._insights = insights;
    if (searchFunction) {
      process.env.NODE_ENV === 'development' ? warning(false, "The `searchFunction` option is deprecated. Use `onStateChange` instead.") : void 0;
      _this._searchFunction = searchFunction;
    }
    _this.sendEventToInsights = noop;
    if (routing) {
      var routerOptions = typeof routing === 'boolean' ? {} : routing;
      routerOptions.$$internal = true;
      _this.use(createRouterMiddleware(routerOptions));
    }

    // This is the default Insights middleware,
    // added when `insights` is set to true by the user.
    // Any user-provided middleware will be added later and override this one.
    if (insights) {
      var insightsOptions = typeof insights === 'boolean' ? {} : insights;
      insightsOptions.$$internal = true;
      _this.use(createInsightsMiddleware(insightsOptions));
    }
    if (isMetadataEnabled()) {
      _this.use(createMetadataMiddleware({
        $$internal: true
      }));
    }
    return _this;
  }

  /**
   * Hooks a middleware into the InstantSearch lifecycle.
   */
  _createClass(InstantSearch, [{
    key: "_isSearchStalled",
    get:
    /**
     * @deprecated use `status === 'stalled'` instead
     */
    function get() {
      process.env.NODE_ENV === 'development' ? warning(false, "`InstantSearch._isSearchStalled` is deprecated and will be removed in InstantSearch.js 5.0.\n\nUse `InstantSearch.status === \"stalled\"` instead.") : void 0;
      return this.status === 'stalled';
    }
  }, {
    key: "use",
    value: function use() {
      var _this2 = this;
      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }
      var newMiddlewareList = middleware.map(function (fn) {
        var newMiddleware = _objectSpread({
          $$type: '__unknown__',
          $$internal: false,
          subscribe: noop,
          started: noop,
          unsubscribe: noop,
          onStateChange: noop
        }, fn({
          instantSearchInstance: _this2
        }));
        _this2.middleware.push({
          creator: fn,
          instance: newMiddleware
        });
        return newMiddleware;
      });

      // If the instance has already started, we directly subscribe the
      // middleware so they're notified of changes.
      if (this.started) {
        newMiddlewareList.forEach(function (m) {
          m.subscribe();
          m.started();
        });
      }
      return this;
    }

    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
  }, {
    key: "unuse",
    value: function unuse() {
      for (var _len2 = arguments.length, middlewareToUnuse = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        middlewareToUnuse[_key2] = arguments[_key2];
      }
      this.middleware.filter(function (m) {
        return middlewareToUnuse.includes(m.creator);
      }).forEach(function (m) {
        return m.instance.unsubscribe();
      });
      this.middleware = this.middleware.filter(function (m) {
        return !middlewareToUnuse.includes(m.creator);
      });
      return this;
    }

    // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now
  }, {
    key: "EXPERIMENTAL_use",
    value: function EXPERIMENTAL_use() {
      process.env.NODE_ENV === 'development' ? warning(false, 'The middleware API is now considered stable, so we recommend replacing `EXPERIMENTAL_use` with `use` before upgrading to the next major version.') : void 0;
      return this.use.apply(this, arguments);
    }

    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
  }, {
    key: "addWidget",
    value: function addWidget(widget) {
      process.env.NODE_ENV === 'development' ? warning(false, 'addWidget will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`') : void 0;
      return this.addWidgets([widget]);
    }

    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets. Please use `addWidget`.'));
      }
      if (widgets.some(function (widget) {
        return typeof widget.init !== 'function' && typeof widget.render !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
      }
      if (this.compositionID && widgets.some(isIndexWidget)) {
        throw new Error(withUsage('The `index` widget cannot be used with a composition-based InstantSearch implementation.'));
      }
      this.mainIndex.addWidgets(widgets);
      return this;
    }

    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
      process.env.NODE_ENV === 'development' ? warning(false, 'removeWidget will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`') : void 0;
      return this.removeWidgets([widget]);
    }

    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets. Please use `removeWidget`.'));
      }
      if (widgets.some(function (widget) {
        return typeof widget.dispose !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `dispose` method.'));
      }
      this.mainIndex.removeWidgets(widgets);
      return this;
    }

    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search.
     */
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;
      if (this.started) {
        throw new Error(withUsage('The `start` method has already been called once.'));
      }

      // This Helper is used for the queries, we don't care about its state. The
      // states are managed at the `index` level. We use this Helper to create
      // DerivedHelper scoped into the `index` widgets.
      // In Vue InstantSearch' hydrate, a main helper gets set before start, so
      // we need to respect this helper as a way to keep all listeners correct.
      var mainHelper = this.mainHelper || algoliasearchHelper(this.client, this.indexName, undefined, {
        persistHierarchicalRootCount: this.future.persistHierarchicalRootCount
      });
      if (this.compositionID) {
        mainHelper.searchForFacetValues = mainHelper.searchForCompositionFacetValues.bind(mainHelper);
      }
      mainHelper.search = function () {
        _this3.status = 'loading';
        _this3.scheduleRender(false);
        process.env.NODE_ENV === 'development' ? warning(Boolean(_this3.indexName) || Boolean(_this3.compositionID) || _this3.mainIndex.getWidgets().some(isIndexWidget), 'No indexName provided, nor an explicit index widget in the widgets tree. This is required to be able to display results.') : void 0;

        // This solution allows us to keep the exact same API for the users but
        // under the hood, we have a different implementation. It should be
        // completely transparent for the rest of the codebase. Only this module
        // is impacted.
        if (_this3._hasSearchWidget) {
          if (_this3.compositionID) {
            mainHelper.searchWithComposition();
          } else {
            mainHelper.searchOnlyWithDerivedHelpers();
          }
        }
        if (_this3._hasRecommendWidget) {
          mainHelper.recommend();
        }
        return mainHelper;
      };
      if (this._searchFunction) {
        // this client isn't used to actually search, but required for the helper
        // to not throw errors
        var fakeClient = {
          search: function search() {
            return new Promise(noop);
          }
        };
        this._mainHelperSearch = mainHelper.search.bind(mainHelper);
        mainHelper.search = function () {
          var mainIndexHelper = _this3.mainIndex.getHelper();
          var searchFunctionHelper = algoliasearchHelper(fakeClient, mainIndexHelper.state.index, mainIndexHelper.state);
          searchFunctionHelper.once('search', function (_ref2) {
            var state = _ref2.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);
            _this3._mainHelperSearch();
          });
          // Forward state changes from `searchFunctionHelper` to `mainIndexHelper`
          searchFunctionHelper.on('change', function (_ref3) {
            var state = _ref3.state;
            mainIndexHelper.setState(state);
          });
          _this3._searchFunction(searchFunctionHelper);
          return mainHelper;
        };
      }

      // Only the "main" Helper emits the `error` event vs the one for `search`
      // and `results` that are also emitted on the derived one.
      mainHelper.on('error', function (_ref4) {
        var error = _ref4.error;
        if (!(error instanceof Error)) {
          // typescript lies here, error is in some cases { name: string, message: string }
          var err = error;
          error = Object.keys(err).reduce(function (acc, key) {
            acc[key] = err[key];
            return acc;
          }, new Error(err.message));
        }
        // If an error is emitted, it is re-thrown by events. In previous versions
        // we emitted {error}, which is thrown as:
        // "Uncaught, unspecified \"error\" event. ([object Object])"
        // To avoid breaking changes, we make the error available in both
        // `error` and `error.error`
        // @MAJOR emit only error
        error.error = error;
        _this3.error = error;
        _this3.status = 'error';
        _this3.scheduleRender(false);

        // This needs to execute last because it throws the error.
        _this3.emit('error', error);
      });
      this.mainHelper = mainHelper;
      this.middleware.forEach(function (_ref5) {
        var instance = _ref5.instance;
        instance.subscribe();
      });
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      if (this._initialResults) {
        hydrateSearchClient(this.client, this._initialResults);
        hydrateRecommendCache(this.mainHelper, this._initialResults);
        var originalScheduleSearch = this.scheduleSearch;
        // We don't schedule a first search when initial results are provided
        // because we already have the results to render. This skips the initial
        // network request on the browser on `start`.
        this.scheduleSearch = defer(noop);
        // We also skip the initial network request when widgets are dynamically
        // added in the first tick (that's the case in all the framework-based flavors).
        // When we add a widget to `index`, it calls `scheduleSearch`. We can rely
        // on our `defer` util to restore the original `scheduleSearch` value once
        // widgets are added to hook back to the regular lifecycle.
        defer(function () {
          _this3.scheduleSearch = originalScheduleSearch;
        })();
      }
      // We only schedule a search when widgets have been added before `start()`
      // because there are listeners that can use these results.
      // This is especially useful in framework-based flavors that wait for
      // dynamically-added widgets to trigger a network request. It avoids
      // having to batch this initial network request with the one coming from
      // `addWidgets()`.
      // Later, we could also skip `index()` widgets and widgets that don't read
      // the results, but this is an optimization that has a very low impact for now.
      else if (this.mainIndex.getWidgets().length > 0) {
        this.scheduleSearch();
      }

      // Keep the previous reference for legacy purpose, some pattern use
      // the direct Helper access `search.helper` (e.g multi-index).
      this.helper = this.mainIndex.getHelper();

      // track we started the search if we add more widgets,
      // to init them directly after add
      this.started = true;
      this.middleware.forEach(function (_ref6) {
        var instance = _ref6.instance;
        instance.started();
      });

      // This is the automatic Insights middleware,
      // added when `insights` is unset and the initial results possess `queryID`.
      // Any user-provided middleware will be added later and override this one.
      if (typeof this._insights === 'undefined') {
        mainHelper.derivedHelpers[0].once('result', function () {
          var hasAutomaticInsights = _this3.mainIndex.getScopedResults().some(function (_ref7) {
            var results = _ref7.results;
            return results === null || results === void 0 ? void 0 : results._automaticInsights;
          });
          if (hasAutomaticInsights) {
            _this3.use(createInsightsMiddleware({
              $$internal: true,
              $$automatic: true
            }));
          }
        });
      }
    }

    /**
     * Removes all widgets without triggering a search afterwards.
     * @return {undefined} This method does not return anything
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this$mainHelper2;
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose();

      // You can not start an instance two times, therefore a disposed instance
      // needs to set started as false otherwise this can not be restarted at a
      // later point.
      this.started = false;

      // The helper needs to be reset to perform the next search from a fresh state.
      // If not reset, it would use the state stored before calling `dispose()`.
      this.removeAllListeners();
      (_this$mainHelper2 = this.mainHelper) === null || _this$mainHelper2 === void 0 ? void 0 : _this$mainHelper2.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function (_ref8) {
        var instance = _ref8.instance;
        instance.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;
      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function () {
          _this4.status = 'stalled';
          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }

    /**
     * Set the UI state and trigger a search.
     * @param uiState The next UI state or a function computing it from the current state
     * @param callOnStateChange private parameter used to know if the method is called from a state change
     */
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      var _this5 = this;
      var callOnStateChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `setUiState`.'));
      }

      // We refresh the index UI state to update the local UI state that the
      // main index passes to the function form of `setUiState`.
      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === 'function' ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;
      if (this.onStateChange && callOnStateChange) {
        this.onStateChange({
          uiState: nextUiState,
          setUiState: function setUiState(finalUiState) {
            setIndexHelperState(typeof finalUiState === 'function' ? finalUiState(nextUiState) : finalUiState, _this5.mainIndex);
            _this5.scheduleSearch();
            _this5.onInternalStateChange();
          }
        });
      } else {
        setIndexHelperState(nextUiState, this.mainIndex);
        this.scheduleSearch();
        this.onInternalStateChange();
      }
    }
  }, {
    key: "getUiState",
    value: function getUiState() {
      if (this.started) {
        // We refresh the index UI state to make sure changes from `refine` are taken in account
        this.mainIndex.refreshUiState();
      }
      return this.mainIndex.getWidgetUiState({});
    }
  }, {
    key: "createURL",
    value: function createURL() {
      var nextState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.started) {
        throw new Error(withUsage('The `start` method needs to be called before `createURL`.'));
      }
      return this._createURL(nextState);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `refresh`.'));
      }
      this.mainHelper.clearCache().search();
    }
  }]);
  return InstantSearch;
}(EventEmitter);
export default InstantSearch;