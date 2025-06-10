"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));
var _connectHierarchicalMenu = _interopRequireDefault(require("../../connectors/hierarchical-menu/connectHierarchicalMenu"));
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
      renderState.templateProps = (0, _templating.prepareTemplateProps)({
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
      showMore: showMore,
      toggleShowMore: toggleShowMore,
      isShowingMore: isShowingMore,
      canToggleShowMore: canToggleShowMore
    }), containerNode);
  };
};

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
 * @param {HierarchicalMenuWidgetParams} widgetParams The HierarchicalMenu widget options.
 * @return {Widget} A new HierarchicalMenu widget instance.
 * @example
 * search.addWidgets([
 *   instantsearch.widgets.hierarchicalMenu({
 *     container: '#hierarchical-categories',
 *     attributes: ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1', 'hierarchicalCategories.lvl2'],
 *   })
 * ]);
 */

var hierarchicalMenu = function hierarchicalMenu(widgetParams) {
  var _ref3 = widgetParams || {},
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
    templates = _ref3$templates === void 0 ? {} : _ref3$templates,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;
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
    childList: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'list',
      modifierName: 'child'
    }), userCssClasses.childList),
    item: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    parentItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'parent'
    }), userCssClasses.parentItem),
    link: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    selectedItemLink: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'link',
      modifierName: 'selected'
    }), userCssClasses.selectedItemLink),
    label: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    count: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'count'
    }), userCssClasses.count),
    showMore: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'showMore'
    }), userCssClasses.showMore),
    disabledShowMore: (0, _uiComponentsShared.cx)(suit({
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
  var makeWidget = (0, _connectHierarchicalMenu.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attributes: attributes,
    separator: separator,
    rootPath: rootPath,
    showParentLevel: showParentLevel,
    limit: limit,
    showMore: showMore,
    showMoreLimit: showMoreLimit,
    sortBy: sortBy,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.hierarchicalMenu'
  });
};
var _default = hierarchicalMenu;
exports.default = _default;