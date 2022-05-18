import type { SearchResults } from 'algoliasearch-helper';
import type { SendEventForHits } from '../../lib/utils';
import type { Hits, Connector, WidgetRenderState } from '../../types';
export declare type AutocompleteConnectorParams = {
    /**
     * Escapes HTML entities from hits string values.
     *
     * @default `true`
     */
    escapeHTML?: boolean;
};
export declare type AutocompleteRenderState = {
    /**
     * The current value of the query.
     */
    currentRefinement: string;
    /**
     * The indices this widget has access to.
     */
    indices: Array<{
        /**
         * The name of the index
         */
        indexName: string;
        /**
         * The resolved hits from the index matching the query.
         */
        hits: Hits;
        /**
         * The full results object from the Algolia API.
         */
        results: SearchResults;
        /**
         * Send event to insights middleware
         */
        sendEvent: SendEventForHits;
    }>;
    /**
     * Searches into the indices with the provided query.
     */
    refine: (query: string) => void;
};
export declare type AutocompleteWidgetDescription = {
    $$type: 'ais.autocomplete';
    renderState: AutocompleteRenderState;
    indexRenderState: {
        autocomplete: WidgetRenderState<AutocompleteRenderState, AutocompleteConnectorParams>;
    };
    indexUiState: {
        query: string;
    };
};
export declare type AutocompleteConnector = Connector<AutocompleteWidgetDescription, AutocompleteConnectorParams>;
declare const connectAutocomplete: AutocompleteConnector;
export default connectAutocomplete;
