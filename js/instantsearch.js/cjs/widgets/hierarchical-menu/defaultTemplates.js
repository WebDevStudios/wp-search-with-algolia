"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _formatNumber = require("../../lib/formatNumber.js");

var _uiComponentsShared = require("@algolia/ui-components-shared");

var defaultTemplates = {
  item: function item(_ref) {
    var url = _ref.url,
        label = _ref.label,
        count = _ref.count,
        cssClasses = _ref.cssClasses,
        isRefined = _ref.isRefined;
    return (0, _preact.h)("a", {
      className: (0, _uiComponentsShared.cx)((0, _uiComponentsShared.cx)(cssClasses.link), (0, _uiComponentsShared.cx)(isRefined ? cssClasses.selectedItemLink : undefined)),
      href: url
    }, (0, _preact.h)("span", {
      className: (0, _uiComponentsShared.cx)(cssClasses.label)
    }, label), (0, _preact.h)("span", {
      className: (0, _uiComponentsShared.cx)(cssClasses.count)
    }, (0, _formatNumber.formatNumber)(count)));
  },
  showMoreText: function showMoreText(_ref2) {
    var isShowingMore = _ref2.isShowingMore;
    return isShowingMore ? 'Show less' : 'Show more';
  }
};
var _default = defaultTemplates;
exports.default = _default;