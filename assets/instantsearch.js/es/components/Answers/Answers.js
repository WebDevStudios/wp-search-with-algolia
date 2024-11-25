function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { cx } from '@algolia/ui-components-shared';
import { h } from 'preact';
import { warning } from "../../lib/utils/index.js";
import Template from "../Template/Template.js";
var Answers = function Answers(_ref) {
  var hits = _ref.hits,
    isLoading = _ref.isLoading,
    cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps;
  return h("div", {
    className: cx(cssClasses.root, hits.length === 0 && cssClasses.emptyRoot)
  }, h(Template, _extends({}, templateProps, {
    templateKey: "header",
    rootProps: {
      className: cssClasses.header
    },
    data: {
      hits: hits,
      isLoading: isLoading
    }
  })), isLoading ? h(Template, _extends({}, templateProps, {
    templateKey: "loader",
    rootProps: {
      className: cssClasses.loader
    }
  })) : h("ul", {
    className: cssClasses.list
  }, hits.map(function (hit, index) {
    return h(Template, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item
      },
      key: hit.objectID,
      data: _objectSpread(_objectSpread({}, hit), {}, {
        get __hitIndex() {
          process.env.NODE_ENV === 'development' ? warning(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') : void 0;
          return index;
        }
      })
    }));
  })));
};
export default Answers;