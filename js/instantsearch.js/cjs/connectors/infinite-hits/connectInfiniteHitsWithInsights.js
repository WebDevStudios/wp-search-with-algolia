"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _insights = require("../../lib/insights");
var _connectInfiniteHits = _interopRequireDefault(require("./connectInfiniteHits"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Due to https://github.com/microsoft/web-build-tools/issues/1050, we need
 * Connector<...> imported in this file, even though it is only used implicitly.
 * This _uses_ Connector<...> so it is not accidentally removed by someone.
 */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
var connectInfiniteHitsWithInsights = (0, _insights.withInsights)(_connectInfiniteHits.default);
var _default = connectInfiniteHitsWithInsights;
exports.default = _default;