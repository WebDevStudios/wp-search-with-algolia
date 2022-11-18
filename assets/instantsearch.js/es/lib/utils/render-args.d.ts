import type { InstantSearch, UiState } from '../../types';
import type { IndexWidget } from '../../widgets/index/index';
export declare function createInitArgs(instantSearchInstance: InstantSearch, parent: IndexWidget, uiState: UiState): {
    uiState: UiState;
    helper: import("algoliasearch-helper").AlgoliaSearchHelper;
    parent: IndexWidget;
    instantSearchInstance: InstantSearch<UiState, UiState>;
    state: import("algoliasearch-helper").SearchParameters;
    renderState: import("../../types").RenderState;
    templatesConfig: Record<string, unknown>;
    createURL: (state: import("algoliasearch-helper").SearchParameters) => string;
    scopedResults: never[];
    searchMetadata: {
        isSearchStalled: boolean;
    };
    status: import("../InstantSearch").InstantSearchStatus;
    error: Error | undefined;
};
export declare function createRenderArgs(instantSearchInstance: InstantSearch, parent: IndexWidget): {
    helper: import("algoliasearch-helper").AlgoliaSearchHelper;
    parent: IndexWidget;
    instantSearchInstance: InstantSearch<UiState, UiState>;
    results: import("algoliasearch-helper").SearchResults<any>;
    scopedResults: import("../../types").ScopedResult[];
    state: import("algoliasearch-helper").SearchParameters;
    renderState: import("../../types").RenderState;
    templatesConfig: Record<string, unknown>;
    createURL: (state: import("algoliasearch-helper").SearchParameters) => string;
    searchMetadata: {
        isSearchStalled: boolean;
    };
    status: import("../InstantSearch").InstantSearchStatus;
    error: Error | undefined;
};
