function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { h } from 'preact';
import cx from 'classnames';
import { isSpecialClick } from "../../lib/utils/index.js";

function Pagination(props) {
  function createClickHandler(pageNumber) {
    return function (event) {
      if (isSpecialClick(event)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }

      event.preventDefault();
      props.setCurrentPage(pageNumber);
    };
  }

  return h("div", {
    className: cx(props.cssClasses.root, _defineProperty({}, props.cssClasses.noRefinementRoot, props.nbPages <= 1))
  }, h("ul", {
    className: props.cssClasses.list
  }, props.showFirst && h(PaginationLink, {
    ariaLabel: "First",
    className: props.cssClasses.firstPageItem,
    isDisabled: props.isFirstPage,
    label: props.templates.first,
    pageNumber: 0,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  }), props.showPrevious && h(PaginationLink, {
    ariaLabel: "Previous",
    className: props.cssClasses.previousPageItem,
    isDisabled: props.isFirstPage,
    label: props.templates.previous,
    pageNumber: props.currentPage - 1,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  }), props.pages.map(function (pageNumber) {
    return h(PaginationLink, {
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
  }), props.showNext && h(PaginationLink, {
    ariaLabel: "Next",
    className: props.cssClasses.nextPageItem,
    isDisabled: props.isLastPage,
    label: props.templates.next,
    pageNumber: props.currentPage + 1,
    createURL: props.createURL,
    cssClasses: props.cssClasses,
    createClickHandler: createClickHandler
  }), props.showLast && h(PaginationLink, {
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
  return h("li", {
    className: cx(cssClasses.item, className, isDisabled && cssClasses.disabledItem, isSelected && cssClasses.selectedItem)
  }, isDisabled ? h("span", {
    className: cssClasses.link,
    dangerouslySetInnerHTML: {
      __html: label
    }
  }) : h("a", {
    className: cssClasses.link,
    "aria-label": ariaLabel,
    href: createURL(pageNumber),
    onClick: createClickHandler(pageNumber),
    dangerouslySetInnerHTML: {
      __html: label
    }
  }));
}

export default Pagination;