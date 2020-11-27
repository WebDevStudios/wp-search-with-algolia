function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { checkRendering, warning, createDocumentationMessageGenerator, isEqual, find, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'breadcrumb',
  connector: true
});
/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label Label of the category or subcategory.
 * @property {string} value Value of breadcrumb item.
 */

/**
 * @typedef {Object} CustomBreadcrumbWidgetOptions
 * @property {string[]} attributes Attributes to use to generate the hierarchy of the breadcrumb.
 * @property {string} [rootPath = null] Prefix path to use if the first level is not the root level.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 *
 * You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax).
 */

/**
 * @typedef {Object} BreadcrumbRenderingOptions
 * @property {function(item.value): string} createURL Creates an url for the next state for a clicked item. The special value `null` is used for the `Home` (or root) item of the breadcrumb and will return an empty array.
 * @property {BreadcrumbItem[]} items Values to be rendered.
 * @property {function(item.value)} refine Sets the path of the hierarchical filter and triggers a new search.
 * @property {Object} widgetParams All original `CustomBreadcrumbWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **Breadcrumb** connector provides the logic to build a custom widget
 * that will give the user the ability to see the current path in a hierarchical facet.
 *
 * This is commonly used in websites that have a large amount of content organized in a hierarchical manner (usually e-commerce websites).
 * @type {Connector}
 * @param {function(BreadcrumbRenderingOptions, boolean)} renderFn Rendering function for the custom **Breadcrumb* widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomBreadcrumbWidgetOptions)} Re-usable widget factory for a custom **Breadcrumb** widget.
 */

export default function connectBreadcrumb(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attributes = widgetParams.attributes,
        _widgetParams$separat = widgetParams.separator,
        separator = _widgetParams$separat === void 0 ? ' > ' : _widgetParams$separat,
        _widgetParams$rootPat = widgetParams.rootPath,
        rootPath = _widgetParams$rootPat === void 0 ? null : _widgetParams$rootPat,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;

    if (!attributes || !Array.isArray(attributes) || attributes.length === 0) {
      throw new Error(withUsage('The `attributes` option expects an array of strings.'));
    }

    var _attributes = _slicedToArray(attributes, 1),
        hierarchicalFacetName = _attributes[0];

    return {
      getConfiguration: function getConfiguration(currentConfiguration) {
        if (currentConfiguration.hierarchicalFacets) {
          var isFacetSet = find(currentConfiguration.hierarchicalFacets, function (_ref) {
            var name = _ref.name;
            return name === hierarchicalFacetName;
          });

          if (isFacetSet) {
            warning(isEqual(isFacetSet.attributes, attributes) && isFacetSet.separator === separator && isFacetSet.rootPath === rootPath, 'Using Breadcrumb and HierarchicalMenu on the same facet with different options overrides the configuration of the HierarchicalMenu.');
            return {};
          }
        }

        return {
          hierarchicalFacets: [{
            attributes: attributes,
            name: hierarchicalFacetName,
            separator: separator,
            rootPath: rootPath
          }]
        };
      },
      init: function init(_ref2) {
        var createURL = _ref2.createURL,
            helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance;

        this._createURL = function (facetValue) {
          if (!facetValue) {
            var breadcrumb = helper.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);

            if (breadcrumb.length > 0) {
              return createURL(helper.state.toggleRefinement(hierarchicalFacetName, breadcrumb[0]));
            }
          }

          return createURL(helper.state.toggleRefinement(hierarchicalFacetName, facetValue));
        };

        this._refine = function (facetValue) {
          if (!facetValue) {
            var breadcrumb = helper.getHierarchicalFacetBreadcrumb(hierarchicalFacetName);

            if (breadcrumb.length > 0) {
              helper.toggleRefinement(hierarchicalFacetName, breadcrumb[0]).search();
            }
          } else {
            helper.toggleRefinement(hierarchicalFacetName, facetValue).search();
          }
        };

        renderFn({
          createURL: this._createURL,
          canRefine: false,
          instantSearchInstance: instantSearchInstance,
          items: [],
          refine: this._refine,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref3) {
        var instantSearchInstance = _ref3.instantSearchInstance,
            results = _ref3.results,
            state = _ref3.state;

        var _state$hierarchicalFa = _slicedToArray(state.hierarchicalFacets, 1),
            facetName = _state$hierarchicalFa[0].name;

        var facetValues = results.getFacetValues(facetName);
        var data = Array.isArray(facetValues.data) ? facetValues.data : [];
        var items = transformItems(shiftItemsValues(prepareItems(data)));
        renderFn({
          canRefine: items.length > 0,
          createURL: this._createURL,
          instantSearchInstance: instantSearchInstance,
          items: items,
          refine: this._refine,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      }
    };
  };
}

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