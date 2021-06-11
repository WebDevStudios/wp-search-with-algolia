"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

/** @jsx h */
var GeoSearchToggle = function GeoSearchToggle(_ref) {
  var classNameLabel = _ref.classNameLabel,
      classNameInput = _ref.classNameInput,
      checked = _ref.checked,
      onToggle = _ref.onToggle,
      children = _ref.children;
  return (0, _preact.h)("label", {
    className: classNameLabel
  }, (0, _preact.h)("input", {
    className: classNameInput,
    type: "checkbox",
    checked: checked,
    onChange: onToggle
  }), children);
};

var _default = GeoSearchToggle;
exports.default = _default;