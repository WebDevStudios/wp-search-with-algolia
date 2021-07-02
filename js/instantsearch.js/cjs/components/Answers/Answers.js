"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Answers = function Answers(_ref) {
  var hits = _ref.hits,
      isLoading = _ref.isLoading,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;
  return (0, _preact.h)("div", {
    className: (0, _classnames.default)(cssClasses.root, _defineProperty({}, cssClasses.emptyRoot, hits.length === 0))
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "header",
    rootProps: {
      className: cssClasses.header
    },
    data: {
      hits: hits,
      isLoading: isLoading
    }
  })), isLoading ? (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "loader",
    rootProps: {
      className: cssClasses.loader
    }
  })) : (0, _preact.h)("ul", {
    className: cssClasses.list
  }, hits.map(function (hit, position) {
    return (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item
      },
      key: hit.objectID,
      data: _objectSpread(_objectSpread({}, hit), {}, {
        __hitIndex: position
      })
    }));
  })));
};

var _default = Answers;
exports.default = _default;