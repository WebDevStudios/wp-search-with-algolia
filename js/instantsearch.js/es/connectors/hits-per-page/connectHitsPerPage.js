function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { checkRendering, warning, createDocumentationMessageGenerator, find, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'hits-per-page',
  connector: true
});
/**
 * @typedef {Object} HitsPerPageRenderingOptionsItem
 * @property {number} value Number of hits to display per page.
 * @property {string} label Label to display in the option.
 * @property {boolean} isRefined Indicates if it's the current refined value.
 */

/**
 * @typedef {Object} HitsPerPageWidgetOptionsItem
 * @property {number} value Number of hits to display per page.
 * @property {string} label Label to display in the option.
 * @property {boolean} default The default hits per page on first search.
 */

/**
 * @typedef {Object} HitsPerPageRenderingOptions
 * @property {HitsPerPageRenderingOptionsItem[]} items Array of objects defining the different values and labels.
 * @property {function(item.value)} createURL Creates the URL for a single item name in the list.
 * @property {function(number)} refine Sets the number of hits per page and trigger a search.
 * @property {boolean} hasNoResults `true` if the last search contains no result.
 * @property {Object} widgetParams Original `HitsPerPageWidgetOptions` forwarded to `renderFn`.
 */

/**
 * @typedef {Object} HitsPerPageWidgetOptions
 * @property {HitsPerPageWidgetOptionsItem[]} items Array of objects defining the different values and labels.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * **HitsPerPage** connector provides the logic to create custom widget that will
 * allow a user to choose to display more or less results from Algolia.
 *
 * This connector provides a `refine()` function to change the hits per page configuration and trigger a new search.
 * @type {Connector}
 * @param {function(HitsPerPageRenderingOptions, boolean)} renderFn Rendering function for the custom **HitsPerPage** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(HitsPerPageWidgetOptions)} Re-usable widget factory for a custom **HitsPerPage** widget.
 * @example
 * // custom `renderFn` to render the custom HitsPerPage widget
 * function renderFn(HitsPerPageRenderingOptions, isFirstRendering) {
 *   var containerNode = HitsPerPageRenderingOptions.widgetParams.containerNode
 *   var items = HitsPerPageRenderingOptions.items
 *   var refine = HitsPerPageRenderingOptions.refine
 *
 *   if (isFirstRendering) {
 *     var markup = '<select></select>';
 *     containerNode.append(markup);
 *   }
 *
 *   const itemsHTML = items.map(({value, label, isRefined}) => `
 *     <option
 *       value="${value}"
 *       ${isRefined ? 'selected' : ''}
 *     >
 *       ${label}
 *     </option>
 *   `);
 *
 *   containerNode
 *     .find('select')
 *     .html(itemsHTML);
 *
 *   containerNode
 *     .find('select')
 *     .off('change')
 *     .on('change', e => { refine(e.target.value); });
 * }
 *
 * // connect `renderFn` to HitsPerPage logic
 * var customHitsPerPage = instantsearch.connectors.connectHitsPerPage(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customHitsPerPage({
 *     containerNode: $('#custom-hits-per-page-container'),
 *     items: [
 *       {value: 6, label: '6 per page', default: true},
 *       {value: 12, label: '12 per page'},
 *       {value: 24, label: '24 per page'},
 *     ],
 *   })
 * );
 */

export default function connectHitsPerPage(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var userItems = widgetParams.items,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;
    var items = userItems;

    if (!Array.isArray(items)) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }

    var defaultValues = items.filter(function (item) {
      return item.default;
    });

    if (defaultValues.length > 1) {
      throw new Error(withUsage('More than one default value is specified in `items`.'));
    }

    var defaultValue = find(userItems, function (item) {
      return item.default === true;
    });
    return {
      getConfiguration: function getConfiguration() {
        return defaultValues.length > 0 ? {
          hitsPerPage: defaultValues[0].value
        } : {};
      },
      init: function init(_ref) {
        var helper = _ref.helper,
            createURL = _ref.createURL,
            state = _ref.state,
            instantSearchInstance = _ref.instantSearchInstance;
        var isCurrentInOptions = items.some(function (item) {
          return Number(state.hitsPerPage) === Number(item.value);
        });

        if (!isCurrentInOptions) {
          warning(state.hitsPerPage !== undefined, "\n`hitsPerPage` is not defined.\nThe option `hitsPerPage` needs to be set using the `configure` widget.\n\nLearn more: https://community.algolia.com/instantsearch.js/v2/widgets/configure.html\n            ");
          warning(false, "\nThe `items` option of `hitsPerPage` does not contain the \"hits per page\" value coming from the state: ".concat(state.hitsPerPage, ".\n\nYou may want to add another entry to the `items` option with this value."));
          items = [{
            value: '',
            label: ''
          }].concat(_toConsumableArray(items));
        }

        this.setHitsPerPage = function (value) {
          return !value && value !== 0 ? helper.setQueryParameter('hitsPerPage', undefined).search() : helper.setQueryParameter('hitsPerPage', value).search();
        };

        this.createURL = function (helperState) {
          return function (value) {
            return createURL(helperState.setQueryParameter('hitsPerPage', !value && value !== 0 ? undefined : value));
          };
        };

        renderFn({
          items: transformItems(this._normalizeItems(state)),
          refine: this.setHitsPerPage,
          createURL: this.createURL(helper.state),
          hasNoResults: true,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, true);
      },
      render: function render(_ref2) {
        var state = _ref2.state,
            results = _ref2.results,
            instantSearchInstance = _ref2.instantSearchInstance;
        var hasNoResults = results.nbHits === 0;
        renderFn({
          items: transformItems(this._normalizeItems(state)),
          refine: this.setHitsPerPage,
          createURL: this.createURL(state),
          hasNoResults: hasNoResults,
          widgetParams: widgetParams,
          instantSearchInstance: instantSearchInstance
        }, false);
      },
      _normalizeItems: function _normalizeItems(_ref3) {
        var hitsPerPage = _ref3.hitsPerPage;
        return items.map(function (item) {
          return _objectSpread({}, item, {
            isRefined: Number(item.value) === Number(hitsPerPage)
          });
        });
      },
      dispose: function dispose() {
        unmountFn();
      },
      getWidgetState: function getWidgetState(uiState, _ref4) {
        var searchParameters = _ref4.searchParameters;
        var hitsPerPage = searchParameters.hitsPerPage;

        if (defaultValue && hitsPerPage === defaultValue.value || hitsPerPage === undefined || uiState.hitsPerPage === hitsPerPage) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          hitsPerPage: hitsPerPage
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref5) {
        var uiState = _ref5.uiState;
        var hitsPerPage = uiState.hitsPerPage;
        if (hitsPerPage) return searchParameters.setQueryParameter('hitsPerPage', uiState.hitsPerPage);

        if (defaultValue) {
          return searchParameters.setQueryParameter('hitsPerPage', defaultValue.value);
        }

        return searchParameters.setQueryParameter('hitsPerPage', undefined);
      }
    };
  };
}