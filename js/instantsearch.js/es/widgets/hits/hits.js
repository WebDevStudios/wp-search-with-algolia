import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import connectHits from '../../connectors/hits/connectHits';
import Hits from '../../components/Hits/Hits';
import defaultTemplates from './defaultTemplates';
import { prepareTemplateProps, getContainerNode, warning, createDocumentationLink, createDocumentationMessageGenerator } from '../../lib/utils';
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
        insights = _ref2.insights;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(React.createElement(HitsWithInsightsListener, {
      cssClasses: cssClasses,
      hits: receivedHits,
      results: results,
      templateProps: renderState.templateProps,
      insights: insights
    }), containerNode);
  };
};
/**
 * @typedef {Object} HitsCSSClasses
 * @property {string|string[]} [root] CSS class to add to the wrapping element.
 * @property {string|string[]} [emptyRoot] CSS class to add to the wrapping element when no results.
 * @property {string|string[]} [list] CSS class to add to the list of results.
 * @property {string|string[]} [item] CSS class to add to each result.
 */

/**
 * @typedef {Object} HitsTemplates
 * @property {string|function(object):string} [empty=''] Template to use when there are no results.
 * @property {string|function(object):string} [item=''] Template to use for each result. This template will receive an object containing a single record. The record will have a new property `__hitIndex` for the position of the record in the list of displayed hits.
 */

/**
 * @typedef {Object} HitsWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {HitsTemplates} [templates] Templates to use for the widget.
 * @property {HitsCSSClasses} [cssClasses] CSS classes to add.
 * @property {boolean} [escapeHTML = true] Escape HTML entities from hits string values.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * Display the list of results (hits) from the current search.
 *
 * This is a traditional display of the hits. It has to be implemented
 * together with a pagination widget, to let the user browse the results
 * beyond the first page.
 * @type {WidgetFactory}
 * @devNovel Hits
 * @category basic
 * @param {HitsWidgetOptions} $0 Options of the Hits widget.
 * @return {Widget} A new instance of Hits widget.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.hits({
 *     container: '#hits-container',
 *     templates: {
 *       empty: 'No results',
 *       item: '<strong>Hit {{objectID}}</strong>: {{{_highlightResult.name.value}}}'
 *     },
 *     transformItems: items => items.map(item => item),
 *   })
 * );
 */


export default function hits(_ref3) {
  var container = _ref3.container,
      escapeHTML = _ref3.escapeHTML,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  warning(typeof templates.allItems === 'undefined', "The template `allItems` does not exist since InstantSearch.js 3.\n\nYou may want to migrate using `connectHits`: ".concat(createDocumentationLink({
    name: 'hits',
    connector: true
  }), "."));
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
    return unmountComponentAtNode(containerNode);
  });
  return makeHits({
    escapeHTML: escapeHTML,
    transformItems: transformItems
  });
}