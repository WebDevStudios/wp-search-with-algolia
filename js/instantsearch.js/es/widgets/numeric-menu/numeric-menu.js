/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import RefinementList from '../../components/RefinementList/RefinementList';
import connectNumericMenu from '../../connectors/numeric-menu/connectNumericMenu';
import defaultTemplates from './defaultTemplates';
import { prepareTemplateProps, getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'numeric-menu'
});
var suit = component('NumericMenu');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      attribute = _ref.attribute,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance,
        refine = _ref2.refine,
        items = _ref2.items;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(h(RefinementList, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      toggleRefinement: refine,
      attribute: attribute
    }), containerNode);
  };
};

var numericMenu = function numericMenu(widgetOptions) {
  var _ref3 = widgetOptions || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      items = _ref3.items,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
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
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    radio: cx(suit({
      descendantName: 'radio'
    }), userCssClasses.radio),
    labelText: cx(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    attribute: attribute,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeNumericMenu = connectNumericMenu(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return makeNumericMenu({
    attribute: attribute,
    items: items,
    transformItems: transformItems
  });
};

export default numericMenu;