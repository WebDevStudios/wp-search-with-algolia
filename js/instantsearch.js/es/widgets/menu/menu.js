function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import RefinementList from '../../components/RefinementList/RefinementList';
import connectMenu from '../../connectors/menu/connectMenu';
import defaultTemplates from './defaultTemplates';
import { prepareTemplateProps, getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'menu'
});
var suit = component('Menu');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates,
      showMore = _ref.showMore;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        isShowingMore = _ref2.isShowingMore,
        toggleShowMore = _ref2.toggleShowMore,
        canToggleShowMore = _ref2.canToggleShowMore;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    var facetValues = items.map(function (facetValue) {
      return _objectSpread(_objectSpread({}, facetValue), {}, {
        url: createURL(facetValue.value)
      });
    });
    render(h(RefinementList, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: facetValues,
      showMore: showMore,
      templateProps: renderState.templateProps,
      toggleRefinement: refine,
      toggleShowMore: toggleShowMore,
      isShowingMore: isShowingMore,
      canToggleShowMore: canToggleShowMore
    }), containerNode);
  };
};

var menu = function menu(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      sortBy = _ref3.sortBy,
      limit = _ref3.limit,
      showMore = _ref3.showMore,
      showMoreLimit = _ref3.showMoreLimit,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      transformItems = _ref3.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

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
    link: cx(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    count: cx(suit({
      descendantName: 'count'
    }), userCssClasses.count),
    showMore: cx(suit({
      descendantName: 'showMore'
    }), userCssClasses.showMore),
    disabledShowMore: cx(suit({
      descendantName: 'showMore',
      modifierName: 'disabled'
    }), userCssClasses.disabledShowMore)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates,
    showMore: showMore
  });
  var makeWidget = connectMenu(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attribute: attribute,
    limit: limit,
    showMore: showMore,
    showMoreLimit: showMoreLimit,
    sortBy: sortBy,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.menu'
  });
};

export default menu;