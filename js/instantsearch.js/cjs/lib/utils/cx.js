"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cx = cx;

function cx(cssClasses) {
  return Array.isArray(cssClasses) ? cssClasses.filter(Boolean).join(' ') : cssClasses || '';
}