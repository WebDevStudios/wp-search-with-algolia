"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _connectGeoSearch = _interopRequireDefault(require("../../connectors/geo-search/connectGeoSearch"));
var _suit = require("../../lib/suit");
var _templating = require("../../lib/templating");
var _utils = require("../../lib/utils");
var _createHTMLMarker = _interopRequireDefault(require("./createHTMLMarker"));
var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));
var _GeoSearchRenderer = _interopRequireDefault(require("./GeoSearchRenderer"));
var _excluded = ["initialZoom", "initialPosition", "templates", "cssClasses", "builtInMarker", "customHTMLMarker", "enableRefine", "enableClearMapRefinement", "enableRefineControl", "container", "googleReference"],
  _excluded2 = ["item"],
  _excluded3 = ["item"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'geo-search'
});
var suit = (0, _suit.component)('GeoSearch');
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
    otherWidgetParams = _objectWithoutProperties(_ref, _excluded);
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
  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root),
    // Required only to mount / unmount the Preact tree
    tree: suit({
      descendantName: 'tree'
    }),
    map: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'map'
    }), userCssClasses.map),
    control: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'control'
    }), userCssClasses.control),
    label: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'label'
    }), userCssClasses.label),
    selectedLabel: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'label',
      modifierName: 'selected'
    }), userCssClasses.selectedLabel),
    input: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'input'
    }), userCssClasses.input),
    redo: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'redo'
    }), userCssClasses.redo),
    disabledRedo: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'redo',
      modifierName: 'disabled'
    }), userCssClasses.disabledRedo),
    reset: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'reset'
    }), userCssClasses.reset)
  };
  var templates = _objectSpread(_objectSpread({}, _defaultTemplates.default), userTemplates);
  var builtInMarker = _objectSpread(_objectSpread({}, defaultBuiltInMarker), userBuiltInMarker);
  var isCustomHTMLMarker = Boolean(userCustomHTMLMarker) || Boolean(userTemplates.HTMLMarker);
  var customHTMLMarker = isCustomHTMLMarker && _objectSpread(_objectSpread({}, defaultCustomHTMLMarker), userCustomHTMLMarker);
  var createBuiltInMarker = function createBuiltInMarker(_ref2) {
    var item = _ref2.item,
      rest = _objectWithoutProperties(_ref2, _excluded2);
    return new googleReference.maps.Marker(_objectSpread(_objectSpread(_objectSpread({}, builtInMarker.createOptions(item)), rest), {}, {
      // @ts-expect-error @types/googlemaps doesn't document this
      __id: item.objectID,
      position: item._geoloc
    }));
  };
  var HTMLMarker = (0, _createHTMLMarker.default)(googleReference);
  var createCustomHTMLMarker = function createCustomHTMLMarker(_ref3) {
    var item = _ref3.item,
      rest = _objectWithoutProperties(_ref3, _excluded3);
    return new HTMLMarker(_objectSpread(_objectSpread(_objectSpread({}, customHTMLMarker.createOptions(item)), rest), {}, {
      __id: item.objectID,
      position: item._geoloc,
      className: (0, _uiComponentsShared.cx)(suit({
        descendantName: 'marker'
      })),
      template: (0, _templating.renderTemplate)({
        templateKey: 'HTMLMarker',
        templates: templates,
        data: item
      })
    }));
  };
  var createMarker = !customHTMLMarker ? createBuiltInMarker : createCustomHTMLMarker;
  var markerOptions = !customHTMLMarker ? builtInMarker : customHTMLMarker;
  var makeWidget = (0, _connectGeoSearch.default)(_GeoSearchRenderer.default, function () {
    return (0, _preact.render)(null, containerNode);
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
var _default = geoSearch;
exports.default = _default;