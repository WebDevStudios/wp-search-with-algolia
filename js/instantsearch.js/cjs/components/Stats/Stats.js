"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Stats = function Stats(_ref) {
  var nbHits = _ref.nbHits,
      nbSortedHits = _ref.nbSortedHits,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps,
      rest = _objectWithoutProperties(_ref, ["nbHits", "nbSortedHits", "cssClasses", "templateProps"]);

  return (0, _preact.h)("div", {
    className: (0, _classnames.default)(cssClasses.root)
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "text",
    rootTagName: "span",
    rootProps: {
      className: cssClasses.text
    },
    data: _objectSpread({
      hasManySortedResults: nbSortedHits && nbSortedHits > 1,
      hasNoSortedResults: nbSortedHits === 0,
      hasOneSortedResults: nbSortedHits === 1,
      hasManyResults: nbHits > 1,
      hasNoResults: nbHits === 0,
      hasOneResult: nbHits === 1,
      nbHits: nbHits,
      nbSortedHits: nbSortedHits,
      cssClasses: cssClasses
    }, rest)
  })));
};

var _default = Stats;
exports.default = _default;