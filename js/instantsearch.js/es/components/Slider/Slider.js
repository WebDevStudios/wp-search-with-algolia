function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, Component } from 'preact';
import Rheostat from './Rheostat';
import cx from 'classnames';
import { range } from '../../lib/utils';
import Pit from './Pit';

var Slider = /*#__PURE__*/function (_Component) {
  _inherits(Slider, _Component);

  var _super = _createSuper(Slider);

  function Slider() {
    var _this;

    _classCallCheck(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

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
        var roundedValue = Math.round( // have to cast as a string, as the value given to the prop is a number, but becomes a string when read
        parseFloat(props['aria-valuenow']) * 100) / 100;
        var value = _typeof(tooltips) === 'object' && tooltips.format ? tooltips.format(roundedValue) : roundedValue;
        var className = cx(props.className, {
          'rheostat-handle-lower': props['data-handle-key'] === 0,
          'rheostat-handle-upper': props['data-handle-key'] === 1
        });
        return h("div", _extends({}, props, {
          className: className
        }), tooltips && h("div", {
          className: "rheostat-tooltip"
        }, value));
      };
    });

    return _this;
  }

  _createClass(Slider, [{
    key: "isDisabled",
    get: function get() {
      return this.props.min >= this.props.max;
    }
  }, {
    key: "computeDefaultPitPoints",
    value: // creates an array number where to display a pit point on the slider
    function computeDefaultPitPoints(_ref2) {
      var min = _ref2.min,
          max = _ref2.max;
      var totalLength = max - min;
      var steps = 34;
      var stepsLength = totalLength / steps;
      var pitPoints = [min].concat(_toConsumableArray(range({
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
      return [].concat(_toConsumableArray(range({
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
          cssClasses = _this$props.cssClasses; // @TODO: figure out why this.props needs to be non-null asserted

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
      return h("div", {
        className: cx(cssClasses.root, _defineProperty({}, cssClasses.disabledRoot, this.isDisabled))
      }, h(Rheostat, {
        handle: this.createHandleComponent(tooltips),
        onChange: this.handleChange,
        min: min,
        max: max,
        pitComponent: Pit,
        pitPoints: pitPoints,
        snap: true,
        snapPoints: snapPoints,
        values: this.isDisabled ? [min, max] : values,
        disabled: this.isDisabled
      }));
    }
  }]);

  return Slider;
}(Component);

export default Slider;