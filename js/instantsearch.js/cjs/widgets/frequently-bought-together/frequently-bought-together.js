"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _instantsearchUiComponents = require("instantsearch-ui-components");
var _preact = require("preact");
var _Template = _interopRequireDefault(require("../../components/Template/Template"));
var _connectFrequentlyBoughtTogether = _interopRequireDefault(require("../../connectors/frequently-bought-together/connectFrequentlyBoughtTogether"));
var _templating = require("../../lib/templating");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'frequently-bought-together'
});
var FrequentlyBoughtTogether = (0, _instantsearchUiComponents.createFrequentlyBoughtTogetherComponent)({
  createElement: _preact.h,
  Fragment: _preact.Fragment
});
var renderer = function renderer(_ref) {
  var renderState = _ref.renderState,
    cssClasses = _ref.cssClasses,
    containerNode = _ref.containerNode,
    templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items,
      results = _ref2.results,
      instantSearchInstance = _ref2.instantSearchInstance;
    if (isFirstRendering) {
      renderState.templateProps = (0, _templating.prepareTemplateProps)({
        defaultTemplates: {},
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }
    var headerComponent = templates.header ? function (data) {
      return (0, _preact.h)(_Template.default, _extends({}, renderState.templateProps, {
        templateKey: "header",
        rootTagName: "fragment",
        data: {
          cssClasses: data.classNames,
          items: data.items
        }
      }));
    } : undefined;
    var itemComponent = templates.item ? function (_ref3) {
      var item = _ref3.item;
      return (0, _preact.h)(_Template.default, _extends({}, renderState.templateProps, {
        templateKey: "item",
        rootTagName: "fragment",
        data: item
      }));
    } : undefined;
    var emptyComponent = templates.empty ? function () {
      return (0, _preact.h)(_Template.default, _extends({}, renderState.templateProps, {
        templateKey: "empty",
        rootTagName: "fragment",
        data: results
      }));
    } : undefined;
    (0, _preact.render)((0, _preact.h)(FrequentlyBoughtTogether, {
      items: items,
      headerComponent: headerComponent,
      itemComponent: itemComponent,
      sendEvent: function sendEvent() {},
      classNames: cssClasses,
      emptyComponent: emptyComponent,
      status: instantSearchInstance.status
    }), containerNode);
  };
};
var frequentlyBoughtTogether = function frequentlyBoughtTogether(widgetParams) {
  var _ref4 = widgetParams || {},
    container = _ref4.container,
    objectIDs = _ref4.objectIDs,
    limit = _ref4.limit,
    queryParameters = _ref4.queryParameters,
    threshold = _ref4.threshold,
    escapeHTML = _ref4.escapeHTML,
    transformItems = _ref4.transformItems,
    _ref4$templates = _ref4.templates,
    templates = _ref4$templates === void 0 ? {} : _ref4$templates,
    _ref4$cssClasses = _ref4.cssClasses,
    cssClasses = _ref4$cssClasses === void 0 ? {} : _ref4$cssClasses;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectFrequentlyBoughtTogether.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    objectIDs: objectIDs,
    limit: limit,
    queryParameters: queryParameters,
    threshold: threshold,
    escapeHTML: escapeHTML,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.frequentlyBoughtTogether'
  });
};
exports.default = frequentlyBoughtTogether;