"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = refinementList;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));

var _connectRefinementList = _interopRequireDefault(require("../../connectors/refinement-list/connectRefinementList"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'refinement-list'
});
var suit = (0, _suit.component)('RefinementList');
var searchBoxSuit = (0, _suit.component)('SearchBox');
/**
 * Transforms the searchable templates by removing the `searchable` prefix.
 *
 * This makes them usable in the `SearchBox` component.
 *
 * @param {object} templates The widget templates
 * @returns {object} the formatted templates
 */

function transformTemplates(templates) {
  var allTemplates = _objectSpread({}, templates, {
    submit: templates.searchableSubmit,
    reset: templates.searchableReset,
    loadingIndicator: templates.searchableLoadingIndicator
  });

  var searchableReset = allTemplates.searchableReset,
      searchableSubmit = allTemplates.searchableSubmit,
      searchableLoadingIndicator = allTemplates.searchableLoadingIndicator,
      transformedTemplates = _objectWithoutProperties(allTemplates, ["searchableReset", "searchableSubmit", "searchableLoadingIndicator"]);

  return transformedTemplates;
}

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      renderState = _ref.renderState,
      showMore = _ref.showMore,
      searchable = _ref.searchable,
      searchablePlaceholder = _ref.searchablePlaceholder,
      searchableIsAlwaysActive = _ref.searchableIsAlwaysActive;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        searchForItems = _ref2.searchForItems,
        isFromSearch = _ref2.isFromSearch,
        instantSearchInstance = _ref2.instantSearchInstance,
        toggleShowMore = _ref2.toggleShowMore,
        isShowingMore = _ref2.isShowingMore,
        hasExhaustiveItems = _ref2.hasExhaustiveItems,
        canToggleShowMore = _ref2.canToggleShowMore;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
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
      searchFacetValues: searchable ? searchForItems : undefined,
      searchPlaceholder: searchablePlaceholder,
      searchIsAlwaysActive: searchableIsAlwaysActive,
      isFromSearch: isFromSearch,
      showMore: showMore && !isFromSearch && items.length > 0,
      toggleShowMore: toggleShowMore,
      isShowingMore: isShowingMore,
      hasExhaustiveItems: hasExhaustiveItems,
      canToggleShowMore: canToggleShowMore
    }), containerNode);
  };
};
/**
 * @typedef {Object} RefinementListTemplates
 * @property  {string|function(RefinementListItemData):string} [item] Item template, provided with `label`, `highlighted`, `value`, `count`, `isRefined`, `url` data properties.
 * @property {string|function} [searchableNoResults] Templates to use for search for facet values.
 * @property {string|function} [showMoreText] Template used for the show more text, provided with `isShowingMore` data property.
 */

/**
 * @typedef {Object} RefinementListItemData
 * @property {number} count The number of occurrences of the facet in the result set.
 * @property {boolean} isRefined True if the value is selected.
 * @property {string} label The label to display.
 * @property {string} value The value used for refining.
 * @property {string} highlighted The label highlighted (when using search for facet values). This value is displayed in the default template.
 * @property {string} url The url with this refinement selected.
 * @property {object} cssClasses Object containing all the classes computed for the item.
 */

/**
 * @typedef {Object} RefinementListCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [noRefinementRoot] CSS class to add to the root element when no refinements.
 * @property {string|string[]} [noResults] CSS class to add to the root element with no results.
 * @property {string|string[]} [list] CSS class to add to the list element.
 * @property {string|string[]} [item] CSS class to add to each item element.
 * @property {string|string[]} [selectedItem] CSS class to add to each selected element.
 * @property {string|string[]} [label] CSS class to add to each label element (when using the default template).
 * @property {string|string[]} [checkbox] CSS class to add to each checkbox element (when using the default template).
 * @property {string|string[]} [labelText] CSS class to add to each label text element.
 * @property {string|string[]} [showMore] CSS class to add to the show more element
 * @property {string|string[]} [disabledShowMore] CSS class to add to the disabledshow more element
 * @property {string|string[]} [count] CSS class to add to each count element (when using the default template).
 */

/**
 * @typedef {Object} RefinementListWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {string} attribute Name of the attribute for faceting.
 * @property {"and"|"or"} [operator="or"] How to apply refinements. Possible values: `or`, `and`
 * @property {string[]|function} [sortBy=["isRefined", "count:desc", "name:asc"]] How to sort refinements. Possible values: `count:asc` `count:desc` `name:asc` `name:desc` `isRefined`.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 * @property {boolean} [searchable=false] Add a search input to let the user search for more facet values. In order to make this feature work, you need to make the attribute searchable [using the API](https://www.algolia.com/doc/guides/searching/faceting/?language=js#declaring-a-searchable-attribute-for-faceting) or [the dashboard](https://www.algolia.com/explorer/display/).
 * @property {number} [limit = 10] The minimum number of facet values to retrieve.
 * @property {boolean} [showMore = false] Whether to display a button that expands the number of items.
 * @property {number} [showMoreLimit = 20] The max number of items to display if the widget
 * @property {string} [searchablePlaceholder] Value of the search field placeholder.
 * @property {boolean} [searchableIsAlwaysActive=true] When `false` the search field will become disabled if
 * there are less items to display than the `options.limit`, otherwise the search field is always usable.
 * @property {boolean} [searchableEscapeFacetValues=true] When activated, it will escape the facet values that are returned
 * from Algolia. In this case, the surrounding tags will always be `<mark></mark>`.
 * @property {RefinementListTemplates} [templates] Templates to use for the widget.
 * @property {RefinementListCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 */

