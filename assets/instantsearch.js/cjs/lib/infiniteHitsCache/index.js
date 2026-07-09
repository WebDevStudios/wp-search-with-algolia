"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createInfiniteHitsSessionStorageCache", {
  enumerable: true,
  get: function get() {
    return _sessionStorage.default;
  }
});
var _sessionStorage = _interopRequireDefault(require("./sessionStorage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }