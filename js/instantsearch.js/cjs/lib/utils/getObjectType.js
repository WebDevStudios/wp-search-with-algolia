"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}

var _default = getObjectType;
exports.default = _default;