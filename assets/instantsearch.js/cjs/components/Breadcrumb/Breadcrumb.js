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
var Breadcrumb = function Breadcrumb(_ref) {
  var items = _ref.items,
    cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps,
    createURL = _ref.createURL,
    refine = _ref.refine;
  return (0, _preact.h)("div", {
    className: (0, _uiComponentsShared.cx)(cssClasses.root, items.length === 0 && cssClasses.noRefinementRoot)
  }, (0, _preact.h)("ul", {
    className: cssClasses.list
  }, (0, _preact.h)("li", {
    className: (0, _uiComponentsShared.cx)(cssClasses.item, items.length === 0 && cssClasses.selectedItem)
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "home",
    rootTagName: "a",
    rootProps: {
      className: cssClasses.link,
      href: createURL(null),
      onClick: function onClick(event) {
        event.preventDefault();
        refine(null);
      }
    }
  }))), items.map(function (item, idx) {
    var isLast = idx === items.length - 1;
    return (0, _preact.h)("li", {
      key: item.label + idx,
      className: (0, _uiComponentsShared.cx)(cssClasses.item, isLast && cssClasses.selectedItem)
    }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "separator",
      rootTagName: "span",
      rootProps: {
        className: cssClasses.separator,
        'aria-hidden': true
      }
    })), isLast ? item.label : (0, _preact.h)("a", {
      className: cssClasses.link,
      href: createURL(item.value),
      onClick: function onClick(event) {
        event.preventDefault();
        refine(item.value);
      }
    }, item.label));
  })));
};
var _default = Breadcrumb;
exports.default = _default;