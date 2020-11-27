"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var renderLink = function renderLink(_ref) {
  var cssClasses = _ref.cssClasses,
      createURL = _ref.createURL,
      refine = _ref.refine,
      templateProps = _ref.templateProps;
  return function (item, idx, items) {
    var isLast = idx === items.length - 1;
    var link = isLast ? item.label : _preactCompat.default.createElement("a", {
      className: cssClasses.link,
      href: createURL(item.value),
      onClick: function onClick(event) {
        event.preventDefault();
        refine(item.value);
      }
    }, item.label);
    return _preactCompat.default.createElement("li", {
      key: item.label + idx,
      className: (0, _classnames.default)(cssClasses.item, _defineProperty({}, cssClasses.selectedItem, isLast))
    }, _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
      templateKey: "separator",
      rootTagName: "span",
      rootProps: {
        className: cssClasses.separator,
        'aria-hidden': true
      }
    })), link);
  };
};

var Breadcrumb = function Breadcrumb(_ref2) {
  var createURL = _ref2.createURL,
      items = _ref2.items,
      refine = _ref2.refine,
      cssClasses = _ref2.cssClasses,
      templateProps = _ref2.templateProps;
  return _preactCompat.default.createElement("div", {
    className: (0, _classnames.default)(cssClasses.root, _defineProperty({}, cssClasses.noRefinementRoot, items.length === 0))
  }, _preactCompat.default.createElement("ul", {
    className: cssClasses.list
  }, _preactCompat.default.createElement("li", {
    className: (0, _classnames.default)(cssClasses.item, _defineProperty({}, cssClasses.selectedItem, items.length === 0))
  }, _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
    templateKey: "home",
    rootTagName: "a",
    rootProps: {
      className: cssClasses.link,
      href: createURL(null),
      onClick: function onClick(event) {
        event.preventDefault();
        refine(null);
      }
    }
  }))), items.map(renderLink({
    cssClasses: cssClasses,
    createURL: createURL,
    refine: refine,
    templateProps: templateProps
  }))));
};

var _default = Breadcrumb;
exports.default = _default;