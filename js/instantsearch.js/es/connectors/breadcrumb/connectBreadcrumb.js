function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { checkRendering, warning, createDocumentationMessageGenerator, isEqual, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'breadcrumb',
  connector: true
});

var connectBreadcrumb = function connectBreadcrumb(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  var connectorState = {};
  return function (widgetParams) {
    var _ref = widgetParams || {},
        attributes = _ref.attributes,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? ' > ' : _ref$separator,
        _ref$rootPath = _ref.rootPath,
        rootPath = _ref$rootPath === void 0 ? null : _ref$rootPath,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage('The `attributes` option expects an array of strings.'));
    }

    var _attributes = _slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];

    function getRefinedState(state, facetValue) {
      if (!facetValue) {
        var breadcrumb = state.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);

        if (breadcrumb.length > 0) {
          return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, breadcrumb[0]);
        }
      }

      return state.resetPage().toggleFacetRefinement(hierarchicalFacetName, facetValue);
    }

    return {
      $$type: 'ais.breadcrumb',
      init: function init(initOptions) {
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: initOptions.instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: renderOptions.instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          breadcrumb: _objectSpread(_objectSpread({}, renderState.breadcrumb), {}, _defineProperty({}, hierarchicalFacetName, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var helper = _ref2.helper,
            createURL = _ref2.createURL,
            results = _ref2.results,
            state = _ref2.state;

        function getItems() {
          if (!results) {
            return [];
          }

          var _state$hierarchicalFa = _slicedToArray(state.hierarchicalFacets, 1),
              facetName = _state$hierarchicalFa[0].name;

          var facetValues = results.getFacetValues(facetName, {});
          var data = Array.isArray(facetValues.data) ? facetValues.data : [];
          var items = transformItems(shiftItemsValues(prepareItems(data)));
          return items;
        }

        var items = getItems();

        if (!connectorState.createURL) {
          connectorState.createURL = function (facetValue) {
            return createURL(getRefinedState(helper.state, facetValue));
          };
        }

        if (!connectorState.refine) {
          connectorState.refine = function (facetValue) {
            helper.setState(getRefinedState(helper.state, facetValue)).search();
          };
        }

        return {
          canRefine: items.length > 0,
          createURL: connectorState.createURL,
          items: items,
          refine: connectorState.refine,
          widgetParams: widgetParams
        };
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters) {
        if (searchParameters.isHierarchicalFacet(hierarchicalFacetName)) {
          var facet = searchParameters.getHierarchicalFacetByName(hierarchicalFacetName);
          process.env.NODE_ENV === 'development' ? warning(isEqual(facet.attributes, attributes) && facet.separator === separator && facet.rootPath === rootPath, 'Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.') : void 0;
          return searchParameters;
        }

        return searchParameters.addHierarchicalFacet({
          name: hierarchicalFacetName,
          attributes: attributes,
          separator: separator,
          rootPath: rootPath
        });
      }
    };
  };
};

function prepareItems(data) {
  return data.reduce(function (result, currentItem) {
    if (currentItem.isRefined) {
      result.push({
        label: currentItem.name,
        value: currentItem.path
      });

      if (Array.isArray(currentItem.data)) {
        result = result.concat(prepareItems(currentItem.data));
      }
    }

    return result;
  }, []);
}

function shiftItemsValues(array) {
  return array.map(function (x, idx) {
    return {
      label: x.label,
      value: idx + 1 === array.length ? null : array[idx + 1].value
    };
  });
}

export default connectBreadcrumb;