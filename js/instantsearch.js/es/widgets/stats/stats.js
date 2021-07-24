function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import Stats from '../../components/Stats/Stats';
import connectStats from '../../connectors/stats/connectStats';
import { prepareTemplateProps, getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'stats'
});
var suit = component('Stats');
export var defaultTemplates = {
  text: "\n    {{#areHitsSorted}}\n      {{#hasNoSortedResults}}No relevant results{{/hasNoSortedResults}}\n      {{#hasOneSortedResults}}1 relevant result{{/hasOneSortedResults}}\n      {{#hasManySortedResults}}{{#helpers.formatNumber}}{{nbSortedHits}}{{/helpers.formatNumber}} relevant results{{/hasManySortedResults}}\n      sorted out of {{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}}\n    {{/areHitsSorted}}\n    {{^areHitsSorted}}\n      {{#hasNoResults}}No results{{/hasNoResults}}\n      {{#hasOneResult}}1 result{{/hasOneResult}}\n      {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}\n    {{/areHitsSorted}}\n    found in {{processingTimeMS}}ms"
};

var renderer = function renderer(_ref) {
  var renderState = _ref.renderState,
      cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var hitsPerPage = _ref2.hitsPerPage,
        nbHits = _ref2.nbHits,
        nbSortedHits = _ref2.nbSortedHits,
        areHitsSorted = _ref2.areHitsSorted,
        nbPages = _ref2.nbPages,
        page = _ref2.page,
        processingTimeMS = _ref2.processingTimeMS,
        query = _ref2.query,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(h(Stats, {
      cssClasses: cssClasses,
      hitsPerPage: hitsPerPage,
      nbHits: nbHits,
      nbSortedHits: nbSortedHits,
      areHitsSorted: areHitsSorted,
      nbPages: nbPages,
      page: page,
      processingTimeMS: processingTimeMS,
      query: query,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
/**
 * The `stats` widget is used to display useful insights about the current results.
 *
 * By default, it will display the **number of hits** and the time taken to compute the
 * results inside the engine.
 */


var stats = function stats(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    text: cx(suit({
      descendantName: 'text'
    }), userCssClasses.text)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {}
  });
  var makeWidget = connectStats(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({})), {}, {
    $$widgetType: 'ais.stats'
  });
};

export default stats;