/** @jsx h */
import { h } from 'preact';
import cx from 'classnames';

function Selector(_ref) {
  var currentValue = _ref.currentValue,
      options = _ref.options,
      cssClasses = _ref.cssClasses,
      setValue = _ref.setValue;
  return h("select", {
    className: cx(cssClasses.select),
    onChange: function onChange(event) {
      return setValue(event.target.value);
    },
    value: "".concat(currentValue)
  }, options.map(function (option) {
    return h("option", {
      className: cx(cssClasses.option),
      key: option.label + option.value,
      value: "".concat(option.value)
    }, option.label);
  }));
}

export default Selector;