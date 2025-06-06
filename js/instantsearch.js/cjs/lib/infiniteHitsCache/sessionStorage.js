"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createInfiniteHitsSessionStorageCache;
var _utils = require("../utils");
var _excluded = ["page"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function getStateWithoutPage(state) {
  var _ref = state || {},
    page = _ref.page,
    rest = _objectWithoutProperties(_ref, _excluded);
  return rest;
}
function createInfiniteHitsSessionStorageCache() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    key = _ref2.key;
  var KEY = ['ais.infiniteHits', key].filter(Boolean).join(':');
  return {
    read: function read(_ref3) {
      var state = _ref3.state;
      var sessionStorage = (0, _utils.safelyRunOnBrowser)(function (_ref4) {
        var window = _ref4.window;
        return window.sessionStorage;
      });
      if (!sessionStorage) {
        return null;
      }
      try {
        var cache = JSON.parse(
        // @ts-expect-error JSON.parse() requires a string, but it actually accepts null, too.
        sessionStorage.getItem(KEY));
        return cache && (0, _utils.isEqual)(cache.state, getStateWithoutPage(state)) ? cache.hits : null;
      } catch (error) {
        if (error instanceof SyntaxError) {
          try {
            sessionStorage.removeItem(KEY);
          } catch (err) {
            // do nothing
          }
        }
        return null;
      }
    },
    write: function write(_ref5) {
      var state = _ref5.state,
        hits = _ref5.hits;
      var sessionStorage = (0, _utils.safelyRunOnBrowser)(function (_ref6) {
        var window = _ref6.window;
        return window.sessionStorage;
      });
      if (!sessionStorage) {
        return;
      }
      try {
        sessionStorage.setItem(KEY, JSON.stringify({
          state: getStateWithoutPage(state),
          hits: hits
        }));
      } catch (error) {
        // do nothing
      }
    }
  };
}