function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h } from 'preact';
import cx from 'classnames';
import { find } from '../../lib/utils';
import Template from '../Template/Template';

function MenuSelect(_ref) {
  var cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps,
      items = _ref.items,
      refine = _ref.refine;

  var _ref2 = find(items, function (item) {
    return item.isRefined;
  }) || {
    value: ''
  },
      selectedValue = _ref2.value;

  return h("div", {
    className: cx(cssClasses.root, _defineProperty({}, cssClasses.noRefinementRoot, items.length === 0))
  }, h("select", {
    className: cssClasses.select,
    value: selectedValue,
    onChange: function onChange(event) {
      refine(event.target.value);
    }
  }, h(Template, _extends({}, templateProps, {
    templateKey: "defaultOption",
    rootTagName: "option",
    rootProps: {
      value: '',
      className: cssClasses.option
    }
  })), items.map(function (item) {
    return h(Template, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "option",
      rootProps: {
        value: item.value,
        className: cssClasses.option
      },
      key: item.value,
      data: item
    }));
  })));
}

export default MenuSelect;