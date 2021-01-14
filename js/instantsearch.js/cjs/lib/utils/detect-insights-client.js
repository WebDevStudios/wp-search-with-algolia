"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasDetectedInsightsClient;

function hasDetectedInsightsClient() {
  return typeof window !== 'undefined' && Boolean(window.AlgoliaAnalyticsObject);
}