"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _CurrentRefinements = _interopRequireDefault(require("../../components/CurrentRefinements/CurrentRefinements"));

var _connectCurrentRefinements = _interopRequireDefault(require("../../connectors/current-refinements/connectCurrentRefinements"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'current-refinements'
});
var suit = (0, _suit.component)('CurrentRefinements');

var renderer = function renderer(_ref, isFirstRender) {
  var items = _ref.items,
      widgetParams = _ref.widgetParams;

  if (isFirstRender) {
    return;
  }

  var container = widgetParams.container,
      cssClasses = widgetParams.cssClasses;
  (0, _preact.render)((0, _preact.h)(_CurrentRefinements.default, {
    cssClasses: cssClasses,
    items: items
  }), container);
};

var currentRefinements = function currentRefinements(widgetParams) {
  var _ref2 = widgetParams || {},
      container = _ref2.container,
      includedAttributes = _ref2.includedAttributes,
      excludedAttributes = _ref2.excludedAttributes,
      _ref2$cssClasses = _ref2.cssClasses,
      userCssClasses = _ref2$cssClasses === void 0 ? {} : _ref2$cssClasses,
      transformItems = _ref2.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    label: (0, _classnames.default)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    category: (0, _classnames.default)(suit({
      descendantName: 'category'
    }), userCssClasses.category),
    categoryLabel: (0, _classnames.default)(suit({
      descendantName: 'categoryLabel'
    }), userCssClasses.categoryLabel),
    delete: (0, _classnames.default)(suit({
      descendantName: 'delete'
    }), userCssClasses.delete)
  };
  var makeWidget = (0, _connectCurrentRefinements.default)(renderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  });
};

var _default = currentRefinements;
exports.default = _default;