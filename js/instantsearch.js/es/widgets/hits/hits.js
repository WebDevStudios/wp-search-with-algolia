function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["hit", "index"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { createHitsComponent } from 'instantsearch-ui-components';
import { Fragment, h, render } from 'preact';
import TemplateComponent from "../../components/Template/Template.js";
import connectHits from "../../connectors/hits/connectHits.js";
import { withInsights } from "../../lib/insights/index.js";
import { createInsightsEventHandler } from "../../lib/insights/listener.js";
import { prepareTemplateProps } from "../../lib/templating/index.js";
import { getContainerNode, createDocumentationMessageGenerator, warning } from "../../lib/utils/index.js";
import defaultTemplates from "./defaultTemplates.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'hits'
});
var Hits = createHitsComponent({
  createElement: h,
  Fragment: Fragment
});
var renderer = function renderer(_ref) {
  var renderState = _ref.renderState,
    cssClasses = _ref.cssClasses,
    containerNode = _ref.containerNode,
    templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items,
      results = _ref2.results,
      instantSearchInstance = _ref2.instantSearchInstance,
      insights = _ref2.insights,
      bindEvent = _ref2.bindEvent,
      sendEvent = _ref2.sendEvent,
      banner = _ref2.banner;
    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }
    var handleInsightsClick = createInsightsEventHandler({
      insights: insights,
      sendEvent: sendEvent
    });
    var emptyComponent = function emptyComponent(_ref3) {
      var rootProps = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        rootProps: rootProps,
        templateKey: "empty",
        data: results,
        rootTagName: "fragment"
      }));
    };

    // @MAJOR: Move default hit component back to the UI library
    // once flavour specificities are erased
    var itemComponent = function itemComponent(_ref4) {
      var hit = _ref4.hit,
        index = _ref4.index,
        rootProps = _objectWithoutProperties(_ref4, _excluded);
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        templateKey: "item",
        rootTagName: "li",
        rootProps: _objectSpread(_objectSpread({}, rootProps), {}, {
          onClick: function onClick(event) {
            handleInsightsClick(event);
            rootProps.onClick();
          },
          onAuxClick: function onAuxClick(event) {
            handleInsightsClick(event);
            rootProps.onAuxClick();
          }
        }),
        data: _objectSpread(_objectSpread({}, hit), {}, {
          get __hitIndex() {
            process.env.NODE_ENV === 'development' ? warning(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') : void 0;
            return index;
          }
        }),
        bindEvent: bindEvent,
        sendEvent: sendEvent
      }));
    };
    var bannerComponent = function bannerComponent(props) {
      return h(TemplateComponent, _extends({}, renderState.templateProps, {
        templateKey: "banner",
        data: props,
        rootTagName: "fragment"
      }));
    };
    render(h(Hits, {
      hits: items,
      itemComponent: itemComponent,
      sendEvent: sendEvent,
      classNames: cssClasses,
      emptyComponent: emptyComponent,
      banner: banner,
      bannerComponent: templates.banner ? bannerComponent : undefined
    }), containerNode);
  };
};
export default (function hits(widgetParams) {
  var _ref5 = widgetParams || {},
    container = _ref5.container,
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
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = withInsights(connectHits)(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    escapeHTML: escapeHTML,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.hits'
  });
});