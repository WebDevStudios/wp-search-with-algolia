"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTemplates = exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _QueryRuleCustomData = _interopRequireDefault(require("../../components/QueryRuleCustomData/QueryRuleCustomData"));
var _connectQueryRules = _interopRequireDefault(require("../../connectors/query-rules/connectQueryRules"));
var _suit = require("../../lib/suit");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var defaultTemplates = {
  default: function _default(_ref) {
    var items = _ref.items;
    return JSON.stringify(items, null, 2);
  }
};
exports.defaultTemplates = defaultTemplates;
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'query-rule-custom-data'
});
var suit = (0, _suit.component)('QueryRuleCustomData');
var renderer = function renderer(_ref2) {
  var containerNode = _ref2.containerNode,
    cssClasses = _ref2.cssClasses,
    templates = _ref2.templates;
  return function (_ref3) {
    var items = _ref3.items;
    (0, _preact.render)((0, _preact.h)(_QueryRuleCustomData.default, {
      cssClasses: cssClasses,
      templates: templates,
      items: items
    }), containerNode);
  };
};
var queryRuleCustomData = function queryRuleCustomData(widgetParams) {
  var _ref4 = widgetParams || {},
    container = _ref4.container,
    _ref4$cssClasses = _ref4.cssClasses,
    userCssClasses = _ref4$cssClasses === void 0 ? {} : _ref4$cssClasses,
    _ref4$templates = _ref4.templates,
    userTemplates = _ref4$templates === void 0 ? {} : _ref4$templates,
    _ref4$transformItems = _ref4.transformItems,
    transformItems = _ref4$transformItems === void 0 ? function (items) {
      return items;
    } : _ref4$transformItems;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root)
  };
  var containerNode = (0, _utils.getContainerNode)(container);
  var templates = _objectSpread(_objectSpread({}, defaultTemplates), userTemplates);
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectQueryRules.default)(specializedRenderer, function () {
    (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.queryRuleCustomData'
  });
};
var _default2 = queryRuleCustomData;
exports.default = _default2;