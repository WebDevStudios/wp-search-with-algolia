"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _RefinementList = _interopRequireDefault(require("../../components/RefinementList/RefinementList"));

var _connectRatingMenu = _interopRequireDefault(require("../../connectors/rating-menu/connectRatingMenu"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'rating-menu'
});
var suit = (0, _suit.component)('RatingMenu');

var _ref3 = (0, _preact.h)("path", {
  d: "M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"
});

var _ref4 = (0, _preact.h)("path", {
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

    (0, _preact.render)((0, _preact.h)(_RefinementList.default, {
      createURL: createURL,
      cssClasses: cssClasses,
      facetValues: items,
      templateProps: renderState.templateProps,
      toggleRefinement: refine
    }, (0, _preact.h)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      style: "display:none;"
    }, (0, _preact.h)("symbol", {
      id: suit({
        descendantName: 'starSymbol'
      }),
      viewBox: "0 0 24 24"
    }, _ref3), (0, _preact.h)("symbol", {
      id: suit({
        descendantName: 'starEmptySymbol'
      }),
      viewBox: "0 0 24 24"
    }, _ref4))), containerNode);
  };
};
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
 * @param {RatingMenuWidgetParams} widgetParams RatingMenu widget options.
 * @return {Widget} A new RatingMenu widget instance.
 * @example
 * search.addWidgets([
 *   instantsearch.widgets.ratingMenu({
 *     container: '#stars',
 *     attribute: 'rating',
 *     max: 5,
 *   })
 * ]);
 */


var ratingMenu = function ratingMenu(widgetParams) {
  var _ref5 = widgetParams || {},
      container = _ref5.container,
      attribute = _ref5.attribute,
      _ref5$max = _ref5.max,
      max = _ref5$max === void 0 ? 5 : _ref5$max,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      _ref5$templates = _ref5.templates,
      templates = _ref5$templates === void 0 ? {} : _ref5$templates;

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
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attribute: attribute,
    max: max
  })), {}, {
    $$widgetType: 'ais.ratingMenu'
  });
};

var _default = ratingMenu;
exports.default = _default;