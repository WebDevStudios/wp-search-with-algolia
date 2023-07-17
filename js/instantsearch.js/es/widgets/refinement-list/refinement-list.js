function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { cx } from '@algolia/ui-components-shared';
import { h, render } from 'preact';
import RefinementList from "../../components/RefinementList/RefinementList.js";
import connectRefinementList from "../../connectors/refinement-list/connectRefinementList.js";
import { component } from "../../lib/suit.js";
import { prepareTemplateProps } from "../../lib/templating/index.js";
import { getContainerNode, createDocumentationMessageGenerator } from "../../lib/utils/index.js";
import searchBoxDefaultTemplates from "../search-box/defaultTemplates.js";
import defaultTemplates from "./defaultTemplates.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'refinement-list'
});
var suit = component('RefinementList');
var searchBoxSuit = component('SearchBox');
var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
    cssClasses = _ref.cssClasses,
    templates = _ref.templates,
    searchBoxTemplates = _ref.searchBoxTemplates,
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
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      renderState.searchBoxTemplateProps = prepareTemplateProps({
        defaultTemplates: searchBoxDefaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: searchBoxTemplates
      });
      return;
    }
    render(h(RefinementList, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      searchBoxTemplateProps: renderState.searchBoxTemplateProps,
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
 */
var refinementList = function refinementList(widgetParams) {
  var _ref3 = widgetParams || {},
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
    templates = _ref3$templates === void 0 ? {} : _ref3$templates,
    transformItems = _ref3.transformItems;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var escapeFacetValues = searchable ? Boolean(searchableEscapeFacetValues) : false;
  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinementRoot: cx(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: cx(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    searchBox: cx(suit({
      descendantName: 'searchBox'
    }), userCssClasses.searchBox),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    checkbox: cx(suit({
      descendantName: 'checkbox'
    }), userCssClasses.checkbox),
    labelText: cx(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText),
    count: cx(suit({
      descendantName: 'count'
    }), userCssClasses.count),
    noResults: cx(suit({
      descendantName: 'noResults'
    }), userCssClasses.noResults),
    showMore: cx(suit({
      descendantName: 'showMore'
    }), userCssClasses.showMore),
    disabledShowMore: cx(suit({
      descendantName: 'showMore',
      modifierName: 'disabled'
    }), userCssClasses.disabledShowMore),
    searchable: {
      root: cx(searchBoxSuit(), userCssClasses.searchableRoot),
      form: cx(searchBoxSuit({
        descendantName: 'form'
      }), userCssClasses.searchableForm),
      input: cx(searchBoxSuit({
        descendantName: 'input'
      }), userCssClasses.searchableInput),
      submit: cx(searchBoxSuit({
        descendantName: 'submit'
      }), userCssClasses.searchableSubmit),
      submitIcon: cx(searchBoxSuit({
        descendantName: 'submitIcon'
      }), userCssClasses.searchableSubmitIcon),
      reset: cx(searchBoxSuit({
        descendantName: 'reset'
      }), userCssClasses.searchableReset),
      resetIcon: cx(searchBoxSuit({
        descendantName: 'resetIcon'
      }), userCssClasses.searchableResetIcon),
      loadingIndicator: cx(searchBoxSuit({
        descendantName: 'loadingIndicator'
      }), userCssClasses.searchableLoadingIndicator),
      loadingIcon: cx(searchBoxSuit({
        descendantName: 'loadingIcon'
      }), userCssClasses.searchableLoadingIcon)
    }
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    searchBoxTemplates: {
      submit: templates.searchableSubmit,
      reset: templates.searchableReset,
      loadingIndicator: templates.searchableLoadingIndicator
    },
    renderState: {},
    searchable: searchable,
    searchablePlaceholder: searchablePlaceholder,
    searchableIsAlwaysActive: searchableIsAlwaysActive,
    showMore: showMore
  });
  var makeWidget = connectRefinementList(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attribute: attribute,
    operator: operator,
    limit: limit,
    showMore: showMore,
    showMoreLimit: showMoreLimit,
    sortBy: sortBy,
    escapeFacetValues: escapeFacetValues,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.refinementList'
  });
};
export default refinementList;