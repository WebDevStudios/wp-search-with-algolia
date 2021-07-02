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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var hitsPerPage = function hitsPerPage(widgetParams) {
  var _ref5 = widgetParams || {},
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
  var makeWidget = (0, _connectHitsPerPage.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    items: items,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.hitsPerPage'
  });
};

var _default = hitsPerPage;
exports.default = _default;