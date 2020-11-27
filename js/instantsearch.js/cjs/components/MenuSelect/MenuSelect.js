"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var MenuSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(MenuSelect, _Component);

  function MenuSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MenuSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleSelectChange", function (_ref) {
      var value = _ref.target.value;

      _this.props.refine(value);
    });

    return _this;
  }

  _createClass(MenuSelect, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cssClasses = _this$props.cssClasses,
          templateProps = _this$props.templateProps,
          items = _this$props.items;

      var _ref2 = (0, _utils.find)(items, function (item) {
        return item.isRefined;
      }) || {
        value: ''
      },
          selectedValue = _ref2.value;

      var rootClassNames = (0, _classnames.default)(cssClasses.root, _defineProperty({}, cssClasses.noRefinementRoot, items.length === 0));
      return _preactCompat.default.createElement("div", {
        className: rootClassNames
      }, _preactCompat.default.createElement("select", {
        className: cssClasses.select,
        value: selectedValue,
        onChange: this.handleSelectChange
      }, _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
        templateKey: "defaultOption",
        rootTagName: "option",
        rootProps: {
          value: '',
          className: cssClasses.option
        }
      })), items.map(function (item) {
        return _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
          templateKey: "item",
          rootTagName: "option",
          rootProps: {
            value: item.value,
            className: cssClasses.option
          },
          key: item.value,
          data: item
        }));
      })));
    }
  }]);

  return MenuSelect;
}(_preactCompat.Component);

var _default = MenuSelect;
exports.default = _default;