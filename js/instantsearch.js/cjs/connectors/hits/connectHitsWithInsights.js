"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../lib/insights/index.js");

var _connectHits = _interopRequireDefault(require("./connectHits.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectHitsWithInsights = (0, _index.withInsights)(_connectHits.default);
var _default = connectHitsWithInsights;
exports.default = _default;