function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, escapeRefinement, unescapeRefinement, createDocumentationMessageGenerator, find, noop, toArray } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'toggle-refinement',
  connector: true
});
var $$type = 'ais.toggleRefinement';

var createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance,
      attribute = _ref.attribute,
      on = _ref.on,
      helper = _ref.helper;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      instantSearchInstance.sendEventToInsights(args[0]);
      return;
    }

    var eventType = args[0],
        isRefined = args[1],
        _args$ = args[2],
        eventName = _args$ === void 0 ? 'Filter Applied' : _args$;

    if (eventType !== 'click' || on === undefined) {
      return;
    } // Checking


    if (!isRefined) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: $$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: on.map(function (value) {
            return "".concat(attribute, ":").concat(JSON.stringify(value));
          })
        }
      });
    }
  };
};
/**
 * @typedef {Object} ToggleValue
 * @property {boolean} isRefined `true` if the toggle is on.
 * @property {number} count Number of results matched after applying the toggle refinement.
 * @property {Object} onFacetValue Value of the toggle when it's on.
 * @property {Object} offFacetValue Value of the toggle when it's off.
 */

/**
 * @typedef {Object} CustomToggleWidgetOptions
 * @property {string} attribute Name of the attribute for faceting (eg. "free_shipping").
 * @property {Object} [on = true] Value to filter on when toggled.
 * @property {Object} [off] Value to filter on when not toggled.
 */

/**
 * @typedef {Object} ToggleRenderingOptions
 * @property {ToggleValue} value The current toggle value.
 * @property {function():string} createURL Creates an URL for the next state.
 * @property {function(value)} refine Updates to the next state by applying the toggle refinement.
 * @property {Object} widgetParams All original `CustomToggleWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **Toggle** connector provides the logic to build a custom widget that will provide
 * an on/off filtering feature based on an attribute value or values.
 *
 * Two modes are implemented in the custom widget:
 *  - with or without the value filtered
 *  - switch between two values.
 *
 * @type {Connector}
 * @param {function(ToggleRenderingOptions, boolean)} renderFn Rendering function for the custom **Toggle** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomToggleWidgetOptions)} Re-usable widget factory for a custom **Toggle** widget.
 * @example
 * // custom `renderFn` to render the custom ClearAll widget
 * function renderFn(ToggleRenderingOptions, isFirstRendering) {
 *   ToggleRenderingOptions.widgetParams.containerNode
 *     .find('a')
 *     .off('click');
 *
 *   var buttonHTML = `
 *     <a href="${ToggleRenderingOptions.createURL()}">
 *       <input
 *         type="checkbox"
 *         value="${ToggleRenderingOptions.value.name}"
 *         ${ToggleRenderingOptions.value.isRefined ? 'checked' : ''}
 *       />
 *       ${ToggleRenderingOptions.value.name} (${ToggleRenderingOptions.value.count})
 *     </a>
 *   `;
 *
 *   ToggleRenderingOptions.widgetParams.containerNode.html(buttonHTML);
 *   ToggleRenderingOptions.widgetParams.containerNode
 *     .find('a')
 *     .on('click', function(event) {
 *       event.preventDefault();
 *       event.stopPropagation();
 *
 *       ToggleRenderingOptions.refine(ToggleRenderingOptions.value);
 *     });
 * }
 *
 * // connect `renderFn` to Toggle logic
 * var customToggle = instantsearch.connectors.connectToggleRefinement(renderFn);
 *
 * // mount widget on the page
 * search.addWidgets([
 *   customToggle({
 *     containerNode: $('#custom-toggle-container'),
 *     attribute: 'free_shipping',
 *   })
 * ]);
 */


