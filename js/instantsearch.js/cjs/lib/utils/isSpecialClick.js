"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

var _default = isSpecialClick;
exports.default = _default;