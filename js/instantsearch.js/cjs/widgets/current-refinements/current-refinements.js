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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  return _objectSpread(_objectSpread({}, makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.currentRefinements'
  });
};

var _default = currentRefinements;
exports.default = _default;