"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ratingMenu;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));

var _connectRatingMenu = _interopRequireDefault(require("../../connectors/rating-menu/connectRatingMenu"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'rating-menu'
});
var suit = (0, _suit.component)('RatingMenu');

var _ref3 =
/*#__PURE__*/
_preactCompat.default.createElement("path", {
  d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
});

var _ref4 =
/*#__PURE__*/
_preactCompat.default.createElement("path", {
  d: "M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"
});

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      renderState = _ref.renderState;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        createURL = _ref2.createURL,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preactCompat.render)(_preactCompat.default.createElement(_RefinementList.default, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      toggleRefinement: refine
    }, _preactCompat.default.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      style: "display:none;"
    }, _preactCompat.default.createElement("symbol", {
      id: suit({
        descendantName: 'starSymbol'
      }),
      viewBox: "0 0 24 24"
    }, _ref3), _preactCompat.default.createElement("symbol", {
      id: suit({
        descendantName: 'starEmptySymbol'
      }),
      viewBox: "0 0 24 24"
    }, _ref4))), containerNode);
  };
};
/**
 * @typedef {Object} RatingMenuWidgetTemplates
 * @property  {string|function} [item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties.
 */

/**
 * @typedef {Object} RatingMenuWidgetCssClasses
 * @property  {string|string[]} [root] CSS class to add to the root element.
 * @property  {string|string[]} [noRefinementRoot] CSS class to add to the root element when there's no refinements.
 * @property  {string|string[]} [list] CSS class to add to the list element.
 * @property  {string|string[]} [item] CSS class to add to each item element.
 * @property  {string|string[]} [selectedItem] CSS class to add the selected item element.
 * @property  {string|string[]} [disabledItem] CSS class to add a disabled item element.
 * @property  {string|string[]} [link] CSS class to add to each link element.
 * @property  {string|string[]} [starIcon] CSS class to add to each star element (when using the default template).
 * @property  {string|string[]} [fullStarIcon] CSS class to add to each full star element (when using the default template).
 * @property  {string|string[]} [emptyStarIcon] CSS class to add to each empty star element (when using the default template).
 * @property  {string|string[]} [label] CSS class to add to each label.
 * @property  {string|string[]} [count] CSS class to add to each counter.
 */

/**
 * @typedef {Object} RatingMenuWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {string} attribute Name of the attribute in your records that contains the ratings.
 * @property {number} [max = 5] The maximum rating value.
 * @property {RatingMenuWidgetTemplates} [templates] Templates to use for the widget.
 * @property {RatingMenuWidgetCssClasses} [cssClasses] CSS classes to add.
 */

/**
 * Rating menu is used for displaying grade like filters. The values are normalized within boundaries.
 *
 * The maximum value can be set (with `max`), the minimum is always 0.
 *
 * @requirements
 * The attribute passed to `attribute` must be declared as an
 * [attribute for faceting](https://www.algolia.com/doc/guides/searching/faceting/#declaring-attributes-for-faceting)
 * in your Algolia settings.
 *
 * The values inside this attribute must be JavaScript numbers (not strings).
 *
 * @type {WidgetFactory}
 * @devNovel RatingMenu
 * @category filter
 * @param {RatingMenuWidgetOptions} $0 RatingMenu widget options.
 * @return {Widget} A new RatingMenu widget instance.
 * @example
 * search.addWidget(
 *   instantsearch.widgets.ratingMenu({
 *     container: '#stars',
 *     attribute: 'rating',
 *     max: 5,
 *   })
 * );
 */


function ratingMenu() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref5.container,
      attribute = _ref5.attribute,
      _ref5$max = _ref5.max,
      max = _ref5$max === void 0 ? 5 : _ref5$max,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      _ref5$templates = _ref5.templates,
      templates = _ref5$templates === void 0 ? _defaultTemplates.default : _ref5$templates;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    noRefinementRoot: (0, _classnames.default)(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    selectedItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    disabledItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'disabled'
    }), userCssClasses.disabledItem),
    link: (0, _classnames.default)(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    starIcon: (0, _classnames.default)(suit({
      descendantName: 'starIcon'
    }), userCssClasses.starIcon),
    fullStarIcon: (0, _classnames.default)(suit({
      descendantName: 'starIcon',
      modifierName: 'full'
    }), userCssClasses.fullStarIcon),
    emptyStarIcon: (0, _classnames.default)(suit({
      descendantName: 'starIcon',
      modifierName: 'empty'
    }), userCssClasses.emptyStarIcon),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    count: (0, _classnames.default)(suit({
      descendantName: 'count'
    }), userCssClasses.count)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectRatingMenu.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeWidget({
    attribute: attribute,
    max: max
  });
}