"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Selector = _interopRequireDefault(require("../../components/Selector/Selector"));

var _connectHitsPerPage = _interopRequireDefault(require("../../connectors/hits-per-page/connectHitsPerPage"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'hits-per-page'
});
var suit = (0, _suit.component)('HitsPerPage');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items,
        refine = _ref2.refine;
    if (isFirstRendering) return;

    var _ref3 = (0, _utils.find)(items, function (_ref4) {
      var isRefined = _ref4.isRefined;
      return isRefined;
    }) || {},
        currentValue = _ref3.value;

    (0, _preact.render)((0, _preact.h)("div", {
      className: cssClasses.root
    }, (0, _preact.h)(_Selector.default, {
      cssClasses: cssClasses,
      currentValue: currentValue,
      options: items,
      setValue: refine
    })), containerNode);
  };
};

var hitsPerPage = function hitsPerPage(widgetOptions) {
  var _ref5 = widgetOptions || {},
      container = _ref5.container,
      items = _ref5.items,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      transformItems = _ref5.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    select: (0, _classnames.default)(suit({
      descendantName: 'select'
    }), userCssClasses.select),
    option: (0, _classnames.default)(suit({
      descendantName: 'option'
    }), userCssClasses.option)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeHitsPerPage = (0, _connectHitsPerPage.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return makeHitsPerPage({
    items: items,
    transformItems: transformItems
  });
};

var _default = hitsPerPage;
exports.default = _default;