"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectPoweredBy;

var _utils = require("../../lib/utils");

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'powered-by',
  connector: true
});
/**
 * @typedef {Object} PoweredByWidgetOptions
 * @property {string} [theme] The theme of the logo ("light" or "dark").
 * @property {string} [url] The URL to redirect to.
 */

/**
 * @typedef {Object} PoweredByRenderingOptions
 * @property {Object} widgetParams All original `PoweredByWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **PoweredBy** connector provides the logic to build a custom widget that will displays
 * the logo to redirect to Algolia.
 *
 * @type {Connector}
 * @param {function(PoweredByRenderingOptions, boolean)} renderFn Rendering function for the custom **PoweredBy** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function} Re-usable widget factory for a custom **PoweredBy** widget.
 */

function connectPoweredBy(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  var defaultUrl = 'https://www.algolia.com/?' + 'utm_source=instantsearch.js&' + 'utm_medium=website&' + "utm_content=".concat(typeof window !== 'undefined' && window.location ? window.location.hostname : '', "&") + 'utm_campaign=poweredby';
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _widgetParams$url = widgetParams.url,
        url = _widgetParams$url === void 0 ? defaultUrl : _widgetParams$url;
    return {
      init: function init() {
        renderFn({
          url: url,
          widgetParams: widgetParams
        }, true);
      },
      render: function render() {
        renderFn({
          url: url,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      }
    };
  };
}