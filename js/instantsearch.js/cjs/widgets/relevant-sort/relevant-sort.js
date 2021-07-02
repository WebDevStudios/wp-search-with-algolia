"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

var _connectRelevantSort = _interopRequireDefault(require("../../connectors/relevant-sort/connectRelevantSort"));

var _RelevantSort = _interopRequireDefault(require("../../components/RelevantSort/RelevantSort"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'relevant-sort'
});
var suit = (0, _suit.component)('RelevantSort');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
  return function (_ref2) {
    var isRelevantSorted = _ref2.isRelevantSorted,
        isVirtualReplica = _ref2.isVirtualReplica,
        refine = _ref2.refine;
    (0, _preact.render)((0, _preact.h)(_RelevantSort.default, {
      cssClasses: cssClasses,
      templates: templates,
      isRelevantSorted: isRelevantSorted,
      isVirtualReplica: isVirtualReplica,
      refine: refine
    }), containerNode);
  };
};

var relevantSort = function relevantSort(widgetParams) {
  var container = widgetParams.container,
      _widgetParams$templat = widgetParams.templates,
      userTemplates = _widgetParams$templat === void 0 ? {} : _widgetParams$templat,
      _widgetParams$cssClas = widgetParams.cssClasses,
      userCssClasses = _widgetParams$cssClas === void 0 ? {} : _widgetParams$cssClas;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    text: (0, _classnames.default)(suit({
      descendantName: 'text'
    }), userCssClasses.text),
    button: (0, _classnames.default)(suit({
      descendantName: 'button'
    }), userCssClasses.button)
  };

  var templates = _objectSpread(_objectSpread({}, _defaultTemplates.default), userTemplates);

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _connectRelevantSort.default)(specializedRenderer, function () {
    (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({})), {}, {
    $$widgetType: 'ais.relevantSort'
  });
};

var _default = relevantSort;
exports.default = _default;