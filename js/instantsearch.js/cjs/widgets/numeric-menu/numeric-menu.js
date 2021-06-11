"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));

var _connectNumericMenu = _interopRequireDefault(require("../../connectors/numeric-menu/connectNumericMenu"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'numeric-menu'
});
var suit = (0, _suit.component)('NumericMenu');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        refine = _ref2.refine,
        items = _ref2.items;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preact.render)((0, _preact.h)(_RefinementList.default, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      toggleRefinement: refine,
      attribute: attribute
    }), containerNode);
  };
};

var numericMenu = function numericMenu(widgetOptions) {
  var _ref3 = widgetOptions || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      items = _ref3.items,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
      transformItems = _ref3.transformItems;

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
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    radio: (0, _classnames.default)(suit({
      descendantName: 'radio'
    }), userCssClasses.radio),
    labelText: (0, _classnames.default)(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    attribute: attribute,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeNumericMenu = (0, _connectNumericMenu.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return makeNumericMenu({
    attribute: attribute,
    items: items,
    transformItems: transformItems
  });
};

var _default = numericMenu;
exports.default = _default;