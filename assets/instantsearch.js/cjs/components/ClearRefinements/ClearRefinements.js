"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _Template = _interopRequireDefault(require("../Template/Template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var ClearRefinements = function ClearRefinements(_ref) {
  var hasRefinements = _ref.hasRefinements,
    refine = _ref.refine,
    cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps;
  return (0, _preact.h)("div", {
    className: cssClasses.root
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "resetLabel",
    rootTagName: "button",
    rootProps: {
      className: (0, _uiComponentsShared.cx)(cssClasses.button, !hasRefinements && cssClasses.disabledButton),
      onClick: refine,
      disabled: !hasRefinements
    },
    data: {
      hasRefinements: hasRefinements
    }
  })));
};
var _default = ClearRefinements;
exports.default = _default;