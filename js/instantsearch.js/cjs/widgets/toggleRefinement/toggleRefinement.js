"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleRefinement;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ToggleRefinement = _interopRequireDefault(require("../../components/ToggleRefinement/ToggleRefinement"));

var _connectToggleRefinement = _interopRequireDefault(require("../../connectors/toggleRefinement/connectToggleRefinement"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'toggle-refinement'
});
var suit = (0, _suit.component)('ToggleRefinement');

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
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preactCompat.render)(_preactCompat.default.createElement(_ToggleRefinement.default, {
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


function toggleRefinement() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
      _ref3$on = _ref3.on,
      on = _ref3$on === void 0 ? true : _ref3$on,
      off = _ref3.off;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    checkbox: (0, _classnames.default)(suit({
      descendantName: 'checkbox'
    }), userCssClasses.checkbox),
    labelText: (0, _classnames.default)(suit({
      descendantName: 'labelText'
    }), userCssClasses.labelText)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectToggleRefinement.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeWidget({
    attribute: attribute,
    on: on,
    off: off
  });
}