function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import { renderTemplate, isEqual } from '../../lib/utils';
var defaultProps = {
  data: {},
  rootTagName: 'div',
  useCustomCompileOptions: {},
  templates: {},
  templatesConfig: {}
};

// @TODO: Template should be a generic and receive TData to pass to Templates (to avoid TTemplateData to be set as `any`)
var Template = /*#__PURE__*/function (_Component) {
  _inherits(Template, _Component);

  var _super = _createSuper(Template);

  function Template() {
    _classCallCheck(this, Template);

    return _super.apply(this, arguments);
  }

  _createClass(Template, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return !isEqual(this.props.data, nextProps.data) || this.props.templateKey !== nextProps.templateKey || !isEqual(this.props.rootProps, nextProps.rootProps);
    }
  }, {
    key: "render",
    value: function render() {
      var RootTagName = this.props.rootTagName;
      var useCustomCompileOptions = this.props.useCustomCompileOptions[this.props.templateKey];
      var compileOptions = useCustomCompileOptions ? this.props.templatesConfig.compileOptions : {};
      var content = renderTemplate({
        templates: this.props.templates,
        templateKey: this.props.templateKey,
        compileOptions: compileOptions,
        helpers: this.props.templatesConfig.helpers,
        data: this.props.data,
        bindEvent: this.props.bindEvent
      });

      if (content === null) {
        // Adds a noscript to the DOM but virtual DOM is null
        // See http://facebook.github.io/react/docs/component-specs.html#render
        return null;
      }

      return h(RootTagName, _extends({}, this.props.rootProps, {
        dangerouslySetInnerHTML: {
          __html: content
        }
      }));
    }
  }]);

  return Template;
}(Component);

_defineProperty(Template, "defaultProps", defaultProps);

export default Template;