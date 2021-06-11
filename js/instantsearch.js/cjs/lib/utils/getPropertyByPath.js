"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getPropertyByPath(object, path) {
  var parts = Array.isArray(path) ? path : path.split('.');
  return parts.reduce(function (current, key) {
    return current && current[key];
  }, object);
}

var _default = getPropertyByPath;
exports.default = _default;