/**
 * The refinement list widget is one of the most common widget that you can find
 * in a search UI. With this widget, the user can filter the dataset based on facets.
 *
 * The refinement list displays only the most relevant facets for the current search
 * context. The sort option only affects the facet that are returned by the engine,
 * not which facets are returned.
 *
 * This widget also implements search for facet values, which is a mini search inside the
 * values of the facets. This makes easy to deal with uncommon facet values.
 *
 * @requirements
 *
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * If you also want to use search for facet values on this attribute, you need to make it searchable using the [dashboard](https://www.algolia.com/explorer/display/) or using the [API](https://www.algolia.com/doc/guides/searching/faceting/#search-for-facet-values).
 *
 * @type {WidgetFactory}
 * @devNovel RefinementList
 * @category filter
 * @param {RefinementListWidgetOptions} $0 The RefinementList widget options that you use to customize the widget.
 * @return {Widget} Creates a new instance of the RefinementList widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.refinementList({
 *     container: '#brands',
 *     attribute: 'brand',
 *     operator: 'or',
 *     limit: 10,
 *   })
 * );
 */


function refinementList() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      operator = _ref3.operator,
      sortBy = _ref3.sortBy,
      limit = _ref3.limit,
      showMore = _ref3.showMore,
      showMoreLimit = _ref3.showMoreLimit,
      _ref3$searchable = _ref3.searchable,
      searchable = _ref3$searchable === void 0 ? false : _ref3$searchable,
      _ref3$searchablePlace = _ref3.searchablePlaceholder,
      searchablePlaceholder = _ref3$searchablePlace === void 0 ? 'Search...' : _ref3$searchablePlace,
      _ref3$searchableEscap = _ref3.searchableEscapeFacetValues,
      searchableEscapeFacetValues = _ref3$searchableEscap === void 0 ? true : _ref3$searchableEscap,
      _ref3$searchableIsAlw = _ref3.searchableIsAlwaysActive,
      searchableIsAlwaysActive = _ref3$searchableIsAlw === void 0 ? true : _ref3$searchableIsAlw,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
      transformItems = _ref3.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var escapeFacetValues = searchable ? Boolean(searchableEscapeFacetValues) : false;
  var containerNode = (0, _utils.getContainerNode)(container);
  var templates = transformTemplates(_objectSpread({}, _defaultTemplates.default, {}, userTemplates));
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
    searchBox: (0, _classnames.default)(suit({
      descendantName: 'searchBox'
    }), userCssClasses.searchBox),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    checkbox: (0, _classnames.default)(suit({
      descendantName: 'checkbox'
    }), userCssClasses.checkbox),
    labelText: (0, _classnames.default)(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText),
    count: (0, _classnames.default)(suit({
      descendantName: 'count'
    }), userCssClasses.count),
    noResults: (0, _classnames.default)(suit({
      descendantName: 'noResults'
    }), userCssClasses.noResults),
    showMore: (0, _classnames.default)(suit({
      descendantName: 'showMore'
    }), userCssClasses.showMore),
    disabledShowMore: (0, _classnames.default)(suit({
      descendantName: 'showMore',
      modifierName: 'disabled'
    }), userCssClasses.disabledShowMore),
    searchable: {
      root: (0, _classnames.default)(searchBoxSuit(), userCssClasses.searchableRoot),
      form: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'form'
      }), userCssClasses.searchableForm),
      input: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'input'
      }), userCssClasses.searchableInput),
      submit: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'submit'
      }), userCssClasses.searchableSubmit),
      submitIcon: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'submitIcon'
      }), userCssClasses.searchableSubmitIcon),
      reset: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'reset'
      }), userCssClasses.searchableReset),
      resetIcon: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'resetIcon'
      }), userCssClasses.searchableResetIcon),
      loadingIndicator: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'loadingIndicator'
      }), userCssClasses.searchableLoadingIndicator),
      loadingIcon: (0, _classnames.default)(searchBoxSuit({
        descendantName: 'loadingIcon'
      }), userCssClasses.searchableLoadingIcon)
    }
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {},
    searchable: searchable,
    searchablePlaceholder: searchablePlaceholder,
    searchableIsAlwaysActive: searchableIsAlwaysActive,
    showMore: showMore
  });
  var makeWidget = (0, _connectRefinementList.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeWidget({
    attribute: attribute,
    operator: operator,
    limit: limit,
    showMore: showMore,
    showMoreLimit: showMoreLimit,
    sortBy: sortBy,
    escapeFacetValues: escapeFacetValues,
    transformItems: transformItems
  });
}