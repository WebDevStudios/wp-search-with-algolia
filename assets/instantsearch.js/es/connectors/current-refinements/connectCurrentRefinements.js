function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { getRefinements, checkRendering, createDocumentationMessageGenerator, noop, warning } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'current-refinements',
  connector: true
});
var connectCurrentRefinements = function connectCurrentRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    if ((widgetParams || {}).includedAttributes && (widgetParams || {}).excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }
    var _ref = widgetParams || {},
      includedAttributes = _ref.includedAttributes,
      _ref$excludedAttribut = _ref.excludedAttributes,
      excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
      _ref$transformItems = _ref.transformItems,
      transformItems = _ref$transformItems === void 0 ? function (items) {
        return items;
      } : _ref$transformItems;
    return {
      $$type: 'ais.currentRefinements',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          currentRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
          scopedResults = _ref2.scopedResults,
          _createURL = _ref2.createURL,
          helper = _ref2.helper;
        function getItems() {
          if (!results) {
            return transformItems(getRefinementsItems({
              results: {},
              helper: helper,
              indexId: helper.state.index,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes
            }), {
              results: results
            });
          }
          return scopedResults.reduce(function (accResults, scopedResult) {
            return accResults.concat(transformItems(getRefinementsItems({
              results: scopedResult.results,
              helper: scopedResult.helper,
              indexId: scopedResult.indexId,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes
            }), {
              results: results
            }));
          }, []);
        }
        var items = getItems();
        return {
          items: items,
          canRefine: items.length > 0,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL(clearRefinementFromState(helper.state, refinement));
          },
          widgetParams: widgetParams
        };
      }
    };
  };
};
function getRefinementsItems(_ref3) {
  var results = _ref3.results,
    helper = _ref3.helper,
    indexId = _ref3.indexId,
    includedAttributes = _ref3.includedAttributes,
    excludedAttributes = _ref3.excludedAttributes;
  var includesQuery = (includedAttributes || []).indexOf('query') !== -1 || (excludedAttributes || []).indexOf('query') === -1;
  var filterFunction = includedAttributes ? function (item) {
    return includedAttributes.indexOf(item.attribute) !== -1;
  } : function (item) {
    return excludedAttributes.indexOf(item.attribute) === -1;
  };
  var items = getRefinements(results, helper.state, includesQuery).map(normalizeRefinement).filter(filterFunction);
  return items.reduce(function (allItems, currentItem) {
    return [].concat(_toConsumableArray(allItems.filter(function (item) {
      return item.attribute !== currentItem.attribute;
    })), [{
      indexName: helper.state.index,
      indexId: indexId,
      attribute: currentItem.attribute,
      label: currentItem.attribute,
      refinements: items.filter(function (result) {
        return result.attribute === currentItem.attribute;
      })
      // We want to keep the order of refinements except the numeric ones.
      .sort(function (a, b) {
        return a.type === 'numeric' ? a.value - b.value : 0;
      }),
      refine: function refine(refinement) {
        return clearRefinement(helper, refinement);
      }
    }]);
  }, []);
}
function clearRefinementFromState(state, refinement) {
  state = state.resetPage();
  switch (refinement.type) {
    case 'facet':
      return state.removeFacetRefinement(refinement.attribute, String(refinement.value));
    case 'disjunctive':
      return state.removeDisjunctiveFacetRefinement(refinement.attribute, String(refinement.value));
    case 'hierarchical':
      return state.removeHierarchicalFacetRefinement(refinement.attribute);
    case 'exclude':
      return state.removeExcludeRefinement(refinement.attribute, String(refinement.value));
    case 'numeric':
      return state.removeNumericRefinement(refinement.attribute, refinement.operator, String(refinement.value));
    case 'tag':
      return state.removeTagRefinement(String(refinement.value));
    case 'query':
      return state.setQueryParameter('query', '');
    default:
      process.env.NODE_ENV === 'development' ? warning(false, "The refinement type \"".concat(refinement.type, "\" does not exist and cannot be cleared from the current refinements.")) : void 0;
      return state;
  }
}
function clearRefinement(helper, refinement) {
  helper.setState(clearRefinementFromState(helper.state, refinement)).search();
}
function getOperatorSymbol(operator) {
  switch (operator) {
    case '>=':
      return '≥';
    case '<=':
      return '≤';
    default:
      return operator;
  }
}
function normalizeRefinement(refinement) {
  var value = getValue(refinement);
  var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
  var normalizedRefinement = {
    attribute: refinement.attribute,
    type: refinement.type,
    value: value,
    label: label
  };
  if (refinement.operator !== undefined) {
    normalizedRefinement.operator = refinement.operator;
  }
  if (refinement.count !== undefined) {
    normalizedRefinement.count = refinement.count;
  }
  if (refinement.exhaustive !== undefined) {
    normalizedRefinement.exhaustive = refinement.exhaustive;
  }
  return normalizedRefinement;
}
function getValue(refinement) {
  if (refinement.type === 'numeric') {
    return Number(refinement.name);
  }
  if ('escapedValue' in refinement) {
    return refinement.escapedValue;
  }
  return refinement.name;
}
export default connectCurrentRefinements;