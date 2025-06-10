function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { cx } from '@algolia/ui-components-shared';
import { h, render } from 'preact';
import CurrentRefinements from "../../components/CurrentRefinements/CurrentRefinements.js";
import connectCurrentRefinements from "../../connectors/current-refinements/connectCurrentRefinements.js";
import { component } from "../../lib/suit.js";
import { getContainerNode, createDocumentationMessageGenerator } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'current-refinements'
});
var suit = component('CurrentRefinements');
var renderer = function renderer(_ref, isFirstRender) {
  var items = _ref.items,
    widgetParams = _ref.widgetParams,
    canRefine = _ref.canRefine;
  if (isFirstRender) {
    return;
  }
  var _ref2 = widgetParams,
    container = _ref2.container,
    cssClasses = _ref2.cssClasses;
  render(h(CurrentRefinements, {
    cssClasses: cssClasses,
    items: items,
    canRefine: canRefine
  }), container);
};
var currentRefinements = function currentRefinements(widgetParams) {
  var _ref3 = widgetParams || {},
    container = _ref3.container,
    includedAttributes = _ref3.includedAttributes,
    excludedAttributes = _ref3.excludedAttributes,
    _ref3$cssClasses = _ref3.cssClasses,
    userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
    transformItems = _ref3.transformItems;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinementRoot: cx(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    category: cx(suit({
      descendantName: 'category'
    }), userCssClasses.category),
    categoryLabel: cx(suit({
      descendantName: 'categoryLabel'
    }), userCssClasses.categoryLabel),
    delete: cx(suit({
      descendantName: 'delete'
    }), userCssClasses.delete)
  };
  var makeWidget = connectCurrentRefinements(renderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    includedAttributes: includedAttributes,
    excludedAttributes: excludedAttributes,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.currentRefinements'
  });
};
export default currentRefinements;