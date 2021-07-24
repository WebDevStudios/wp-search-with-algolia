"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../lib/utils");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'menu',
  connector: true
});
var DEFAULT_SORT = ['isRefined', 'name:asc'];

/**
 * **Menu** connector provides the logic to build a widget that will give the user the ability to choose a single value for a specific facet. The typical usage of menu is for navigation in categories.
 *
 * This connector provides a `toggleShowMore()` function to display more or less items and a `refine()`
 * function to select an item. While selecting a new element, the `refine` will also unselect the
 * one that is currently selected.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
 */
var connectMenu = function connectMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        attribute = _ref.attribute,
        _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? 10 : _ref$limit,
        _ref$showMore = _ref.showMore,
        showMore = _ref$showMore === void 0 ? false : _ref$showMore,
        _ref$showMoreLimit = _ref.showMoreLimit,
        showMoreLimit = _ref$showMoreLimit === void 0 ? 20 : _ref$showMoreLimit,
        _ref$sortBy = _ref.sortBy,
        sortBy = _ref$sortBy === void 0 ? DEFAULT_SORT : _ref$sortBy,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    if (showMore === true && showMoreLimit <= limit) {
      throw new Error(withUsage('The `showMoreLimit` option must be greater than `limit`.'));
    }

    var sendEvent;

    var _createURL;

    var _refine; // Provide the same function to the `renderFn` so that way the user
    // has to only bind it once when `isFirstRendering` for instance


    var isShowingMore = false;

    var toggleShowMore = function toggleShowMore() {};

    function createToggleShowMore(renderOptions, widget) {
      return function () {
        isShowingMore = !isShowingMore;
        widget.render(renderOptions);
      };
    }

    function cachedToggleShowMore() {
      toggleShowMore();
    }

    function getLimit() {
      return isShowingMore ? showMoreLimit : limit;
    }

    return {
      $$type: 'ais.menu',
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
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.removeHierarchicalFacet(attribute).setQueryParameter('maxValuesPerFacet', undefined);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          menu: _objectSpread(_objectSpread({}, renderState.menu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var results = renderOptions.results,
            createURL = renderOptions.createURL,
            instantSearchInstance = renderOptions.instantSearchInstance,
            helper = renderOptions.helper;
        var items = [];
        var canToggleShowMore = false;

        if (!sendEvent) {
          sendEvent = (0, _utils.createSendEventForFacet)({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: attribute,
            widgetType: this.$$type
          });
        }

        if (!_createURL) {
          _createURL = function _createURL(facetValue) {
            return createURL(helper.state.resetPage().toggleFacetRefinement(attribute, facetValue));
          };
        }

        if (!_refine) {
          _refine = function _refine(facetValue) {
            var _helper$getHierarchic = helper.getHierarchicalFacetBreadcrumb(attribute),
                _helper$getHierarchic2 = _slicedToArray(_helper$getHierarchic, 1),
                refinedItem = _helper$getHierarchic2[0];

            sendEvent('click', facetValue ? facetValue : refinedItem);
            helper.toggleFacetRefinement(attribute, facetValue ? facetValue : refinedItem).search();
          };
        }

        if (renderOptions.results) {
          toggleShowMore = createToggleShowMore(renderOptions, this);
        }

        if (results) {
          var facetValues = results.getFacetValues(attribute, {
            sortBy: sortBy,
            facetOrdering: sortBy === DEFAULT_SORT
          });
          var facetItems = facetValues && !Array.isArray(facetValues) && facetValues.data ? facetValues.data : [];
          canToggleShowMore = showMore && (isShowingMore || facetItems.length > getLimit());
          items = transformItems(facetItems.slice(0, getLimit()).map(function (_ref3) {
            var label = _ref3.name,
                value = _ref3.path,
                item = _objectWithoutProperties(_ref3, ["name", "path"]);

            return _objectSpread(_objectSpread({}, item), {}, {
              label: label,
              value: value
            });
          }));
        }

        return {
          items: items,
          createURL: _createURL,
          refine: _refine,
          sendEvent: sendEvent,
          canRefine: items.length > 0,
          widgetParams: widgetParams,
          isShowingMore: isShowingMore,
          toggleShowMore: cachedToggleShowMore,
          canToggleShowMore: canToggleShowMore
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;

        var _searchParameters$get = searchParameters.getHierarchicalFacetBreadcrumb(attribute),
            _searchParameters$get2 = _slicedToArray(_searchParameters$get, 1),
            value = _searchParameters$get2[0];

        if (!value) {
          return uiState;
        }

        return _objectSpread(_objectSpread({}, uiState), {}, {
          menu: _objectSpread(_objectSpread({}, uiState.menu), {}, _defineProperty({}, attribute, value))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var value = uiState.menu && uiState.menu[attribute];
        var withFacetConfiguration = searchParameters.removeHierarchicalFacet(attribute).addHierarchicalFacet({
          name: attribute,
          attributes: [attribute]
        });
        var currentMaxValuesPerFacet = withFacetConfiguration.maxValuesPerFacet || 0;
        var nextMaxValuesPerFacet = Math.max(currentMaxValuesPerFacet, showMore ? showMoreLimit : limit);
        var withMaxValuesPerFacet = withFacetConfiguration.setQueryParameter('maxValuesPerFacet', nextMaxValuesPerFacet);

        if (!value) {
          return withMaxValuesPerFacet.setQueryParameters({
            hierarchicalFacetsRefinements: _objectSpread(_objectSpread({}, withMaxValuesPerFacet.hierarchicalFacetsRefinements), {}, _defineProperty({}, attribute, []))
          });
        }

        return withMaxValuesPerFacet.addHierarchicalFacetRefinement(attribute, value);
      }
    };
  };
};

var _default = connectMenu;
exports.default = _default;