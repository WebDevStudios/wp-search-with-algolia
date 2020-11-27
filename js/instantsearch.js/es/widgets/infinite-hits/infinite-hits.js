import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import InfiniteHits from '../../components/InfiniteHits/InfiniteHits';
import defaultTemplates from './defaultTemplates';
import connectInfiniteHits from '../../connectors/infinite-hits/connectInfiniteHits';
import { prepareTemplateProps, getContainerNode, warning, createDocumentationLink, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import { withInsights, withInsightsListener } from '../../lib/insights';
var withUsage = createDocumentationMessageGenerator({
  name: 'infinite-hits'
});
var suit = component('InfiniteHits');
var InfiniteHitsWithInsightsListener = withInsightsListener(InfiniteHits);

var renderer = function renderer(_ref) {
  var cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      renderState = _ref.renderState,
      templates = _ref.templates,
      hasShowPrevious = _ref.showPrevious;
  return function (_ref2, isFirstRendering) {
    var hits = _ref2.hits,
        results = _ref2.results,
        showMore = _ref2.showMore,
        showPrevious = _ref2.showPrevious,
        isFirstPage = _ref2.isFirstPage,
        isLastPage = _ref2.isLastPage,
        instantSearchInstance = _ref2.instantSearchInstance,
        insights = _ref2.insights;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(React.createElement(InfiniteHitsWithInsightsListener, {
      cssClasses: cssClasses,
      hits: hits,
      results: results,
      hasShowPrevious: hasShowPrevious,
      showPrevious: showPrevious,
      showMore: showMore,
      templateProps: renderState.templateProps,
      isFirstPage: isFirstPage,
      isLastPage: isLastPage,
      insights: insights
    }), containerNode);
  };
};

var infiniteHits = function infiniteHits() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      escapeHTML = _ref3.escapeHTML,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      showPrevious = _ref3.showPrevious;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  warning( // @ts-ignore: We have this specific check because unlike `hits`, `infiniteHits` does not support
  // the `allItems` template. This can be misleading as they are very similar.
  typeof templates.allItems === 'undefined', "The template `allItems` does not exist since InstantSearch.js 3.\n\n You may want to migrate using `connectInfiniteHits`: ".concat(createDocumentationLink({
    name: 'infinite-hits',
    connector: true
  }), "."));
  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    emptyRoot: cx(suit({
      modifierName: 'empty'
    }), userCssClasses.emptyRoot),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    loadPrevious: cx(suit({
      descendantName: 'loadPrevious'
    }), userCssClasses.loadPrevious),
    disabledLoadPrevious: cx(suit({
      descendantName: 'loadPrevious',
      modifierName: 'disabled'
    }), userCssClasses.disabledLoadPrevious),
    loadMore: cx(suit({
      descendantName: 'loadMore'
    }), userCssClasses.loadMore),
    disabledLoadMore: cx(suit({
      descendantName: 'loadMore',
      modifierName: 'disabled'
    }), userCssClasses.disabledLoadMore)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    showPrevious: showPrevious,
    renderState: {}
  });
  var makeInfiniteHits = withInsights(connectInfiniteHits)(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeInfiniteHits({
    escapeHTML: escapeHTML,
    transformItems: transformItems,
    showPrevious: showPrevious
  });
};

export default infiniteHits;