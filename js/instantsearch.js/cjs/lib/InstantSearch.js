"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceConfiguration = enhanceConfiguration;
exports.default = void 0;

var _algoliasearchHelper = _interopRequireDefault(require("algoliasearch-helper"));

var _events = _interopRequireDefault(require("events"));

var _RoutingManager = _interopRequireDefault(require("./RoutingManager"));

var _simple = _interopRequireDefault(require("./stateMappings/simple"));

var _history = _interopRequireDefault(require("./routers/history"));

var _version = _interopRequireDefault(require("./version"));

var _createHelpers = _interopRequireDefault(require("./createHelpers"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'instantsearch'
});
var ROUTING_DEFAULT_OPTIONS = {
  stateMapping: (0, _simple.default)(),
  router: (0, _history.default)()
};

function defaultCreateURL() {
  return '#';
}
/**
 * Widgets are the building blocks of InstantSearch.js. Any
 * valid widget must have at least a `render` or a `init` function.
 * @typedef {Object} Widget
 * @property {function} [render] Called after each search response has been received
 * @property {function} [getConfiguration] Let the widget update the configuration
 * of the search with new parameters
 * @property {function} [init] Called once before the first search
 */

/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * @fires Instantsearch#render This event is triggered each time a render is done
 */


var InstantSearch =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(InstantSearch, _EventEmitter);

  function InstantSearch(options) {
    var _this;

    _classCallCheck(this, InstantSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InstantSearch).call(this));
    var _options$indexName = options.indexName,
        indexName = _options$indexName === void 0 ? null : _options$indexName,
        numberLocale = options.numberLocale,
        searchParameters = options.searchParameters,
        _options$routing = options.routing,
        routing = _options$routing === void 0 ? null : _options$routing,
        searchFunction = options.searchFunction,
        _options$stalledSearc = options.stalledSearchDelay,
        stalledSearchDelay = _options$stalledSearc === void 0 ? 200 : _options$stalledSearc,
        _options$searchClient = options.searchClient,
        searchClient = _options$searchClient === void 0 ? null : _options$searchClient,
        _options$insightsClie = options.insightsClient,
        insightsClient = _options$insightsClie === void 0 ? null : _options$insightsClie;

    if (indexName === null) {
      throw new Error(withUsage('The `indexName` option is required.'));
    }

    if (searchClient === null) {
      throw new Error(withUsage('The `searchClient` option is required.'));
    }

    if (typeof options.urlSync !== 'undefined') {
      throw new Error(withUsage('The `urlSync` option was removed in InstantSearch.js 3. You may want to use the `routing` option.'));
    }

    if (typeof searchClient.search !== 'function') {
      throw new Error("The `searchClient` must implement a `search` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/going-further/backend-search/in-depth/backend-instantsearch/js/");
    }

    if (typeof searchClient.addAlgoliaAgent === 'function') {
      searchClient.addAlgoliaAgent("instantsearch.js (".concat(_version.default, ")"));
    }

    if (insightsClient && typeof insightsClient !== 'function') {
      throw new Error('The provided `insightsClient` must be a function.');
    }

    (0, _utils.warning)(!searchParameters, "The `searchParameters` option is deprecated and will not be supported in InstantSearch.js 4.x.\n\nYou can replace it with the `configure` widget:\n\n```\nsearch.addWidgets([\n  configure(".concat(JSON.stringify(searchParameters, null, 2), ")\n]);\n```\n\nSee ").concat((0, _utils.createDocumentationLink)({
      name: 'configure'
    })));
    _this.client = searchClient;
    _this.insightsClient = insightsClient;
    _this.helper = null;
    _this.indexName = indexName;
    _this.searchParameters = _objectSpread({}, searchParameters, {
      index: indexName
    });
    _this.widgets = [];
    _this.templatesConfig = {
      helpers: (0, _createHelpers.default)({
        numberLocale: numberLocale
      }),
      compileOptions: {}
    };
    _this._stalledSearchDelay = stalledSearchDelay;

    if (searchFunction) {
      _this._searchFunction = searchFunction;
    }

    if (routing === true) _this.routing = ROUTING_DEFAULT_OPTIONS;else if ((0, _utils.isPlainObject)(routing)) _this.routing = _objectSpread({}, ROUTING_DEFAULT_OPTIONS, {}, routing);
    return _this;
  }
  /**
   * Adds a widget. This can be done before and after InstantSearch has been started. Adding a
   * widget after InstantSearch started is considered **EXPERIMENTAL** and therefore
   * it is possibly buggy, if you find anything please
   * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20hot%20addWidget).
   * @param  {Widget} widget The widget to add to InstantSearch. Widgets are simple objects
   * that have methods that map the search life cycle in a UI perspective. Usually widgets are
   * created by [widget factories](widgets.html) like the one provided with InstantSearch.js.
   * @return {undefined} This method does not return anything
   */


  _createClass(InstantSearch, [{
    key: "addWidget",
    value: function addWidget(widget) {
      this.addWidgets([widget]);
    }
    /**
     * Adds multiple widgets. This can be done before and after the InstantSearch has been started. This feature
     * is considered **EXPERIMENTAL** and therefore it is possibly buggy, if you find anything please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20addWidgets).
     * @param  {Widget[]} widgets The array of widgets to add to InstantSearch.
     * @return {undefined} This method does not return anything
     */

  }, {
    key: "addWidgets",
    value: function addWidgets(widgets) {
      var _this2 = this;

      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets. Please use `addWidget`.'));
      } // The routing manager widget is always added manually at the last position.
      // By removing it from the last position and adding it back after, we ensure
      // it keeps this position.
      // fixes #3148


      var lastWidget = this.widgets.pop();
      widgets.forEach(function (widget) {
        // Add the widget to the list of widget
        if (widget.render === undefined && widget.init === undefined) {
          throw new Error("The widget definition expects a `render` and/or an `init` method.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/widgets/create-your-own-widgets/js/");
        }

        _this2.widgets.push(widget);
      }); // Second part of the fix for #3148

      if (lastWidget) this.widgets.push(lastWidget); // Init the widget directly if instantsearch has been already started

      if (this.started && Boolean(widgets.length)) {
        this.searchParameters = this.widgets.reduce(enhanceConfiguration, _objectSpread({}, this.helper.state));
        this.helper.setState(this.searchParameters);
        widgets.forEach(function (widget) {
          if (widget.init) {
            widget.init({
              state: _this2.helper.state,
              helper: _this2.helper,
              templatesConfig: _this2.templatesConfig,
              createURL: _this2._createAbsoluteURL,
              onHistoryChange: _this2._onHistoryChange,
              instantSearchInstance: _this2
            });
          }
        });
        this.helper.search();
      }
    }
    /**
     * Removes a widget. This can be done after the InstantSearch has been started. This feature
     * is considered **EXPERIMENTAL** and therefore it is possibly buggy, if you find anything please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20removeWidget).
     * @param  {Widget} widget The widget instance to remove from InstantSearch. This widget must implement a `dispose()` method in order to be gracefully removed.
     * @return {undefined} This method does not return anything
     */

  }, {
    key: "removeWidget",
    value: function removeWidget(widget) {
      this.removeWidgets([widget]);
    }
    /**
     * Removes multiple widgets. This can be done only after the InstantSearch has been started. This feature
     * is considered **EXPERIMENTAL** and therefore it is possibly buggy, if you find anything please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20addWidgets).
     * @param  {Widget[]} widgets Array of widgets instances to remove from InstantSearch.
     * @return {undefined} This method does not return anything
     */

  }, {
    key: "removeWidgets",
    value: function removeWidgets(widgets) {
      var _this3 = this;

      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets. Please use `removeWidget`.'));
      }

      widgets.forEach(function (widget) {
        if (!_this3.widgets.includes(widget) || typeof widget.dispose !== 'function') {
          throw new Error("The `dispose` method is required to remove the widget.\n\nSee: https://www.algolia.com/doc/guides/building-search-ui/widgets/create-your-own-widgets/js/#the-widget-lifecycle-and-api");
        }

        _this3.widgets = _this3.widgets.filter(function (w) {
          return w !== widget;
        });
        var nextState = widget.dispose({
          helper: _this3.helper,
          state: _this3.helper.state
        }); // re-compute remaining widgets to the state
        // in a case two widgets were using the same configuration but we removed one

        if (nextState) {
          _this3.searchParameters = _this3.widgets.reduce(enhanceConfiguration, _objectSpread({}, nextState));

          _this3.helper.setState(_this3.searchParameters);
        }
      }); // If there's multiple call to `removeWidget()` let's wait until they are all made
      // and then check for widgets.length & make a search on next tick
      //
      // This solves an issue where you unmount a page and removing widget by widget

      setTimeout(function () {
        // no need to trigger a search if we don't have any widgets left
        if (_this3.widgets.length > 0) {
          _this3.helper.search();
        }
      }, 0);
    }
    /**
     * Clears the cached answers from Algolia and triggers a new search.
     *
     * @return {undefined} Does not return anything
     */

  }, {
    key: "refresh",
    value: function refresh() {
      if (this.helper) {
        this.helper.clearCache().search();
      }
    }
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search. This method should be called after all widgets have been added
     * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
     * widgets after the start as an **EXPERIMENTAL** feature.
     *
     * @return {undefined} Does not return anything
     */

  }, {
    key: "start",
    value: function start() {
      var _this4 = this;

      if (this.started) {
        throw new Error(withUsage('The `start` method has already been called once.'));
      }

      if (this.routing) {
        var routingManager = new _RoutingManager.default(_objectSpread({}, this.routing, {
          instantSearchInstance: this
        }));
        this._onHistoryChange = routingManager.onHistoryChange.bind(routingManager);
        this._createURL = routingManager.createURL.bind(routingManager);
        this._createAbsoluteURL = this._createURL;
        this.widgets.push(routingManager);
      } else {
        this._createURL = defaultCreateURL;
        this._createAbsoluteURL = defaultCreateURL;
        this._onHistoryChange = _utils.noop;
      }

      this.searchParameters = this.widgets.reduce(enhanceConfiguration, this.searchParameters);
      var helper = (0, _algoliasearchHelper.default)(this.client, this.searchParameters.index || this.indexName, this.searchParameters);

      if (this._searchFunction) {
        this._mainHelperSearch = helper.search.bind(helper);

        helper.search = function () {
          var helperSearchFunction = (0, _algoliasearchHelper.default)({
            search: function search() {
              return new Promise(_utils.noop);
            }
          }, helper.state.index, helper.state);
          helperSearchFunction.once('search', function (state) {
            helper.overrideStateWithoutTriggeringChangeEvent(state);

            _this4._mainHelperSearch();
          });

          _this4._searchFunction(helperSearchFunction);
        };
      }

      this.helper = helper;

      this._init(helper.state, this.helper);

      this.helper.on('result', this._render.bind(this, this.helper));
      this.helper.on('error', function (e) {
        _this4.emit('error', e);
      });
      this._searchStalledTimer = null;
      this._isSearchStalled = true;
      this.helper.search();
      this.helper.on('search', function () {
        if (!_this4._isSearchStalled && !_this4._searchStalledTimer) {
          _this4._searchStalledTimer = setTimeout(function () {
            _this4._isSearchStalled = true;

            _this4._render(_this4.helper, _this4.helper.lastResults, _this4.helper.lastResults._state);
          }, _this4._stalledSearchDelay);
        }
      }); // track we started the search if we add more widgets,
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
      this.removeWidgets(this.widgets); // You can not start an instance two times, therefore a disposed instance needs to set started as false
      // otherwise this can not be restarted at a later point.

      this.started = false; // The helper needs to be reset to perform the next search from a fresh state.
      // If not reset, it would use the state stored before calling `dispose()`.

      this.helper.removeAllListeners();
      this.helper = null;
    }
  }, {
    key: "createURL",
    value: function createURL(params) {
      if (!this._createURL) {
        throw new Error('The `start` method needs to be called before `createURL`.');
      }

      return this._createURL(this.helper.state.setQueryParameters(params));
    }
  }, {
    key: "_render",
    value: function _render(helper, results, state) {
      var _this5 = this;

      if (!this.helper.hasPendingRequests()) {
        clearTimeout(this._searchStalledTimer);
        this._searchStalledTimer = null;
        this._isSearchStalled = false;
      }

      this.widgets.forEach(function (widget) {
        if (!widget.render) {
          return;
        }

        widget.render({
          templatesConfig: _this5.templatesConfig,
          results: results,
          state: state,
          helper: helper,
          createURL: _this5._createAbsoluteURL,
          instantSearchInstance: _this5,
          searchMetadata: {
            isSearchStalled: _this5._isSearchStalled
          }
        });
      });
      /**
       * Render is triggered when the rendering of the widgets has been completed
       * after a search.
       * @event InstantSearch#render
       */

      this.emit('render');
    }
  }, {
    key: "_init",
    value: function _init(state, helper) {
      var _this6 = this;

      this.widgets.forEach(function (widget) {
        if (widget.init) {
          widget.init({
            state: state,
            helper: helper,
            templatesConfig: _this6.templatesConfig,
            createURL: _this6._createAbsoluteURL,
            onHistoryChange: _this6._onHistoryChange,
            instantSearchInstance: _this6
          });
        }
      });
    }
  }]);

  return InstantSearch;
}(_events.default);

