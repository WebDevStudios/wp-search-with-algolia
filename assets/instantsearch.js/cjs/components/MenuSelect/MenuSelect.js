"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _utils = require("../../lib/utils");
var _Template = _interopRequireDefault(require("../Template/Template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function MenuSelect(_ref) {
  var cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps,
    items = _ref.items,
    refine = _ref.refine;
  var _ref2 = (0, _utils.find)(items, function (item) {
      return item.isRefined;
    }) || {
      value: ''
    },
    selectedValue = _ref2.value;
  return (0, _preact.h)("div", {
    className: (0, _uiComponentsShared.cx)(cssClasses.root, items.length === 0 && cssClasses.noRefinementRoot)
  }, (0, _preact.h)("select", {
    className: cssClasses.select,
    value: selectedValue,
    onChange: function onChange(event) {
      refine(event.target.value);
    }
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "defaultOption",
    rootTagName: "option",
    rootProps: {
      value: '',
      className: cssClasses.option
    }
  })), items.map(function (item) {
    return (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "option",
      rootProps: {
        value: item.value,
        className: cssClasses.option
      },
      key: item.value,
      data: item
    }));
  })));
}
var _default = MenuSelect;
exports.default = _default;