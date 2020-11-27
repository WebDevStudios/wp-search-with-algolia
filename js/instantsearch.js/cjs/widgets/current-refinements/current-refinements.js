"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = currentRefinements;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _CurrentRefinements = _interopRequireDefault(require("../../components/CurrentRefinements/CurrentRefinements"));

var _connectCurrentRefinements = _interopRequireDefault(require("../../connectors/current-refinements/connectCurrentRefinements"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'current-refinements'
});
var suit = (0, _suit.component)('CurrentRefinements');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items;

    if (isFirstRendering) {
      return;
    }

    (0, _preactCompat.render)(_preactCompat.default.createElement(_CurrentRefinements.default, {
      cssClasses: cssClasses,
      items: items
    }), containerNode);
  };
};
/**
 * @typedef {Object} CurrentRefinementsCSSClasses
 * @property {string} [root] CSS classes added to the root element.
 * @property {string} [list] CSS classes added to the list element.
 * @property {string} [item] CSS classes added to the item element.
 * @property {string} [label] CSS classes added to the label element.
 * @property {string} [category] CSS classes added to the category element.
 * @property {string} [categoryLabel] CSS classes added to the categoryLabel element.
 * @property {string} [delete] CSS classes added to the delete element.
 */

/**
 * @typedef {Object} CurrentRefinementsWidgetOptions
 * @property {string|HTMLElement} container The CSS Selector or HTMLElement to insert the widget
 * @property {string[]} [includedAttributes] The attributes to include in the refinements (all by default)
 * @property {string[]} [excludedAttributes = ['query']] The attributes to exclude from the refinements
 * @property {CurrentRefinementsCSSClasses} [cssClasses] The CSS classes to be added
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * The `currentRefinements` widget has two purposes give the user a synthetic view of the current filters
 * and the ability to remove a filter.
 *
 * This widget is usually in the top part of the search UI.
 * @type {WidgetFactory}
 * @devNovel CurrentRefinements
 * @category clear-filter
 * @param {CurrentRefinementsWidgetOptions} $0 The CurrentRefinements widget options.
 * @returns {Object} A new CurrentRefinements widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.currentRefinements({
 *     container: '#current-refinements',
 *     includedAttributes: [
 *       'free_shipping',
 *       'price',
 *       'brand',
 *       'category',
 *     ],
 *   })
 * );
 */


function currentRefinements(_ref3) {
  var container = _ref3.container,
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
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    category: (0, _classnames.default)(suit({
      descendantName: 'category'
    }), userCssClasses.category),
    categoryLabel: (0, _classnames.default)(suit({
      descendantName: 'categoryLabel'
    }), userCssClasses.categoryLabel),
    delete: (0, _classnames.default)(suit({
      descendantName: 'delete'
    }), userCssClasses.delete)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeWidget = (0, _connectCurrentRefinements.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeWidget({
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
}