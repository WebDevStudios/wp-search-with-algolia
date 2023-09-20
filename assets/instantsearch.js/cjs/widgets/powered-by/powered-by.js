"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _PoweredBy = _interopRequireDefault(require("../../components/PoweredBy/PoweredBy"));
var _connectPoweredBy = _interopRequireDefault(require("../../connectors/powered-by/connectPoweredBy"));
var _suit = require("../../lib/suit");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var suit = (0, _suit.component)('PoweredBy');
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'powered-by'
});
var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
    cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var url = _ref2.url,
      widgetParams = _ref2.widgetParams;
    if (isFirstRendering) {
      var _widgetParams$theme = widgetParams.theme,
        theme = _widgetParams$theme === void 0 ? 'light' : _widgetParams$theme;
      (0, _preact.render)((0, _preact.h)(_PoweredBy.default, {
        cssClasses: cssClasses,
        url: url,
        theme: theme
      }), containerNode);
      return;
    }
  };
};
var poweredBy = function poweredBy(widgetParams) {
  var _ref3 = widgetParams || {},
    container = _ref3.container,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
    _ref3$theme = _ref3.theme,
    theme = _ref3$theme === void 0 ? 'light' : _ref3$theme;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), suit({
      modifierName: theme === 'dark' ? 'dark' : 'light'
    }), userCssClasses.root),
    link: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    logo: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'logo'
    }), userCssClasses.logo)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeWidget = (0, _connectPoweredBy.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    theme: theme
  })), {}, {
    $$widgetType: 'ais.poweredBy'
  });
};
var _default = poweredBy;
exports.default = _default;