"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ToggleRefinement = function ToggleRefinement(_ref) {
  var currentRefinement = _ref.currentRefinement,
      refine = _ref.refine,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
  return (0, _preact.h)("div", {
    className: cssClasses.root
  }, (0, _preact.h)("label", {
    className: cssClasses.label
  }, (0, _preact.h)("input", {
    className: cssClasses.checkbox,
    type: "checkbox",
    checked: currentRefinement.isRefined,
    onChange: function onChange(event) {
      return refine({
        isRefined: !event.target.checked
      });
    }
  }), (0, _preact.h)(_Template.default, _extends({}, templateProps, {
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