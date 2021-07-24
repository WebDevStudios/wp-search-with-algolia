"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _utils = require("../../lib/utils");

var _GeoSearchControls = _interopRequireDefault(require("../../components/GeoSearchControls/GeoSearchControls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var refineWithMap = function refineWithMap(_ref) {
  var refine = _ref.refine,
      mapInstance = _ref.mapInstance;
  return refine({
    northEast: mapInstance.getBounds().getNorthEast().toJSON(),
    southWest: mapInstance.getBounds().getSouthWest().toJSON()
  });
};

var collectMarkersForNextRender = function collectMarkersForNextRender(markers, nextIds) {
  return markers.reduce(function (_ref2, marker) {
    var _ref3 = _slicedToArray(_ref2, 2),
        update = _ref3[0],
        exit = _ref3[1];

    var persist = nextIds.includes(marker.__id);
    return persist ? [update.concat(marker), exit] : [update, exit.concat(marker)];
  }, [[], []]);
};

var createBoundingBoxFromMarkers = function createBoundingBoxFromMarkers(google, markers) {
  var latLngBounds = markers.reduce(function (acc, marker) {
    return acc.extend(marker.getPosition());
  }, new google.maps.LatLngBounds());
  return {
    northEast: latLngBounds.getNorthEast().toJSON(),
    southWest: latLngBounds.getSouthWest().toJSON()
  };
};

var lockUserInteraction = function lockUserInteraction(renderState, functionThatAltersTheMapPosition) {
  renderState.isUserInteraction = false;
  functionThatAltersTheMapPosition();
  renderState.isUserInteraction = true;
};

var renderer = function renderer(_ref4, isFirstRendering) {
  var items = _ref4.items,
      position = _ref4.position,
      currentRefinement = _ref4.currentRefinement,
      refine = _ref4.refine,
      clearMapRefinement = _ref4.clearMapRefinement,
      toggleRefineOnMapMove = _ref4.toggleRefineOnMapMove,
      isRefineOnMapMove = _ref4.isRefineOnMapMove,
      setMapMoveSinceLastRefine = _ref4.setMapMoveSinceLastRefine,
      hasMapMoveSinceLastRefine = _ref4.hasMapMoveSinceLastRefine,
      isRefinedWithMap = _ref4.isRefinedWithMap,
      widgetParams = _ref4.widgetParams,
      instantSearchInstance = _ref4.instantSearchInstance;
  var container = widgetParams.container,
      googleReference = widgetParams.googleReference,
      cssClasses = widgetParams.cssClasses,
      templates = widgetParams.templates,
      initialZoom = widgetParams.initialZoom,
      initialPosition = widgetParams.initialPosition,
      enableRefine = widgetParams.enableRefine,
      enableClearMapRefinement = widgetParams.enableClearMapRefinement,
      enableRefineControl = widgetParams.enableRefineControl,
      mapOptions = widgetParams.mapOptions,
      createMarker = widgetParams.createMarker,
      markerOptions = widgetParams.markerOptions,
      renderState = widgetParams.renderState;

  if (isFirstRendering) {
    renderState.isUserInteraction = true;
    renderState.isPendingRefine = false;
    renderState.markers = [];
    var rootElement = document.createElement('div');
    rootElement.className = cssClasses.root;
    container.appendChild(rootElement);
    var mapElement = document.createElement('div');
    mapElement.className = cssClasses.map;
    rootElement.appendChild(mapElement);
    var treeElement = document.createElement('div');
    treeElement.className = cssClasses.tree;
    rootElement.appendChild(treeElement);
    renderState.mapInstance = new googleReference.maps.Map(mapElement, _objectSpread({
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      clickableIcons: false,
      zoomControlOptions: {
        position: googleReference.maps.ControlPosition.LEFT_TOP
      }
    }, mapOptions));

    var setupListenersWhenMapIsReady = function setupListenersWhenMapIsReady() {
      var onChange = function onChange() {
        if (renderState.isUserInteraction && enableRefine) {
          setMapMoveSinceLastRefine();

          if (isRefineOnMapMove()) {
            renderState.isPendingRefine = true;
          }
        }
      };

      renderState.mapInstance.addListener('center_changed', onChange);
      renderState.mapInstance.addListener('zoom_changed', onChange);
      renderState.mapInstance.addListener('dragstart', onChange);
      renderState.mapInstance.addListener('idle', function () {
        if (renderState.isUserInteraction && renderState.isPendingRefine) {
          renderState.isPendingRefine = false;
          refineWithMap({
            mapInstance: renderState.mapInstance,
            refine: refine
          });
        }
      });
    };

    googleReference.maps.event.addListenerOnce(renderState.mapInstance, 'idle', setupListenersWhenMapIsReady);
    renderState.templateProps = (0, _utils.prepareTemplateProps)({
      templatesConfig: instantSearchInstance.templatesConfig,
      templates: templates
    });
    return;
  } // Collect markers that need to be updated or removed


  var nextItemsIds = items.map(function (_) {
    return _.objectID;
  });

  var _collectMarkersForNex = collectMarkersForNextRender(renderState.markers, nextItemsIds),
      _collectMarkersForNex2 = _slicedToArray(_collectMarkersForNex, 2),
      updateMarkers = _collectMarkersForNex2[0],
      exitMarkers = _collectMarkersForNex2[1]; // Collect items that will be added


  var updateMarkerIds = updateMarkers.map(function (_) {
    return _.__id;
  });
  var nextPendingItems = items.filter(function (item) {
    return !updateMarkerIds.includes(item.objectID);
  }); // Remove all markers that need to be removed

  exitMarkers.forEach(function (marker) {
    return marker.setMap(null);
  }); // Create the markers from the items

  renderState.markers = updateMarkers.concat(nextPendingItems.map(function (item) {
    var marker = createMarker({
      map: renderState.mapInstance,
      item: item
    });
    Object.keys(markerOptions.events).forEach(function (eventName) {
      marker.addListener(eventName, function (event) {
        markerOptions.events[eventName]({
          map: renderState.mapInstance,
          event: event,
          item: item,
          marker: marker
        });
      });
    });
    return marker;
  }));
  var shouldUpdate = !hasMapMoveSinceLastRefine(); // We use this value for differentiate the padding to apply during
  // fitBounds. When we don't have a currenRefinement (boundingBox)
  // we let Google Maps compute the automatic padding. But when we
  // provide the currentRefinement we explicitly set the padding
  // to `0` otherwise the map will decrease the zoom on each refine.

  var boundingBoxPadding = currentRefinement ? 0 : null;
  var boundingBox = !currentRefinement && Boolean(renderState.markers.length) ? createBoundingBoxFromMarkers(googleReference, renderState.markers) : currentRefinement;

  if (boundingBox && shouldUpdate) {
    lockUserInteraction(renderState, function () {
      renderState.mapInstance.fitBounds(new googleReference.maps.LatLngBounds(boundingBox.southWest, boundingBox.northEast), boundingBoxPadding);
    });
  } else if (shouldUpdate) {
    lockUserInteraction(renderState, function () {
      renderState.mapInstance.setCenter(position || initialPosition);
      renderState.mapInstance.setZoom(initialZoom);
    });
  }

  (0, _preact.render)((0, _preact.h)(_GeoSearchControls.default, {
    cssClasses: cssClasses,
    enableRefine: enableRefine,
    enableRefineControl: enableRefineControl,
    enableClearMapRefinement: enableClearMapRefinement,
    isRefineOnMapMove: isRefineOnMapMove(),
    isRefinedWithMap: isRefinedWithMap(),
    hasMapMoveSinceLastRefine: hasMapMoveSinceLastRefine(),
    onRefineToggle: toggleRefineOnMapMove,
    onRefineClick: function onRefineClick() {
      return refineWithMap({
        mapInstance: renderState.mapInstance,
        refine: refine
      });
    },
    onClearClick: clearMapRefinement,
    templateProps: renderState.templateProps
  }), container.querySelector(".".concat(cssClasses.tree)));
};

var _default = renderer;
exports.default = _default;