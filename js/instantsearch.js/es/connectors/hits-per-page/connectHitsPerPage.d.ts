import type { Connector, TransformItems, WidgetRenderState } from '../../types';
export declare type HitsPerPageRenderStateItem = {
    /**
     * Label to display in the option.
     */
    label: string;
    /**
     * Number of hits to display per page.
     */
    value: number;
    /**
     * Indicates if it's the current refined value.
     */
    isRefined: boolean;
};
export declare type HitsPerPageConnectorParamsItem = {
    /**
     * Label to display in the option.
     */
    label: string;
    /**
     * Number of hits to display per page.
     */
    value: number;
    /**
     * The default hits per page on first search.
     *
     * @default false
     */
    default?: boolean;
};
export declare type HitsPerPageConnectorParams = {
    /**
     * Array of objects defining the different values and labels.
     */
    items: HitsPerPageConnectorParamsItem[];
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<HitsPerPageRenderStateItem>;
};
export declare type HitsPerPageRenderState = {
    /**
     * Array of objects defining the different values and labels.
     */
    items: HitsPerPageRenderStateItem[];
    /**
     * Sets the number of hits per page and triggers a search.
     */
    refine: (value: number) => void;
    /**
     * Indicates whether or not the search has results.
     */
    hasNoResults: boolean;
};
export declare type HitsPerPageWidgetDescription = {
    $$type: 'ais.hitsPerPage';
    renderState: HitsPerPageRenderState;
    indexRenderState: {
        hitsPerPage: WidgetRenderState<HitsPerPageRenderState, HitsPerPageConnectorParams>;
    };
    indexUiState: {
        hitsPerPage: number;
    };
};
export declare type HitsPerPageConnector = Connector<HitsPerPageWidgetDescription, HitsPerPageConnectorParams>;
declare const connectHitsPerPage: HitsPerPageConnector;
export default connectHitsPerPage;
