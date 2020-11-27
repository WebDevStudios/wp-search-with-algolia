function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import algoliasearchHelper from 'algoliasearch-helper';
import { createDocumentationMessageGenerator, resolveSearchParameters, mergeSearchParameters, warning, capitalize } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'index'
});

function isIndexWidget(widget) {
  return widget.$$type === 'ais.index';
}

function getLocalWidgetsState(widgets, widgetStateOptions) {
  return widgets.filter(function (widget) {
    return !isIndexWidget(widget);
  }).reduce(function (uiState, widget) {
    if (!widget.getWidgetState) {
      return uiState;
    }

    return widget.getWidgetState(uiState, widgetStateOptions);
  }, {});
}

function getLocalWidgetsSearchParameters(widgets, widgetSearchParametersOptions) {
  var initialSearchParameters = widgetSearchParametersOptions.initialSearchParameters,
      rest = _objectWithoutProperties(widgetSearchParametersOptions, ["initialSearchParameters"]);

  return widgets.filter(function (widget) {
    return !isIndexWidget(widget);
  }).reduce(function (state, widget) {
    if (!widget.getWidgetSearchParameters) {
      return state;
    }

    return widget.getWidgetSearchParameters(state, rest);
  }, initialSearchParameters);
}

function resetPageFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);

  if (indexWidgets.length === 0) {
    return;
  }

  indexWidgets.forEach(function (widget) {
    var widgetHelper = widget.getHelper(); // @ts-ignore @TODO: remove "ts-ignore" once `resetPage()` is typed in the helper

    widgetHelper.setState(widgetHelper.state.resetPage());
    resetPageFromWidgets(widget.getWidgets());
  });
}

function resolveScopedResultsFromWidgets(widgets) {
  var indexWidgets = widgets.filter(isIndexWidget);
  return indexWidgets.reduce(function (scopedResults, current) {
    return scopedResults.concat.apply(scopedResults, [{
      indexId: current.getIndexId(),
      results: current.getResults(),
      helper: current.getHelper()
    }].concat(_toConsumableArray(resolveScopedResultsFromWidgets(current.getWidgets()))));
  }, []);
}

function resolveScopedResultsFromIndex(widget) {
  var widgetParent = widget.getParent(); // If the widget is the root, we consider itself as the only sibling.

  var widgetSiblings = widgetParent ? widgetParent.getWidgets() : [widget];
  return resolveScopedResultsFromWidgets(widgetSiblings);
}

