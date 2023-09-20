function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { cx } from '@algolia/ui-components-shared';
import { h } from 'preact';
import { find } from "../../lib/utils/index.js";
import Template from "../Template/Template.js";
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
    className: cx(cssClasses.root, items.length === 0 && cssClasses.noRefinementRoot)
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