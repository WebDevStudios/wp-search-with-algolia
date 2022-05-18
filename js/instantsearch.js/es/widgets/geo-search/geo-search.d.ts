/// <reference types="google.maps" />
import type { GeoSearchConnectorParams, GeoSearchWidgetDescription, GeoHit } from '../../connectors/geo-search/connectGeoSearch';
import type { HTMLMarkerArguments } from './createHTMLMarker';
import type { GeoLoc, Template, WidgetFactory } from '../../types';
export declare type CreateMarker = (args: {
    item: GeoHit;
    map: google.maps.Map;
}) => google.maps.OverlayView | google.maps.Marker;
export declare type GeoSearchTemplates = Partial<{
    /** Template to use for the marker. */
    HTMLMarker: Template<GeoHit>;
    /** Template for the reset button. */
    reset: Template;
    /** Template for the toggle label. */
    toggle: Template;
    /** Template for the redo button. */
    redo: Template;
}>;
export declare type GeoSearchComponentTemplates = Required<GeoSearchTemplates>;
export declare type GeoSearchCSSClasses = Partial<{
    /** The root div of the widget. */
    root: string | string[];
    /** The map container of the widget. */
    map: string | string[];
    /** The control element of the widget. */
    control: string | string[];
    /** The label of the control element. */
    label: string | string[];
    /** The selected label of the control element. */
    selectedLabel: string | string[];
    /** The input of the control element. */
    input: string | string[];
    /** The redo search button. */
    redo: string | string[];
    /** The disabled redo search button. */
    disabledRedo: string | string[];
    /** The reset refinement button. */
    reset: string | string[];
}>;
export declare type GeoSearchMarker<TOptions> = {
    /**
     * Function used to create the options passed to the Google Maps marker.
     * See the documentation for more information:
     * https://developers.google.com/maps/documentation/javascript/reference/3/#MarkerOptions
     */
    createOptions?(item: GeoHit): TOptions;
    /**
     * Object that takes an event type (ex: `click`, `mouseover`) as key and a
     * listener as value. The listener is provided with an object that contains:
     * `event`, `item`, `marker`, `map`.
     */
    events: {
        [key: string]: (event: {
            item: any;
            marker: any;
            map: any;
            event: any;
        }) => void;
    };
};
export declare type GeoSearchWidgetParams = {
    /**
     * By default the map will set the zoom accordingly to the markers displayed on it.
     * When we refine it may happen that the results are empty. For those situations we
     * need to provide a zoom to render the map.
     * @default 1
     */
    initialZoom?: number;
    /**
     * By default the map will set the position accordingly to the markers displayed on it.
     * When we refine it may happen that the results are empty. For those situations we need
     * to provide a position to render the map. This option is ignored when the `position`
     * is provided.
     * @default { lat: 0, lng: 0 }
     */
    initialPosition?: GeoLoc;
    /** Templates to use for the widget. */
    templates?: GeoSearchTemplates;
    /** CSS classes to add to the wrapping elements. */
    cssClasses?: GeoSearchCSSClasses;
    /**
     * Options for customize the built-in Google Maps marker. This option is
     * ignored when the `customHTMLMarker` is provided.
     */
    builtInMarker?: Partial<GeoSearchMarker<google.maps.MarkerOptions>>;
    /**
     * Options to customize the HTML marker. We provide an alternative to the
     * built-in Google Maps marker in order to have a full control of the marker
     * rendering. You can use plain HTML to build your marker.
     */
    customHTMLMarker?: Partial<GeoSearchMarker<Partial<HTMLMarkerArguments>>> | boolean;
    /**
     * If true, the map is used to search - otherwise it's for display purposes only.
     * @default true
     */
    enableRefine?: boolean;
    /**
     * If true, a button is displayed on the map when the refinement is coming from
     * the map in order to remove it.
     * @default true
     */
    enableClearMapRefinement?: boolean;
    /**
     * If true, the user can toggle the option `enableRefineOnMapMove` directly from the map.
     * @default true
     */
    enableRefineControl?: boolean;
    /**
     * Option forwarded to the Google Maps constructor.
     * See the documentation for more information:
     * https://developers.google.com/maps/documentation/javascript/reference/3/#MapOptions
     */
    mapOptions?: google.maps.MapOptions;
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Reference to the global `window.google` object.
     * See [the documentation](https://developers.google.com/maps/documentation/javascript/tutorial) for more information.
     */
    googleReference: typeof window['google'];
};
export declare type GeoSearchWidget = WidgetFactory<GeoSearchWidgetDescription & {
    $$widgetType: 'ais.geoSearch';
}, GeoSearchConnectorParams, GeoSearchWidgetParams>;
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
declare const geoSearch: GeoSearchWidget;
export default geoSearch;