var index = function index(props) {
  if (props === undefined || props.indexName === undefined) {
    throw new Error(withUsage('The `indexName` option is required.'));
  }

  var indexName = props.indexName,
      _props$indexId = props.indexId,
      indexId = _props$indexId === void 0 ? indexName : _props$indexId;
  var localWidgets = [];
  var localUiState = {};
  var localInstantSearchInstance = null;
  var localParent = null;
  var helper = null;
  var derivedHelper = null;

  var createURL = function createURL(nextState) {
    return localInstantSearchInstance._createURL(_defineProperty({}, indexId, getLocalWidgetsState(localWidgets, {
      searchParameters: nextState,
      helper: helper
    })));
  };

  return {
    $$type: 'ais.index',
    getIndexName: function getIndexName() {
      return indexName;
    },
    getIndexId: function getIndexId() {
      return indexId;
    },
    getHelper: function getHelper() {
      return helper;
    },
    getResults: function getResults() {
      return derivedHelper && derivedHelper.lastResults;
    },
    getParent: function getParent() {
      return localParent;
    },
    getWidgets: function getWidgets() {
      return localWidgets;
    },
    addWidgets: function addWidgets(widgets) {
      var _this = this;

      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `addWidgets` method expects an array of widgets.'));
      }

      if (widgets.some(function (widget) {
        return typeof widget.init !== 'function' && typeof widget.render !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `render` and/or an `init` method.'));
      }

      localWidgets = localWidgets.concat(widgets);

      if (localInstantSearchInstance && Boolean(widgets.length)) {
        helper.setState(getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: helper.state
        }));
        widgets.forEach(function (widget) {
          if (localInstantSearchInstance && widget.init) {
            widget.init({
              helper: helper,
              parent: _this,
              uiState: {},
              instantSearchInstance: localInstantSearchInstance,
              state: helper.state,
              templatesConfig: localInstantSearchInstance.templatesConfig,
              createURL: createURL
            });
          }
        });
        localInstantSearchInstance.scheduleSearch();
      }

      return this;
    },
    removeWidgets: function removeWidgets(widgets) {
      if (!Array.isArray(widgets)) {
        throw new Error(withUsage('The `removeWidgets` method expects an array of widgets.'));
      }

      if (widgets.some(function (widget) {
        return typeof widget.dispose !== 'function';
      })) {
        throw new Error(withUsage('The widget definition expects a `dispose` method.'));
      }

      localWidgets = localWidgets.filter(function (widget) {
        return widgets.indexOf(widget) === -1;
      });

      if (localInstantSearchInstance && Boolean(widgets.length)) {
        var nextState = widgets.reduce(function (state, widget) {
          // the `dispose` method exists at this point we already assert it
          var next = widget.dispose({
            helper: helper,
            state: state
          });
          return next || state;
        }, helper.state);
        localUiState = getLocalWidgetsState(localWidgets, {
          searchParameters: nextState,
          helper: helper
        });
        helper.setState(getLocalWidgetsSearchParameters(localWidgets, {
          uiState: localUiState,
          initialSearchParameters: nextState
        }));

        if (localWidgets.length) {
          localInstantSearchInstance.scheduleSearch();
        }
      }

      return this;
    },
    init: function init(_ref) {
      var _this2 = this;

      var instantSearchInstance = _ref.instantSearchInstance,
          parent = _ref.parent,
          uiState = _ref.uiState;
      localInstantSearchInstance = instantSearchInstance;
      localParent = parent;
      localUiState = uiState[indexId] || {}; // The `mainHelper` is already defined at this point. The instance is created
      // inside InstantSearch at the `start` method, which occurs before the `init`
      // step.

      var mainHelper = instantSearchInstance.mainHelper;
      var parameters = getLocalWidgetsSearchParameters(localWidgets, {
        uiState: localUiState,
        initialSearchParameters: new algoliasearchHelper.SearchParameters({
          index: indexName
        })
      }); // This Helper is only used for state management we do not care about the
      // `searchClient`. Only the "main" Helper created at the `InstantSearch`
      // level is aware of the client.

      helper = algoliasearchHelper({}, parameters.index, parameters); // We forward the call to `search` to the "main" instance of the Helper
      // which is responsible for managing the queries (it's the only one that is
      // aware of the `searchClient`).

      helper.search = function () {
        return mainHelper.search();
      }; // We use the same pattern for the `searchForFacetValues`.


      helper.searchForFacetValues = function (facetName, facetValue, maxFacetHits, userState) {
        var state = helper.state.setQueryParameters(userState);
        return mainHelper.searchForFacetValues(facetName, facetValue, maxFacetHits, state);
      };

      derivedHelper = mainHelper.derive(function () {
        return mergeSearchParameters.apply(void 0, _toConsumableArray(resolveSearchParameters(_this2)));
      }); // Subscribe to the Helper state changes for the page before widgets
      // are initialized. This behavior mimics the original one of the Helper.
      // It makes sense to replicate it at the `init` step. We have another
      // listener on `change` below, once `init` is done.

      helper.on('change', function (_ref2) {
        var isPageReset = _ref2.isPageReset;

        if (isPageReset) {
          resetPageFromWidgets(localWidgets);
        }
      });
      derivedHelper.on('search', function () {
        // The index does not manage the "staleness" of the search. This is the
        // responsibility of the main instance. It does not make sense to manage
        // it at the index level because it's either: all of them or none of them
        // that are stalled. The queries are performed into a single network request.
        instantSearchInstance.scheduleStalledRender();

        if (process.env.NODE_ENV === 'development') {
          // Some connectors are responsible for multiple widgets so we need
          // to map them.
          // eslint-disable-next-line no-inner-declarations
          var getWidgetNames = function getWidgetNames(connectorName) {
            switch (connectorName) {
              case 'range':
                return ['rangeInput', 'rangeSlider'];

              case 'menu':
                return ['menu', 'menuSelect'];

              default:
                return [connectorName];
            }
          };

          var stateToWidgetsMap = {
            query: ['ais.searchBox', 'ais.autocomplete', 'ais.voiceSearch'],
            refinementList: ['ais.refinementList'],
            menu: ['ais.menu'],
            hierarchicalMenu: ['ais.hierarchicalMenu'],
            numericMenu: ['ais.numericMenu'],
            ratingMenu: ['ais.ratingMenu'],
            range: ['ais.range'],
            toggle: ['ais.toggleRefinement'],
            geoSearch: ['ais.geoSearch'],
            sortBy: ['ais.sortBy'],
            page: ['ais.pagination', 'ais.infiniteHits'],
            hitsPerPage: ['ais.hitsPerPage'],
            configure: ['ais.configure']
          };

          var mountedWidgets = _this2.getWidgets().map(function (widget) {
            return widget.$$type;
          }).filter(Boolean);

          var missingWidgets = Object.keys(localUiState).reduce(function (acc, parameter) {
            var requiredWidgets = stateToWidgetsMap[parameter];

            if (!requiredWidgets.some(function (requiredWidget) {
              return mountedWidgets.includes(requiredWidget);
            })) {
              acc.push([parameter, stateToWidgetsMap[parameter].map(function (widgetIdentifier) {
                return widgetIdentifier.split('ais.')[1];
              })]);
            }

            return acc;
          }, []);
          process.env.NODE_ENV === 'development' ? warning(missingWidgets.length === 0, "The UI state for the index \"".concat(_this2.getIndexId(), "\" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState` or `routing` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index \"").concat(_this2.getIndexId(), "\":\n\n").concat(missingWidgets.map(function (_ref3) {
            var _ref5;

            var _ref4 = _slicedToArray(_ref3, 2),
                stateParameter = _ref4[0],
                widgets = _ref4[1];

            return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref5 = []).concat.apply(_ref5, _toConsumableArray(widgets.map(function (name) {
              return getWidgetNames(name);
            }))).map(function (name) {
              return "\"".concat(name, "\"");
            }).join(', '));
          }).join('\n'), "\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount \"virtual widgets\" that don't render anything:\n\n```\n").concat(missingWidgets.map(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
                _stateParameter = _ref7[0],
                widgets = _ref7[1];

            var capitalizedWidget = capitalize(widgets[0]);
            return "const virtual".concat(capitalizedWidget, " = connect").concat(capitalizedWidget, "(() => null);");
          }).join('\n'), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.map(function (_ref8) {
            var _ref9 = _slicedToArray(_ref8, 2),
                _stateParameter = _ref9[0],
                widgets = _ref9[1];

            var capitalizedWidget = capitalize(widgets[0]);
            return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
          }).join(',\n  '), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) : void 0;
        }
      });
      derivedHelper.on('result', function () {
        // The index does not render the results it schedules a new render
        // to let all the other indices emit their own results. It allows us to
        // run the render process in one pass.
        instantSearchInstance.scheduleRender();
      });
      localWidgets.forEach(function (widget) {
        if (widget.init) {
          widget.init({
            uiState: uiState,
            helper: helper,
            parent: _this2,
            instantSearchInstance: instantSearchInstance,
            state: helper.state,
            templatesConfig: instantSearchInstance.templatesConfig,
            createURL: createURL
          });
        }
      }); // Subscribe to the Helper state changes for the `uiState` once widgets
      // are initialized. Until the first render, state changes are part of the
      // configuration step. This is mainly for backward compatibility with custom
      // widgets. When the subscription happens before the `init` step, the (static)
      // configuration of the widget is pushed in the URL. That's what we want to avoid.
      // https://github.com/algolia/instantsearch.js/pull/994/commits/4a672ae3fd78809e213de0368549ef12e9dc9454

      helper.on('change', function (_ref10) {
        var state = _ref10.state;
        localUiState = getLocalWidgetsState(localWidgets, {
          searchParameters: state,
          helper: helper
        });
        instantSearchInstance.onStateChange();
      });
    },
    render: function render(_ref11) {
      var _this3 = this;

      var instantSearchInstance = _ref11.instantSearchInstance;
      localWidgets.forEach(function (widget) {
        // At this point, all the variables used below are set. Both `helper`
        // and `derivedHelper` have been created at the `init` step. The attribute
        // `lastResults` might be `null` though. It's possible that a stalled render
        // happens before the result e.g with a dynamically added index the request might
        // be delayed. The render is triggered for the complete tree but some parts do
        // not have results yet.
        if (widget.render && derivedHelper.lastResults) {
          widget.render({
            helper: helper,
            instantSearchInstance: instantSearchInstance,
            results: derivedHelper.lastResults,
            scopedResults: resolveScopedResultsFromIndex(_this3),
            state: derivedHelper.lastResults._state,
            templatesConfig: instantSearchInstance.templatesConfig,
            createURL: createURL,
            searchMetadata: {
              isSearchStalled: instantSearchInstance._isSearchStalled
            }
          });
        }
      });
    },
    dispose: function dispose() {
      localWidgets.forEach(function (widget) {
        if (widget.dispose) {
          // The dispose function is always called once the instance is started
          // (it's an effect of `removeWidgets`). The index is initialized and
          // the Helper is available. We don't care about the return value of
          // `dispose` because the index is removed. We can't call `removeWidgets`
          // because we want to keep the widgets on the instance, to allow idempotent
          // operations on `add` & `remove`.
          widget.dispose({
            helper: helper,
            state: helper.state
          });
        }
      });
      localInstantSearchInstance = null;
      localParent = null;
      helper.removeAllListeners();
      helper = null;
      derivedHelper.detach();
      derivedHelper = null;
    },
    getWidgetState: function getWidgetState(uiState) {
      return localWidgets.filter(isIndexWidget).reduce(function (previousUiState, innerIndex) {
        return innerIndex.getWidgetState(previousUiState);
      }, _objectSpread({}, uiState, _defineProperty({}, this.getIndexId(), localUiState)));
    }
  };
};

export default index;