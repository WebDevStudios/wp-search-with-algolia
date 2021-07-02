"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connectDynamicWidgets = _interopRequireDefault(require("../../connectors/dynamic-widgets/connectDynamicWidgets"));

var _suit = require("../../lib/suit");

var _utils = require("../../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'dynamic-widgets'
});
var suit = (0, _suit.component)('DynamicWidgets');

var dynamicWidgets = function dynamicWidgets(widgetParams) {
  var _ref = widgetParams || {},
      containerSelector = _ref.container,
      transformItems = _ref.transformItems,
      widgets = _ref.widgets;

  if (!containerSelector) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  if (!widgets || !Array.isArray(widgets) || widgets.some(function (widget) {
    return typeof widget !== 'function';
  })) {
    throw new Error(withUsage('The `widgets` option expects an array of callbacks.'));
  }

  var userContainer = (0, _utils.getContainerNode)(containerSelector);
  var rootContainer = document.createElement('div');
  rootContainer.className = suit();
  var containers = new Map();
  var connectorWidgets = [];
  var makeWidget = (0, _connectDynamicWidgets.default)(function (_ref2, isFirstRender) {
    var attributesToRender = _ref2.attributesToRender;

    if (isFirstRender) {
      userContainer.appendChild(rootContainer);
    }

    attributesToRender.forEach(function (attribute) {
      if (!containers.has(attribute)) {
        return;
      }

      var container = containers.get(attribute);
      rootContainer.appendChild(container);
    });
  }, function () {
    userContainer.removeChild(rootContainer);
  });
  var widget = makeWidget({
    transformItems: transformItems,
    widgets: connectorWidgets
  });
  return _objectSpread(_objectSpread({}, widget), {}, {
    init: function init(initOptions) {
      widgets.forEach(function (cb) {
        var container = document.createElement('div');
        container.className = suit({
          descendantName: 'widget'
        });
        rootContainer.appendChild(container);
        var childWidget = cb(container);
        var attribute = (0, _utils.getWidgetAttribute)(childWidget, initOptions);
        containers.set(attribute, container);
        connectorWidgets.push(childWidget);
      });
      widget.init(initOptions);
    },
    $$widgetType: 'ais.dynamicWidgets'
  });
};

var _default = dynamicWidgets;
exports.default = _default;