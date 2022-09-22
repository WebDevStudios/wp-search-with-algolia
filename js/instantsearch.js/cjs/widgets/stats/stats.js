"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultTemplates = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Stats = _interopRequireDefault(require("../../components/Stats/Stats.js"));

var _connectStats = _interopRequireDefault(require("../../connectors/stats/connectStats.js"));

var _index = require("../../lib/utils/index.js");

var _index2 = require("../../lib/templating/index.js");

var _suit = require("../../lib/suit.js");

var _formatNumber = require("../../lib/formatNumber.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _index.createDocumentationMessageGenerator)({
  name: 'stats'
});
var suit = (0, _suit.component)('Stats');
var defaultTemplates = {
  text: function text(props) {
    return "".concat(props.areHitsSorted ? getSortedResultsSentence(props) : getResultsSentence(props), " found in ").concat(props.processingTimeMS, "ms");
  }
};
exports.defaultTemplates = defaultTemplates;

function getSortedResultsSentence(_ref) {
  var nbHits = _ref.nbHits,
      hasNoSortedResults = _ref.hasNoSortedResults,
      hasOneSortedResults = _ref.hasOneSortedResults,
      hasManySortedResults = _ref.hasManySortedResults,
      nbSortedHits = _ref.nbSortedHits;
  var suffix = "sorted out of ".concat((0, _formatNumber.formatNumber)(nbHits));

  if (hasNoSortedResults) {
    return "No relevant results ".concat(suffix);
  }

  if (hasOneSortedResults) {
    return "1 relevant result ".concat(suffix);
  }

  if (hasManySortedResults) {
    return "".concat((0, _formatNumber.formatNumber)(nbSortedHits || 0), " relevant results ").concat(suffix);
  }

  return '';
}

function getResultsSentence(_ref2) {
  var nbHits = _ref2.nbHits,
      hasNoResults = _ref2.hasNoResults,
      hasOneResult = _ref2.hasOneResult,
      hasManyResults = _ref2.hasManyResults;

  if (hasNoResults) {
    return 'No results';
  }

  if (hasOneResult) {
    return '1 result';
  }

  if (hasManyResults) {
    return "".concat((0, _formatNumber.formatNumber)(nbHits), " results");
  }

  return '';
}

var renderer = function renderer(_ref3) {
  var renderState = _ref3.renderState,
      cssClasses = _ref3.cssClasses,
      containerNode = _ref3.containerNode,
      templates = _ref3.templates;
  return function (_ref4, isFirstRendering) {
    var hitsPerPage = _ref4.hitsPerPage,
        nbHits = _ref4.nbHits,
        nbSortedHits = _ref4.nbSortedHits,
        areHitsSorted = _ref4.areHitsSorted,
        nbPages = _ref4.nbPages,
        page = _ref4.page,
        processingTimeMS = _ref4.processingTimeMS,
        query = _ref4.query,
        instantSearchInstance = _ref4.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = (0, _index2.prepareTemplateProps)({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    (0, _preact.render)((0, _preact.h)(_Stats.default, {
      cssClasses: cssClasses,
      hitsPerPage: hitsPerPage,
      nbHits: nbHits,
      nbSortedHits: nbSortedHits,
      areHitsSorted: areHitsSorted,
      nbPages: nbPages,
      page: page,
      processingTimeMS: processingTimeMS,
      query: query,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
/**
 * The `stats` widget is used to display useful insights about the current results.
 *
 * By default, it will display the **number of hits** and the time taken to compute the
 * results inside the engine.
 */


var stats = function stats(widgetParams) {
  var _ref5 = widgetParams || {},
      container = _ref5.container,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      _ref5$templates = _ref5.templates,
      templates = _ref5$templates === void 0 ? {} : _ref5$templates;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _index.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    text: (0, _classnames.default)(suit({
      descendantName: 'text'
    }), userCssClasses.text)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {}
  });
  var makeWidget = (0, _connectStats.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({})), {}, {
    $$widgetType: 'ais.stats'
  });
};

var _default = stats;
exports.default = _default;