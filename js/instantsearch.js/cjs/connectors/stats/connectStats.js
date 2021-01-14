"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectStats;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'stats',
  connector: true
});
/**
 * @typedef {Object} StatsRenderingOptions
 * @property {number} hitsPerPage The maximum number of hits per page returned by Algolia.
 * @property {number} nbHits The number of hits in the result set.
 * @property {number} nbPages The number of pages computed for the result set.
 * @property {number} page The current page.
 * @property {number} processingTimeMS The time taken to compute the results inside the Algolia engine.
 * @property {string} query The query used for the current search.
 * @property {object} widgetParams All original `CustomStatsWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * @typedef {Object} CustomStatsWidgetOptions
 */

/**
 * **Stats** connector provides the logic to build a custom widget that will displays
 * search statistics (hits number and processing time).
 *
 * @type {Connector}
 * @param {function(StatsRenderingOptions, boolean)} renderFn Rendering function for the custom **Stats** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomStatsWidgetOptions)} Re-usable widget factory for a custom **Stats** widget.
 * @example
 * // custom `renderFn` to render the custom Stats widget
 * function renderFn(StatsRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) return;
 *
 *   StatsRenderingOptions.widgetParams.containerNode
 *     .html(StatsRenderingOptions.nbHits + ' results found in ' + StatsRenderingOptions.processingTimeMS);
 * }
 *
 * // connect `renderFn` to Stats logic
 * var customStatsWidget = instantsearch.connectors.connectStats(renderFn);
 *
 * // mount widget on the page
 * search.addWidgets([
 *   customStatsWidget({
 *     containerNode: $('#custom-stats-container'),
 *   })
 * ]);
 */

function connectStats(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return {
      $$type: 'ais.stats',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread({}, this.getWidgetRenderState(initOptions), {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread({}, this.getWidgetRenderState(renderOptions), {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          stats: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref) {
        var results = _ref.results,
            helper = _ref.helper;

        if (!results) {
          return {
            hitsPerPage: helper.state.hitsPerPage,
            nbHits: 0,
            nbPages: 0,
            page: helper.state.page || 0,
            processingTimeMS: -1,
            query: helper.state.query || '',
            widgetParams: widgetParams
          };
        }

        return {
          hitsPerPage: results.hitsPerPage,
          nbHits: results.nbHits,
          nbPages: results.nbPages,
          page: results.page,
          processingTimeMS: results.processingTimeMS,
          query: results.query,
          widgetParams: widgetParams
        };
      }
    };
  };
}