"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _index = require("../../lib/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Pagination(props) {
  function createClickHandler(pageNumber) {
    return function (event) {
      if ((0, _index.isSpecialClick)(event)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }

      event.preventDefault();
      props.setCurrentPage(pageNumber);
    };
  }

  return (0, _preact.h)("div", {
    className: (0, _classnames.default)(props.cssClasses.root, _defineProperty({}, props.cssClasses.noRefinementRoot, props.nbPages <= 1))
  }, (0, _preact.h)("ul", {
    className: props.cssClasses.list
  }, props.showFirst && (0, _preact.h)(PaginationLink, {
    ariaLabel: "First",
    className: props.cssClasses.firstPageItem,
    isDisabled: props.isFirstPage,
    label: props.templates.first,
    pageNumber: 0,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  }), props.showPrevious && (0, _preact.h)(PaginationLink, {
    ariaLabel: "Previous",
    className: props.cssClasses.previousPageItem,
    isDisabled: props.isFirstPage,
    label: props.templates.previous,
    pageNumber: props.currentPage - 1,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  }), props.pages.map(function (pageNumber) {
    return (0, _preact.h)(PaginationLink, {
      key: pageNumber,
      ariaLabel: "".concat(pageNumber + 1),
      className: props.cssClasses.pageItem,
      isSelected: pageNumber === props.currentPage,
      label: "".concat(pageNumber + 1),
      pageNumber: pageNumber,
      createURL: props.createURL,
      cssClasses: props.cssClasses,
      createClickHandler: createClickHandler
    });
  }), props.showNext && (0, _preact.h)(PaginationLink, {
    ariaLabel: "Next",
    className: props.cssClasses.nextPageItem,
    isDisabled: props.isLastPage,
    label: props.templates.next,
    pageNumber: props.currentPage + 1,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  }), props.showLast && (0, _preact.h)(PaginationLink, {
    ariaLabel: "Last",
    className: props.cssClasses.lastPageItem,
    isDisabled: props.isLastPage,
    label: props.templates.last,
    pageNumber: props.nbPages - 1,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  })));
}

function PaginationLink(_ref) {
  var label = _ref.label,
      ariaLabel = _ref.ariaLabel,
      pageNumber = _ref.pageNumber,
      className = _ref.className,
      _ref$isDisabled = _ref.isDisabled,
      isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
      _ref$isSelected = _ref.isSelected,
      isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
      cssClasses = _ref.cssClasses,
      createURL = _ref.createURL,
      createClickHandler = _ref.createClickHandler;
  return (0, _preact.h)("li", {
    className: (0, _classnames.default)(cssClasses.item, className, isDisabled && cssClasses.disabledItem, isSelected && cssClasses.selectedItem)
  }, isDisabled ? (0, _preact.h)("span", {
    className: cssClasses.link,
    dangerouslySetInnerHTML: {
      __html: label
    }
  }) : (0, _preact.h)("a", {
    className: cssClasses.link,
    "aria-label": ariaLabel,
    href: createURL(pageNumber),
    onClick: createClickHandler(pageNumber),
    dangerouslySetInnerHTML: {
      __html: label
    }
  }));
}

var _default = Pagination;
exports.default = _default;