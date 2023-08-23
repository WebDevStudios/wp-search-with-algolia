function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import { checkRendering, createDocumentationMessageGenerator, getWidgetAttribute, noop, warning } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'dynamic-widgets',
  connector: true
});
var MAX_WILDCARD_FACETS = 20;
var connectDynamicWidgets = function connectDynamicWidgets(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var widgets = widgetParams.widgets,
      _widgetParams$maxValu = widgetParams.maxValuesPerFacet,
      maxValuesPerFacet = _widgetParams$maxValu === void 0 ? 20 : _widgetParams$maxValu,
      _widgetParams$facets = widgetParams.facets,
      facets = _widgetParams$facets === void 0 ? ['*'] : _widgetParams$facets,
      _widgetParams$transfo = widgetParams.transformItems,
      transformItems = _widgetParams$transfo === void 0 ? function (items) {
        return items;
      } : _widgetParams$transfo,
      fallbackWidget = widgetParams.fallbackWidget;
    if (!(widgets && Array.isArray(widgets) && widgets.every(function (widget) {
      return _typeof(widget) === 'object';
    }))) {
      throw new Error(withUsage('The `widgets` option expects an array of widgets.'));
    }
    if (!(Array.isArray(facets) && facets.length <= 1 && (facets[0] === '*' || facets[0] === undefined))) {
      throw new Error(withUsage("The `facets` option only accepts [] or [\"*\"], you passed ".concat(JSON.stringify(facets))));
    }
    var localWidgets = new Map();
    return {
      $$type: 'ais.dynamicWidgets',
      init: function init(initOptions) {
        widgets.forEach(function (widget) {
          var attribute = getWidgetAttribute(widget, initOptions);
          localWidgets.set(attribute, {
            widget: widget,
            isMounted: false
          });
        });
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var parent = renderOptions.parent;
        var renderState = this.getWidgetRenderState(renderOptions);
        var widgetsToUnmount = [];
        var widgetsToMount = [];
        if (fallbackWidget) {
          renderState.attributesToRender.forEach(function (attribute) {
            if (!localWidgets.has(attribute)) {
              var widget = fallbackWidget({
                attribute: attribute
              });
              localWidgets.set(attribute, {
                widget: widget,
                isMounted: false
              });
            }
          });
        }
        localWidgets.forEach(function (_ref, attribute) {
          var widget = _ref.widget,
            isMounted = _ref.isMounted;
          var shouldMount = renderState.attributesToRender.indexOf(attribute) > -1;
          if (!isMounted && shouldMount) {
            widgetsToMount.push(widget);
            localWidgets.set(attribute, {
              widget: widget,
              isMounted: true
            });
          } else if (isMounted && !shouldMount) {
            widgetsToUnmount.push(widget);
            localWidgets.set(attribute, {
              widget: widget,
              isMounted: false
            });
          }
        });
        parent.addWidgets(widgetsToMount);
        // make sure this only happens after the regular render, otherwise it
        // happens too quick, since render is "deferred" for the next microtask,
        // so this needs to be a whole task later
        setTimeout(function () {
          return parent.removeWidgets(widgetsToUnmount);
        }, 0);
        renderFn(_objectSpread(_objectSpread({}, renderState), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var parent = _ref2.parent;
        var toRemove = [];
        localWidgets.forEach(function (_ref3) {
          var widget = _ref3.widget,
            isMounted = _ref3.isMounted;
          if (isMounted) {
            toRemove.push(widget);
          }
        });
        parent.removeWidgets(toRemove);
        unmountFn();
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        // broadening the scope of facets to avoid conflict between never and *
        return facets.reduce(function (acc, curr) {
          return acc.addFacet(curr);
        }, state.setQueryParameters({
          maxValuesPerFacet: Math.max(maxValuesPerFacet || 0, state.maxValuesPerFacet || 0)
        }));
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          dynamicWidgets: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _results$renderingCon, _results$renderingCon2, _results$renderingCon3, _results$renderingCon4;
        var results = _ref4.results,
          state = _ref4.state;
        if (!results) {
          return {
            attributesToRender: [],
            widgetParams: widgetParams
          };
        }
        var attributesToRender = transformItems((_results$renderingCon = (_results$renderingCon2 = results.renderingContent) === null || _results$renderingCon2 === void 0 ? void 0 : (_results$renderingCon3 = _results$renderingCon2.facetOrdering) === null || _results$renderingCon3 === void 0 ? void 0 : (_results$renderingCon4 = _results$renderingCon3.facets) === null || _results$renderingCon4 === void 0 ? void 0 : _results$renderingCon4.order) !== null && _results$renderingCon !== void 0 ? _results$renderingCon : [], {
          results: results
        });
        if (!Array.isArray(attributesToRender)) {
          throw new Error(withUsage('The `transformItems` option expects a function that returns an Array.'));
        }
        process.env.NODE_ENV === 'development' ? warning(maxValuesPerFacet >= (state.maxValuesPerFacet || 0), "The maxValuesPerFacet set by dynamic widgets (".concat(maxValuesPerFacet, ") is smaller than one of the limits set by a widget (").concat(state.maxValuesPerFacet, "). This causes a mismatch in query parameters and thus an extra network request when that widget is mounted.")) : void 0;
        process.env.NODE_ENV === 'development' ? warning(attributesToRender.length <= MAX_WILDCARD_FACETS || widgetParams.facets !== undefined, "More than ".concat(MAX_WILDCARD_FACETS, " facets are requested to be displayed without explicitly setting which facets to retrieve. This could have a performance impact. Set \"facets\" to [] to do two smaller network requests, or explicitly to ['*'] to avoid this warning.")) : void 0;
        return {
          attributesToRender: attributesToRender,
          widgetParams: widgetParams
        };
      }
    };
  };
};
export default connectDynamicWidgets;