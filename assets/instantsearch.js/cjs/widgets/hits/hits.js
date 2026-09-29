"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _instantsearchUiComponents = require("instantsearch-ui-components");
var _preact = require("preact");
var _Template = _interopRequireDefault(require("../../components/Template/Template"));
var _connectHits = _interopRequireDefault(require("../../connectors/hits/connectHits"));
var _insights = require("../../lib/insights");
var _listener = require("../../lib/insights/listener");
var _templating = require("../../lib/templating");
var _utils = require("../../lib/utils");
var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));
var _excluded = ["hit", "index"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'hits'
});
var Hits = (0, _instantsearchUiComponents.createHitsComponent)({
  createElement: _preact.h,
  Fragment: _preact.Fragment
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
      renderState.templateProps = (0, _templating.prepareTemplateProps)({
        defaultTemplates: _defaultTemplates.default,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }
    var handleInsightsClick = (0, _listener.createInsightsEventHandler)({
      insights: insights,
      sendEvent: sendEvent
    });
    var emptyComponent = function emptyComponent(_ref3) {
      var rootProps = _extends({}, (_objectDestructuringEmpty(_ref3), _ref3));
      return (0, _preact.h)(_Template.default, _extends({}, renderState.templateProps, {
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
      return (0, _preact.h)(_Template.default, _extends({}, renderState.templateProps, {
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
            process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') : void 0;
            return index;
          }
        }),
        bindEvent: bindEvent,
        sendEvent: sendEvent
      }));
    };
    var bannerComponent = function bannerComponent(props) {
      return (0, _preact.h)(_Template.default, _extends({}, renderState.templateProps, {
        templateKey: "banner",
        data: props,
        rootTagName: "fragment"
      }));
    };
    (0, _preact.render)((0, _preact.h)(Hits, {
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
var hits = exports.default = function hits(widgetParams) {
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
  var containerNode = (0, _utils.getContainerNode)(container);
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = (0, _insights.withInsights)(_connectHits.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    escapeHTML: escapeHTML,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.hits'
  });
};