'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _reactNouislider = require('react-nouislider');

var _reactNouislider2 = _interopRequireDefault(_reactNouislider);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cssPrefix = 'ais-range-slider--';

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider() {
    _classCallCheck(this, Slider);

    return _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).apply(this, arguments));
  }

  _createClass(Slider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleChange = this.handleChange.bind(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _isEqual2.default)(this.props.range, nextProps.range) || !(0, _isEqual2.default)(this.props.start, nextProps.start);
    }

    // we are only interested in rawValues

  }, {
    key: 'handleChange',
    value: function handleChange(formattedValues, handleId, rawValues) {
      this.props.onChange(rawValues);
    }
  }, {
    key: 'render',
    value: function render() {
      // display a `disabled` state of the `NoUiSlider` when range.min === range.max
      var _props$range = this.props.range,
          min = _props$range.min,
          max = _props$range.max;

      var isDisabled = min === max;

      // when range.min === range.max, we only want to add a little more to the max
      // to display the same value in the UI, but the `NoUiSlider` wont
      // throw an error since they are not the same value.
      var range = isDisabled ? { min: min, max: min + 0.0001 } : { min: min, max: max };

      // setup pips
      var pips = void 0;
      if (this.props.pips === false) {
        pips = undefined;
      } else if (this.props.pips === true || typeof this.props.pips === 'undefined') {
        pips = {
          mode: 'positions',
          density: 3,
          values: [0, 50, 100],
          stepped: true
        };
      } else {
        pips = this.props.pips;
      }

      return _react2.default.createElement(_reactNouislider2.default
      // NoUiSlider also accepts a cssClasses prop, but we don't want to
      // provide one.
      , _extends({}, (0, _omit2.default)(this.props, ['cssClasses', 'range']), {
        animate: false,
        behaviour: 'snap',
        connect: true,
        cssPrefix: cssPrefix,
        onChange: this.handleChange,
        range: range,
        disabled: isDisabled,
        pips: pips
      }));
    }
  }]);

  return Slider;
}(_react2.default.Component);

exports.default = Slider;