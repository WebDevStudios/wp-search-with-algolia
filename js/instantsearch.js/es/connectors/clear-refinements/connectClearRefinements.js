function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, clearRefinements, getRefinements, createDocumentationMessageGenerator, noop, uniq, mergeSearchParameters } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'clear-refinements',
  connector: true
});

var connectClearRefinements = function connectClearRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref = widgetParams || {},
        _ref$includedAttribut = _ref.includedAttributes,
        includedAttributes = _ref$includedAttribut === void 0 ? [] : _ref$includedAttribut,
        _ref$excludedAttribut = _ref.excludedAttributes,
        excludedAttributes = _ref$excludedAttribut === void 0 ? ['query'] : _ref$excludedAttribut,
        _ref$transformItems = _ref.transformItems,
        transformItems = _ref$transformItems === void 0 ? function (items) {
      return items;
    } : _ref$transformItems;

    if (widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }

    var connectorState = {
      refine: noop,
      createURL: function createURL() {
        return '';
      },
      attributesToClear: []
    };

    var cachedRefine = function cachedRefine() {
      return connectorState.refine();
    };

    var cachedCreateURL = function cachedCreateURL() {
      return connectorState.createURL();
    };

    return {
      $$type: 'ais.clearRefinements',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread({}, this.getWidgetRenderState(initOptions), {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread({}, this.getWidgetRenderState(renderOptions), {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      dispose: function dispose() {
        unmountFn();
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          clearRefinements: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref2) {
        var createURL = _ref2.createURL,
            scopedResults = _ref2.scopedResults;
        connectorState.attributesToClear = scopedResults.reduce(function (results, scopedResult) {
          return results.concat(getAttributesToClear({
            scopedResult: scopedResult,
            includedAttributes: includedAttributes,
            excludedAttributes: excludedAttributes,
            transformItems: transformItems
          }));
        }, []);

        connectorState.refine = function () {
          connectorState.attributesToClear.forEach(function (_ref3) {
            var indexHelper = _ref3.helper,
                items = _ref3.items;
            indexHelper.setState(clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };

        connectorState.createURL = function () {
          return createURL(mergeSearchParameters.apply(void 0, _toConsumableArray(connectorState.attributesToClear.map(function (_ref4) {
            var indexHelper = _ref4.helper,
                items = _ref4.items;
            return clearRefinements({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };

        return {
          hasRefinements: connectorState.attributesToClear.some(function (attributeToClear) {
            return attributeToClear.items.length > 0;
          }),
          refine: cachedRefine,
          createURL: cachedCreateURL,
          widgetParams: widgetParams
        };
      }
    };
  };
};

function getAttributesToClear(_ref5) {
  var scopedResult = _ref5.scopedResult,
      includedAttributes = _ref5.includedAttributes,
      excludedAttributes = _ref5.excludedAttributes,
      transformItems = _ref5.transformItems;
  var clearsQuery = includedAttributes.indexOf('query') !== -1 || excludedAttributes.indexOf('query') === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems(uniq(getRefinements(scopedResult.results, scopedResult.helper.state, clearsQuery).map(function (refinement) {
      return refinement.attribute;
    }).filter(function (attribute) {
      return (// If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 || // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function (attribute) {
      return (// If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === 'query' && clearsQuery || // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })))
  };
}

export default connectClearRefinements;