function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { escapeHits, TAG_PLACEHOLDER, checkRendering, createDocumentationMessageGenerator, createSendEventForHits, noop, warning } from "../../lib/utils/index.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'autocomplete',
  connector: true
});
var connectAutocomplete = function connectAutocomplete(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
      _ref$escapeHTML = _ref.escapeHTML,
      escapeHTML = _ref$escapeHTML === void 0 ? true : _ref$escapeHTML;
    process.env.NODE_ENV === 'development' ? warning(!widgetParams.indices, "\nThe option `indices` has been removed from the Autocomplete connector.\n\nThe indices to target are now inferred from the widgets tree.\n".concat(Array.isArray(widgetParams.indices) ? "\nAn alternative would be:\n\nconst autocomplete = connectAutocomplete(renderer);\n\nsearch.addWidgets([\n  ".concat(widgetParams.indices.map(function (_ref2) {
      var value = _ref2.value;
      return "index({ indexName: '".concat(value, "' }),");
    }).join('\n  '), "\n  autocomplete()\n]);\n") : '', "\n      ")) : void 0;
    var connectorState = {};
    return {
      $$type: 'ais.autocomplete',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        var renderState = this.getWidgetRenderState(renderOptions);
        renderState.indices.forEach(function (_ref3) {
          var sendEvent = _ref3.sendEvent,
            hits = _ref3.hits;
          sendEvent('view:internal', hits);
        });
        renderFn(_objectSpread(_objectSpread({}, renderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          autocomplete: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref4) {
        var _this = this;
        var helper = _ref4.helper,
          state = _ref4.state,
          scopedResults = _ref4.scopedResults,
          instantSearchInstance = _ref4.instantSearchInstance;
        if (!connectorState.refine) {
          connectorState.refine = function (query) {
            helper.setQuery(query).search();
          };
        }
        var indices = scopedResults.map(function (scopedResult) {
          var _scopedResult$results, _scopedResult$results2;
          // We need to escape the hits because highlighting
          // exposes HTML tags to the end-user.
          if (scopedResult.results) {
            scopedResult.results.hits = escapeHTML ? escapeHits(scopedResult.results.hits) : scopedResult.results.hits;
          }
          var sendEvent = createSendEventForHits({
            instantSearchInstance: instantSearchInstance,
            helper: scopedResult.helper,
            widgetType: _this.$$type
          });
          return {
            indexId: scopedResult.indexId,
            indexName: ((_scopedResult$results = scopedResult.results) === null || _scopedResult$results === void 0 ? void 0 : _scopedResult$results.index) || '',
            hits: ((_scopedResult$results2 = scopedResult.results) === null || _scopedResult$results2 === void 0 ? void 0 : _scopedResult$results2.hits) || [],
            results: scopedResult.results || {},
            sendEvent: sendEvent
          };
        });
        return {
          currentRefinement: state.query || '',
          indices: indices,
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var query = searchParameters.query || '';
        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }
        return _objectSpread(_objectSpread({}, uiState), {}, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var parameters = {
          query: uiState.query || ''
        };
        if (!escapeHTML) {
          return searchParameters.setQueryParameters(parameters);
        }
        return searchParameters.setQueryParameters(_objectSpread(_objectSpread({}, parameters), TAG_PLACEHOLDER));
      },
      dispose: function dispose(_ref7) {
        var state = _ref7.state;
        unmountFn();
        var stateWithoutQuery = state.setQueryParameter('query', undefined);
        if (!escapeHTML) {
          return stateWithoutQuery;
        }
        return stateWithoutQuery.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
          return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, undefined));
        }, {}));
      }
    };
  };
};
export default connectAutocomplete;