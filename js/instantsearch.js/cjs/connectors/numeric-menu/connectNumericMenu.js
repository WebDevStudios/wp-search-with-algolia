"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectNumericMenu;

var _utils = require("../../lib/utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'numeric-menu',
  connector: true
});
/**
 * @typedef {Object} NumericMenuOption
 * @property {string} name Name of the option.
 * @property {number} start Lower bound of the option (>=).
 * @property {number} end Higher bound of the option (<=).
 */

/**
 * @typedef {Object} NumericMenuItem
 * @property {string} label Name of the option.
 * @property {string} value URL encoded of the bounds object with the form `{start, end}`. This value can be used verbatim in the webpage and can be read by `refine` directly. If you want to inspect the value, you can do `JSON.parse(window.decodeURI(value))` to get the object.
 * @property {boolean} isRefined True if the value is selected.
 */

/**
 * @typedef {Object} CustomNumericMenuWidgetOptions
 * @property {string} attribute Name of the attribute for filtering.
 * @property {NumericMenuOption[]} items List of all the items.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} NumericMenuRenderingOptions
 * @property {function(item.value): string} createURL Creates URLs for the next state, the string is the name of the selected option.
 * @property {NumericMenuItem[]} items The list of available choices.
 * @property {boolean} hasNoResults `true` if the last search contains no result.
 * @property {function(item.value)} refine Sets the selected value and trigger a new search.
 * @property {Object} widgetParams All original `CustomNumericMenuWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **NumericMenu** connector provides the logic to build a custom widget that will give the user the ability to choose a range on to refine the search results.
 *
 * It provides a `refine(item)` function to refine on the selected range.
 *
 * **Requirement:** the attribute passed as `attribute` must be present in "attributes for faceting" on the Algolia dashboard or configured as attributesForFaceting via a set settings call to the Algolia API.
 * @function connectNumericMenu
 * @type {Connector}
 * @param {function(NumericMenuRenderingOptions, boolean)} renderFn Rendering function for the custom **NumericMenu** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomNumericMenuWidgetOptions)} Re-usable widget factory for a custom **NumericMenu** widget.
 * @example
 * // custom `renderFn` to render the custom NumericMenu widget
 * function renderFn(NumericMenuRenderingOptions, isFirstRendering) {
 *   if (isFirstRendering) {
 *     NumericMenuRenderingOptions.widgetParams.containerNode.html('<ul></ul>');
 *   }
 *
 *   NumericMenuRenderingOptions.widgetParams.containerNode
 *     .find('li[data-refine-value]')
 *     .each(function() { $(this).off('click'); });
 *
 *   var list = NumericMenuRenderingOptions.items.map(function(item) {
 *     return '<li data-refine-value="' + item.value + '">' +
 *       '<input type="radio"' + (item.isRefined ? ' checked' : '') + '/> ' +
 *       item.label + '</li>';
 *   });
 *
 *   NumericMenuRenderingOptions.widgetParams.containerNode.find('ul').html(list);
 *   NumericMenuRenderingOptions.widgetParams.containerNode
 *     .find('li[data-refine-value]')
 *     .each(function() {
 *       $(this).on('click', function(event) {
 *         event.preventDefault();
 *         event.stopPropagation();
 *         NumericMenuRenderingOptions.refine($(this).data('refine-value'));
 *       });
 *     });
 * }
 *
 * // connect `renderFn` to NumericMenu logic
 * var customNumericMenu = instantsearch.connectors.connectNumericMenu(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customNumericMenu({
 *     containerNode: $('#custom-numeric-menu-container'),
 *     attribute: 'price',
 *     items: [
 *       {name: 'All'},
 *       {end: 4, name: 'less than 4'},
 *       {start: 4, end: 4, name: '4'},
 *       {start: 5, end: 10, name: 'between 5 and 10'},
 *       {start: 10, name: 'more than 10'},
 *     ],
 *   })
 * );
 */

function connectNumericMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        items = widgetParams.items,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (x) {
      return x;
    } : _widgetParams$transfo;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    if (!items) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }

    return {
      init: function init(_ref) {
        var helper = _ref.helper,
            createURL = _ref.createURL,
            instantSearchInstance = _ref.instantSearchInstance;

        this._refine = function (facetValue) {
          var refinedState = refine(helper.state, attribute, items, facetValue);
          helper.setState(refinedState).search();
        };

        this._createURL = function (state) {
          return function (facetValue) {
            return createURL(refine(state, attribute, items, facetValue));
          };
        };

        this._prepareItems = function (state) {
          return items.map(function (_ref2) {
            var start = _ref2.start,
                end = _ref2.end,
                label = _ref2.label;
            return {
              label: label,
              value: window.encodeURI(JSON.stringify({
                start: start,
                end: end
              })),
              isRefined: isRefined(state, attribute, {
                start: start,
                end: end
              })
            };
          });
        };

        renderFn({
          createURL: this._createURL(helper.state),
          items: transformItems(this._prepareItems(helper.state)),
          hasNoResults: true,
          refine: this._refine,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref3) {
        var results = _ref3.results,
            state = _ref3.state,
            instantSearchInstance = _ref3.instantSearchInstance;
        renderFn({
          createURL: this._createURL(state),
          items: transformItems(this._prepareItems(state)),
          hasNoResults: results.nbHits === 0,
          refine: this._refine,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.clearRefinements(attribute);
      },
      getWidgetState: function getWidgetState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var currentRefinements = searchParameters.getNumericRefinements(attribute);
        var equal = currentRefinements['='] && currentRefinements['='][0];

        if (equal || equal === 0) {
          return _objectSpread({}, uiState, {
            numericMenu: _objectSpread({}, uiState.numericMenu, _defineProperty({}, attribute, "".concat(currentRefinements['='])))
          });
        }

        var lowerBound = currentRefinements['>='] && currentRefinements['>='][0] || '';
        var upperBound = currentRefinements['<='] && currentRefinements['<='][0] || '';

        if (lowerBound !== '' || upperBound !== '') {
          if (uiState.numericMenu && uiState.numericMenu[attribute] === "".concat(lowerBound, ":").concat(upperBound)) return uiState;
          return _objectSpread({}, uiState, {
            numericMenu: _objectSpread({}, uiState.numericMenu, _defineProperty({}, attribute, "".concat(lowerBound, ":").concat(upperBound)))
          });
        }

        return uiState;
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var clearedParams = searchParameters.clearRefinements(attribute);
        var value = uiState.numericMenu && uiState.numericMenu[attribute];

        if (!value) {
          return clearedParams;
        }

        var valueAsEqual = value.indexOf(':') === -1 && value;

        if (valueAsEqual) {
          return clearedParams.addNumericRefinement(attribute, '=', valueAsEqual);
        }

        var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            lowerBound = _value$split$map2[0],
            upperBound = _value$split$map2[1];

        if ((0, _utils.isFiniteNumber)(lowerBound)) {
          clearedParams = clearedParams.addNumericRefinement(attribute, '>=', lowerBound);
        }

        if ((0, _utils.isFiniteNumber)(upperBound)) {
          clearedParams = clearedParams.addNumericRefinement(attribute, '<=', upperBound);
        }

        return clearedParams;
      }
    };
  };
}

function isRefined(state, attribute, option) {
  var currentRefinements = state.getNumericRefinements(attribute);

  if (option.start !== undefined && option.end !== undefined) {
    if (option.start === option.end) {
      return hasNumericRefinement(currentRefinements, '=', option.start);
    }
  }

  if (option.start !== undefined) {
    return hasNumericRefinement(currentRefinements, '>=', option.start);
  }

  if (option.end !== undefined) {
    return hasNumericRefinement(currentRefinements, '<=', option.end);
  }

  if (option.start === undefined && option.end === undefined) {
    return Object.keys(currentRefinements).length === 0;
  }

  return undefined;
}

function refine(state, attribute, items, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(window.decodeURI(facetValue));
  var currentRefinements = resolvedState.getNumericRefinements(attribute);

  if (refinedOption.start === undefined && refinedOption.end === undefined) {
    return resolvedState.clearRefinements(attribute);
  }

  if (!isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.clearRefinements(attribute);
  }

  if (refinedOption.start !== undefined && refinedOption.end !== undefined) {
    if (refinedOption.start > refinedOption.end) {
      throw new Error('option.start should be > to option.end');
    }

    if (refinedOption.start === refinedOption.end) {
      if (hasNumericRefinement(currentRefinements, '=', refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, '=', refinedOption.start);
      } else {
        resolvedState = resolvedState.addNumericRefinement(attribute, '=', refinedOption.start);
      }

      return resolvedState;
    }
  }

  if (refinedOption.start !== undefined) {
    if (hasNumericRefinement(currentRefinements, '>=', refinedOption.start)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, '>=', refinedOption.start);
    } else {
      resolvedState = resolvedState.addNumericRefinement(attribute, '>=', refinedOption.start);
    }
  }

  if (refinedOption.end !== undefined) {
    if (hasNumericRefinement(currentRefinements, '<=', refinedOption.end)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, '<=', refinedOption.end);
    } else {
      resolvedState = resolvedState.addNumericRefinement(attribute, '<=', refinedOption.end);
    }
  }

  resolvedState.page = 0;
  return resolvedState;
}

function hasNumericRefinement(currentRefinements, operator, value) {
  var hasOperatorRefinements = currentRefinements[operator] !== undefined;
  return hasOperatorRefinements && currentRefinements[operator].includes(value);
}