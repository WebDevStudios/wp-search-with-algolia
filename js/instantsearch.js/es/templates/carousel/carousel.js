function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { html } from 'htm/preact';
import { createCarouselComponent, cx, generateCarouselId } from 'instantsearch-ui-components';
import { Fragment, h } from 'preact';
import { useRef } from 'preact/hooks';
var Carousel = createCarouselComponent({
  createElement: h,
  Fragment: Fragment
});
function CarouselWithRefs(props) {
  var carouselRefs = {
    listRef: useRef(null),
    nextButtonRef: useRef(null),
    previousButtonRef: useRef(null),
    carouselIdRef: useRef(generateCarouselId())
  };
  return h(Carousel, _extends({}, carouselRefs, props));
}
export function carousel() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    cssClasses = _ref.cssClasses,
    _ref$templates = _ref.templates,
    templates = _ref$templates === void 0 ? {} : _ref$templates;
  return function CarouselTemplate(_ref2) {
    var items = _ref2.items,
      widgetTemplates = _ref2.templates,
      _ref2$cssClasses = _ref2.cssClasses,
      widgetCssClasses = _ref2$cssClasses === void 0 ? {} : _ref2$cssClasses,
      _ref2$sendEvent = _ref2.sendEvent,
      sendEvent = _ref2$sendEvent === void 0 ? function () {} : _ref2$sendEvent;
    var previous = templates.previous,
      next = templates.next;
    return h(CarouselWithRefs, {
      items: items,
      sendEvent: sendEvent,
      itemComponent: widgetTemplates.item,
      previousIconComponent: previous ? function () {
        return previous({
          html: html
        });
      } : undefined,
      nextIconComponent: next ? function () {
        return next({
          html: html
        });
      } : undefined,
      classNames: _objectSpread(_objectSpread({}, cssClasses), {
        list: cx(cssClasses === null || cssClasses === void 0 ? void 0 : cssClasses.list, widgetCssClasses === null || widgetCssClasses === void 0 ? void 0 : widgetCssClasses.list),
        item: cx(cssClasses === null || cssClasses === void 0 ? void 0 : cssClasses.item, widgetCssClasses === null || widgetCssClasses === void 0 ? void 0 : widgetCssClasses.item)
      })
    });
  };
}