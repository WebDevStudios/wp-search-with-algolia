function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { cx } from 'instantsearch-ui-components';
import { h, Component } from 'preact';
import Template from "../Template/Template.js";
// Strips leading `0` from a positive number value
function stripLeadingZeroFromInput(value) {
  return value.replace(/^(0+)\d/, function (part) {
    return Number(part).toString();
  });
}
var RangeInput = /*#__PURE__*/function (_Component) {
  _inherits(RangeInput, _Component);
  var _super = _createSuper(RangeInput);
  function RangeInput() {
    var _this$props$values$mi, _this$props$values$ma;
    var _this;
    _classCallCheck(this, RangeInput);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      min: (_this$props$values$mi = _this.props.values.min) === null || _this$props$values$mi === void 0 ? void 0 : _this$props$values$mi.toString(),
      max: (_this$props$values$ma = _this.props.values.max) === null || _this$props$values$ma === void 0 ? void 0 : _this$props$values$ma.toString()
    });
    _defineProperty(_assertThisInitialized(_this), "onInput", function (key) {
      return function (event) {
        var _ref = event.currentTarget,
          value = _ref.value;
        _this.setState(_defineProperty({}, key, value));
      };
    });
    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      event.preventDefault();
      var _this$state = _this.state,
        min = _this$state.min,
        max = _this$state.max;
      _this.props.refine([min ? Number(min) : undefined, max ? Number(max) : undefined]);
    });
    return _this;
  }
  _createClass(RangeInput, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$values$min, _nextProps$values$max;
      this.setState({
        min: (_nextProps$values$min = nextProps.values.min) === null || _nextProps$values$min === void 0 ? void 0 : _nextProps$values$min.toString(),
        max: (_nextProps$values$max = nextProps.values.max) === null || _nextProps$values$max === void 0 ? void 0 : _nextProps$values$max.toString()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        minValue = _this$state2.min,
        maxValue = _this$state2.max;
      var _this$props = this.props,
        min = _this$props.min,
        max = _this$props.max,
        step = _this$props.step,
        cssClasses = _this$props.cssClasses,
        templateProps = _this$props.templateProps;
      var isDisabled = min && max ? min >= max : false;
      var hasRefinements = Boolean(minValue || maxValue);
      var rootClassNames = cx(cssClasses.root, !hasRefinements && cssClasses.noRefinement);
      return h("div", {
        className: rootClassNames
      }, h("form", {
        className: cssClasses.form,
        onSubmit: this.onSubmit
      }, h("label", {
        className: cssClasses.label
      }, h("input", {
        className: cx(cssClasses.input, cssClasses.inputMin),
        type: "number",
        min: min,
        max: max,
        step: step,
        value: stripLeadingZeroFromInput(minValue !== null && minValue !== void 0 ? minValue : ''),
        onInput: this.onInput('min'),
        placeholder: min === null || min === void 0 ? void 0 : min.toString(),
        disabled: isDisabled
      })), h(Template, _extends({}, templateProps, {
        templateKey: "separatorText",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.separator
        }
      })), h("label", {
        className: cssClasses.label
      }, h("input", {
        className: cx(cssClasses.input, cssClasses.inputMax),
        type: "number",
        min: min,
        max: max,
        step: step,
        value: stripLeadingZeroFromInput(maxValue !== null && maxValue !== void 0 ? maxValue : ''),
        onInput: this.onInput('max'),
        placeholder: max === null || max === void 0 ? void 0 : max.toString(),
        disabled: isDisabled
      })), h(Template, _extends({}, templateProps, {
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
}(Component);
export default RangeInput;