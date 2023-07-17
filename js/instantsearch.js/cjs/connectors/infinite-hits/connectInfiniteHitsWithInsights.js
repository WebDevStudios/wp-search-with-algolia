"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _insights = require("../../lib/insights");
var _connectInfiniteHits = _interopRequireDefault(require("./connectInfiniteHits"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var connectInfiniteHitsWithInsights = (0, _insights.withInsights)(_connectInfiniteHits.default);
var _default = connectInfiniteHitsWithInsights;
exports.default = _default;