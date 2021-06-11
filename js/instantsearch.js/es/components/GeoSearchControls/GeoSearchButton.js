/** @jsx h */
import { h } from 'preact';

var GeoSearchButton = function GeoSearchButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;
  return h("button", {
    className: className,
    onClick: onClick,
    disabled: disabled
  }, children);
};

GeoSearchButton.defaultProps = {
  disabled: false
};
export default GeoSearchButton;