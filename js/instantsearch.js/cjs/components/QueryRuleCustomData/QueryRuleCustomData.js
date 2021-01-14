"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var QueryRuleCustomData = function QueryRuleCustomData(_ref) {
  var cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      items = _ref.items;
  return (0, _preact.h)(_Template.default, {
    templateKey: "default",
    templates: templates,
    rootProps: {
      className: cssClasses.root
    },
    data: {
      items: items
    }
  });
};

var _default = QueryRuleCustomData;
exports.default = _default;