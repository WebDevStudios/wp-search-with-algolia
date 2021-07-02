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
      helper = _ref.helper,
      attribute = _ref.attribute,
      on = _ref.on;

  var sendEventForToggle = function sendEventForToggle() {
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
    } // only send an event when the refinement gets applied,
    // not when it gets removed


    if (!isRefined) {
      instantSearchInstance.sendEventToInsights({
        insightsMethod: 'clickedFilters',
        widgetType: $$type,
        eventType: eventType,
        payload: {
          eventName: eventName,
          index: helper.getIndex(),
          filters: on.map(function (value) {
            return "".concat(attribute, ":").concat(value);
          })
        },
        attribute: attribute
      });
    }
  };

  return sendEventForToggle;
};

/**
 * **Toggle** connector provides the logic to build a custom widget that will provide
 * an on/off filtering feature based on an attribute value or values.
 *
 * Two modes are implemented in the custom widget:
 *  - with or without the value filtered
 *  - switch between two values.
 */
var connectToggleRefinement = function connectToggleRefinement(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        attribute = _ref2.attribute,
        _ref2$on = _ref2.on,
        userOn = _ref2$on === void 0 ? true : _ref2$on,
        userOff = _ref2.off;

    if (!attribute) {
      throw new Error(withUsage('The `attribute` option is required.'));
    }

    var hasAnOffValue = userOff !== undefined;
    var on = toArray(userOn).map(escapeRefinement);
    var off = hasAnOffValue ? toArray(userOff).map(escapeRefinement) : undefined;
    var sendEvent;

    var toggleRefinementFactory = function toggleRefinementFactory(helper) {
      return function () {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          isRefined: false
        },
            isRefined = _ref3.isRefined;

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
      createURLFactory: function createURLFactory(isRefined, _ref4) {
        var state = _ref4.state,
            createURL = _ref4.createURL;
        return function () {
          state = state.resetPage();
          var valuesToRemove = isRefined ? on : off;

          if (valuesToRemove) {
            valuesToRemove.forEach(function (v) {
              state = state.removeDisjunctiveFacetRefinement(attribute, v);
            });
          }

          var valuesToAdd = isRefined ? off : on;

          if (valuesToAdd) {
            valuesToAdd.forEach(function (v) {
              state = state.addDisjunctiveFacetRefinement(attribute, v);
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
      dispose: function dispose(_ref5) {
        var state = _ref5.state;
        unmountFn();
        return state.removeDisjunctiveFacet(attribute);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          toggleRefinement: _objectSpread(_objectSpread({}, renderState.toggleRefinement), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref6) {
        var state = _ref6.state,
            helper = _ref6.helper,
            results = _ref6.results,
            createURL = _ref6.createURL,
            instantSearchInstance = _ref6.instantSearchInstance;
        var isRefined = results ? on.every(function (v) {
          return helper.state.isDisjunctiveFacetRefined(attribute, v);
        }) : on.every(function (v) {
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
          var allFacetValues = results.getFacetValues(attribute, {}) || [];
          var onData = on.map(function (v) {
            return find(allFacetValues, function (_ref7) {
              var name = _ref7.name;
              return name === unescapeRefinement(v);
            });
          }).filter(function (v) {
            return v !== undefined;
          });
          var offData = hasAnOffValue ? offValue.map(function (v) {
            return find(allFacetValues, function (_ref8) {
              var name = _ref8.name;
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
            }, 0) || allFacetValues.reduce(function (total, _ref9) {
              var count = _ref9.count;
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
          createURL: connectorState.createURLFactory(isRefined, {
            state: state,
            createURL: createURL
          }),
          sendEvent: sendEvent,
          canRefine: Boolean(results ? nextRefinement.count : null),
          refine: toggleRefinementFactory(helper),
          widgetParams: widgetParams
        };
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref10) {
        var searchParameters = _ref10.searchParameters;
        var isRefined = on && on.every(function (v) {
          return searchParameters.isDisjunctiveFacetRefined(attribute, v);
        });

        if (!isRefined) {
          return uiState;
        }

        return _objectSpread(_objectSpread({}, uiState), {}, {
          toggle: _objectSpread(_objectSpread({}, uiState.toggle), {}, _defineProperty({}, attribute, isRefined))
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref11) {
        var uiState = _ref11.uiState;
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
          disjunctiveFacetsRefinements: _objectSpread(_objectSpread({}, searchParameters.disjunctiveFacetsRefinements), {}, _defineProperty({}, attribute, []))
        });
      }
    };
  };
};

export default connectToggleRefinement;