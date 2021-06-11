"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = singleIndexStateMapping;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getIndexStateWithoutConfigure(uiState) {
  var configure = uiState.configure,
      trackedUiState = _objectWithoutProperties(uiState, ["configure"]);

  return trackedUiState;
}

function singleIndexStateMapping(indexName) {
  return {
    stateToRoute: function stateToRoute(uiState) {
      return getIndexStateWithoutConfigure(uiState[indexName] || {});
    },
    routeToState: function routeToState() {
      var routeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _defineProperty({}, indexName, getIndexStateWithoutConfigure(routeState));
    }
  };
}