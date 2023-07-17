"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _CurrentRefinements = _interopRequireDefault(require("../../components/CurrentRefinements/CurrentRefinements"));
var _connectCurrentRefinements = _interopRequireDefault(require("../../connectors/current-refinements/connectCurrentRefinements"));
var _suit = require("../../lib/suit");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'current-refinements'
});
var suit = (0, _suit.component)('CurrentRefinements');
var renderer = function renderer(_ref, isFirstRender) {
  var items = _ref.items,
    widgetParams = _ref.widgetParams,
    canRefine = _ref.canRefine;
  if (isFirstRender) {
    return;
  }
  var _ref2 = widgetParams,
    container = _ref2.container,
    cssClasses = _ref2.cssClasses;
  (0, _preact.render)((0, _preact.h)(_CurrentRefinements.default, {
    cssClasses: cssClasses,
    items: items,
    canRefine: canRefine
  }), container);
};
var currentRefinements = function currentRefinements(widgetParams) {
  var _ref3 = widgetParams || {},
    container = _ref3.container,
    includedAttributes = _ref3.includedAttributes,
    excludedAttributes = _ref3.excludedAttributes,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
    transformItems = _ref3.transformItems;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root),
    noRefinementRoot: (0, _uiComponentsShared.cx)(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    label: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    category: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'category'
    }), userCssClasses.category),
    categoryLabel: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'categoryLabel'
    }), userCssClasses.categoryLabel),
    delete: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'delete'
    }), userCssClasses.delete)
  };
  var makeWidget = (0, _connectCurrentRefinements.default)(renderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.currentRefinements'
  });
};
var _default = currentRefinements;
exports.default = _default;