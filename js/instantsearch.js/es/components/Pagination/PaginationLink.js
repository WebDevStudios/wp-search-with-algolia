/** @jsx h */
import { h } from 'preact';

var PaginationLink = function PaginationLink(_ref) {
  var cssClasses = _ref.cssClasses,
      label = _ref.label,
      ariaLabel = _ref.ariaLabel,
      url = _ref.url,
      isDisabled = _ref.isDisabled,
      handleClick = _ref.handleClick,
      pageNumber = _ref.pageNumber;

  if (isDisabled) {
    return h("li", {
      className: cssClasses.item
    }, h("span", {
      className: cssClasses.link,
      dangerouslySetInnerHTML: {
        __html: label
      }
    }));
  }

  return h("li", {
    className: cssClasses.item
  }, h("a", {
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

export default PaginationLink;