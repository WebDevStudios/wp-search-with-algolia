/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import connectHits from '../../connectors/hits/connectHits';
import Hits from '../../components/Hits/Hits';
import defaultTemplates from './defaultTemplates';
import { prepareTemplateProps, getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import { withInsights, withInsightsListener } from '../../lib/insights';
var withUsage = createDocumentationMessageGenerator({
  name: 'hits'
});
var suit = component('Hits');
var HitsWithInsightsListener = withInsightsListener(Hits);

var renderer = function renderer(_ref) {
  var renderState = _ref.renderState,
      cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var receivedHits = _ref2.hits,
        results = _ref2.results,
        instantSearchInstance = _ref2.instantSearchInstance,
        insights = _ref2.insights,
        bindEvent = _ref2.bindEvent;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(h(HitsWithInsightsListener, {
      cssClasses: cssClasses,
      hits: receivedHits,
      results: results,
      templateProps: renderState.templateProps,
      insights: insights,
      sendEvent: function sendEvent(event) {
        instantSearchInstance.sendEventToInsights(event);
      },
      bindEvent: bindEvent
    }), containerNode);
  };
};

var hits = function hits(widgetOptions) {
  var _ref3 = widgetOptions || {},
      container = _ref3.container,
      escapeHTML = _ref3.escapeHTML,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    emptyRoot: cx(suit({
      modifierName: 'empty'
    }), userCssClasses.emptyRoot),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeHits = withInsights(connectHits)(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return makeHits({
    escapeHTML: escapeHTML,
    transformItems: transformItems
  });
};

export default hits;