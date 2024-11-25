function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["container", "widgets", "fallbackWidget"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import connectDynamicWidgets from "../../connectors/dynamic-widgets/connectDynamicWidgets.js";
import { component } from "../../lib/suit.js";
import { createDocumentationMessageGenerator, getContainerNode, getWidgetAttribute } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'dynamic-widgets'
});
var suit = component('DynamicWidgets');
function createContainer(rootContainer) {
  var container = document.createElement('div');
  container.className = suit({
    descendantName: 'widget'
  });
  rootContainer.appendChild(container);
  return container;
}
var dynamicWidgets = function dynamicWidgets(widgetParams) {
  var _ref = widgetParams || {},
    containerSelector = _ref.container,
    widgets = _ref.widgets,
    fallbackWidget = _ref.fallbackWidget,
    otherWidgetParams = _objectWithoutProperties(_ref, _excluded);
  if (!containerSelector) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  if (!(widgets && Array.isArray(widgets) && widgets.every(function (widget) {
    return typeof widget === 'function';
  }))) {
    throw new Error(withUsage('The `widgets` option expects an array of callbacks.'));
  }
  var userContainer = getContainerNode(containerSelector);
  var rootContainer = document.createElement('div');
  rootContainer.className = suit();
  var containers = new Map();
  var connectorWidgets = [];
  var makeWidget = connectDynamicWidgets(function (_ref2, isFirstRender) {
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
  var widget = makeWidget(_objectSpread(_objectSpread({}, otherWidgetParams), {}, {
    widgets: connectorWidgets,
    fallbackWidget: typeof fallbackWidget === 'function' ? function (_ref3) {
      var attribute = _ref3.attribute;
      var container = createContainer(rootContainer);
      containers.set(attribute, container);
      return fallbackWidget({
        attribute: attribute,
        container: container
      });
    } : undefined
  }));
  return _objectSpread(_objectSpread({}, widget), {}, {
    init: function init(initOptions) {
      widgets.forEach(function (cb) {
        var container = createContainer(rootContainer);
        var childWidget = cb(container);
        var attribute = getWidgetAttribute(childWidget, initOptions);
        containers.set(attribute, container);
        connectorWidgets.push(childWidget);
      });
      widget.init(initOptions);
    },
    $$widgetType: 'ais.dynamicWidgets'
  });
};
export default dynamicWidgets;