"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ToggleRefinement = function ToggleRefinement(_ref) {
  var currentRefinement = _ref.currentRefinement,
      refine = _ref.refine,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
  return _preactCompat.default.createElement("div", {
    className: cssClasses.root
  }, _preactCompat.default.createElement("label", {
    className: cssClasses.label
  }, _preactCompat.default.createElement("input", {
    className: cssClasses.checkbox,
    type: "checkbox",
    checked: currentRefinement.isRefined,
    onChange: function onChange(event) {
      return refine(!event.target.checked);
    }
  }), _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
    rootTagName: "span",
    rootProps: {
      className: cssClasses.labelText
    },
    templateKey: "labelText",
    data: currentRefinement
  }))));
};

var _default = ToggleRefinement;
exports.default = _default;