"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _RangeInput = _interopRequireDefault(require("../../components/RangeInput/RangeInput"));
var _connectRange = _interopRequireDefault(require("../../connectors/range/connectRange"));
var _suit = require("../../lib/suit");
var _templating = require("../../lib/templating");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'range-input'
});
var suit = (0, _suit.component)('RangeInput');
var defaultTemplates = {
  separatorText: function separatorText() {
    return 'to';
  },
  submitText: function submitText() {
    return 'Go';
  }
};
var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
    cssClasses = _ref.cssClasses,
    renderState = _ref.renderState,
    templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
      range = _ref2.range,
      start = _ref2.start,
      widgetParams = _ref2.widgetParams,
      instantSearchInstance = _ref2.instantSearchInstance;
    if (isFirstRendering) {
      renderState.templateProps = (0, _templating.prepareTemplateProps)({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }
    var rangeMin = range.min,
      rangeMax = range.max;
    var _start = _slicedToArray(start, 2),
      minValue = _start[0],
      maxValue = _start[1];
    var step = 1 / Math.pow(10, widgetParams.precision || 0);
    var values = {
      min: minValue !== -Infinity && minValue !== rangeMin ? minValue : undefined,
      max: maxValue !== Infinity && maxValue !== rangeMax ? maxValue : undefined
    };
    (0, _preact.render)((0, _preact.h)(_RangeInput.default, {
      min: rangeMin,
      max: rangeMax,
      step: step,
      values: values,
      cssClasses: cssClasses,
      refine: refine,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};
var rangeInput = function rangeInput(widgetParams) {
  var _ref3 = widgetParams || {},
    container = _ref3.container,
    attribute = _ref3.attribute,
    min = _ref3.min,
    max = _ref3.max,
    _ref3$precision = _ref3.precision,
    precision = _ref3$precision === void 0 ? 0 : _ref3$precision,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
    _ref3$templates = _ref3.templates,
    templates = _ref3$templates === void 0 ? {} : _ref3$templates;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root),
    noRefinement: (0, _uiComponentsShared.cx)(suit({
      modifierName: 'noRefinement'
    })),
    form: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'form'
    }), userCssClasses.form),
    label: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    input: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'input'
    }), userCssClasses.input),
    inputMin: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'input',
      modifierName: 'min'
    }), userCssClasses.inputMin),
    inputMax: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'input',
      modifierName: 'max'
    }), userCssClasses.inputMax),
    separator: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'separator'
    }), userCssClasses.separator),
    submit: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'submit'
    }), userCssClasses.submit)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {}
  });
  var makeWidget = (0, _connectRange.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attribute: attribute,
    min: min,
    max: max,
    precision: precision
  })), {}, {
    $$type: 'ais.rangeInput',
    $$widgetType: 'ais.rangeInput'
  });
};
var _default = rangeInput;
exports.default = _default;