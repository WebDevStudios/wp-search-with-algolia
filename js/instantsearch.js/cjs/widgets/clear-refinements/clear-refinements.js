"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _ClearRefinements = _interopRequireDefault(require("../../components/ClearRefinements/ClearRefinements"));

var _classnames = _interopRequireDefault(require("classnames"));

var _connectClearRefinements = _interopRequireDefault(require("../../connectors/clear-refinements/connectClearRefinements"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'clear-refinements'
});
var suit = (0, _suit.component)('ClearRefinements');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        hasRefinements = _ref2.hasRefinements,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preact.render)((0, _preact.h)(_ClearRefinements.default, {
      refine: refine,
      cssClasses: cssClasses,
      hasRefinements: hasRefinements,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var clearRefinements = function clearRefinements(widgetOptions) {
  var _ref3 = widgetOptions || {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes,
      transformItems = _ref3.transformItems,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    button: (0, _classnames.default)(suit({
      descendantName: 'button'
    }), userCssClasses.button),
    disabledButton: (0, _classnames.default)(suit({
      descendantName: 'button',
      modifierName: 'disabled'
    }), userCssClasses.disabledButton)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectClearRefinements.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return makeWidget({
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
};

var _default = clearRefinements;
exports.default = _default;