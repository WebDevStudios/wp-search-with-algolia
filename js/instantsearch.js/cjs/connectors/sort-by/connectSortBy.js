"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../../lib/utils/index.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _index.createDocumentationMessageGenerator)({
  name: 'sort-by',
  connector: true
});
/**
 * The **SortBy** connector provides the logic to build a custom widget that will display a
 * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
 * a user to change how the hits are being sorted.
 */

var connectSortBy = function connectSortBy(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _index.noop;
  (0, _index.checkRendering)(renderFn, withUsage());
  var connectorState = {};
  return function (widgetParams) {
    var _ref = widgetParams || {},
        items = _ref.items,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (x) {
      return x;
    } : _ref$transformItems;

    if (!Array.isArray(items)) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }

    return {
      $$type: 'ais.sortBy',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        var widgetRenderState = this.getWidgetRenderState(initOptions);
        var currentIndex = widgetRenderState.currentRefinement;
        var isCurrentIndexInItems = (0, _index.find)(items, function (item) {
          return item.value === currentIndex;
        });
        process.env.NODE_ENV === 'development' ? (0, _index.warning)(isCurrentIndexInItems !== undefined, "The index named \"".concat(currentIndex, "\" is not listed in the `items` of `sortBy`.")) : void 0;
        renderFn(_objectSpread(_objectSpread({}, widgetRenderState), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return connectorState.initialIndex ? state.setIndex(connectorState.initialIndex) : state;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          sortBy: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref3) {
        var results = _ref3.results,
            helper = _ref3.helper,
            state = _ref3.state,
            parent = _ref3.parent;

        if (!connectorState.initialIndex && parent) {
          connectorState.initialIndex = parent.getIndexName();
        }

        if (!connectorState.setIndex) {
          connectorState.setIndex = function (indexName) {
            helper.setIndex(indexName).search();
          };
        }

        return {
          currentRefinement: state.index,
          options: transformItems(items, {
            results: results
          }),
          refine: connectorState.setIndex,
          hasNoResults: results ? results.nbHits === 0 : true,
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var currentIndex = searchParameters.index;
        return _objectSpread(_objectSpread({}, uiState), {}, {
          sortBy: currentIndex !== connectorState.initialIndex ? currentIndex : undefined
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        return searchParameters.setQueryParameter('index', uiState.sortBy || connectorState.initialIndex || searchParameters.index);
      }
    };
  };
};

var _default = connectSortBy;
exports.default = _default;