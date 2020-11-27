"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoSearchToggle = function GeoSearchToggle(_ref) {
  var classNameLabel = _ref.classNameLabel,
      classNameInput = _ref.classNameInput,
      checked = _ref.checked,
      onToggle = _ref.onToggle,
      children = _ref.children;
  return _preactCompat.default.createElement("label", {
    className: classNameLabel
  }, _preactCompat.default.createElement("input", {
    className: classNameInput,
    type: "checkbox",
    checked: checked,
    onChange: onToggle
  }), children);
};

var _default = GeoSearchToggle;
exports.default = _default;