"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReverseHighlight = ReverseHighlight;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _InternalHighlight = require("../InternalHighlight/InternalHighlight");
var _excluded = ["classNames"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ReverseHighlight(_ref) {
  var _ref$classNames = _ref.classNames,
    classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
    props = _objectWithoutProperties(_ref, _excluded);
  return (0, _preact.h)(_InternalHighlight.InternalHighlight, _extends({
    classNames: {
      root: (0, _uiComponentsShared.cx)('ais-ReverseHighlight', classNames.root),
      highlighted: (0, _uiComponentsShared.cx)('ais-ReverseHighlight-highlighted', classNames.highlighted),
      nonHighlighted: (0, _uiComponentsShared.cx)('ais-ReverseHighlight-nonHighlighted', classNames.nonHighlighted),
      separator: (0, _uiComponentsShared.cx)('ais-ReverseHighlight-separator', classNames.separator)
    }
  }, props));
}