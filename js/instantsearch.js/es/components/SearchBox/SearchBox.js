function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { h, createRef, Component } from 'preact';
import { noop } from "../../lib/utils/index.js";
import Template from "../Template/Template.js";
var defaultProps = {
  query: '',
  showSubmit: true,
  showReset: true,
  showLoadingIndicator: true,
  autofocus: false,
  searchAsYouType: true,
  isSearchStalled: false,
  disabled: false,
  onChange: noop,
  onSubmit: noop,
  onReset: noop,
  refine: noop
};
var SearchBox = /*#__PURE__*/function (_Component) {
  _inherits(SearchBox, _Component);
  var _super = _createSuper(SearchBox);
  function SearchBox() {
    var _this;
    _classCallCheck(this, SearchBox);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      query: _this.props.query,
      focused: false
    });
    _defineProperty(_assertThisInitialized(_this), "input", createRef());
    _defineProperty(_assertThisInitialized(_this), "onInput", function (event) {
      var _this$props = _this.props,
        searchAsYouType = _this$props.searchAsYouType,
        refine = _this$props.refine,
        onChange = _this$props.onChange;
      var query = event.target.value;
      if (searchAsYouType) {
        refine(query);
      }
      _this.setState({
        query: query
      });
      onChange(event);
    });
    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      var _this$props2 = _this.props,
        searchAsYouType = _this$props2.searchAsYouType,
        refine = _this$props2.refine,
        onSubmit = _this$props2.onSubmit;
      event.preventDefault();
      event.stopPropagation();
      if (_this.input.current) {
        _this.input.current.blur();
      }
      if (!searchAsYouType) {
        refine(_this.state.query);
      }
      onSubmit(event);
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "onReset", function (event) {
      var _this$props3 = _this.props,
        refine = _this$props3.refine,
        onReset = _this$props3.onReset;
      var query = '';
      if (_this.input.current) {
        _this.input.current.focus();
      }
      refine(query);
      _this.setState({
        query: query
      });
      onReset(event);
    });
    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setState({
        focused: false
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      _this.setState({
        focused: true
      });
    });
    return _this;
  }
  _createClass(SearchBox, [{
    key: "resetInput",
    value:
    /**
     * This public method is used in the RefinementList SFFV search box
     * to reset the input state when an item is selected.
     *
     * @see RefinementList#componentWillReceiveProps
     * @return {undefined}
     */
    function resetInput() {
      this.setState({
        query: ''
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      /**
       * when the user is typing, we don't want to replace the query typed
       * by the user (state.query) with the query exposed by the connector (props.query)
       * see: https://github.com/algolia/instantsearch.js/issues/4141
       */
      if (!this.state.focused && nextProps.query !== this.state.query) {
        this.setState({
          query: nextProps.query
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        cssClasses = _this$props4.cssClasses,
        placeholder = _this$props4.placeholder,
        autofocus = _this$props4.autofocus,
        showSubmit = _this$props4.showSubmit,
        showReset = _this$props4.showReset,
        showLoadingIndicator = _this$props4.showLoadingIndicator,
        templates = _this$props4.templates,
        isSearchStalled = _this$props4.isSearchStalled;
      return h("div", {
        className: cssClasses.root
      }, h("form", {
        action: "",
        role: "search",
        className: cssClasses.form,
        noValidate: true,
        onSubmit: this.onSubmit,
        onReset: this.onReset
      }, h("input", {
        ref: this.input,
        value: this.state.query,
        disabled: this.props.disabled,
        className: cssClasses.input,
        type: "search",
        placeholder: placeholder,
        autoFocus: autofocus,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off"
        // @ts-expect-error `spellCheck` attribute is missing in preact JSX types
        ,
        spellCheck: "false",
        maxLength: 512,
        onInput: this.onInput,
        onBlur: this.onBlur,
        onFocus: this.onFocus
      }), h(Template, {
        templateKey: "submit",
        rootTagName: "button",
        rootProps: {
          className: cssClasses.submit,
          type: 'submit',
          title: 'Submit the search query.',
          hidden: !showSubmit
        },
        templates: templates,
        data: {
          cssClasses: cssClasses
        }
      }), h(Template, {
        templateKey: "reset",
        rootTagName: "button",
        rootProps: {
          className: cssClasses.reset,
          type: 'reset',
          title: 'Clear the search query.',
          hidden: !(showReset && this.state.query.trim() && !isSearchStalled)
        },
        templates: templates,
        data: {
          cssClasses: cssClasses
        }
      }), showLoadingIndicator && h(Template, {
        templateKey: "loadingIndicator",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.loadingIndicator,
          hidden: !isSearchStalled
        },
        templates: templates,
        data: {
          cssClasses: cssClasses
        }
      })));
    }
  }]);
  return SearchBox;
}(Component);
_defineProperty(SearchBox, "defaultProps", defaultProps);
export default SearchBox;