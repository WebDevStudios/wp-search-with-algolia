function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { h, render } from 'preact';
import ClearRefinements from "../../components/ClearRefinements/ClearRefinements.js";
import cx from 'classnames';
import connectClearRefinements from "../../connectors/clear-refinements/connectClearRefinements.js";
import defaultTemplates from "./defaultTemplates.js";
import { getContainerNode, createDocumentationMessageGenerator } from "../../lib/utils/index.js";
import { prepareTemplateProps } from "../../lib/templating/index.js";
import { component } from "../../lib/suit.js";
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
        canRefine = _ref2.canRefine,
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
      hasRefinements: canRefine,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var clearRefinements = function clearRefinements(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
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
  return _objectSpread(_objectSpread({}, makeWidget({
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.clearRefinements'
  });
};

export default clearRefinements;