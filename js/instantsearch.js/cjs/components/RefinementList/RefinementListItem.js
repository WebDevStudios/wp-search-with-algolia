"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function RefinementListItem(_ref) {
  var className = _ref.className,
      handleClick = _ref.handleClick,
      facetValueToRefine = _ref.facetValueToRefine,
      isRefined = _ref.isRefined,
      templateProps = _ref.templateProps,
      templateKey = _ref.templateKey,
      templateData = _ref.templateData,
      subItems = _ref.subItems;
  return (0, _preact.h)("li", {
    className: className,
    onClick: function onClick(originalEvent) {
      handleClick({
        facetValueToRefine: facetValueToRefine,
        isRefined: isRefined,
        originalEvent: originalEvent
      });
    }
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: templateKey,
    data: templateData
  })), subItems);
}

var _default = RefinementListItem;
exports.default = _default;