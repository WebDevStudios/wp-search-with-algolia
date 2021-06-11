/** @jsx h */
import { h, render } from 'preact';
import ClearRefinements from '../../components/ClearRefinements/ClearRefinements';
import cx from 'classnames';
import connectClearRefinements from '../../connectors/clear-refinements/connectClearRefinements';
import defaultTemplates from './defaultTemplates';
import { getContainerNode, prepareTemplateProps, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'clear-refinements'
});
var suit = component('ClearRefinements');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        hasRefinements = _ref2.hasRefinements,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(h(ClearRefinements, {
      refine: refine,
      cssClasses: cssClasses,
      hasRefinements: hasRefinements,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var clearRefinements = function clearRefinements(widgetOptions) {
  var _ref3 = widgetOptions || {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes,
      transformItems = _ref3.transformItems,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    button: cx(suit({
      descendantName: 'button'
    }), userCssClasses.button),
    disabledButton: cx(suit({
      descendantName: 'button',
      modifierName: 'disabled'
    }), userCssClasses.disabledButton)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = connectClearRefinements(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return makeWidget({
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
};

export default clearRefinements;