"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pit = function Pit(_ref) {
  var style = _ref.style,
      children = _ref.children;
  // first, end & middle
  var positionValue = Math.round(parseFloat(style.left));
  var shouldDisplayValue = [0, 50, 100].includes(positionValue); // Children could be an array, unwrap the value if it's the case
  // see: https://github.com/developit/preact-compat/issues/436

  var value = Array.isArray(children) ? children[0] : children;
  var pitValue = Math.round(parseInt(value, 10) * 100) / 100;
  return _preactCompat.default.createElement("div", {
    style: _objectSpread({}, style, {
      marginLeft: positionValue === 100 ? '-2px' : 0
    }),
    className: (0, _classnames.default)('rheostat-marker', 'rheostat-marker-horizontal', {
      'rheostat-marker-large': shouldDisplayValue
    })
  }, shouldDisplayValue && _preactCompat.default.createElement("div", {
    className: 'rheostat-value'
  }, pitValue));
};

var _default = Pit;
exports.default = _default;