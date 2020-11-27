function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import cx from 'classnames';
import { unmountComponentAtNode } from 'preact-compat';
import { getContainerNode, renderTemplate, createDocumentationMessageGenerator, noop } from '../../lib/utils';
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
 * @typedef {object} HTMLMarkerOptions
 * @property {object} [anchor] The offset from the marker's position.
 */

/**
 * @typedef {object} CustomHTMLMarkerOptions
 * @property {function(item): HTMLMarkerOptions} [createOptions] Function used to create the options passed to the HTMLMarker.
 * @property {{ eventType: function(object) }} [events] Object that takes an event type (ex: `click`, `mouseover`) as key and a listener as value. The listener is provided with an object that contains `event`, `item`, `marker`, `map`.
 */

/**
 * @typedef {object} BuiltInMarkerOptions
 * @property {function(item): MarkerOptions} [createOptions] Function used to create the options passed to the Google Maps marker. <br />
 * See [the documentation](https://developers.google.com/maps/documentation/javascript/reference/3/#MarkerOptions) for more information.
 * @property {{ eventType: function(object) }} [events] Object that takes an event type (ex: `click`, `mouseover`) as key and a listener as value. The listener is provided with an object that contains `event`, `item`, `marker`, `map`.
 */

/**
 * @typedef {object} GeoSearchCSSClasses
 * @property {string|Array<string>} [root] The root div of the widget.
 * @property {string|Array<string>} [map] The map container of the widget.
 * @property {string|Array<string>} [control] The control element of the widget.
 * @property {string|Array<string>} [label] The label of the control element.
 * @property {string|Array<string>} [selectedLabel] The selected label of the control element.
 * @property {string|Array<string>} [input] The input of the control element.
 * @property {string|Array<string>} [redo] The redo search button.
 * @property {string|Array<string>} [disabledRedo] The disabled redo search button.
 * @property {string|Array<string>} [reset] The reset refinement button.
 */

/**
 * @typedef {object} GeoSearchTemplates
 * @property {string|function(object): string} [HTMLMarker] Template to use for the marker.
 * @property {string|function(object): string} [reset] Template for the reset button.
 * @property {string|function(object): string} [toggle] Template for the toggle label.
 * @property {string|function(object): string} [redo] Template for the redo button.
 */

/**
 * @typedef {object} LatLng
 * @property {number} lat The latitude in degrees.
 * @property {number} lng The longitude in degrees.
 */

/**
 * @typedef {object} GeoSearchWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget.
 * @property {object} googleReference Reference to the global `window.google` object. <br />
 * See [the documentation](https://developers.google.com/maps/documentation/javascript/tutorial) for more information.
 * @property {number} [initialZoom=1] By default the map will set the zoom accordingly to the markers displayed on it. When we refine it may happen that the results are empty. For those situations we need to provide a zoom to render the map.
 * @property {LatLng} [initialPosition={ lat: 0, lng: 0 }] By default the map will set the position accordingly to the markers displayed on it. When we refine it may happen that the results are empty. For those situations we need to provide a position to render the map. This option is ignored when the `position` is provided.
 * @property {GeoSearchTemplates} [templates] Templates to use for the widget.
 * @property {GeoSearchCSSClasses} [cssClasses] CSS classes to add to the wrapping elements.
 * @property {object} [mapOptions] Option forwarded to the Google Maps constructor. <br />
 * See [the documentation](https://developers.google.com/maps/documentation/javascript/reference/3/#MapOptions) for more information.
 * @property {BuiltInMarkerOptions} [builtInMarker] Options for customize the built-in Google Maps marker. This option is ignored when the `customHTMLMarker` is provided.
 * @property {CustomHTMLMarkerOptions} [customHTMLMarker] Options for customize the HTML marker. We provide an alternative to the built-in Google Maps marker in order to have a full control of the marker rendering. You can use plain HTML to build your marker.
 * @property {boolean} [enableRefine=true] If true, the map is used to search - otherwise it's for display purposes only.
 * @property {boolean} [enableClearMapRefinement=true] If true, a button is displayed on the map when the refinement is coming from the map in order to remove it.
 * @property {boolean} [enableRefineControl=true] If true, the user can toggle the option `enableRefineOnMapMove` directly from the map.
 * @property {boolean} [enableRefineOnMapMove=true] If true, refine will be triggered as you move the map.
 * @property {function} [transformItems] Function to transform the items passed to the templates.
 */

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
 *
 * @type {WidgetFactory}
 * @devNovel GeoSearch
 * @param {GeoSearchWidgetOptions} $0 Options of the GeoSearch widget.
 * @return {Widget} A new instance of GeoSearch widget.
 * @staticExample
 * search.addWidget(
 *   instantsearch.widgets.geoSearch({
 *     container: '#geo-search-container',
 *     googleReference: window.google,
 *   })
 * );
 */

var geoSearch = function geoSearch() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
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
      widgetParams = _objectWithoutProperties(_ref, ["initialZoom", "initialPosition", "templates", "cssClasses", "builtInMarker", "customHTMLMarker", "enableRefine", "enableClearMapRefinement", "enableRefineControl", "container", "googleReference"]);

  var defaultBuiltInMarker = {
    createOptions: noop,
    events: {}
  };
  var defaultCustomHTMLMarker = {
    createOptions: noop,
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

  var templates = _objectSpread({}, defaultTemplates, {}, userTemplates);

  var builtInMarker = _objectSpread({}, defaultBuiltInMarker, {}, userBuiltInMarker);

  var isCustomHTMLMarker = Boolean(userCustomHTMLMarker) || Boolean(userTemplates.HTMLMarker);

  var customHTMLMarker = isCustomHTMLMarker && _objectSpread({}, defaultCustomHTMLMarker, {}, userCustomHTMLMarker);

  var createBuiltInMarker = function createBuiltInMarker(_ref2) {
    var item = _ref2.item,
        rest = _objectWithoutProperties(_ref2, ["item"]);

    return new googleReference.maps.Marker(_objectSpread({}, builtInMarker.createOptions(item), {}, rest, {
      __id: item.objectID,
      position: item._geoloc
    }));
  };

  var HTMLMarker = createHTMLMarker(googleReference);

  var createCustomHTMLMarker = function createCustomHTMLMarker(_ref3) {
    var item = _ref3.item,
        rest = _objectWithoutProperties(_ref3, ["item"]);

    return new HTMLMarker(_objectSpread({}, customHTMLMarker.createOptions(item), {}, rest, {
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

  var createMarker = !customHTMLMarker ? createBuiltInMarker : createCustomHTMLMarker; // prettier-ignore

  var markerOptions = !customHTMLMarker ? builtInMarker : customHTMLMarker;
  var makeGeoSearch = connectGeoSearch(renderer, function () {
    unmountComponentAtNode(containerNode.querySelector(".".concat(cssClasses.tree)));

    while (containerNode.firstChild) {
      containerNode.removeChild(containerNode.firstChild);
    }
  });
  return makeGeoSearch(_objectSpread({}, widgetParams, {
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
  }));
};

export default geoSearch;