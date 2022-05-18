import type { Connector, TransformItems, WidgetRenderState } from '../../types';
/**
 * The **SortBy** connector provides the logic to build a custom widget that will display a
 * list of indices. With Algolia, this is most commonly used for changing ranking strategy. This allows
 * a user to change how the hits are being sorted.
 */
export declare type SortByItem = {
    /**
     * The name of the index to target.
     */
    value: string;
    /**
     * The label of the index to display.
     */
    label: string;
};
export declare type SortByConnectorParams = {
    /**
     * Array of objects defining the different indices to choose from.
     */
    items: SortByItem[];
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<SortByItem>;
};
export declare type SortByRenderState = {
    /**
     * The initially selected index.
     */
    initialIndex?: string;
    /**
     * The currently selected index.
     */
    currentRefinement: string;
    /**
     * All the available indices
     */
    options: SortByItem[];
    /**
     * Switches indices and triggers a new search.
     */
    refine: (value: string) => void;
    /**
     * `true` if the last search contains no result.
     */
    hasNoResults: boolean;
};
export declare type SortByWidgetDescription = {
    $$type: 'ais.sortBy';
    renderState: SortByRenderState;
    indexRenderState: {
        sortBy: WidgetRenderState<SortByRenderState, SortByConnectorParams>;
    };
    indexUiState: {
        sortBy: string;
    };
};
export declare type SortByConnector = Connector<SortByWidgetDescription, SortByConnectorParams>;
declare const connectSortBy: SortByConnector;
export default connectSortBy;
