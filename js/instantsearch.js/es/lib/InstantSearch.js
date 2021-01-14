function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import algoliasearchHelper from 'algoliasearch-helper';
import EventEmitter from 'events';
import index, { isIndexWidget } from '../widgets/index/index';
import version from './version';
import createHelpers from './createHelpers';
import { createDocumentationMessageGenerator, createDocumentationLink, defer, noop, warning, checkIndexUiState } from './utils';
import { createRouterMiddleware } from '../middlewares/createRouterMiddleware';
var withUsage = createDocumentationMessageGenerator({
  name: 'instantsearch'
});

function defaultCreateURL() {
  return '#';
}
/**
 * Global options for an InstantSearch instance.
 */


/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * It emits the 'render' event every time a search is done
 */
var InstantSearch =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(InstantSearch, _EventEmitter);

  function InstantSearch(options) {
    var _this;

    _classCallCheck(this, InstantSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstantSearch).call(this));

    _defineProperty(_assertThisInitialized(_this), "client", void 0);

    _defineProperty(_assertThisInitialized(_this), "indexName", void 0);

    _defineProperty(_assertThisInitialized(_this), "insightsClient", void 0);

    _defineProperty(_assertThisInitialized(_this), "onStateChange", null);

    _defineProperty(_assertThisInitialized(_this), "helper", void 0);

    _defineProperty(_assertThisInitialized(_this), "mainHelper", void 0);

    _defineProperty(_assertThisInitialized(_this), "mainIndex", void 0);

    _defineProperty(_assertThisInitialized(_this), "started", void 0);

    _defineProperty(_assertThisInitialized(_this), "templatesConfig", void 0);

    _defineProperty(_assertThisInitialized(_this), "renderState", {});

    _defineProperty(_assertThisInitialized(_this), "_stalledSearchDelay", void 0);

    _defineProperty(_assertThisInitialized(_this), "_searchStalledTimer", void 0);

    _defineProperty(_assertThisInitialized(_this), "_isSearchStalled", void 0);

    _defineProperty(_assertThisInitialized(_this), "_initialUiState", void 0);

    _defineProperty(_assertThisInitialized(_this), "_createURL", void 0);

    _defineProperty(_assertThisInitialized(_this), "_searchFunction", void 0);

    _defineProperty(_assertThisInitialized(_this), "_mainHelperSearch", void 0);

    _defineProperty(_assertThisInitialized(_this), "middleware", []);

    _defineProperty(_assertThisInitialized(_this), "sendEventToInsights", void 0);

    _defineProperty(_assertThisInitialized(_this), "scheduleSearch", defer(function () {
      if (_this.started) {
        _this.mainHelper.search();
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "scheduleRender", defer(function () {
      if (!_this.mainHelper.hasPendingRequests()) {
        clearTimeout(_this._searchStalledTimer);
        _this._searchStalledTimer = null;
        _this._isSearchStalled = false;
      }

      _this.mainIndex.render({
        instantSearchInstance: _assertThisInitialized(_this)
      });

      _this.emit('render');
    }));

    _defineProperty(_assertThisInitialized(_this), "onInternalStateChange", function () {
      var nextUiState = _this.mainIndex.getWidgetUiState({});

      _this.middleware.forEach(function (m) {
        m.onStateChange({
          uiState: nextUiState
        });
      });
    });

    var _options$indexName = options.indexName,
        indexName = _options$indexName === void 0 ? null : _options$indexName,
        numberLocale = options.numberLocale,
        _options$initialUiSta = options.initialUiState,
        initialUiState = _options$initialUiSta === void 0 ? {} : _options$initialUiSta,
        _options$routing = options.routing,
        routing = _options$routing === void 0 ? null : _options$routing,
        searchFunction = options.searchFunction,
        _options$stalledSearc = options.stalledSearchDelay,
        stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
        _options$searchClient = options.searchClient,
        searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
        _options$insightsClie = options.insightsClient,
        insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie,
        _options$onStateChang = options.onStateChange,
        onStateChange = _options$onStateChang === void 0 ? null : _options$onStateChang;

    if (indexName === null) {
      throw new Error(withUsage('The `indexName` option is required.'));
    }

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
    _this.client = searchClient;
    _this.insightsClient = insightsClient;
    _this.indexName = indexName;
    _this.helper = null;
    _this.mainHelper = null;
    _this.mainIndex = index({
      indexName: indexName
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
    _this._isSearchStalled = false;
    _this._createURL = defaultCreateURL;
    _this._initialUiState = initialUiState;

    if (searchFunction) {
      _this._searchFunction = searchFunction;
    }

    _this.sendEventToInsights = noop;

    if (routing) {
      var routerOptions = typeof routing === 'boolean' ? undefined : routing;

      _this.use(createRouterMiddleware(routerOptions));
    }

    return _this;
  }
  /**
   * Hooks a middleware into the InstantSearch lifecycle.
   *
   * This method is considered as experimental and is subject to change in
   * minor versions.
   */


  _createClass(InstantSearch, [{
    key: "use",
    value: function use() {
      var _this2 = this;

      for (var _len = arguments.length, middleware = new Array(_len), _key = 0; _key < _len; _key++) {
        middleware[_key] = arguments[_key];
      }

      var newMiddlewareList = middleware.map(function (fn) {
        var newMiddleware = fn({
          instantSearchInstance: _this2
        });

        _this2.middleware.push(newMiddleware);

        return newMiddleware;
      }); // If the instance has already started, we directly subscribe the
      // middleware so they're notified of changes.

      if (this.started) {
        newMiddlewareList.forEach(function (m) {
          m.subscribe();
        });
      }

      return this;
    } // @major we shipped with EXPERIMENTAL_use, but have changed that to just `use` now

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
     * first search. This method should be called after all widgets have been added
     * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
     * widgets after the start as an **EXPERIMENTAL** feature.
     */

  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      if (this.started) {
        throw new Error(withUsage('The `start` method has already been called once.'));
      } // This Helper is used for the queries, we don't care about its state. The
      // states are managed at the `index` level. We use this Helper to create
      // DerivedHelper scoped into the `index` widgets.


      var mainHelper = algoliasearchHelper(this.client, this.indexName);

      mainHelper.search = function () {
        // This solution allows us to keep the exact same API for the users but
        // under the hood, we have a different implementation. It should be
        // completely transparent for the rest of the codebase. Only this module
        // is impacted.
        return mainHelper.searchOnlyWithDerivedHelpers();
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
          searchFunctionHelper.once('search', function (_ref) {
            var state = _ref.state;
            mainIndexHelper.overrideStateWithoutTriggeringChangeEvent(state);

            _this3._mainHelperSearch();
          }); // Forward state changes from `searchFunctionHelper` to `mainIndexHelper`

          searchFunctionHelper.on('change', function (_ref2) {
            var state = _ref2.state;
            mainIndexHelper.setState(state);
          });

          _this3._searchFunction(searchFunctionHelper);

          return mainHelper;
        };
      } // Only the "main" Helper emits the `error` event vs the one for `search`
      // and `results` that are also emitted on the derived one.


      mainHelper.on('error', function (_ref3) {
        var error = _ref3.error;

        _this3.emit('error', {
          error: error
        });
      });
      this.mainHelper = mainHelper;
      this.mainIndex.init({
        instantSearchInstance: this,
        parent: null,
        uiState: this._initialUiState
      });
      this.middleware.forEach(function (m) {
        m.subscribe();
      });
      mainHelper.search(); // Keep the previous reference for legacy purpose, some pattern use
      // the direct Helper access `search.helper` (e.g multi-index).

      this.helper = this.mainIndex.getHelper(); // track we started the search if we add more widgets,
      // to init them directly after add

      this.started = true;
    }
    /**
     * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
     * if you find an issue with it, please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
     * @return {undefined} This method does not return anything
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this.scheduleSearch.cancel();
      this.scheduleRender.cancel();
      clearTimeout(this._searchStalledTimer);
      this.removeWidgets(this.mainIndex.getWidgets());
      this.mainIndex.dispose(); // You can not start an instance two times, therefore a disposed instance
      // needs to set started as false otherwise this can not be restarted at a
      // later point.

      this.started = false; // The helper needs to be reset to perform the next search from a fresh state.
      // If not reset, it would use the state stored before calling `dispose()`.

      this.removeAllListeners();
      this.mainHelper.removeAllListeners();
      this.mainHelper = null;
      this.helper = null;
      this.middleware.forEach(function (m) {
        m.unsubscribe();
      });
    }
  }, {
    key: "scheduleStalledRender",
    value: function scheduleStalledRender() {
      var _this4 = this;

      if (!this._searchStalledTimer) {
        this._searchStalledTimer = setTimeout(function () {
          _this4._isSearchStalled = true;

          _this4.scheduleRender();
        }, this._stalledSearchDelay);
      }
    }
  }, {
    key: "setUiState",
    value: function setUiState(uiState) {
      if (!this.mainHelper) {
        throw new Error(withUsage('The `start` method needs to be called before `setUiState`.'));
      } // We refresh the index UI state to update the local UI state that the
      // main index passes to the function form of `setUiState`.


      this.mainIndex.refreshUiState();
      var nextUiState = typeof uiState === 'function' ? uiState(this.mainIndex.getWidgetUiState({})) : uiState;

      var setIndexHelperState = function setIndexHelperState(indexWidget) {
        if (process.env.NODE_ENV === 'development') {
          checkIndexUiState({
            index: indexWidget,
            indexUiState: nextUiState[indexWidget.getIndexId()]
          });
        }

        indexWidget.getHelper().overrideStateWithoutTriggeringChangeEvent(indexWidget.getWidgetSearchParameters(indexWidget.getHelper().state, {
          uiState: nextUiState[indexWidget.getIndexId()]
        }));
        indexWidget.getWidgets().filter(isIndexWidget).forEach(setIndexHelperState);
      };

      setIndexHelperState(this.mainIndex);
      this.scheduleSearch();
      this.onInternalStateChange();
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