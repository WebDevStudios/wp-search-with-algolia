function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h } from 'preact';
import cx from 'classnames';
import Template from '../Template/Template';

var Breadcrumb = function Breadcrumb(_ref) {
  var items = _ref.items,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps,
      createURL = _ref.createURL,
      refine = _ref.refine;
  return h("div", {
    className: cx(cssClasses.root, _defineProperty({}, cssClasses.noRefinementRoot, items.length === 0))
  }, h("ul", {
    className: cssClasses.list
  }, h("li", {
    className: cx(cssClasses.item, _defineProperty({}, cssClasses.selectedItem, items.length === 0))
  }, h(Template, _extends({}, templateProps, {
    templateKey: "home",
    rootTagName: "a",
    rootProps: {
      className: cssClasses.link,
      href: createURL(undefined),
      onClick: function onClick(event) {
        event.preventDefault();
        refine(undefined);
      }
    }
  }))), items.map(function (item, idx) {
    var isLast = idx === items.length - 1;
    return h("li", {
      key: item.label + idx,
      className: cx(cssClasses.item, _defineProperty({}, cssClasses.selectedItem, isLast))
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
        event.preventDefault();
        refine(item.value);
      }
    }, item.label));
  })));
};

export default Breadcrumb;