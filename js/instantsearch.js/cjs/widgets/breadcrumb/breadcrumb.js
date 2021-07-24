"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Breadcrumb = _interopRequireDefault(require("../../components/Breadcrumb/Breadcrumb"));

var _connectBreadcrumb = _interopRequireDefault(require("../../connectors/breadcrumb/connectBreadcrumb"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'breadcrumb'
});
var suit = (0, _suit.component)('Breadcrumb');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var canRefine = _ref2.canRefine,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        items = _ref2.items,
        refine = _ref2.refine;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preact.render)((0, _preact.h)(_Breadcrumb.default, {
      canRefine: canRefine,
      cssClasses: cssClasses,
      createURL: createURL,
      items: items,
      refine: refine,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var breadcrumb = function breadcrumb(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      attributes = _ref3.attributes,
      separator = _ref3.separator,
      rootPath = _ref3.rootPath,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    noRefinementRoot: (0, _classnames.default)(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    separator: (0, _classnames.default)(suit({
      descendantName: 'separator'
    }), userCssClasses.separator),
    link: (0, _classnames.default)(suit({
      descendantName: 'link'
    }), userCssClasses.link)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectBreadcrumb.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attributes: attributes,
    separator: separator,
    rootPath: rootPath,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.breadcrumb'
  });
};

var _default = breadcrumb;
exports.default = _default;