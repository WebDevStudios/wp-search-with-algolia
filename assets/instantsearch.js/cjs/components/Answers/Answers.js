"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _utils = require("../../lib/utils");
var _Template = _interopRequireDefault(require("../Template/Template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var Answers = function Answers(_ref) {
  var hits = _ref.hits,
    isLoading = _ref.isLoading,
    cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps;
  return (0, _preact.h)("div", {
    className: (0, _uiComponentsShared.cx)(cssClasses.root, hits.length === 0 && cssClasses.emptyRoot)
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "header",
    rootProps: {
      className: cssClasses.header
    },
    data: {
      hits: hits,
      isLoading: isLoading
    }
  })), isLoading ? (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "loader",
    rootProps: {
      className: cssClasses.loader
    }
  })) : (0, _preact.h)("ul", {
    className: cssClasses.list
  }, hits.map(function (hit, index) {
    return (0, _preact.h)(_Template.default, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item
      },
      key: hit.objectID,
      data: _objectSpread(_objectSpread({}, hit), {}, {
        get __hitIndex() {
          process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, 'The `__hitIndex` property is deprecated. Use the absolute `__position` instead.') : void 0;
          return index;
        }
      })
    }));
  })));
};
var _default = Answers;
exports.default = _default;