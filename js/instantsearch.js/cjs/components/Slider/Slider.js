"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _Rheostat = _interopRequireDefault(require("./Rheostat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _Pit = _interopRequireDefault(require("./Pit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slider =
/*#__PURE__*/
function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (_ref) {
      var values = _ref.values;

      if (!_this.isDisabled) {
        _this.props.refine(values);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createHandleComponent", function (tooltips) {
      return function (props) {
        // display only two decimals after comma,
        // and apply `tooltips.format()` if any
        var roundedValue = Math.round(parseFloat(props['aria-valuenow']) * 100) / 100;
        var value = tooltips && tooltips.format ? tooltips.format(roundedValue) : roundedValue;
        var className = (0, _classnames.default)(props.className, {
          'rheostat-handle-lower': props['data-handle-key'] === 0,
          'rheostat-handle-upper': props['data-handle-key'] === 1
        });
        return (0, _preact.h)("div", _extends({}, props, {
          className: className
        }), tooltips && (0, _preact.h)("div", {
          className: "rheostat-tooltip"
        }, value));
      };
    });

    return _this;
  }

  _createClass(Slider, [{
    key: "computeDefaultPitPoints",
    // creates an array number where to display a pit point on the slider
    value: function computeDefaultPitPoints(_ref2) {
      var min = _ref2.min,
          max = _ref2.max;
      var totalLength = max - min;
      var steps = 34;
      var stepsLength = totalLength / steps;
      var pitPoints = [min].concat(_toConsumableArray((0, _utils.range)({
        end: steps - 1
      }).map(function (step) {
        return min + stepsLength * (step + 1);
      })), [max]);
      return pitPoints;
    } // creates an array of values where the slider should snap to

  }, {
    key: "computeSnapPoints",
    value: function computeSnapPoints(_ref3) {
      var min = _ref3.min,
          max = _ref3.max,
          step = _ref3.step;
      if (!step) return undefined;
      return [].concat(_toConsumableArray((0, _utils.range)({
        start: min,
        end: max,
        step: step
      })), [max]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tooltips = _this$props.tooltips,
          step = _this$props.step,
          pips = _this$props.pips,
          values = _this$props.values,
          cssClasses = _this$props.cssClasses;

      var _ref4 = this.isDisabled ? {
        min: this.props.min,
        max: this.props.max + 0.001
      } : this.props,
          min = _ref4.min,
          max = _ref4.max;

      var snapPoints = this.computeSnapPoints({
        min: min,
        max: max,
        step: step
      });
      var pitPoints = pips === false ? [] : this.computeDefaultPitPoints({
        min: min,
        max: max
      });
      return (0, _preact.h)("div", {
        className: (0, _classnames.default)(cssClasses.root, _defineProperty({}, cssClasses.disabledRoot, this.isDisabled))
      }, (0, _preact.h)(_Rheostat.default, {
        handle: this.createHandleComponent(tooltips),
        onChange: this.handleChange,
        min: min,
        max: max,
        pitComponent: _Pit.default,
        pitPoints: pitPoints,
        snap: true,
        snapPoints: snapPoints,
        values: this.isDisabled ? [min, max] : values,
        disabled: this.isDisabled
      }));
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.props.min >= this.props.max;
    }
  }]);

  return Slider;
}(_preact.Component);

var _default = Slider;
exports.default = _default;