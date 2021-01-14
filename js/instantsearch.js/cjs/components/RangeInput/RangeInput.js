"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var RangeInput =
/*#__PURE__*/
function (_Component) {
  _inherits(RangeInput, _Component);

  function RangeInput(props) {
    var _this;

    _classCallCheck(this, RangeInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeInput).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onInput", function (name) {
      return function (event) {
        _this.setState(_defineProperty({}, name, event.currentTarget.value));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      event.preventDefault();

      _this.props.refine([_this.state.min && Number(_this.state.min), _this.state.max && Number(_this.state.max)]);
    });

    _this.state = {
      min: props.values.min,
      max: props.values.max
    };
    return _this;
  }

  _createClass(RangeInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        min: nextProps.values.min,
        max: nextProps.values.max
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          minValue = _this$state.min,
          maxValue = _this$state.max;
      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          cssClasses = _this$props.cssClasses,
          templateProps = _this$props.templateProps;
      var isDisabled = min >= max;
      var hasRefinements = Boolean(minValue || maxValue);
      var rootClassNames = (0, _classnames.default)(cssClasses.root, _defineProperty({}, cssClasses.noRefinement, !hasRefinements));
      return (0, _preact.h)("div", {
        className: rootClassNames
      }, (0, _preact.h)("form", {
        className: cssClasses.form,
        onSubmit: this.onSubmit
      }, (0, _preact.h)("label", {
        className: cssClasses.label
      }, (0, _preact.h)("input", {
        className: (0, _classnames.default)(cssClasses.input, cssClasses.inputMin),
        type: "number",
        min: min,
        max: max,
        step: step,
        value: minValue !== null && minValue !== void 0 ? minValue : '',
        onInput: this.onInput('min'),
        placeholder: min,
        disabled: isDisabled
      })), (0, _preact.h)(_Template.default, _extends({}, templateProps, {
        templateKey: "separatorText",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.separator
        }
      })), (0, _preact.h)("label", {
        className: cssClasses.label
      }, (0, _preact.h)("input", {
        className: (0, _classnames.default)(cssClasses.input, cssClasses.inputMax),
        type: "number",
        min: min,
        max: max,
        step: step,
        value: maxValue !== null && maxValue !== void 0 ? maxValue : '',
        onInput: this.onInput('max'),
        placeholder: max,
        disabled: isDisabled
      })), (0, _preact.h)(_Template.default, _extends({}, templateProps, {
        templateKey: "submitText",
        rootTagName: "button",
        rootProps: {
          type: 'submit',
          className: cssClasses.submit,
          disabled: isDisabled
        }
      }))));
    }
  }]);

  return RangeInput;
}(_preact.Component);

var _default = RangeInput;
exports.default = _default;