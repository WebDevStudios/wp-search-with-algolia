function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, warning, aroundLatLngToPosition, insideBoundingBoxToBoundingBox, createDocumentationMessageGenerator, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'geo-search',
  connector: true
});
/**
 * @typedef {Object} LatLng
 * @property {number} lat The latitude in degrees.
 * @property {number} lng The longitude in degrees.
 */

/**
 * @typedef {Object} Bounds
 * @property {LatLng} northEast The top right corner of the map view.
 * @property {LatLng} southWest The bottom left corner of the map view.
 */

/**
 * @typedef {Object} CustomGeoSearchWidgetOptions
 * @property {boolean} [enableRefineOnMapMove=true] If true, refine will be triggered as you move the map.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} GeoSearchRenderingOptions
 * @property {Object[]} items The matched hits from Algolia API.
 * @property {LatLng} position The current position of the search.
 * @property {Bounds} currentRefinement The current bounding box of the search.
 * @property {function(Bounds)} refine Sets a bounding box to filter the results from the given map bounds.
 * @property {function()} clearMapRefinement Reset the current bounding box refinement.
 * @property {function(): boolean} isRefinedWithMap Return true if the current refinement is set with the map bounds.
 * @property {function()} toggleRefineOnMapMove Toggle the fact that the user is able to refine on map move.
 * @property {function(): boolean} isRefineOnMapMove Return true if the user is able to refine on map move.
 * @property {function()} setMapMoveSinceLastRefine Set the fact that the map has moved since the last refinement, should be call on each map move. The call to the function triggers a new rendering only when the value change.
 * @property {function(): boolean} hasMapMoveSinceLastRefine Return true if the map has move since the last refinement.
 * @property {Object} widgetParams All original `CustomGeoSearchWidgetOptions` forwarded to the `renderFn`.
 * @property {LatLng} [position] The current position of the search.
 */

/**
 * The **GeoSearch** connector provides the logic to build a widget that will display the results on a map. It also provides a way to search for results based on their position. The connector provides functions to manage the search experience (search on map interaction or control the interaction for example).
 *
 * @requirements
 *
 * Note that the GeoSearch connector uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be passed to the rendering function.
 *
 * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
 *
 * @type {Connector}
 * @param {function(GeoSearchRenderingOptions, boolean)} renderFn Rendering function for the custom **GeoSearch** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomGeoSearchWidgetOptions)} Re-usable widget factory for a custom **GeoSearch** widget.
 * @staticExample
 * // This example use Leaflet for the rendering, be sure to have the library correctly setup
 * // before trying the demo. You can find more details in their documentation (link below).
 * // We choose Leaflet for the example but you can use any libraries that you want.
 * // See: http://leafletjs.com/examples/quick-start
 *
 * let map = null;
 * let markers = [];
 *
 * // custom `renderFn` to render the custom GeoSearch widget
 * function renderFn(GeoSearchRenderingOptions, isFirstRendering) {
 *   const { items, widgetParams } = GeoSearchRenderingOptions;
 *
 *   if (isFirstRendering) {
 *     map = L.map(widgetParams.container);
 *
 *     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 *       attribution:
 *         '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
 *     }).addTo(map);
 *   }
 *
 *   markers.forEach(marker => marker.remove());
 *
 *   markers = items.map(({ _geoloc }) =>
 *     L.marker([_geoloc.lat, _geoloc.lng]).addTo(map)
 *   );
 *
 *   if (markers.length) {
 *     map.fitBounds(L.featureGroup(markers).getBounds());
 *   }
 * }
 *
 * // connect `renderFn` to GeoSearch logic
 * const customGeoSearch = instantsearch.connectors.connectGeoSearch(renderFn);
 *
 * // mount widget on the page
 * search.addWidget(
 *   customGeoSearch({
 *     container: document.getElementById('custom-geo-search'),
 *   })
 * );
 */

