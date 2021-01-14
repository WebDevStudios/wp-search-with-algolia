"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _InfiniteHits = _interopRequireDefault(require("../../components/InfiniteHits/InfiniteHits"));

var _connectInfiniteHits = _interopRequireDefault(require("../../connectors/infinite-hits/connectInfiniteHits"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

var _insights = require("../../lib/insights");

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
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
        insights = _ref2.insights,
        bindEvent = _ref2.bindEvent;

    if (isFirstRendering) {
      renderState.templateProps = (0, _utils.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preact.render)((0, _preact.h)(InfiniteHitsWithInsightsListener, {
      cssClasses: cssClasses,
      hits: hits,
      results: results,
      hasShowPrevious: hasShowPrevious,
      showPrevious: showPrevious,
      showMore: showMore,
      templateProps: renderState.templateProps,
      isFirstPage: isFirstPage,
      isLastPage: isLastPage,
      insights: insights,
      sendEvent: function sendEvent(event) {
        instantSearchInstance.sendEventToInsights(event);
      },
      bindEvent: bindEvent
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
      showPrevious = _ref3.showPrevious,
      cache = _ref3.cache;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

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
    return (0, _preact.render)(null, containerNode);
  });
  return makeInfiniteHits({
    escapeHTML: escapeHTML,
    transformItems: transformItems,
    showPrevious: showPrevious,
    cache: cache
  });
};

var _default = infiniteHits;
exports.default = _default;