"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clearRefinements;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _ClearRefinements = _interopRequireDefault(require("../../components/ClearRefinements/ClearRefinements"));

var _classnames = _interopRequireDefault(require("classnames"));

var _connectClearRefinements = _interopRequireDefault(require("../../connectors/clear-refinements/connectClearRefinements"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

    (0, _preactCompat.render)(_preactCompat.default.createElement(_ClearRefinements.default, {
      refine: refine,
      cssClasses: cssClasses,
      hasRefinements: hasRefinements,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
/**
 * @typedef {Object} ClearRefinementsCSSClasses
 * @property {string|string[]} [root] CSS class to add to the wrapper element.
 * @property {string|string[]} [button] CSS class to add to the button of the widget.
 * @property {string|string[]} [disabledButton] CSS class to add to the button when there are no refinements.
 */

/**
 * @typedef {Object} ClearRefinementsTemplates
 * @property {string|string[]} [resetLabel] Template for the content of the button
 */

/**
 * @typedef {Object} ClearRefinementsWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string[]} [includedAttributes = []] The attributes to include in the refinements to clear (all by default). Cannot be used with `excludedAttributes`.
 * @property {string[]} [excludedAttributes = ['query']] The attributes to exclude from the refinements to clear. Cannot be used with `includedAttributes`.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 * @property {ClearRefinementsTemplates} [templates] Templates to use for the widget.
 * @property {ClearRefinementsCSSClasses} [cssClasses] CSS classes to be added.
 */

/**
 * The clear all widget gives the user the ability to clear all the refinements currently
 * applied on the results. It is equivalent to the reset button of a form.
 *
 * The current refined values widget can display a button that has the same behavior.
 * @type {WidgetFactory}
 * @devNovel ClearRefinements
 * @category clear-filter
 * @param {ClearRefinementsWidgetOptions} $0 The ClearRefinements widget options.
 * @returns {Widget} A new instance of the ClearRefinements widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.clearRefinements({
 *     container: '#clear-all',
 *     templates: {
 *       resetLabel: 'Reset everything'
 *     },
 *   })
 * );
 */


function clearRefinements(_ref3) {
  var container = _ref3.container,
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
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeWidget({
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
}