function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import algoliasearchHelper from 'algoliasearch-helper';
import { isEqual } from './utils';

var RoutingManager =
/*#__PURE__*/
function () {
  function RoutingManager(_ref) {
    var router = _ref.router,
        stateMapping = _ref.stateMapping,
        instantSearchInstance = _ref.instantSearchInstance;

    _classCallCheck(this, RoutingManager);

    _defineProperty(this, "instantSearchInstance", void 0);

    _defineProperty(this, "router", void 0);

    _defineProperty(this, "stateMapping", void 0);

    _defineProperty(this, "isFirstRender", true);

    _defineProperty(this, "currentUiState", void 0);

    _defineProperty(this, "initState", void 0);

    _defineProperty(this, "renderURLFromState", void 0);

    this.router = router;
    this.stateMapping = stateMapping;
    this.instantSearchInstance = instantSearchInstance;
    this.currentUiState = this.stateMapping.routeToState(this.router.read());
  }

  _createClass(RoutingManager, [{
    key: "getAllSearchParameters",
    value: function getAllSearchParameters(_ref2) {
      var currentSearchParameters = _ref2.currentSearchParameters,
          uiState = _ref2.uiState;
      var widgets = this.instantSearchInstance.widgets;
      return widgets.reduce(function (parameters, widget) {
        if (!widget.getWidgetSearchParameters) {
          return parameters;
        }

        return widget.getWidgetSearchParameters(parameters, {
          uiState: uiState
        });
      }, currentSearchParameters);
    }
  }, {
    key: "getAllUiStates",
    value: function getAllUiStates(_ref3) {
      var searchParameters = _ref3.searchParameters;
      var widgets = this.instantSearchInstance.widgets;
      var helper = this.instantSearchInstance.helper;
      return widgets.reduce(function (state, widget) {
        if (!widget.getWidgetState) {
          return state;
        }

        return widget.getWidgetState(state, {
          helper: helper,
          searchParameters: searchParameters
        });
      }, {});
    }
  }, {
    key: "setupRouting",
    value: function setupRouting(state) {
      var _this = this;

      var helper = this.instantSearchInstance.helper;
      this.router.onUpdate(function (route) {
        var nextUiState = _this.stateMapping.routeToState(route);

        var widgetsUiState = _this.getAllUiStates({
          searchParameters: helper.state
        });

        if (isEqual(nextUiState, widgetsUiState)) {
          return;
        }

        _this.currentUiState = nextUiState;

        var searchParameters = _this.getAllSearchParameters({
          currentSearchParameters: state,
          uiState: _this.currentUiState
        });

        helper.overrideStateWithoutTriggeringChangeEvent(searchParameters).search();
      });

      this.renderURLFromState = function (searchParameters) {
        _this.currentUiState = _this.getAllUiStates({
          searchParameters: searchParameters
        });

        var route = _this.stateMapping.stateToRoute(_this.currentUiState);

        _this.router.write(route);
      };

      helper.on('change', this.renderURLFromState); // Compare initial state and first render state to see if the query has been
      // changed by the `searchFunction`. It's required because the helper of the
      // `searchFunction` does not trigger change event (not the same instance).

      var firstRenderState = this.getAllUiStates({
        searchParameters: state
      });

      if (!isEqual(this.initState, firstRenderState)) {
        // Force update the URL, if the state has changed since the initial read.
        // We do this in order to make the URL update when there is `searchFunction`
        // that prevents the search of the initial rendering.
        // See: https://github.com/algolia/instantsearch.js/issues/2523#issuecomment-339356157
        this.currentUiState = firstRenderState;
        var route = this.stateMapping.stateToRoute(this.currentUiState);
        this.router.write(route);
      }
    }
  }, {
    key: "getConfiguration",
    value: function getConfiguration(currentConfiguration) {
      // We have to create a `SearchParameters` because `getAllSearchParameters`
      // expects an instance of `SearchParameters` and not a plain object.
      var currentSearchParameters = algoliasearchHelper.SearchParameters.make(currentConfiguration);
      return _objectSpread({}, this.getAllSearchParameters({
        uiState: this.currentUiState,
        currentSearchParameters: currentSearchParameters
      }));
    }
  }, {
    key: "init",
    value: function init(_ref4) {
      var state = _ref4.state;
      // Store the initial state from the storage to compare it with the state on next renders
      // in case the `searchFunction` has modified it.
      this.initState = this.getAllUiStates({
        searchParameters: state
      });
    }
  }, {
    key: "render",
    value: function render(_ref5) {
      var state = _ref5.state;

      if (this.isFirstRender) {
        this.isFirstRender = false;
        this.setupRouting(state);
      }
    }
  }, {
    key: "dispose",
    value: function dispose(_ref6) {
      var helper = _ref6.helper,
          state = _ref6.state;

      if (this.renderURLFromState) {
        this.instantSearchInstance.helper.removeListener('change', this.renderURLFromState);
      }

      if (this.router.dispose) {
        this.router.dispose({
          helper: helper,
          state: state
        });
      }
    }
  }, {
    key: "createURL",
    value: function createURL(state) {
      var uiState = this.getAllUiStates({
        searchParameters: state
      });
      var route = this.stateMapping.stateToRoute(uiState);
      return this.router.createURL(route);
    }
  }, {
    key: "onHistoryChange",
    value: function onHistoryChange(callback) {
      var _this2 = this;

      var helper = this.instantSearchInstance.helper;
      this.router.onUpdate(function (route) {
        var nextUiState = _this2.stateMapping.routeToState(route);

        var widgetsUiState = _this2.getAllUiStates({
          searchParameters: helper.state
        });

        if (isEqual(nextUiState, widgetsUiState)) {
          return;
        }

        _this2.currentUiState = nextUiState;

        var searchParameters = _this2.getAllSearchParameters({
          currentSearchParameters: helper.state,
          uiState: _this2.currentUiState
        });

        callback(_objectSpread({}, searchParameters));
      });
    }
  }]);

  return RoutingManager;
}();

export default RoutingManager;