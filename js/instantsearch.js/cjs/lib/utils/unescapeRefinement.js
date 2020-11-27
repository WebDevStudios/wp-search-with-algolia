"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function unescapeRefinement(value) {
  return String(value).replace(/^\\-/, '-');
}

var _default = unescapeRefinement;
exports.default = _default;