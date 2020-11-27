"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hierarchicalMenu;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));

var _connectHierarchicalMenu = _interopRequireDefault(require("../../connectors/hierarchical-menu/connectHierarchicalMenu"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'hierarchical-menu'
});
var suit = (0, _suit.component)('HierarchicalMenu');

var renderer = function renderer(_ref) {
  var cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      showMore = _ref.showMore,
      templates = _ref.templates,
      renderState = _ref.renderState;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        items = _ref2.items,
        refine = _ref2.refine,
        instantSearchInstance = _ref2.instantSearchInstance,
        isShowingMore = _ref2.isShowingMore,
        toggleShowMore = _ref2.toggleShowMore,
        canToggleShowMore = _ref2.canToggleShowMore;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preactCompat.render)(_preactCompat.default.createElement(_RefinementList.default, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      toggleRefinement: refine,
      showMore: showMore,
      toggleShowMore: toggleShowMore,
      isShowingMore: isShowingMore,
      canToggleShowMore: canToggleShowMore
    }), containerNode);
  };
};
/**
 * @typedef {Object} HierarchicalMenuCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [noRefinementRoot] CSS class to add to the root element when no refinements.
 * @property {string|string[]} [list] CSS class to add to the list element.
 * @property {string|string[]} [childList] CSS class to add to the child list element.
 * @property {string|string[]} [item] CSS class to add to each item element.
 * @property {string|string[]} [selectedItem] CSS class to add to each selected item element.
 * @property {string|string[]} [parentItem] CSS class to add to each parent item element.
 * @property {string|string[]} [link] CSS class to add to each link (when using the default template).
 * @property {string|string[]} [label] CSS class to add to each label (when using the default template).
 * @property {string|string[]} [count] CSS class to add to each count element (when using the default template).
 * @property {string|string[]} [showMore] CSS class to add to the show more element.
 * @property {string|string[]} [disabledShowMore] CSS class to add to the disabled show more element.
 */

/**
 * @typedef {Object} HierarchicalMenuTemplates
 * @property {string|function(object):string} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
 * @property {string|function} [showMoreText] Template used for the show more text, provided with `isShowingMore` data property.
 */

/**
 * @typedef {Object} HierarchicalMenuWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string[]} attributes Array of attributes to use to generate the hierarchy of the menu.
 * @property {string} [separator = " > "] Separator used in the attributes to separate level values.
 * @property {string} [rootPath] Prefix path to use if the first level is not the root level.
 * @property {boolean} [showParentLevel = true] Show the siblings of the selected parent level of the current refined value. This
 * @property {number} [limit = 10] Max number of values to display.
 * @property {boolean} [showMore = false] Whether to display the "show more" button.
 * @property {number} [showMoreLimit = 20] Max number of values to display when showing more.
 * does not impact the root level.
 *
 * The hierarchical menu is able to show or hide the siblings with `showParentLevel`.
 *
 * With `showParentLevel` set to `true` (default):
 * - Parent lvl0
 *   - **lvl1**
 *     - **lvl2**
 *     - lvl2
 *     - lvl2
 *   - lvl 1
 *   - lvl 1
 * - Parent lvl0
 * - Parent lvl0
 *
 * With `showParentLevel` set to `false`:
 * - Parent lvl0
 *   - **lvl1**
 *     - **lvl2**
 * - Parent lvl0
 * - Parent lvl0
 * @property {string[]|function} [sortBy = ['name:asc']] How to sort refinements. Possible values: `count|isRefined|name:asc|name:desc`.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 * @property {HierarchicalMenuTemplates} [templates] Templates to use for the widget.
 * @property {HierarchicalMenuCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 */

/**
 * The hierarchical menu widget is used to create a navigation based on a hierarchy of facet attributes.
 *
 * It is commonly used for categories with subcategories.
 *
 * All attributes (lvl0, lvl1 here) must be declared as [attributes for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting) in your
 * Algolia settings.
 *
 * By default, the separator we expect is ` > ` (with spaces) but you can use
 * a different one by using the `separator` option.
 * @requirements
 * Your objects must be formatted in a specific way to be
 * able to display hierarchical menus. Here's an example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": "fruits",
 *     "lvl1": "fruits > citrus"
 *   }
 * }
 * ```
 *
 * Every level must be specified entirely.
 * It's also possible to have multiple values per level, for example:
 *
 * ```javascript
 * {
 *   "objectID": "123",
 *   "name": "orange",
 *   "categories": {
 *     "lvl0": ["fruits", "vitamins"],
 *     "lvl1": ["fruits > citrus", "vitamins > C"]
 *   }
 * }
 * ```
 * @type {WidgetFactory}
 * @devNovel HierarchicalMenu
 * @category filter
 * @param {HierarchicalMenuWidgetOptions} $0 The HierarchicalMenu widget options.
 * @return {Widget} A new HierarchicalMenu widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.hierarchicalMenu({
 *     container: '#hierarchical-categories',
 *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
 *   })
 * );
 */


function hierarchicalMenu() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attributes = _ref3.attributes,
      separator = _ref3.separator,
      rootPath = _ref3.rootPath,
      showParentLevel = _ref3.showParentLevel,
      limit = _ref3.limit,
      _ref3$showMore = _ref3.showMore,
      showMore = _ref3$showMore === void 0 ? false : _ref3$showMore,
      showMoreLimit = _ref3.showMoreLimit,
      sortBy = _ref3.sortBy,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
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
    childList: (0, _classnames.default)(suit({
      descendantName: 'list',
      modifierName: 'child'
    }), userCssClasses.childList),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    parentItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'parent'
    }), userCssClasses.parentItem),
    link: (0, _classnames.default)(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    count: (0, _classnames.default)(suit({
      descendantName: 'count'
    }), userCssClasses.count),
    showMore: (0, _classnames.default)(suit({
      descendantName: 'showMore'
    }), userCssClasses.showMore),
    disabledShowMore: (0, _classnames.default)(suit({
      descendantName: 'showMore',
      modifierName: 'disabled'
    }), userCssClasses.disabledShowMore)
  };
  var specializedRenderer = renderer({
    cssClasses: cssClasses,
    containerNode: containerNode,
    templates: templates,
    showMore: showMore,
    renderState: {}
  });
  var makeHierarchicalMenu = (0, _connectHierarchicalMenu.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeHierarchicalMenu({
    attributes: attributes,
    separator: separator,
    rootPath: rootPath,
    showParentLevel: showParentLevel,
    limit: limit,
    showMore: showMore,
    showMoreLimit: showMoreLimit,
    sortBy: sortBy,
    transformItems: transformItems
  });
}