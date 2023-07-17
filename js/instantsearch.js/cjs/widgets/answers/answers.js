"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _Answers = _interopRequireDefault(require("../../components/Answers/Answers"));
var _connectAnswers = _interopRequireDefault(require("../../connectors/answers/connectAnswers"));
var _suit = require("../../lib/suit");
var _templating = require("../../lib/templating");
var _utils = require("../../lib/utils");
var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'answers'
});
var suit = (0, _suit.component)('Answers');
var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
    cssClasses = _ref.cssClasses,
    renderState = _ref.renderState,
    templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var hits = _ref2.hits,
      isLoading = _ref2.isLoading,
      instantSearchInstance = _ref2.instantSearchInstance;
    if (isFirstRendering) {
      renderState.templateProps = (0, _templating.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }
    (0, _preact.render)((0, _preact.h)(_Answers.default, {
      cssClasses: cssClasses,
      hits: hits,
      isLoading: isLoading,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
var answersWidget = function answersWidget(widgetParams) {
  var _ref3 = widgetParams || {},
    container = _ref3.container,
    attributesForPrediction = _ref3.attributesForPrediction,
    queryLanguages = _ref3.queryLanguages,
    nbHits = _ref3.nbHits,
    searchDebounceTime = _ref3.searchDebounceTime,
    renderDebounceTime = _ref3.renderDebounceTime,
    escapeHTML = _ref3.escapeHTML,
    extraParameters = _ref3.extraParameters,
    _ref3$templates = _ref3.templates,
    templates = _ref3$templates === void 0 ? {} : _ref3$templates,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root),
    emptyRoot: (0, _uiComponentsShared.cx)(suit({
      modifierName: 'empty'
    }), userCssClasses.emptyRoot),
    header: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'header'
    }), userCssClasses.header),
    loader: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'loader'
    }), userCssClasses.loader),
    list: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item'
    }), userCssClasses.item)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {}
  });
  var makeWidget = (0, _connectAnswers.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attributesForPrediction: attributesForPrediction,
    queryLanguages: queryLanguages,
    nbHits: nbHits,
    searchDebounceTime: searchDebounceTime,
    renderDebounceTime: renderDebounceTime,
    escapeHTML: escapeHTML,
    extraParameters: extraParameters
  })), {}, {
    $$widgetType: 'ais.answers'
  });
};
var _default = answersWidget;
exports.default = _default;