"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
function Selector(_ref) {
  var currentValue = _ref.currentValue,
      options = _ref.options,
      cssClasses = _ref.cssClasses,
      setValue = _ref.setValue;
  return (0, _preact.h)("select", {
    className: (0, _classnames.default)(cssClasses.select),
    onChange: function onChange(event) {
      return setValue(event.target.value);
    },
    value: "".concat(currentValue)
  }, options.map(function (option) {
    return (0, _preact.h)("option", {
      className: (0, _classnames.default)(cssClasses.option),
      key: option.label + option.value,
      value: "".concat(option.value)
    }, option.label);
  }));
}

var _default = Selector;
exports.default = _default;