var connectGeoSearch = function connectGeoSearch(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _widgetParams$enableR = widgetParams.enableRefineOnMapMove,
        enableRefineOnMapMove = _widgetParams$enableR === void 0 ? true : _widgetParams$enableR,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo; // Always trigger this message because the default value was `true`. We can't
    // display the message only when the parameter is defined otherwise a user that was
    // relying on the default value won't have any information about the changes.

    warning(false, "\nThe option `enableGeolocationWithIP` has been removed from the GeoSearch widget.\nPlease consider using the `Configure` widget instead:\n\nsearch.addWidget(\n  configure({\n    aroundLatLngViaIP: ".concat(widgetParams.enableGeolocationWithIP || 'true', ",\n  })\n);\n\nYou can find more information inside the migration guide:\nhttp://community.algolia.com/instantsearch.js/migration-guide\n        "));
    warning(typeof widgetParams.position === 'undefined', "\nThe option `position` has been removed from the GeoSearch widget.\nPlease consider using the `Configure` widget instead:\n\nsearch.addWidget(\n  configure({\n    aroundLatLng: '".concat(widgetParams.position && widgetParams.position.lat, ", ").concat(widgetParams.position && widgetParams.position.lng, "',\n  })\n);\n\nYou can find more information inside the migration guide:\nhttp://community.algolia.com/instantsearch.js/migration-guide\n      "));
    warning(typeof widgetParams.radius === 'undefined', "\nThe option `radius` has been removed from the GeoSearch widget.\nPlease consider using the `Configure` widget instead:\n\nsearch.addWidget(\n  configure({\n    aroundRadius: ".concat(widgetParams.radius, ",\n  })\n);\n\nYou can find more information inside the migration guide:\n\nhttp://community.algolia.com/instantsearch.js/migration-guide\n      "));
    warning(typeof widgetParams.precision === 'undefined', "\nThe option `precision` has been removed from the GeoSearch widget.\nPlease consider using the `Configure` widget instead:\n\nsearch.addWidget(\n  configure({\n    aroundPrecision: ".concat(widgetParams.precision, ",\n  })\n);\n\nYou can find more information inside the migration guide:\n\nhttp://community.algolia.com/instantsearch.js/migration-guide\n      "));
    var widgetState = {
      isRefineOnMapMove: enableRefineOnMapMove,
      hasMapMoveSinceLastRefine: false,
      lastRefinePosition: '',
      lastRefineBoundingBox: '',
      internalToggleRefineOnMapMove: noop,
      internalSetMapMoveSinceLastRefine: noop
    };

    var getPositionFromState = function getPositionFromState(state) {
      return state.aroundLatLng && aroundLatLngToPosition(state.aroundLatLng);
    };

    var getCurrentRefinementFromState = function getCurrentRefinementFromState(state) {
      return state.insideBoundingBox && insideBoundingBoxToBoundingBox(state.insideBoundingBox);
    };

    var refine = function refine(helper) {
      return function (_ref) {
        var ne = _ref.northEast,
            sw = _ref.southWest;
        var boundingBox = [ne.lat, ne.lng, sw.lat, sw.lng].join();
        helper.setQueryParameter('insideBoundingBox', boundingBox).search();
        widgetState.hasMapMoveSinceLastRefine = false;
        widgetState.lastRefineBoundingBox = boundingBox;
      };
    };

    var clearMapRefinement = function clearMapRefinement(helper) {
      return function () {
        helper.setQueryParameter('insideBoundingBox').search();
      };
    };

    var isRefinedWithMap = function isRefinedWithMap(state) {
      return function () {
        return Boolean(state.insideBoundingBox);
      };
    };

    var toggleRefineOnMapMove = function toggleRefineOnMapMove() {
      return widgetState.internalToggleRefineOnMapMove();
    };

    var createInternalToggleRefinementOnMapMove = function createInternalToggleRefinementOnMapMove(render, args) {
      return function () {
        widgetState.isRefineOnMapMove = !widgetState.isRefineOnMapMove;
        render(args);
      };
    };

    var isRefineOnMapMove = function isRefineOnMapMove() {
      return widgetState.isRefineOnMapMove;
    };

    var setMapMoveSinceLastRefine = function setMapMoveSinceLastRefine() {
      return widgetState.internalSetMapMoveSinceLastRefine();
    };

    var createInternalSetMapMoveSinceLastRefine = function createInternalSetMapMoveSinceLastRefine(render, args) {
      return function () {
        var shouldTriggerRender = widgetState.hasMapMoveSinceLastRefine !== true;
        widgetState.hasMapMoveSinceLastRefine = true;

        if (shouldTriggerRender) {
          render(args);
        }
      };
    };

    var hasMapMoveSinceLastRefine = function hasMapMoveSinceLastRefine() {
      return widgetState.hasMapMoveSinceLastRefine;
    };

    var init = function init(initArgs) {
      var state = initArgs.state,
          helper = initArgs.helper,
          instantSearchInstance = initArgs.instantSearchInstance;
      var isFirstRendering = true;
      widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(noop, initArgs);
      widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(noop, initArgs);
      renderFn({
        items: [],
        position: getPositionFromState(state),
        currentRefinement: getCurrentRefinementFromState(state),
        refine: refine(helper),
        clearMapRefinement: clearMapRefinement(helper),
        isRefinedWithMap: isRefinedWithMap(state),
        toggleRefineOnMapMove: toggleRefineOnMapMove,
        isRefineOnMapMove: isRefineOnMapMove,
        setMapMoveSinceLastRefine: setMapMoveSinceLastRefine,
        hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
        widgetParams: widgetParams,
        instantSearchInstance: instantSearchInstance
      }, isFirstRendering);
    };

    var render = function render(renderArgs) {
      var results = renderArgs.results,
          helper = renderArgs.helper,
          instantSearchInstance = renderArgs.instantSearchInstance;
      var isFirstRendering = false; // We don't use the state provided by the render function because we need
      // to be sure that the state is the latest one for the following condition

      var state = helper.state;
      var positionChangedSinceLastRefine = Boolean(state.aroundLatLng) && Boolean(widgetState.lastRefinePosition) && state.aroundLatLng !== widgetState.lastRefinePosition;
      var boundingBoxChangedSinceLastRefine = !state.insideBoundingBox && Boolean(widgetState.lastRefineBoundingBox) && state.insideBoundingBox !== widgetState.lastRefineBoundingBox;

      if (positionChangedSinceLastRefine || boundingBoxChangedSinceLastRefine) {
        widgetState.hasMapMoveSinceLastRefine = false;
      }

      widgetState.lastRefinePosition = state.aroundLatLng || '';
      widgetState.lastRefineBoundingBox = state.insideBoundingBox || '';
      widgetState.internalToggleRefineOnMapMove = createInternalToggleRefinementOnMapMove(render, renderArgs);
      widgetState.internalSetMapMoveSinceLastRefine = createInternalSetMapMoveSinceLastRefine(render, renderArgs);
      var items = transformItems(results.hits.filter(function (hit) {
        return hit._geoloc;
      }));
      renderFn({
        items: items,
        position: getPositionFromState(state),
        currentRefinement: getCurrentRefinementFromState(state),
        refine: refine(helper),
        clearMapRefinement: clearMapRefinement(helper),
        isRefinedWithMap: isRefinedWithMap(state),
        toggleRefineOnMapMove: toggleRefineOnMapMove,
        isRefineOnMapMove: isRefineOnMapMove,
        setMapMoveSinceLastRefine: setMapMoveSinceLastRefine,
        hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine,
        widgetParams: widgetParams,
        instantSearchInstance: instantSearchInstance
      }, isFirstRendering);
    };

    return {
      init: init,
      render: render,
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return state.setQueryParameter('insideBoundingBox');
      },
      getWidgetState: function getWidgetState(uiState, _ref3) {
        var searchParameters = _ref3.searchParameters;
        var boundingBox = searchParameters.insideBoundingBox;

        if (!boundingBox || uiState && uiState.geoSearch && uiState.geoSearch.boundingBox === boundingBox) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          geoSearch: {
            boundingBox: boundingBox
          }
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref4) {
        var uiState = _ref4.uiState;

        if (!uiState || !uiState.geoSearch) {
          return searchParameters.setQueryParameter('insideBoundingBox');
        }

        return searchParameters.setQueryParameter('insideBoundingBox', uiState.geoSearch.boundingBox);
      }
    };
  };
};

export default connectGeoSearch;