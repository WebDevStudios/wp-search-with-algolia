function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { getRefinements, checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'current-refinements',
  connector: true
});
/**
 * @typedef {Object} Refinement
 * @property {"facet"|"exclude"|"disjunctive"|"hierarchical"|"numeric"|"query"} type The type of the refinement
 * @property {string} attribute The attribute on which the refinement is applied
 * @property {string} label The label of the refinement to display
 * @property {string} value The raw value of the refinement
 * @property {string} [operator] The value of the operator, only if applicable
 * @property {boolean} [exhaustive] Whether the count is exhaustive, only if applicable
 * @property {number} [count] number of items found, if applicable
 */

/**
 * @typedef {Object} RefinementItem
 * @property {string} attribute The attribute on which the refinement is applied
 * @property {function} refine The function to remove the refinement
 * @property {Refinement[]} refinements The current refinements
 */

/**
 * @typedef {Object} CurrentRefinementsRenderingOptions
 * @property {function(item)} refine Clears a single refinement
 * @property {function(item): string} createURL Creates an individual URL where a single refinement is cleared
 * @property {RefinementItem[]} items All the refinement items
 * @property {Object} widgetParams All original `CustomCurrentRefinementsWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * @typedef {Object} CustomCurrentRefinementsWidgetOptions
 * @property {string[]} [includedAttributes] The attributes to include in the refinements (all by default). Cannot be used with `excludedAttributes`.
 * @property {string[]} [excludedAttributes = ["query"]] The attributes to exclude from the refinements. Cannot be used with `includedAttributes`.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * **CurrentRefinements** connector provides the logic to build a widget that will give
 * the user the ability to see all the currently applied filters and, remove some or all of
 * them.
 *
 * This provides a `refine(item)` function to remove a selected refinement.
 * Those functions can see their behaviour change based on the widget options used.
 * @type {Connector}
 * @param {function(CurrentRefinementsRenderingOptions)} renderFn Rendering function for the custom **CurrentRefinements** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomCurrentRefinementsWidgetOptions)} Re-usable widget factory for a custom **CurrentRefinements** widget.
 * @example
 * // custom `renderFn` to render the custom ClearRefinements widget
 * function renderFn(currentRefinementsRenderingOptions, isFirstRendering) {
 *   var containerNode = currentRefinementsRenderingOptions.widgetParams.containerNode;
 *   if (isFirstRendering) {
 *     containerNode
 *       .html('<ul id="refinements"></ul><div id="cta-container"></div>');
 *   }
 *
 *   containerNode
 *     .find('#cta-container > a')
 *     .off('click');
 *
 *   containerNode
 *     .find('li > a')
 *     .each(function() { $(this).off('click') });
 *
 *   if (currentRefinementsRenderingOptions.items
 *       && currentRefinementsRenderingOptions.items.length > 0) {
 *     var list = currentRefinementsRenderingOptions.items.map(function(item) {
 *       return '<li>' + item.attribute +
 *          '<ul>' +
 *            item.refinements.map(function (refinement) {
 *              return <a href="' + currentRefinementsRenderingOptions.createURL(refinement) + '" data-attribute="' + item.attribute + '">'
 *                + refinement.label + '</a>'
 *              }).join('') +
 *            '</ul>'
 *        '</li>';
 *     });
 *
 *     currentRefinementsRenderingOptions.find('ul').html(list);
 *   } else {
 *     containerNode.find('#cta-container').html('');
 *     containerNode.find('ul').html('');
 *   }
 * }
 *
 * // connect `renderFn` to CurrentRefinements logic
 * var customCurrentRefinements = instantsearch.connectors.connectCurrentRefinements(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customCurrentRefinements({
 *     containerNode: $('#custom-crv-container'),
 *   })
 * );
 */

export default function connectCurrentRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }

    var includedAttributes = widgetParams.includedAttributes,
        _widgetParams$exclude = widgetParams.excludedAttributes,
        excludedAttributes = _widgetParams$exclude === void 0 ? ['query'] : _widgetParams$exclude,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;
    return {
      init: function init(_ref) {
        var helper = _ref.helper,
            _createURL = _ref.createURL,
            instantSearchInstance = _ref.instantSearchInstance;
        var items = transformItems(getFilteredRefinements({
          results: {},
          state: helper.state,
          helper: helper,
          includedAttributes: includedAttributes,
          excludedAttributes: excludedAttributes
        }));
        renderFn({
          items: items,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL(clearRefinementFromState(helper.state, refinement));
          },
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref2) {
        var results = _ref2.results,
            helper = _ref2.helper,
            state = _ref2.state,
            _createURL2 = _ref2.createURL,
            instantSearchInstance = _ref2.instantSearchInstance;
        var items = transformItems(getFilteredRefinements({
          results: results,
          state: state,
          helper: helper,
          includedAttributes: includedAttributes,
          excludedAttributes: excludedAttributes
        }));
        renderFn({
          items: items,
          refine: function refine(refinement) {
            return clearRefinement(helper, refinement);
          },
          createURL: function createURL(refinement) {
            return _createURL2(clearRefinementFromState(helper.state, refinement));
          },
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      }
    };
  };
}

function getFilteredRefinements(_ref3) {
  var results = _ref3.results,
      state = _ref3.state,
      helper = _ref3.helper,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes;
  var clearsQuery = (includedAttributes || []).indexOf('query') !== -1 || (excludedAttributes || []).indexOf('query') === -1;
  var filterFunction = includedAttributes ? function (item) {
    return includedAttributes.indexOf(item.attributeName) !== -1;
  } : function (item) {
    return excludedAttributes.indexOf(item.attributeName) === -1;
  };
  var items = getRefinements(results, state, clearsQuery).filter(filterFunction).map(normalizeRefinement);
  return groupItemsByRefinements(items, helper);
}

function clearRefinementFromState(state, refinement) {
  switch (refinement.type) {
    case 'facet':
      return state.removeFacetRefinement(refinement.attribute, refinement.value);

    case 'disjunctive':
      return state.removeDisjunctiveFacetRefinement(refinement.attribute, refinement.value);

    case 'hierarchical':
      return state.removeHierarchicalFacetRefinement(refinement.attribute);

    case 'exclude':
      return state.removeExcludeRefinement(refinement.attribute, refinement.value);

    case 'numeric':
      return state.removeNumericRefinement(refinement.attribute, refinement.operator, refinement.value);

    case 'tag':
      return state.removeTagRefinement(refinement.value);

    case 'query':
      return state.setQueryParameter('query', '');

    default:
      throw new Error("clearRefinement: type ".concat(refinement.type, " is not handled"));
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
  var value = refinement.type === 'numeric' ? Number(refinement.name) : refinement.name;
  var label = refinement.operator ? "".concat(getOperatorSymbol(refinement.operator), " ").concat(refinement.name) : refinement.name;
  var normalizedRefinement = {
    attribute: refinement.attributeName,
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

function groupItemsByRefinements(items, helper) {
  return items.reduce(function (results, currentItem) {
    return [].concat(_toConsumableArray(results.filter(function (result) {
      return result.attribute !== currentItem.attribute;
    })), [{
      attribute: currentItem.attribute,
      label: currentItem.attribute,
      refinements: items.filter(function (result) {
        return result.attribute === currentItem.attribute;
      }) // We want to keep the order of refinements except the numeric ones.
      .sort(function (a, b) {
        return a.type === 'numeric' ? a.value - b.value : 0;
      }),
      refine: function refine(refinement) {
        return clearRefinement(helper, refinement);
      }
    }]);
  }, []);
}