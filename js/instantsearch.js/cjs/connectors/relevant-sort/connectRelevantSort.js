"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connectRelevantSort = function connectRelevantSort() {
  var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _utils.noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  return function (widgetParams) {
    var connectorState = {};
    return {
      $$type: 'ais.relevantSort',
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
      dispose: function dispose(_ref) {
        var state = _ref.state;
        unmountFn();
        return state.setQueryParameter('relevancyStrictness', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          relevantSort: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var results = _ref2.results,
            helper = _ref2.helper;

        if (!connectorState.refine) {
          connectorState.refine = function (relevancyStrictness) {
            helper.setQueryParameter('relevancyStrictness', relevancyStrictness).search();
          };
        }

        var _ref3 = results || {},
            appliedRelevancyStrictness = _ref3.appliedRelevancyStrictness;

        var isVirtualReplica = appliedRelevancyStrictness !== undefined;
        return {
          isRelevantSorted: typeof appliedRelevancyStrictness !== 'undefined' && appliedRelevancyStrictness > 0,
          isVirtualReplica: isVirtualReplica,
          canRefine: isVirtualReplica,
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state, _ref4) {
        var _uiState$relevantSort;

        var uiState = _ref4.uiState;
        return state.setQueryParameter('relevancyStrictness', (_uiState$relevantSort = uiState.relevantSort) !== null && _uiState$relevantSort !== void 0 ? _uiState$relevantSort : state.relevancyStrictness);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        return _objectSpread(_objectSpread({}, uiState), {}, {
          relevantSort: searchParameters.relevancyStrictness || uiState.relevantSort
        });
      }
    };
  };
};

var _default = connectRelevantSort;
exports.default = _default;