export default function connectToggleRefinement(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var attribute = widgetParams.attribute,
        _widgetParams$on = widgetParams.on,
        userOn = _widgetParams$on === void 0 ? true : _widgetParams$on,
        userOff = widgetParams.off;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    var hasAnOffValue = userOff !== undefined;
    var hasAnOnValue = userOn !== undefined;
    var on = hasAnOnValue ? toArray(userOn).map(escapeRefinement) : undefined;
    var off = hasAnOffValue ? toArray(userOff).map(escapeRefinement) : undefined;
    var sendEvent;

    var toggleRefinementFactory = function toggleRefinementFactory(helper) {
      return function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            isRefined = _ref2.isRefined;

        // Checking
        if (!isRefined) {
          sendEvent('click', isRefined);

          if (hasAnOffValue) {
            off.forEach(function (v) {
              return helper.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }

          on.forEach(function (v) {
            return helper.addDisjunctiveFacetRefinement(attribute, v);
          });
        } else {
          // Unchecking
          on.forEach(function (v) {
            return helper.removeDisjunctiveFacetRefinement(attribute, v);
          });

          if (hasAnOffValue) {
            off.forEach(function (v) {
              return helper.addDisjunctiveFacetRefinement(attribute, v);
            });
          }
        }

        helper.search();
      };
    };

    var connectorState = {
      createURLFactory: function createURLFactory(isRefined, _ref3) {
        var state = _ref3.state,
            createURL = _ref3.createURL;
        return function () {
          var valuesToRemove = isRefined ? on : off;

          if (valuesToRemove) {
            valuesToRemove.forEach(function (v) {
              state.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }

          var valuesToAdd = isRefined ? off : on;

          if (valuesToAdd) {
            valuesToAdd.forEach(function (v) {
              state.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          return createURL(state);
        };
      }
    };
    return {
      $$type: $$type,
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
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread({}, renderState, {
          toggleRefinement: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref5) {
        var state = _ref5.state,
            helper = _ref5.helper,
            results = _ref5.results,
            createURL = _ref5.createURL,
            instantSearchInstance = _ref5.instantSearchInstance;
        var isRefined = results ? on === null || on === void 0 ? void 0 : on.every(function (v) {
          return helper.state.isDisjunctiveFacetRefined(attribute, v);
        }) : on === null || on === void 0 ? void 0 : on.every(function (v) {
          return state.isDisjunctiveFacetRefined(attribute, v);
        });
        var onFacetValue = {
          isRefined: isRefined,
          count: 0
        };
        var offFacetValue = {
          isRefined: hasAnOffValue && !isRefined,
          count: 0
        };

        if (results) {
          var offValue = toArray(off || false);
          var allFacetValues = results.getFacetValues(attribute) || [];
          var onData = on === null || on === void 0 ? void 0 : on.map(function (v) {
            return find(allFacetValues, function (_ref6) {
              var name = _ref6.name;
              return name === unescapeRefinement(v);
            });
          }).filter(function (v) {
            return v !== undefined;
          });
          var offData = hasAnOffValue ? offValue.map(function (v) {
            return find(allFacetValues, function (_ref7) {
              var name = _ref7.name;
              return name === unescapeRefinement(v);
            });
          }).filter(function (v) {
            return v !== undefined;
          }) : [];
          onFacetValue = {
            isRefined: onData.length ? onData.every(function (v) {
              return v.isRefined;
            }) : false,
            count: onData.reduce(function (acc, v) {
              return acc + v.count;
            }, 0) || null
          };
          offFacetValue = {
            isRefined: offData.length ? offData.every(function (v) {
              return v.isRefined;
            }) : false,
            count: offData.reduce(function (acc, v) {
              return acc + v.count;
            }, 0) || allFacetValues.reduce(function (total, _ref8) {
              var count = _ref8.count;
              return total + count;
            }, 0)
          };
        } else if (hasAnOffValue && !isRefined) {
          if (off) {
            off.forEach(function (v) {
              return helper.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          helper.setPage(helper.state.page);
        }

        if (!sendEvent) {
          sendEvent = createSendEvent({
            instantSearchInstance: instantSearchInstance,
            attribute: attribute,
            on: on,
            helper: helper
          });
        }

        var nextRefinement = isRefined ? offFacetValue : onFacetValue;
        return {
          value: {
            name: attribute,
            isRefined: isRefined,
            count: results ? nextRefinement.count : null,
            onFacetValue: onFacetValue,
            offFacetValue: offFacetValue
          },
          state: state,
          createURL: connectorState.createURLFactory(isRefined, {
            state: state,
            createURL: createURL
          }),
          sendEvent: sendEvent,
          refine: toggleRefinementFactory(helper),
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref9) {
        var searchParameters = _ref9.searchParameters;
        var isRefined = on && on.every(function (v) {
          return searchParameters.isDisjunctiveFacetRefined(attribute, v);
        });

        if (!isRefined) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          toggle: _objectSpread({}, uiState.toggle, _defineProperty({}, attribute, isRefined))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref10) {
        var uiState = _ref10.uiState;
        var withFacetConfiguration = searchParameters.clearRefinements(attribute).addDisjunctiveFacet(attribute);
        var isRefined = Boolean(uiState.toggle && uiState.toggle[attribute]);

        if (isRefined) {
          if (on) {
            on.forEach(function (v) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          return withFacetConfiguration;
        } // It's not refined with an `off` value


        if (hasAnOffValue) {
          if (off) {
            off.forEach(function (v) {
              withFacetConfiguration = withFacetConfiguration.addDisjunctiveFacetRefinement(attribute, v);
            });
          }

          return withFacetConfiguration;
        } // It's not refined without an `off` value


        return withFacetConfiguration.setQueryParameters({
          disjunctiveFacetsRefinements: _objectSpread({}, searchParameters.disjunctiveFacetsRefinements, _defineProperty({}, attribute, []))
        });
      }
    };
  };
}