import type { SendEventForFacet } from '../../lib/utils';
import type { Connector, WidgetRenderState } from '../../types';
export declare type RangeMin = number | undefined;
export declare type RangeMax = number | undefined;
export declare type RangeBoundaries = [RangeMin, RangeMax];
export declare type Range = {
    min: RangeMin;
    max: RangeMax;
};
export declare type RangeRenderState = {
    /**
     * Sets a range to filter the results on. Both values
     * are optional, and will default to the higher and lower bounds. You can use `undefined` to remove a
     * previously set bound or to set an infinite bound.
     * @param rangeValue tuple of [min, max] bounds
     */
    refine(rangeValue: RangeBoundaries): void;
    /**
     * Indicates whether this widget can be refined
     */
    canRefine: boolean;
    /**
     * Send an event to the insights middleware
     */
    sendEvent: SendEventForFacet;
    /**
     * Maximum range possible for this search
     */
    range: Range;
    /**
     * Current refinement of the search
     */
    start: RangeBoundaries;
    /**
     * Transform for the rendering `from` and/or `to` values.
     * Both functions take a `number` as input and should output a `string`.
     */
    format: {
        from(fromValue: number): string;
        to(toValue: number): string;
    };
};
export declare type RangeConnectorParams = {
    /**
     * Name of the attribute for faceting.
     */
    attribute: string;
    /**
     * Minimal range value, default to automatically computed from the result set.
     */
    min?: number;
    /**
     * Maximal range value, default to automatically computed from the result set.
     */
    max?: number;
    /**
     * Number of digits after decimal point to use.
     */
    precision?: number;
};
export declare type RangeWidgetDescription = {
    $$type: 'ais.range';
    renderState: RangeRenderState;
    indexRenderState: {
        range: {
            [attribute: string]: WidgetRenderState<RangeRenderState, RangeConnectorParams>;
        };
    };
    indexUiState: {
        range: {
            [attribute: string]: string;
        };
    };
};
export declare type RangeConnector = Connector<RangeWidgetDescription, RangeConnectorParams>;
/**
 * **Range** connector provides the logic to create custom widget that will let
 * the user refine results using a numeric range.
 *
 * This connectors provides a `refine()` function that accepts bounds. It will also provide
 * information about the min and max bounds for the current result set.
 */
declare const connectRange: RangeConnector;
export default connectRange;
