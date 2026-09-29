function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["autocompleteScopeApi", "environment", "classNames", "getInputProps", "getInputPropsCore", "isDetached", "state"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import { getCreateDomElement } from '../getCreateDomElement';
import { setProperties } from '../utils';
export var Input = function Input(_ref) {
  var autocompleteScopeApi = _ref.autocompleteScopeApi,
    environment = _ref.environment,
    classNames = _ref.classNames,
    getInputProps = _ref.getInputProps,
    getInputPropsCore = _ref.getInputPropsCore,
    isDetached = _ref.isDetached,
    state = _ref.state,
    props = _objectWithoutProperties(_ref, _excluded);
  var createDomElement = getCreateDomElement(environment);
  var element = createDomElement('input', props);
  var inputProps = getInputProps(_objectSpread({
    state: state,
    props: getInputPropsCore({
      inputElement: element
    }),
    inputElement: element
  }, autocompleteScopeApi));
  setProperties(element, _objectSpread(_objectSpread({}, inputProps), {}, {
    onKeyDown: function onKeyDown(event) {
      // In detached mode we don't want to close the panel when hitting `Tab`.
      if (isDetached && event.key === 'Tab') {
        return;
      }
      inputProps.onKeyDown(event);
    }
  }));
  return element;
};