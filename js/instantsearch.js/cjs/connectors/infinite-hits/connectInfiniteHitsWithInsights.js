"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../lib/insights/index.js");

var _connectInfiniteHits = _interopRequireDefault(require("./connectInfiniteHits.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectInfiniteHitsWithInsights = (0, _index.withInsights)(_connectInfiniteHits.default);
var _default = connectInfiniteHitsWithInsights;
exports.default = _default;