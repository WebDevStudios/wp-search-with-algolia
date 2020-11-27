import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import ToggleRefinement from '../../components/ToggleRefinement/ToggleRefinement';
import connectToggleRefinement from '../../connectors/toggleRefinement/connectToggleRefinement';
import defaultTemplates from './defaultTemplates';
import { getContainerNode, prepareTemplateProps, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'toggle-refinement'
});
var suit = component('ToggleRefinement');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var value = _ref2.value,
        createURL = _ref2.createURL,
        _refine = _ref2.refine,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(React.createElement(ToggleRefinement, {
      createURL: createURL,
      cssClasses: cssClasses,
      currentRefinement: value,
      templateProps: renderState.templateProps,
      refine: function refine(isRefined) {
        return _refine({
          isRefined: isRefined
        });
      }
    }), containerNode);
  };
};
/**
 * @typedef {Object} ToggleWidgetCSSClasses
 * @property {string|string[]} [root] CSS class to add to the root element.
 * @property {string|string[]} [label] CSS class to add to the label wrapping element
 * @property {string|string[]} [checkbox] CSS class to add to the checkbox
 * @property {string|string[]} [labelText] CSS class to add to the label text.
 */

/**
 * @typedef {Object} ToggleWidgetTemplates
 * @property {string|function(object):string} labelText the text that describes the toggle action. This
 * template receives some contextual information:
 *  - `isRefined` which is `true` if the checkbox is checked
 *  - `count` - the count of the values if the toggle in the next refinements
 *  - `onFacetValue`, `offFacetValue`: objects with `count` (useful to get the other value of `count`)
 */

/**
 * @typedef {Object} ToggleWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {string} attribute Name of the attribute for faceting (eg. "free_shipping").
 * @property {string|number|boolean} on Value to filter on when checked.
 * @property {string|number|boolean} off Value to filter on when unchecked.
 * element (when using the default template). By default when switching to `off`, no refinement will be asked. So you
 * will get both `true` and `false` results. If you set the off value to `false` then you will get only objects
 * having `false` has a value for the selected attribute.
 * @property {ToggleWidgetTemplates} [templates] Templates to use for the widget.
 * @property {ToggleWidgetCSSClasses} [cssClasses] CSS classes to add.
 */

/**
 * The toggleRefinement widget lets the user either:
 *  - switch between two values for a single facetted attribute (free_shipping / not_free_shipping)
 *  - toggleRefinement a faceted value on and off (only 'canon' for brands)
 *
 * This widget is particularly useful if you have a boolean value in the records.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * @type {WidgetFactory}
 * @devNovel ToggleRefinement
 * @category filter
 * @param {ToggleWidgetOptions} $0 Options for the ToggleRefinement widget.
 * @return {Widget} A new instance of the ToggleRefinement widget
 * @example
 * search.addWidget(
 *   instantsearch.widgets.toggleRefinement({
 *     container: '#free-shipping',
 *     attribute: 'free_shipping',
 *     on: true,
 *     templates: {
 *       labelText: 'Free shipping'
 *     }
 *   })
 * );
 */


export default function toggleRefinement() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? defaultTemplates : _ref3$templates,
      _ref3$on = _ref3.on,
      on = _ref3$on === void 0 ? true : _ref3$on,
      off = _ref3.off;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    checkbox: cx(suit({
      descendantName: 'checkbox'
    }), userCssClasses.checkbox),
    labelText: cx(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = connectToggleRefinement(specializedRenderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    attribute: attribute,
    on: on,
    off: off
  });
}