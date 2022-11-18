"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDetectedInsightsClient = hasDetectedInsightsClient;

var _safelyRunOnBrowser = require("./safelyRunOnBrowser.js");

function hasDetectedInsightsClient() {
  return (0, _safelyRunOnBrowser.safelyRunOnBrowser)(function (_ref) {
    var window = _ref.window;
    return Boolean(window.AlgoliaAnalyticsObject);
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}