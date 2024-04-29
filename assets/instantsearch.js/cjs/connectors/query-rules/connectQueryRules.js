"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../lib/utils");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'query-rules',
  connector: true
});
function hasStateRefinements(state) {
  return [state.disjunctiveFacetsRefinements, state.facetsRefinements, state.hierarchicalFacetsRefinements, state.numericRefinements].some(function (refinement) {
    return Boolean(refinement && Object.keys(refinement).length > 0);
  });
}

// A context rule must consist only of alphanumeric characters, hyphens, and underscores.
// See https://www.algolia.com/doc/guides/managing-results/refine-results/merchandising-and-promoting/in-depth/implementing-query-rules/#context
function escapeRuleContext(ruleName) {
  return ruleName.replace(/[^a-z0-9-_]+/gi, '_');
}
function getRuleContextsFromTrackedFilters(_ref) {
  var helper = _ref.helper,
    sharedHelperState = _ref.sharedHelperState,
    trackedFilters = _ref.trackedFilters;
  var ruleContexts = Object.keys(trackedFilters).reduce(function (facets, facetName) {
    var facetRefinements = (0, _utils.getRefinements)(helper.lastResults || {}, sharedHelperState, true).filter(function (refinement) {
      return refinement.attribute === facetName;
    }).map(function (refinement) {
      return refinement.numericValue || refinement.name;
    });
    var getTrackedFacetValues = trackedFilters[facetName];
    var trackedFacetValues = getTrackedFacetValues(facetRefinements);
    return [].concat(_toConsumableArray(facets), _toConsumableArray(facetRefinements.filter(function (facetRefinement) {
      return trackedFacetValues.includes(facetRefinement);
    }).map(function (facetValue) {
      return escapeRuleContext("ais-".concat(facetName, "-").concat(facetValue));
    })));
  }, []);
  return ruleContexts;
}
function applyRuleContexts(event) {
  var helper = this.helper,
    initialRuleContexts = this.initialRuleContexts,
    trackedFilters = this.trackedFilters,
    transformRuleContexts = this.transformRuleContexts;
  var sharedHelperState = event.state;
  var previousRuleContexts = sharedHelperState.ruleContexts || [];
  var newRuleContexts = getRuleContextsFromTrackedFilters({
    helper: helper,
    sharedHelperState: sharedHelperState,
    trackedFilters: trackedFilters
  });
  var nextRuleContexts = [].concat(_toConsumableArray(initialRuleContexts), _toConsumableArray(newRuleContexts));
  process.env.NODE_ENV === 'development' ? (0, _utils.warning)(nextRuleContexts.length <= 10, "\nThe maximum number of `ruleContexts` is 10. They have been sliced to that limit.\nConsider using `transformRuleContexts` to minimize the number of rules sent to Algolia.\n") : void 0;
  var ruleContexts = transformRuleContexts(nextRuleContexts).slice(0, 10);
  if (!(0, _utils.isEqual)(previousRuleContexts, ruleContexts)) {
    helper.overrideStateWithoutTriggeringChangeEvent(_objectSpread(_objectSpread({}, sharedHelperState), {}, {
      ruleContexts: ruleContexts
    }));
  }
}
var connectQueryRules = function connectQueryRules(_render) {
  var unmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(_render, withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
      _ref2$trackedFilters = _ref2.trackedFilters,
      trackedFilters = _ref2$trackedFilters === void 0 ? {} : _ref2$trackedFilters,
      _ref2$transformRuleCo = _ref2.transformRuleContexts,
      transformRuleContexts = _ref2$transformRuleCo === void 0 ? function (rules) {
        return rules;
      } : _ref2$transformRuleCo,
      _ref2$transformItems = _ref2.transformItems,
      transformItems = _ref2$transformItems === void 0 ? function (items) {
        return items;
      } : _ref2$transformItems;
    Object.keys(trackedFilters).forEach(function (facetName) {
      if (typeof trackedFilters[facetName] !== 'function') {
        throw new Error(withUsage("'The \"".concat(facetName, "\" filter value in the `trackedFilters` option expects a function.")));
      }
    });
    var hasTrackedFilters = Object.keys(trackedFilters).length > 0;

    // We store the initial rule contexts applied before creating the widget
    // so that we do not override them with the rules created from `trackedFilters`.
    var initialRuleContexts = [];
    var onHelperChange;
    return {
      $$type: 'ais.queryRules',
      init: function init(initOptions) {
        var helper = initOptions.helper,
          state = initOptions.state,
          instantSearchInstance = initOptions.instantSearchInstance;
        initialRuleContexts = state.ruleContexts || [];
        onHelperChange = applyRuleContexts.bind({
          helper: helper,
          initialRuleContexts: initialRuleContexts,
          trackedFilters: trackedFilters,
          transformRuleContexts: transformRuleContexts
        });
        if (hasTrackedFilters) {
          // We need to apply the `ruleContexts` based on the `trackedFilters`
          // before the helper changes state in some cases:
          //   - Some filters are applied on the first load (e.g. using `configure`)
          //   - The `transformRuleContexts` option sets initial `ruleContexts`.
          if (hasStateRefinements(state) || Boolean(widgetParams.transformRuleContexts)) {
            onHelperChange({
              state: state
            });
          }

          // We track every change in the helper to override its state and add
          // any `ruleContexts` needed based on the `trackedFilters`.
          helper.on('change', onHelperChange);
        }
        _render(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        _render(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results;
        var _ref4 = results || {},
          _ref4$userData = _ref4.userData,
          userData = _ref4$userData === void 0 ? [] : _ref4$userData;
        var items = transformItems(userData, {
          results: results
        });
        return {
          items: items,
          widgetParams: widgetParams
        };
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          queryRules: this.getWidgetRenderState(renderOptions)
        });
      },
      dispose: function dispose(_ref5) {
        var helper = _ref5.helper,
          state = _ref5.state;
        unmount();
        if (hasTrackedFilters) {
          helper.removeListener('change', onHelperChange);
          return state.setQueryParameter('ruleContexts', initialRuleContexts);
        }
        return state;
      }
    };
  };
};
var _default = connectQueryRules;
exports.default = _default;