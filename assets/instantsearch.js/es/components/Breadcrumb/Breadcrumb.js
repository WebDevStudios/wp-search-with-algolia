function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { cx } from 'instantsearch-ui-components';
import { h } from 'preact';
import { isSpecialClick } from "../../lib/utils/index.js";
import Template from "../Template/Template.js";
var Breadcrumb = function Breadcrumb(_ref) {
  var items = _ref.items,
    cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps,
    createURL = _ref.createURL,
    refine = _ref.refine;
  return h("div", {
    className: cx(cssClasses.root, items.length === 0 && cssClasses.noRefinementRoot)
  }, h("ul", {
    className: cssClasses.list
  }, h("li", {
    className: cx(cssClasses.item, items.length === 0 && cssClasses.selectedItem)
  }, h(Template, _extends({}, templateProps, {
    templateKey: "home",
    rootTagName: "a",
    rootProps: {
      className: cssClasses.link,
      href: createURL(null),
      onClick: function onClick(event) {
        if (isSpecialClick(event)) {
          return;
        }
        event.preventDefault();
        refine(null);
      }
    }
  }))), items.map(function (item, idx) {
    var isLast = idx === items.length - 1;
    return h("li", {
      key: item.label + idx,
      className: cx(cssClasses.item, isLast && cssClasses.selectedItem)
    }, h(Template, _extends({}, templateProps, {
      templateKey: "separator",
      rootTagName: "span",
      rootProps: {
        className: cssClasses.separator,
        'aria-hidden': true
      }
    })), isLast ? item.label : h("a", {
      className: cssClasses.link,
      href: createURL(item.value),
      onClick: function onClick(event) {
        if (isSpecialClick(event)) {
          return;
        }
        event.preventDefault();
        refine(item.value);
      }
    }, item.label));
  })));
};
export default Breadcrumb;