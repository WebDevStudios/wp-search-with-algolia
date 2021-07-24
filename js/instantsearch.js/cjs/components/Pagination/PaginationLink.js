"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

/** @jsx h */
var PaginationLink = function PaginationLink(_ref) {
  var cssClasses = _ref.cssClasses,
      label = _ref.label,
      ariaLabel = _ref.ariaLabel,
      url = _ref.url,
      isDisabled = _ref.isDisabled,
      handleClick = _ref.handleClick,
      pageNumber = _ref.pageNumber;

  if (isDisabled) {
    return (0, _preact.h)("li", {
      className: cssClasses.item
    }, (0, _preact.h)("span", {
      className: cssClasses.link,
      dangerouslySetInnerHTML: {
        __html: label
      }
    }));
  }

  return (0, _preact.h)("li", {
    className: cssClasses.item
  }, (0, _preact.h)("a", {
    className: cssClasses.link,
    "aria-label": ariaLabel,
    href: url,
    onClick: function onClick(event) {
      return handleClick(pageNumber, event);
    },
    dangerouslySetInnerHTML: {
      __html: label
    }
  }));
};

var _default = PaginationLink;
exports.default = _default;