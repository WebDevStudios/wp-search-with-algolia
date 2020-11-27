"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _InfiniteHits = _interopRequireDefault(require("../../components/InfiniteHits/InfiniteHits"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

var _connectInfiniteHits = _interopRequireDefault(require("../../connectors/infinite-hits/connectInfiniteHits"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

var _insights = require("../../lib/insights");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'infinite-hits'
});
var suit = (0, _suit.component)('InfiniteHits');
var InfiniteHitsWithInsightsListener = (0, _insights.withInsightsListener)(_InfiniteHits.default);

var renderer = function renderer(_ref) {
  var cssClasses = _ref.cssClasses,
      containerNode = _ref.containerNode,
      renderState = _ref.renderState,
      templates = _ref.templates,
      hasShowPrevious = _ref.showPrevious;
  return function (_ref2, isFirstRendering) {
    var hits = _ref2.hits,
        results = _ref2.results,
        showMore = _ref2.showMore,
        showPrevious = _ref2.showPrevious,
        isFirstPage = _ref2.isFirstPage,
        isLastPage = _ref2.isLastPage,
        instantSearchInstance = _ref2.instantSearchInstance,
        insights = _ref2.insights;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preactCompat.render)(_preactCompat.default.createElement(InfiniteHitsWithInsightsListener, {
      cssClasses: cssClasses,
      hits: hits,
      results: results,
      hasShowPrevious: hasShowPrevious,
      showPrevious: showPrevious,
      showMore: showMore,
      templateProps: renderState.templateProps,
      isFirstPage: isFirstPage,
      isLastPage: isLastPage,
      insights: insights
    }), containerNode);
  };
};

var infiniteHits = function infiniteHits() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      escapeHTML = _ref3.escapeHTML,
      transformItems = _ref3.transformItems,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? _defaultTemplates.default : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      showPrevious = _ref3.showPrevious;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  (0, _utils.warning)( // @ts-ignore: We have this specific check because unlike `hits`, `infiniteHits` does not support
  // the `allItems` template. This can be misleading as they are very similar.
  typeof templates.allItems === 'undefined', "The template `allItems` does not exist since InstantSearch.js 3.\n\n You may want to migrate using `connectInfiniteHits`: ".concat((0, _utils.createDocumentationLink)({
    name: 'infinite-hits',
    connector: true
  }), "."));
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    emptyRoot: (0, _classnames.default)(suit({
      modifierName: 'empty'
    }), userCssClasses.emptyRoot),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    loadPrevious: (0, _classnames.default)(suit({
      descendantName: 'loadPrevious'
    }), userCssClasses.loadPrevious),
    disabledLoadPrevious: (0, _classnames.default)(suit({
      descendantName: 'loadPrevious',
      modifierName: 'disabled'
    }), userCssClasses.disabledLoadPrevious),
    loadMore: (0, _classnames.default)(suit({
      descendantName: 'loadMore'
    }), userCssClasses.loadMore),
    disabledLoadMore: (0, _classnames.default)(suit({
      descendantName: 'loadMore',
      modifierName: 'disabled'
    }), userCssClasses.disabledLoadMore)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    showPrevious: showPrevious,
    renderState: {}
  });
  var makeInfiniteHits = (0, _insights.withInsights)(_connectInfiniteHits.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeInfiniteHits({
    escapeHTML: escapeHTML,
    transformItems: transformItems,
    showPrevious: showPrevious
  });
};

var _default = infiniteHits;
exports.default = _default;