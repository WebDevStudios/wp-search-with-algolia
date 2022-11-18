// @ts-ignore
import type * as Places from 'places.js';
import type { WidgetFactory, WidgetRenderState } from '../../types';
declare type StaticOptions = Places.StaticOptions;
declare type PlacesInstance = Places.PlacesInstance;
declare type ReconfigurableOptions = Places.ReconfigurableOptions;
export declare type PlacesWidgetParams = {
    /**
     * The Algolia Places reference to use.
     *
     * @see https://github.com/algolia/places
     */
    placesReference: (options: StaticOptions & ReconfigurableOptions) => PlacesInstance;
    /**
     * The default position when the input is empty.
     */
    defaultPosition?: string[];
} & StaticOptions;
export declare type PlacesWidgetDescription = {
    $$type: 'ais.places';
    $$widgetType: 'ais.places';
    renderState: Record<string, unknown>;
    indexRenderState: {
        places: WidgetRenderState<Record<string, unknown>, PlacesWidgetParams>;
    };
    indexUiState: {
        places: {
            query: string;
            position: string;
        };
    };
};
export declare type PlacesWidget = WidgetFactory<PlacesWidgetDescription, PlacesWidgetParams, PlacesWidgetParams>;
/**
 * This widget sets the geolocation value for the search based on the selected
 * result in the Algolia Places autocomplete.
 */
declare const placesWidget: PlacesWidget;
export default placesWidget;
