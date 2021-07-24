"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

var _default = toArray;
exports.default = _default;