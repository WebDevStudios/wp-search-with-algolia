import { safelyRunOnBrowser } from "./safelyRunOnBrowser.js";
export default function hasDetectedInsightsClient() {
  return safelyRunOnBrowser(function (_ref) {
    var window = _ref.window;
    return Boolean(window.AlgoliaAnalyticsObject);
  }, {
    fallback: function fallback() {
      return false;
    }
  });
}