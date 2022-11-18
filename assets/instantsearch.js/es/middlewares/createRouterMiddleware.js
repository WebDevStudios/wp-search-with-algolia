function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import simpleStateMapping from "../lib/stateMappings/simple.js";
import historyRouter from "../lib/routers/history.js";
import { isEqual } from "../lib/utils/index.js";
export var createRouterMiddleware = function createRouterMiddleware() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _props$router = props.router,
      router = _props$router === void 0 ? historyRouter() : _props$router,
      _props$stateMapping = props.stateMapping,
      stateMapping = _props$stateMapping === void 0 ? simpleStateMapping() : _props$stateMapping;
  return function (_ref) {
    var instantSearchInstance = _ref.instantSearchInstance;

    function topLevelCreateURL(nextState) {
      var uiState = Object.keys(nextState).reduce(function (acc, indexId) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, indexId, nextState[indexId]));
      }, instantSearchInstance.mainIndex.getWidgetUiState({}));
      var route = stateMapping.stateToRoute(uiState);
      return router.createURL(route);
    } // casting to UiState here to keep createURL unaware of custom UiState
    // (as long as it's an object, it's ok)


    instantSearchInstance._createURL = topLevelCreateURL;
    var lastRouteState = undefined;
    var initialUiState = instantSearchInstance._initialUiState;
    return {
      onStateChange: function onStateChange(_ref2) {
        var uiState = _ref2.uiState;
        var routeState = stateMapping.stateToRoute(uiState);

        if (lastRouteState === undefined || !isEqual(lastRouteState, routeState)) {
          router.write(routeState);
          lastRouteState = routeState;
        }
      },
      subscribe: function subscribe() {
        instantSearchInstance._initialUiState = _objectSpread(_objectSpread({}, initialUiState), stateMapping.routeToState(router.read()));
        router.onUpdate(function (route) {
          instantSearchInstance.setUiState(stateMapping.routeToState(route));
        });
      },
      started: function started() {},
      unsubscribe: function unsubscribe() {
        router.dispose();
      }
    };
  };
};