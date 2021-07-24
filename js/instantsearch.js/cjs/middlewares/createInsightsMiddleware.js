"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInsightsMiddleware = void 0;

var _helpers = require("../helpers");

var _utils = require("../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createInsightsMiddleware = function createInsightsMiddleware(props) {
  var _ref = props || {},
      _insightsClient = _ref.insightsClient,
      insightsInitParams = _ref.insightsInitParams,
      onEvent = _ref.onEvent;

  if (_insightsClient !== null && !_insightsClient) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error("The `insightsClient` option is required if you want userToken to be automatically set in search calls. If you don't want this behaviour, set it to `null`.");
    } else {
      throw new Error('The `insightsClient` option is required. To disable, set it to `null`.');
    }
  }

  var hasInsightsClient = Boolean(_insightsClient);
  var insightsClient = _insightsClient === null ? _utils.noop : _insightsClient;
  return function (_ref2) {
    var instantSearchInstance = _ref2.instantSearchInstance;

    var _getAppIdAndApiKey = (0, _utils.getAppIdAndApiKey)(instantSearchInstance.client),
        _getAppIdAndApiKey2 = _slicedToArray(_getAppIdAndApiKey, 2),
        appId = _getAppIdAndApiKey2[0],
        apiKey = _getAppIdAndApiKey2[1];

    var queuedUserToken = undefined;
    var userTokenBeforeInit = undefined;

    if (Array.isArray(insightsClient.queue)) {
      // Context: The umd build of search-insights is asynchronously loaded by the snippet.
      //
      // When user calls `aa('setUserToken', 'my-user-token')` before `search-insights` is loaded,
      // ['setUserToken', 'my-user-token'] gets stored in `aa.queue`.
      // Whenever `search-insights` is finally loaded, it will process the queue.
      //
      // But here's the reason why we handle it here:
      // At this point, even though `search-insights` is not loaded yet,
      // we still want to read the token from the queue.
      // Otherwise, the first search call will be fired without the token.
      var _ref3 = (0, _utils.find)(insightsClient.queue.slice().reverse(), function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            method = _ref6[0];

        return method === 'setUserToken';
      }) || [];

      var _ref4 = _slicedToArray(_ref3, 2);

      queuedUserToken = _ref4[1];
    }

    insightsClient('getUserToken', null, function (_error, userToken) {
      // If user has called `aa('setUserToken', 'my-user-token')` before creating
      // the `insights` middleware, we store them temporarily and
      // set it later on.
      //
      // Otherwise, the `init` call might override it with anonymous user token.
      userTokenBeforeInit = userToken;
    });
    insightsClient('init', _objectSpread({
      appId: appId,
      apiKey: apiKey
    }, insightsInitParams));
    return {
      onStateChange: function onStateChange() {},
      subscribe: function subscribe() {
        insightsClient('addAlgoliaAgent', 'insights-middleware'); // At the time this middleware is subscribed, `mainIndex.init()` is already called.
        // It means `mainIndex.getHelper()` exists.

        var helper = instantSearchInstance.mainIndex.getHelper();

        var setUserTokenToSearch = function setUserTokenToSearch(userToken) {
          if (userToken) {
            helper.setState(helper.state.setQueryParameter('userToken', userToken));
          }
        };

        var hasUserToken = function hasUserToken() {
          return Boolean(helper.state.userToken);
        };

        helper.setState(helper.state.setQueryParameter('clickAnalytics', true));
        var anonymousUserToken = (0, _helpers.getInsightsAnonymousUserTokenInternal)();

        if (hasInsightsClient && anonymousUserToken) {
          // When `aa('init', { ... })` is called, it creates an anonymous user token in cookie.
          // We can set it as userToken.
          setUserTokenToSearch(anonymousUserToken);
        } // We consider the `userToken` coming from a `init` call to have a higher
        // importance than the one coming from the queue.


        if (userTokenBeforeInit) {
          insightsClient('setUserToken', userTokenBeforeInit);
        } else if (queuedUserToken) {
          insightsClient('setUserToken', queuedUserToken);
        } // This updates userToken which is set explicitly by `aa('setUserToken', userToken)`


        insightsClient('onUserTokenChange', setUserTokenToSearch, {
          immediate: true
        });

        instantSearchInstance.sendEventToInsights = function (event) {
          if (onEvent) {
            onEvent(event, _insightsClient);
          } else if (event.insightsMethod) {
            if (hasUserToken()) {
              insightsClient(event.insightsMethod, event.payload);
            } else {
              process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, "\nCannot send event to Algolia Insights because `userToken` is not set.\n\nSee documentation: https://www.algolia.com/doc/guides/building-search-ui/going-further/send-insights-events/js/#setting-the-usertoken\n") : void 0;
            }
          } else {
            process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, 'Cannot send event to Algolia Insights because `insightsMethod` option is missing.') : void 0;
          }
        };
      },
      unsubscribe: function unsubscribe() {
        insightsClient('onUserTokenChange', undefined);
        instantSearchInstance.sendEventToInsights = _utils.noop;
      }
    };
  };
};

exports.createInsightsMiddleware = createInsightsMiddleware;