function enhanceConfiguration(configuration, widgetDefinition) {
  if (!widgetDefinition.getConfiguration) {
    return configuration;
  } // Get the relevant partial configuration asked by the widget


  var partialConfiguration = widgetDefinition.getConfiguration(configuration);

  if (!partialConfiguration) {
    return configuration;
  }

  if (!partialConfiguration.hierarchicalFacets) {
    return (0, _utils.mergeDeep)(configuration, partialConfiguration);
  }

  var hierarchicalFacets = partialConfiguration.hierarchicalFacets,
      partialWithoutHierarchcialFacets = _objectWithoutProperties(partialConfiguration, ["hierarchicalFacets"]); // The `mergeDeep` function uses a `uniq` function under the hood, but the
  // implementation does not support arrays of objects (we also had the issue
  // with the Lodash version). The `hierarchicalFacets` attribute is an array
  // of objects, which means that this attribute is never deduplicated. It
  // becomes problematic when widgets are frequently added/removed, since the
  // function `enhanceConfiguration` is called at each operation.
  // https://github.com/algolia/instantsearch.js/issues/3278


  var configurationWithHierarchicalFacets = _objectSpread({}, configuration, {
    hierarchicalFacets: hierarchicalFacets.reduce(function (facets, facet) {
      var index = (0, _utils.findIndex)(facets, function (_) {
        return _.name === facet.name;
      });

      if (index === -1) {
        return facets.concat(facet);
      }

      var nextFacets = facets.slice();
      nextFacets.splice(index, 1, facet);
      return nextFacets;
    }, configuration.hierarchicalFacets || [])
  });

  return (0, _utils.mergeDeep)(configurationWithHierarchicalFacets, partialWithoutHierarchcialFacets);
}

var _default = InstantSearch;
exports.default = _default;