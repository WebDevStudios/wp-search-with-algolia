"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = historyRouter;
var _qs = _interopRequireDefault(require("qs"));
var _utils = require("../utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var setWindowTitle = function setWindowTitle(title) {
  if (title) {
    // This function is only executed on browsers so we can disable this check.
    // eslint-disable-next-line no-restricted-globals
    window.document.title = title;
  }
};
var BrowserHistory = /*#__PURE__*/function () {
  /**
   * Transforms a UI state into a title for the page.
   */

  /**
   * Time in milliseconds before performing a write in the history.
   * It prevents from adding too many entries in the history and
   * makes the back button more usable.
   *
   * @default 400
   */

  /**
   * Creates a full URL based on the route state.
   * The storage adaptor maps all syncable keys to the query string of the URL.
   */

  /**
   * Parses the URL into a route state.
   * It should be symmetrical to `createURL`.
   */

  /**
   * Returns the location to store in the history.
   * @default () => window.location
   */

  /**
   * Indicates if last action was back/forward in the browser.
   */

  /**
   * Indicates whether the history router is disposed or not.
   */

  /**
   * Indicates the window.history.length before the last call to
   * window.history.pushState (called in `write`).
   * It allows to determine if a `pushState` has been triggered elsewhere,
   * and thus to prevent the `write` method from calling `pushState`.
   */

  /**
   * Initializes a new storage provider that syncs the search state to the URL
   * using web APIs (`window.location.pushState` and `onpopstate` event).
   */
  function BrowserHistory(_ref) {
    var _this = this;
    var windowTitle = _ref.windowTitle,
      _ref$writeDelay = _ref.writeDelay,
      writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay,
      createURL = _ref.createURL,
      parseURL = _ref.parseURL,
      getLocation = _ref.getLocation,
      start = _ref.start,
      dispose = _ref.dispose,
      push = _ref.push;
    _classCallCheck(this, BrowserHistory);
    _defineProperty(this, "$$type", 'ais.browser');
    _defineProperty(this, "windowTitle", void 0);
    _defineProperty(this, "writeDelay", void 0);
    _defineProperty(this, "_createURL", void 0);
    _defineProperty(this, "parseURL", void 0);
    _defineProperty(this, "getLocation", void 0);
    _defineProperty(this, "writeTimer", void 0);
    _defineProperty(this, "_onPopState", void 0);
    _defineProperty(this, "inPopState", false);
    _defineProperty(this, "isDisposed", false);
    _defineProperty(this, "latestAcknowledgedHistory", 0);
    _defineProperty(this, "_start", void 0);
    _defineProperty(this, "_dispose", void 0);
    _defineProperty(this, "_push", void 0);
    this.windowTitle = windowTitle;
    this.writeTimer = undefined;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    this._start = start;
    this._dispose = dispose;
    this._push = push;
    (0, _utils.safelyRunOnBrowser)(function (_ref2) {
      var window = _ref2.window;
      var title = _this.windowTitle && _this.windowTitle(_this.read());
      setWindowTitle(title);
      _this.latestAcknowledgedHistory = window.history.length;
    });
  }

  /**
   * Reads the URL and returns a syncable UI search state.
   */
  _createClass(BrowserHistory, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: _qs.default,
        location: this.getLocation()
      });
    }

    /**
     * Pushes a search state into the URL.
     */
  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;
      (0, _utils.safelyRunOnBrowser)(function (_ref3) {
        var window = _ref3.window;
        var url = _this2.createURL(routeState);
        var title = _this2.windowTitle && _this2.windowTitle(routeState);
        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }
        _this2.writeTimer = setTimeout(function () {
          setWindowTitle(title);
          if (_this2.shouldWrite(url)) {
            if (_this2._push) {
              _this2._push(url);
            } else {
              window.history.pushState(routeState, title || '', url);
            }
            _this2.latestAcknowledgedHistory = window.history.length;
          }
          _this2.inPopState = false;
          _this2.writeTimer = undefined;
        }, _this2.writeDelay);
      });
    }

    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;
      if (this._start) {
        this._start(function () {
          callback(_this3.read());
        });
      }
      this._onPopState = function () {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = undefined;
        }
        _this3.inPopState = true;

        // We always read the state from the URL because the state of the history
        // can be incorect in some cases (e.g. using React Router).
        callback(_this3.read());
      };
      (0, _utils.safelyRunOnBrowser)(function (_ref4) {
        var window = _ref4.window;
        window.addEventListener('popstate', _this3._onPopState);
      });
    }

    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch.js/issues/790
     */
  }, {
    key: "createURL",
    value: function createURL(routeState) {
      var url = this._createURL({
        qsModule: _qs.default,
        routeState: routeState,
        location: this.getLocation()
      });
      if (process.env.NODE_ENV === 'development') {
        try {
          // We just want to check if the URL is valid.
          // eslint-disable-next-line no-new
          new URL(url);
        } catch (e) {
          process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, "The URL returned by the `createURL` function is invalid.\nPlease make sure it returns an absolute URL to avoid issues, e.g: `https://algolia.com/search?query=iphone`.") : void 0;
        }
      }
      return url;
    }

    /**
     * Removes the event listener and cleans up the URL.
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;
      if (this._dispose) {
        this._dispose();
      }
      this.isDisposed = true;
      (0, _utils.safelyRunOnBrowser)(function (_ref5) {
        var window = _ref5.window;
        if (_this4._onPopState) {
          window.removeEventListener('popstate', _this4._onPopState);
        }
      });
      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }
      this.write({});
    }
  }, {
    key: "start",
    value: function start() {
      this.isDisposed = false;
    }
  }, {
    key: "shouldWrite",
    value: function shouldWrite(url) {
      var _this5 = this;
      return (0, _utils.safelyRunOnBrowser)(function (_ref6) {
        var window = _ref6.window;
        // We do want to `pushState` if:
        // - the router is not disposed, IS.js needs to update the URL
        // OR
        // - the last write was from InstantSearch.js
        // (unlike a SPA, where it would have last written)
        var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window.history.length);
        return (
          // When the last state change was through popstate, the IS.js state changes,
          // but that should not write the URL.
          !_this5.inPopState &&
          // When the previous pushState after dispose was by IS.js, we want to write the URL.
          lastPushWasByISAfterDispose &&
          // When the URL is the same as the current one, we do not want to write it.
          url !== window.location.href
        );
      });
    }
  }]);
  return BrowserHistory;
}();
function historyRouter() {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref7$createURL = _ref7.createURL,
    createURL = _ref7$createURL === void 0 ? function (_ref8) {
      var qsModule = _ref8.qsModule,
        routeState = _ref8.routeState,
        location = _ref8.location;
      var protocol = location.protocol,
        hostname = location.hostname,
        _location$port = location.port,
        port = _location$port === void 0 ? '' : _location$port,
        pathname = location.pathname,
        hash = location.hash;
      var queryString = qsModule.stringify(routeState);
      var portWithPrefix = port === '' ? '' : ":".concat(port);

      // IE <= 11 has no proper `location.origin` so we cannot rely on it.
      if (!queryString) {
        return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
      }
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
    } : _ref7$createURL,
    _ref7$parseURL = _ref7.parseURL,
    parseURL = _ref7$parseURL === void 0 ? function (_ref9) {
      var qsModule = _ref9.qsModule,
        location = _ref9.location;
      // `qs` by default converts arrays with more than 20 items to an object.
      // We want to avoid this because the data structure manipulated can therefore vary.
      // Setting the limit to `100` seems a good number because the engine's default is 100
      // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
      //
      // Using an `arrayLimit` of `n` allows `n + 1` items.
      //
      // See:
      //   - https://github.com/ljharb/qs#parsing-arrays
      //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/
      return qsModule.parse(location.search.slice(1), {
        arrayLimit: 99
      });
    } : _ref7$parseURL,
    _ref7$writeDelay = _ref7.writeDelay,
    writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay,
    windowTitle = _ref7.windowTitle,
    _ref7$getLocation = _ref7.getLocation,
    getLocation = _ref7$getLocation === void 0 ? function () {
      return (0, _utils.safelyRunOnBrowser)(function (_ref10) {
        var window = _ref10.window;
        return window.location;
      }, {
        fallback: function fallback() {
          throw new Error('You need to provide `getLocation` to the `history` router in environments where `window` does not exist.');
        }
      });
    } : _ref7$getLocation,
    start = _ref7.start,
    dispose = _ref7.dispose,
    push = _ref7.push;
  return new BrowserHistory({
    createURL: createURL,
    parseURL: parseURL,
    writeDelay: writeDelay,
    windowTitle: windowTitle,
    getLocation: getLocation,
    start: start,
    dispose: dispose,
    push: push
  });
}