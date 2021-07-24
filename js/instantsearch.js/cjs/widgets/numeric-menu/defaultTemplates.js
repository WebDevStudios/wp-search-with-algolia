"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultTemplates = {
  item: "<label class=\"{{cssClasses.label}}\">\n  <input type=\"radio\" class=\"{{cssClasses.radio}}\" name=\"{{attribute}}\"{{#isRefined}} checked{{/isRefined}} />\n  <span class=\"{{cssClasses.labelText}}\">{{label}}</span>\n</label>"
};
var _default = defaultTemplates;
exports.default = _default;