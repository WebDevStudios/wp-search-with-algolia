"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInsightsMiddleware = void 0;

var _helpers = require("../helpers");

var _utils = require("../lib/utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createInsightsMiddleware = function createInsightsMiddleware(props) {
  var _ref = props || {},
      _insightsClient = _ref.insightsClient,
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

    insightsClient('_get', '_userToken', function (userToken) {
      // If user has called `aa('setUserToken', 'my-user-token')` before creating
      // the `insights` middleware, we store them temporarily and
      // set it later on.
      //
      // Otherwise, the `init` call might override it with anonymous user token.
      userTokenBeforeInit = userToken;
    });
    insightsClient('init', {
      appId: appId,
      apiKey: apiKey
    });
    return {
      onStateChange: function onStateChange() {},
      subscribe: function subscribe() {
        var setUserTokenToSearch = function setUserTokenToSearch(userToken) {
          // At the time this middleware is subscribed, `mainIndex.init()` is already called.
          // It means `mainIndex.getHelper()` exists.
          if (userToken) {
            instantSearchInstance.mainIndex.getHelper().setQueryParameter('userToken', userToken);
          }
        };

        instantSearchInstance.mainIndex.getHelper().setQueryParameter('clickAnalytics', true);
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
            insightsClient(event.insightsMethod, event.payload);
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