"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReverseSnippet = ReverseSnippet;

var _preact = require("preact");

var _ReverseSnippet = require("../../components/ReverseSnippet/ReverseSnippet.js");

var _index = require("../../lib/utils/index.js");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ReverseSnippet(_ref) {
  var hit = _ref.hit,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      props = _objectWithoutProperties(_ref, ["hit", "attribute", "cssClasses"]);

  var property = (0, _index.getPropertyByPath)(hit._snippetResult, attribute) || [];
  var properties = (0, _index.toArray)(property);
  process.env.NODE_ENV === 'development' ? (0, _index.warning)(Boolean(properties.length), "Could not enable snippet for \"".concat(attribute.toString(), "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) : void 0;
  var parts = properties.map(function (_ref2) {
    var value = _ref2.value;
    return (0, _index.getHighlightedParts)((0, _index.unescape)(value || '')).map(function (_ref3) {
      var isHighlighted = _ref3.isHighlighted,
          rest = _objectWithoutProperties(_ref3, ["isHighlighted"]);

      return _objectSpread(_objectSpread({}, rest), {}, {
        isHighlighted: !isHighlighted
      });
    });
  });
  return (0, _preact.h)(_ReverseSnippet.ReverseSnippet, _extends({}, props, {
    parts: parts,
    classNames: cssClasses
  }));
}