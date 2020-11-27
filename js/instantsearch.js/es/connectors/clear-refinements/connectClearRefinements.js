import { checkRendering, clearRefinements, getRefinements, createDocumentationMessageGenerator, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'clear-refinements',
  connector: true
});
/**
 * @typedef {Object} CustomClearRefinementsWidgetOptions
 * @property {string[]} [includedAttributes = []] The attributes to include in the refinements to clear (all by default). Cannot be used with `excludedAttributes`.
 * @property {string[]} [excludedAttributes = ['query']] The attributes to exclude from the refinements to clear. Cannot be used with `includedAttributes`.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} ClearRefinementsRenderingOptions
 * @property {function} refine Triggers the clear of all the currently refined values.
 * @property {boolean} hasRefinements Indicates if search state is refined.
 * @property {function} createURL Creates a url for the next state when refinements are cleared.
 * @property {Object} widgetParams All original `CustomClearRefinementsWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **ClearRefinements** connector provides the logic to build a custom widget that will give the user
 * the ability to reset the search state.
 *
 * This connector provides a `refine` function to remove the current refined facets.
 *
 * The behaviour of this function can be changed with widget options. If `clearsQuery`
 * is set to `true`, `refine` will also clear the query and `excludedAttributes` can
 * prevent certain attributes from being cleared.
 *
 * @type {Connector}
 * @param {function(ClearRefinementsRenderingOptions, boolean)} renderFn Rendering function for the custom **ClearRefinements** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomClearRefinementsWidgetOptions)} Re-usable widget factory for a custom **ClearRefinements** widget.
 * @example
 * // custom `renderFn` to render the custom ClearRefinements widget
 * function renderFn(ClearRefinementsRenderingOptions, isFirstRendering) {
 *   var containerNode = ClearRefinementsRenderingOptions.widgetParams.containerNode;
 *   if (isFirstRendering) {
 *     var markup = $('<button id="custom-clear-all">Clear All</button>');
 *     containerNode.append(markup);
 *
 *     markup.on('click', function(event) {
 *       event.preventDefault();
 *       ClearRefinementsRenderingOptions.refine();
 *     })
 *   }
 *
 *   var clearRefinementsCTA = containerNode.find('#custom-clear-all');
 *   clearRefinementsCTA.attr('disabled', !ClearRefinementsRenderingOptions.hasRefinements)
 * };
 *
 * // connect `renderFn` to ClearRefinements logic
 * var customClearRefinementsWidget = instantsearch.connectors.connectClearRefinements(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customClearRefinementsWidget({
 *     containerNode: $('#custom-clear-all-container'),
 *   })
 * );
 */

export default function connectClearRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }

    var _widgetParams$include = widgetParams.includedAttributes,
        includedAttributes = _widgetParams$include === void 0 ? [] : _widgetParams$include,
        _widgetParams$exclude = widgetParams.excludedAttributes,
        excludedAttributes = _widgetParams$exclude === void 0 ? ['query'] : _widgetParams$exclude,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;
    return {
      init: function init(_ref) {
        var helper = _ref.helper,
            instantSearchInstance = _ref.instantSearchInstance,
            createURL = _ref.createURL;
        var attributesToClear = getAttributesToClear({
          helper: helper,
          includedAttributes: includedAttributes,
          excludedAttributes: excludedAttributes,
          transformItems: transformItems
        });
        var hasRefinements = attributesToClear.length > 0;

        this._refine = function () {
          helper.setState(clearRefinements({
            helper: helper,
            attributesToClear: getAttributesToClear({
              helper: helper,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes,
              transformItems: transformItems
            })
          })).search();
        };

        this._createURL = function () {
          return createURL(clearRefinements({
            helper: helper,
            attributesToClear: getAttributesToClear({
              helper: helper,
              includedAttributes: includedAttributes,
              excludedAttributes: excludedAttributes,
              transformItems: transformItems
            })
          }));
        };

        renderFn({
          hasRefinements: hasRefinements,
          refine: this._refine,
          createURL: this._createURL,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref2) {
        var helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance;
        var attributesToClear = getAttributesToClear({
          helper: helper,
          includedAttributes: includedAttributes,
          excludedAttributes: excludedAttributes,
          transformItems: transformItems
        });
        var hasRefinements = attributesToClear.length > 0;
        renderFn({
          hasRefinements: hasRefinements,
          refine: this._refine,
          createURL: this._createURL,
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

function getAttributesToClear(_ref3) {
  var helper = _ref3.helper,
      includedAttributes = _ref3.includedAttributes,
      excludedAttributes = _ref3.excludedAttributes,
      transformItems = _ref3.transformItems;
  var clearsQuery = includedAttributes.indexOf('query') !== -1 || excludedAttributes.indexOf('query') === -1;
  return transformItems(getRefinements(helper.lastResults || {}, helper.state, clearsQuery).map(function (refinement) {
    return refinement.attributeName;
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
  }));
}