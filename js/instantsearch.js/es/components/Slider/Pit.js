function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h } from 'preact';
import cx from 'classnames';

var Pit = function Pit(_ref) {
  var style = _ref.style,
      children = _ref.children;
  // first, end & middle
  var positionValue = Math.round(parseFloat(style.left));
  var shouldDisplayValue = [0, 50, 100].includes(positionValue);
  var value = children;
  var pitValue = Math.round(parseInt(value, 10) * 100) / 100;
  return h("div", {
    style: _objectSpread(_objectSpread({}, style), {}, {
      marginLeft: positionValue === 100 ? '-2px' : 0
    }),
    className: cx('rheostat-marker', 'rheostat-marker-horizontal', {
      'rheostat-marker-large': shouldDisplayValue
    })
  }, shouldDisplayValue && h("div", {
    className: 'rheostat-value'
  }, pitValue));
};

export default Pit;