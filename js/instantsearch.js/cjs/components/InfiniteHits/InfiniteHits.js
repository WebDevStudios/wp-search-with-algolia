"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _instantsearchUiComponents = require("instantsearch-ui-components");
var _preact = require("preact");
var _listener = require("../../lib/insights/listener");
var _utils = require("../../lib/utils");
var _Template = _interopRequireDefault(require("../Template/Template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DefaultBanner = function DefaultBanner(_ref) {
  var banner = _ref.banner,
    classNames = _ref.classNames;
  if (!banner.image.urls[0].url) {
    return null;
  }
  return (0, _preact.h)("aside", {
    className: (0, _instantsearchUiComponents.cx)(classNames.bannerRoot)
  }, banner.link ? (0, _preact.h)("a", {
    className: (0, _instantsearchUiComponents.cx)(classNames.bannerLink),
    href: banner.link.url,
    target: banner.link.target
  }, (0, _preact.h)("img", {
    className: (0, _instantsearchUiComponents.cx)(classNames.bannerImage),
    src: banner.image.urls[0].url,
    alt: banner.image.title
  })) : (0, _preact.h)("img", {
    className: (0, _instantsearchUiComponents.cx)(classNames.bannerImage),
    src: banner.image.urls[0].url,
    alt: banner.image.title
  }));
};
var InfiniteHits = function InfiniteHits(_ref2) {
  var results = _ref2.results,
    hits = _ref2.hits,
    insights = _ref2.insights,
    bindEvent = _ref2.bindEvent,
    sendEvent = _ref2.sendEvent,
    hasShowPrevious = _ref2.hasShowPrevious,
    showPrevious = _ref2.showPrevious,
    showMore = _ref2.showMore,
    isFirstPage = _ref2.isFirstPage,
    isLastPage = _ref2.isLastPage,
    cssClasses = _ref2.cssClasses,
    templateProps = _ref2.templateProps,
    banner = _ref2.banner;
  var handleInsightsClick = (0, _listener.createInsightsEventHandler)({
    insights: insights,
    sendEvent: sendEvent
  });
  if (results.hits.length === 0) {
    return (0, _preact.h)("div", {
      className: (0, _instantsearchUiComponents.cx)(cssClasses.root, cssClasses.emptyRoot),
      onClick: handleInsightsClick
    }, banner && (templateProps.templates.banner ? (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "banner",
      rootTagName: "fragment",
      data: {
        banner: banner,
        className: cssClasses.bannerRoot
      }
    })) : (0, _preact.h)(DefaultBanner, {
      banner: banner,
      classNames: cssClasses
    })), (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "empty",
      rootTagName: "fragment",
      data: results
    })));
  }
  return (0, _preact.h)("div", {
    className: cssClasses.root
  }, hasShowPrevious && (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "showPreviousText",
    rootTagName: "button",
    rootProps: {
      className: (0, _instantsearchUiComponents.cx)(cssClasses.loadPrevious, isFirstPage && cssClasses.disabledLoadPrevious),
      disabled: isFirstPage,
      onClick: showPrevious
    }
  })), banner && (templateProps.templates.banner ? (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "banner",
    rootTagName: "fragment",
    data: {
      banner: banner,
      className: cssClasses.bannerRoot
    }
  })) : (0, _preact.h)(DefaultBanner, {
    banner: banner,
    classNames: cssClasses
  })), (0, _preact.h)("ol", {
    className: cssClasses.list
  }, hits.map(function (hit, index) {
    return (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item,
        onClick: function onClick(event) {
          handleInsightsClick(event);
          sendEvent('click:internal', hit, 'Hit Clicked');
        },
        onAuxClick: function onAuxClick(event) {
          handleInsightsClick(event);
          sendEvent('click:internal', hit, 'Hit Clicked');
        }
      },
      key: hit.objectID,
      data: _objectSpread(_objectSpread({}, hit), {}, {
        get __hitIndex() {
          process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') : void 0;
          return index;
        }
      }),
      bindEvent: bindEvent,
      sendEvent: sendEvent
    }));
  })), (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "showMoreText",
    rootTagName: "button",
    rootProps: {
      className: (0, _instantsearchUiComponents.cx)(cssClasses.loadMore, isLastPage && cssClasses.disabledLoadMore),
      disabled: isLastPage,
      onClick: showMore
    }
  })));
};
var _default = InfiniteHits;
exports.default = _default;