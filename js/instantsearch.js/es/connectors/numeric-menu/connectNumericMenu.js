function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, createDocumentationMessageGenerator, isFiniteNumber, convertNumericRefinementsToFilters, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'numeric-menu',
  connector: true
});
var $$type = 'ais.numericMenu';

var createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      helper = _ref.helper,
      attribute = _ref.attribute;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }

    var eventType = args[0],
        facetValue = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (eventType !== 'click') {
      return;
    } // facetValue === "%7B%22start%22:5,%22end%22:10%7D"


    var filters = convertNumericRefinementsToFilters(getRefinedState(helper.state, attribute, facetValue), attribute);

    if (filters && filters.length > 0) {
      /*
          filters === ["price<=10", "price>=5"]
        */
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: $$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: filters
        },
        attribute: attribute
      });
    }
  };
};

var connectNumericMenu = function connectNumericMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        _ref2$attribute = _ref2.attribute,
        attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
        _ref2$items = _ref2.items,
        items = _ref2$items === void 0 ? [] : _ref2$items,
        _ref2$transformItems = _ref2.transformItems,
        transformItems = _ref2$transformItems === void 0 ? function (x) {
      return x;
    } : _ref2$transformItems;

    if (attribute === '') {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    if (!items || items.length === 0) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }

    var prepareItems = function prepareItems(state) {
      return items.map(function (_ref3) {
        var start = _ref3.start,
            end = _ref3.end,
            label = _ref3.label;
        return {
          label: label,
          value: encodeURI(JSON.stringify({
            start: start,
            end: end
          })),
          isRefined: isRefined(state, attribute, {
            start: start,
            end: end,
            label: label
          })
        };
      });
    };

    var connectorState = {};
    return {
      $$type: $$type,
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
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.clearRefinements(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = searchParameters.getNumericRefinements(attribute);
        var equal = values['='] && values['='][0];

        if (equal || equal === 0) {
          return _objectSpread(_objectSpread({}, uiState), {}, {
            numericMenu: _objectSpread(_objectSpread({}, uiState.numericMenu), {}, _defineProperty({}, attribute, "".concat(values['='])))
          });
        }

        var min = values['>='] && values['>='][0] || '';
        var max = values['<='] && values['<='][0] || '';

        if (min === '' && max === '') {
          return uiState;
        }

        return _objectSpread(_objectSpread({}, uiState), {}, {
          numericMenu: _objectSpread(_objectSpread({}, uiState.numericMenu), {}, _defineProperty({}, attribute, "".concat(min, ":").concat(max)))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var value = uiState.numericMenu && uiState.numericMenu[attribute];
        var withoutRefinements = searchParameters.clearRefinements(attribute);

        if (!value) {
          return withoutRefinements.setQueryParameters({
            numericRefinements: _objectSpread(_objectSpread({}, withoutRefinements.numericRefinements), {}, _defineProperty({}, attribute, {}))
          });
        }

        var isExact = value.indexOf(':') === -1;

        if (isExact) {
          return withoutRefinements.addNumericRefinement(attribute, '=', Number(value));
        }

        var _value$split$map = value.split(':').map(parseFloat),
            _value$split$map2 = _slicedToArray(_value$split$map, 2),
            min = _value$split$map2[0],
            max = _value$split$map2[1];

        var withMinRefinement = isFiniteNumber(min) ? withoutRefinements.addNumericRefinement(attribute, '>=', min) : withoutRefinements;
        var withMaxRefinement = isFiniteNumber(max) ? withMinRefinement.addNumericRefinement(attribute, '<=', max) : withMinRefinement;
        return withMaxRefinement;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          numericMenu: _objectSpread(_objectSpread({}, renderState.numericMenu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var results = _ref7.results,
            state = _ref7.state,
            instantSearchInstance = _ref7.instantSearchInstance,
            helper = _ref7.helper,
            createURL = _ref7.createURL;

        if (!connectorState.refine) {
          connectorState.refine = function (facetValue) {
            var refinedState = getRefinedState(helper.state, attribute, facetValue);
            connectorState.sendEvent('click', facetValue);
            helper.setState(refinedState).search();
          };
        }

        if (!connectorState.createURL) {
          connectorState.createURL = function (newState) {
            return function (facetValue) {
              return createURL(getRefinedState(newState, attribute, facetValue));
            };
          };
        }

        if (!connectorState.sendEvent) {
          connectorState.sendEvent = createSendEvent({
            instantSearchInstance: instantSearchInstance,
            helper: helper,
            attribute: attribute
          });
        }

        return {
          createURL: connectorState.createURL(state),
          items: transformItems(prepareItems(state)),
          hasNoResults: results ? results.nbHits === 0 : true,
          refine: connectorState.refine,
          sendEvent: connectorState.sendEvent,
          widgetParams: widgetParams
        };
      }
    };
  };
};

function isRefined(state, attribute, option) {
  // @TODO: same as another spot, why is this mixing arrays & elements?
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
    return Object.keys(currentRefinements).every(function (operator) {
      return (currentRefinements[operator] || []).length === 0;
    });
  }

  return false;
}

function getRefinedState(state, attribute, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(decodeURI(facetValue)); // @TODO: why is array / element mixed here & hasRefinements; seems wrong?

  var currentRefinements = resolvedState.getNumericRefinements(attribute);

  if (refinedOption.start === undefined && refinedOption.end === undefined) {
    return resolvedState.removeNumericRefinement(attribute);
  }

  if (!isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.removeNumericRefinement(attribute);
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

  if (typeof resolvedState.page === 'number') {
    resolvedState.page = 0;
  }

  return resolvedState;
}

function hasNumericRefinement(currentRefinements, operator, value) {
  return currentRefinements[operator] !== undefined && currentRefinements[operator].includes(value);
}

export default connectNumericMenu;