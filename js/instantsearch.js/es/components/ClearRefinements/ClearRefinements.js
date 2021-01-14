function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h } from 'preact';
import cx from 'classnames';
import Template from '../Template/Template';

var ClearRefinements = function ClearRefinements(_ref) {
  var hasRefinements = _ref.hasRefinements,
      refine = _ref.refine,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
  return h("div", {
    className: cssClasses.root
  }, h(Template, _extends({}, templateProps, {
    templateKey: "resetLabel",
    rootTagName: "button",
    rootProps: {
      className: cx(cssClasses.button, _defineProperty({}, cssClasses.disabledButton, !hasRefinements)),
      onClick: refine,
      disabled: !hasRefinements
    },
    data: {
      hasRefinements: hasRefinements
    }
  })));
};

export default ClearRefinements;