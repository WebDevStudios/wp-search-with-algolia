function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'preact-compat';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Template from '../Template/Template';

var renderLink = function renderLink(_ref) {
  var cssClasses = _ref.cssClasses,
      createURL = _ref.createURL,
      refine = _ref.refine,
      templateProps = _ref.templateProps;
  return function (item, idx, items) {
    var isLast = idx === items.length - 1;
    var link = isLast ? item.label : React.createElement("a", {
      className: cssClasses.link,
      href: createURL(item.value),
      onClick: function onClick(event) {
        event.preventDefault();
        refine(item.value);
      }
    }, item.label);
    return React.createElement("li", {
      key: item.label + idx,
      className: cx(cssClasses.item, _defineProperty({}, cssClasses.selectedItem, isLast))
    }, React.createElement(Template, _extends({}, templateProps, {
      templateKey: "separator",
      rootTagName: "span",
      rootProps: {
        className: cssClasses.separator,
        'aria-hidden': true
      }
    })), link);
  };
};

var Breadcrumb = function Breadcrumb(_ref2) {
  var createURL = _ref2.createURL,
      items = _ref2.items,
      refine = _ref2.refine,
      cssClasses = _ref2.cssClasses,
      templateProps = _ref2.templateProps;
  return React.createElement("div", {
    className: cx(cssClasses.root, _defineProperty({}, cssClasses.noRefinementRoot, items.length === 0))
  }, React.createElement("ul", {
    className: cssClasses.list
  }, React.createElement("li", {
    className: cx(cssClasses.item, _defineProperty({}, cssClasses.selectedItem, items.length === 0))
  }, React.createElement(Template, _extends({}, templateProps, {
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
  }))), items.map(renderLink({
    cssClasses: cssClasses,
    createURL: createURL,
    refine: refine,
    templateProps: templateProps
  }))));
};

export default Breadcrumb;