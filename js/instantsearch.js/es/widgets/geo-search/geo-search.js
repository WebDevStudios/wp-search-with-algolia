function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// global for TypeScript alone

/* global google */
import cx from 'classnames';
import { render } from 'preact';
import { getContainerNode, renderTemplate, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import connectGeoSearch from '../../connectors/geo-search/connectGeoSearch';
import renderer from './GeoSearchRenderer';
import defaultTemplates from './defaultTemplates';
import createHTMLMarker from './createHTMLMarker';
var withUsage = createDocumentationMessageGenerator({
  name: 'geo-search'
});
var suit = component('GeoSearch');

/**
 * The **GeoSearch** widget displays the list of results from the search on a Google Maps. It also provides a way to search for results based on their position. The widget also provide some of the common GeoSearch patterns like search on map interaction.
 *
 * @requirements
 *
 * Note that the GeoSearch widget uses the [geosearch](https://www.algolia.com/doc/guides/searching/geo-search) capabilities of Algolia. Your hits **must** have a `_geoloc` attribute in order to be displayed on the map.
 *
 * Currently, the feature is not compatible with multiple values in the _geoloc attribute.
 *
 * You are also responsible for loading the Google Maps library, it's not shipped with InstantSearch. You need to load the Google Maps library and pass a reference to the widget. You can find more information about how to install the library in [the Google Maps documentation](https://developers.google.com/maps/documentation/javascript/tutorial).
 *
 * Don't forget to explicitly set the `height` of the map container (default class `.ais-geo-search--map`), otherwise it won't be shown (it's a requirement of Google Maps).
 */
var geoSearch = function geoSearch(widgetParams) {
  var _ref = widgetParams || {},
      _ref$initialZoom = _ref.initialZoom,
      initialZoom = _ref$initialZoom === void 0 ? 1 : _ref$initialZoom,
      _ref$initialPosition = _ref.initialPosition,
      initialPosition = _ref$initialPosition === void 0 ? {
    lat: 0,
    lng: 0
  } : _ref$initialPosition,
      _ref$templates = _ref.templates,
      userTemplates = _ref$templates === void 0 ? {} : _ref$templates,
      _ref$cssClasses = _ref.cssClasses,
      userCssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses,
      _ref$builtInMarker = _ref.builtInMarker,
      userBuiltInMarker = _ref$builtInMarker === void 0 ? {} : _ref$builtInMarker,
      userCustomHTMLMarker = _ref.customHTMLMarker,
      _ref$enableRefine = _ref.enableRefine,
      enableRefine = _ref$enableRefine === void 0 ? true : _ref$enableRefine,
      _ref$enableClearMapRe = _ref.enableClearMapRefinement,
      enableClearMapRefinement = _ref$enableClearMapRe === void 0 ? true : _ref$enableClearMapRe,
      _ref$enableRefineCont = _ref.enableRefineControl,
      enableRefineControl = _ref$enableRefineCont === void 0 ? true : _ref$enableRefineCont,
      container = _ref.container,
      googleReference = _ref.googleReference,
      otherWidgetParams = _objectWithoutProperties(_ref, ["initialZoom", "initialPosition", "templates", "cssClasses", "builtInMarker", "customHTMLMarker", "enableRefine", "enableClearMapRefinement", "enableRefineControl", "container", "googleReference"]);

  var defaultBuiltInMarker = {
    createOptions: function createOptions() {
      return {};
    },
    events: {}
  };
  var defaultCustomHTMLMarker = {
    createOptions: function createOptions() {
      return {};
    },
    events: {}
  };

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  if (!googleReference) {
    throw new Error(withUsage('The `googleReference` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    // Required only to mount / unmount the Preact tree
    tree: suit({
      descendantName: 'tree'
    }),
    map: cx(suit({
      descendantName: 'map'
    }), userCssClasses.map),
    control: cx(suit({
      descendantName: 'control'
    }), userCssClasses.control),
    label: cx(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    selectedLabel: cx(suit({
      descendantName: 'label',
      modifierName: 'selected'
    }), userCssClasses.selectedLabel),
    input: cx(suit({
      descendantName: 'input'
    }), userCssClasses.input),
    redo: cx(suit({
      descendantName: 'redo'
    }), userCssClasses.redo),
    disabledRedo: cx(suit({
      descendantName: 'redo',
      modifierName: 'disabled'
    }), userCssClasses.disabledRedo),
    reset: cx(suit({
      descendantName: 'reset'
    }), userCssClasses.reset)
  };

  var templates = _objectSpread(_objectSpread({}, defaultTemplates), userTemplates);

  var builtInMarker = _objectSpread(_objectSpread({}, defaultBuiltInMarker), userBuiltInMarker);

  var isCustomHTMLMarker = Boolean(userCustomHTMLMarker) || Boolean(userTemplates.HTMLMarker);

  var customHTMLMarker = isCustomHTMLMarker && _objectSpread(_objectSpread({}, defaultCustomHTMLMarker), userCustomHTMLMarker);

  var createBuiltInMarker = function createBuiltInMarker(_ref2) {
    var item = _ref2.item,
        rest = _objectWithoutProperties(_ref2, ["item"]);

    return new googleReference.maps.Marker(_objectSpread(_objectSpread(_objectSpread({}, builtInMarker.createOptions(item)), rest), {}, {
      // @ts-expect-error @types/googlemaps doesn't document this
      __id: item.objectID,
      position: item._geoloc
    }));
  };

  var HTMLMarker = createHTMLMarker(googleReference);

  var createCustomHTMLMarker = function createCustomHTMLMarker(_ref3) {
    var item = _ref3.item,
        rest = _objectWithoutProperties(_ref3, ["item"]);

    return new HTMLMarker(_objectSpread(_objectSpread(_objectSpread({}, customHTMLMarker.createOptions(item)), rest), {}, {
      __id: item.objectID,
      position: item._geoloc,
      className: cx(suit({
        descendantName: 'marker'
      })),
      template: renderTemplate({
        templateKey: 'HTMLMarker',
        templates: templates,
        data: item
      })
    }));
  };

  var createMarker = !customHTMLMarker ? createBuiltInMarker : createCustomHTMLMarker;
  var markerOptions = !customHTMLMarker ? builtInMarker : customHTMLMarker;
  var makeWidget = connectGeoSearch(renderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget(_objectSpread(_objectSpread({}, otherWidgetParams), {}, {
    renderState: {},
    container: containerNode,
    googleReference: googleReference,
    initialZoom: initialZoom,
    initialPosition: initialPosition,
    templates: templates,
    cssClasses: cssClasses,
    createMarker: createMarker,
    markerOptions: markerOptions,
    enableRefine: enableRefine,
    enableClearMapRefinement: enableClearMapRefinement,
    enableRefineControl: enableRefineControl
  }))), {}, {
    $$widgetType: 'ais.geoSearch'
  });
};

export default geoSearch;