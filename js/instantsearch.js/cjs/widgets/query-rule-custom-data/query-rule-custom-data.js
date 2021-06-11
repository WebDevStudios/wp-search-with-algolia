"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

var _connectQueryRules = _interopRequireDefault(require("../../connectors/query-rules/connectQueryRules"));

var _QueryRuleCustomData = _interopRequireDefault(require("../../components/QueryRuleCustomData/QueryRuleCustomData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'query-rule-custom-data'
});
var suit = (0, _suit.component)('QueryRuleCustomData');

var renderer = function renderer(_ref) {
  var items = _ref.items,
      widgetParams = _ref.widgetParams;
  var container = widgetParams.container,
      cssClasses = widgetParams.cssClasses,
      templates = widgetParams.templates;
  (0, _preact.render)((0, _preact.h)(_QueryRuleCustomData.default, {
    cssClasses: cssClasses,
    templates: templates,
    items: items
  }), container);
};

var queryRuleCustomData = function queryRuleCustomData() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref2.container,
      _ref2$cssClasses = _ref2.cssClasses,
      userCssClasses = _ref2$cssClasses === void 0 ? {} : _ref2$cssClasses,
      _ref2$templates = _ref2.templates,
      userTemplates = _ref2$templates === void 0 ? {} : _ref2$templates,
      _ref2$transformItems = _ref2.transformItems,
      transformItems = _ref2$transformItems === void 0 ? function (items) {
    return items;
  } : _ref2$transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root)
  };
  var defaultTemplates = {
    default: function _default(_ref3) {
      var items = _ref3.items;
      return JSON.stringify(items, null, 2);
    }
  };

  var templates = _objectSpread({}, defaultTemplates, {}, userTemplates);

  var containerNode = (0, _utils.getContainerNode)(container);
  var makeQueryRuleCustomData = (0, _connectQueryRules.default)(renderer, function () {
    (0, _preact.render)(null, containerNode);
  });
  return _objectSpread({}, makeQueryRuleCustomData({
    container: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    transformItems: transformItems
  }), {
    $$type: 'ais.queryRuleCustomData'
  });
};

var _default2 = queryRuleCustomData;
exports.default = _default2;