"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Hits = function Hits(_ref) {
  var results = _ref.results,
      hits = _ref.hits,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;

  if (results.hits.length === 0) {
    return _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
      templateKey: "empty",
      rootProps: {
        className: (0, _classnames.default)(cssClasses.root, cssClasses.emptyRoot)
      },
      data: results
    }));
  }

  return _preactCompat.default.createElement("div", {
    className: cssClasses.root
  }, _preactCompat.default.createElement("ol", {
    className: cssClasses.list
  }, hits.map(function (hit, position) {
    return _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item
      },
      key: hit.objectID,
      data: _objectSpread({}, hit, {
        __hitIndex: position
      })
    }));
  })));
};

Hits.defaultProps = {
  results: {
    hits: []
  },
  hits: []
};
var _default = Hits;
exports.default = _default;