/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import CurrentRefinements from '../../components/CurrentRefinements/CurrentRefinements';
import connectCurrentRefinements from '../../connectors/current-refinements/connectCurrentRefinements';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'current-refinements'
});
var suit = component('CurrentRefinements');

var renderer = function renderer(_ref, isFirstRender) {
  var items = _ref.items,
      widgetParams = _ref.widgetParams;

  if (isFirstRender) {
    return;
  }

  var container = widgetParams.container,
      cssClasses = widgetParams.cssClasses;
  render(h(CurrentRefinements, {
    cssClasses: cssClasses,
    items: items
  }), container);
};

var currentRefinements = function currentRefinements(widgetParams) {
  var _ref2 = widgetParams || {},
      container = _ref2.container,
      includedAttributes = _ref2.includedAttributes,
      excludedAttributes = _ref2.excludedAttributes,
      _ref2$cssClasses = _ref2.cssClasses,
      userCssClasses = _ref2$cssClasses === void 0 ? {} : _ref2$cssClasses,
      transformItems = _ref2.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    category: cx(suit({
      descendantName: 'category'
    }), userCssClasses.category),
    categoryLabel: cx(suit({
      descendantName: 'categoryLabel'
    }), userCssClasses.categoryLabel),
    delete: cx(suit({
      descendantName: 'delete'
    }), userCssClasses.delete)
  };
  var makeWidget = connectCurrentRefinements(renderer, function () {
    return render(null, containerNode);
  });
  return makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
};

export default currentRefinements;