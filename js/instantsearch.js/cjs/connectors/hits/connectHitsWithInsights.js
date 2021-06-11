"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _insights = require("../../lib/insights");

var _connectHits = _interopRequireDefault(require("./connectHits"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectHitsWithInsights = (0, _insights.withInsights)(_connectHits.default);
var _default = connectHitsWithInsights;
exports.default = _default;