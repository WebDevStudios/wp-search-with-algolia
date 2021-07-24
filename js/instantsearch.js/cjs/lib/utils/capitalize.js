"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function capitalize(text) {
  return text.toString().charAt(0).toUpperCase() + text.toString().slice(1);
}

var _default = capitalize;
exports.default = _default;