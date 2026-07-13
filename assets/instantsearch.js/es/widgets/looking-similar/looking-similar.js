function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["item", "sendEvent"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createLookingSimilarComponent } from 'instantsearch-ui-components';
import { Fragment, h, render } from 'preact';
import TemplateComponent from "../../components/Template/Template.js";
import connectLookingSimilar from "../../connectors/looking-similar/connectLookingSimilar.js";
import { prepareTemplateProps } from "../../lib/templating/index.js";
import { getContainerNode, createDocumentationMessageGenerator } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'looking-similar'
});
var LookingSimilar = createLookingSimilarComponent({
  createElement: h,
  Fragment: Fragment
});
function createRenderer(_ref) {
  var renderState = _ref.renderState,
    cssClasses = _ref.cssClasses,
    containerNode = _ref.containerNode,
    templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items,
      results = _ref2.results,
      instantSearchInstance = _ref2.instantSearchInstance,
      sendEvent = _ref2.sendEvent;
    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: {},
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }
    var headerComponent = templates.header ? function (data) {
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        templateKey: "header",
        rootTagName: "fragment",
        data: {
          cssClasses: data.classNames,
          items: data.items
        }
      }));
    } : undefined;
    var itemComponent = templates.item ? function (_ref3) {
      var item = _ref3.item,
        _sendEvent = _ref3.sendEvent,
        rootProps = _objectWithoutProperties(_ref3, _excluded);
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        templateKey: "item",
        rootTagName: "fragment",
        data: item,
        sendEvent: _sendEvent,
        rootProps: _objectSpread({}, rootProps)
      }));
    } : undefined;
    var emptyComponent = templates.empty ? function () {
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        templateKey: "empty",
        rootTagName: "fragment",
        data: results
      }));
    } : undefined;
    var layoutComponent = templates.layout ? function (data) {
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        templateKey: "layout",
        rootTagName: "fragment",
        data: {
          sendEvent: sendEvent,
          items: data.items,
          templates: {
            item: templates.item ? function (_ref4) {
              var item = _ref4.item;
              return h(TemplateComponent, _extends({}, renderState.templateProps, {
                templateKey: "item",
                rootTagName: "fragment",
                data: item,
                sendEvent: sendEvent
              }));
            } : undefined
          },
          cssClasses: {
            list: data.classNames.list,
            item: data.classNames.item
          }
        },
        sendEvent: sendEvent
      }));
    } : undefined;
    render(h(LookingSimilar, {
      items: items,
      headerComponent: headerComponent,
      itemComponent: itemComponent,
      sendEvent: function sendEvent() {},
      classNames: cssClasses,
      emptyComponent: emptyComponent,
      layout: layoutComponent,
      status: instantSearchInstance.status
    }), containerNode);
  };
}
export default (function lookingSimilar(widgetParams) {
  var _ref5 = widgetParams || {},
    container = _ref5.container,
    objectIDs = _ref5.objectIDs,
    limit = _ref5.limit,
    queryParameters = _ref5.queryParameters,
    fallbackParameters = _ref5.fallbackParameters,
    threshold = _ref5.threshold,
    escapeHTML = _ref5.escapeHTML,
    transformItems = _ref5.transformItems,
    _ref5$templates = _ref5.templates,
    templates = _ref5$templates === void 0 ? {} : _ref5$templates,
    _ref5$cssClasses = _ref5.cssClasses,
    cssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = getContainerNode(container);
  var specializedRenderer = createRenderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = connectLookingSimilar(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    objectIDs: objectIDs,
    limit: limit,
    queryParameters: queryParameters,
    fallbackParameters: fallbackParameters,
    threshold: threshold,
    escapeHTML: escapeHTML,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.lookingSimilar'
  });
});