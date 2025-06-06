function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import hogan from 'hogan.js';
import { html } from 'htm/preact';
import { Highlight, ReverseHighlight, ReverseSnippet, Snippet } from "../../helpers/components/index.js";
// We add all our template helper methods to the template as lambdas. Note
// that lambdas in Mustache are supposed to accept a second argument of
// `render` to get the rendered value, not the literal `{{value}}`. But
// this is currently broken (see https://github.com/twitter/hogan.js/issues/222).
function transformHelpersToHogan() {
  var helpers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var compileOptions = arguments.length > 1 ? arguments[1] : undefined;
  var data = arguments.length > 2 ? arguments[2] : undefined;
  return Object.keys(helpers).reduce(function (acc, helperKey) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, helperKey, function () {
      var _this = this;
      return function (text) {
        var render = function render(value) {
          return hogan.compile(value, compileOptions).render(_this);
        };
        return helpers[helperKey].call(data, text, render);
      };
    }));
  }, {});
}
export function renderTemplate(_ref) {
  var templates = _ref.templates,
    templateKey = _ref.templateKey,
    compileOptions = _ref.compileOptions,
    helpers = _ref.helpers,
    data = _ref.data,
    bindEvent = _ref.bindEvent,
    sendEvent = _ref.sendEvent;
  var template = templates[templateKey];
  if (typeof template !== 'string' && typeof template !== 'function') {
    throw new Error("Template must be 'string' or 'function', was '".concat(_typeof(template), "' (key: ").concat(templateKey, ")"));
  }
  if (typeof template === 'function') {
    // @MAJOR no longer pass bindEvent when string templates are removed
    var params = bindEvent || {};
    params.html = html;
    params.sendEvent = sendEvent;
    params.components = {
      Highlight: Highlight,
      ReverseHighlight: ReverseHighlight,
      Snippet: Snippet,
      ReverseSnippet: ReverseSnippet
    };

    // @MAJOR remove the `as any` when string templates are removed
    // needed because not every template receives sendEvent
    return template(data, params);
  }
  var transformedHelpers = transformHelpersToHogan(helpers, compileOptions, data);
  return hogan.compile(template, compileOptions).render(_objectSpread(_objectSpread({}, data), {}, {
    helpers: transformedHelpers
  })).replace(/[ \n\r\t\f\xA0]+/g, function (spaces) {
    return spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
  }).trim();
}