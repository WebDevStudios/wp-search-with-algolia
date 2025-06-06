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
    createURL: (nextState: import("algoliasearch-helper").SearchParameters | ((state: Partial<{
        query: string;
    } & {
        configure: import("algoliasearch-helper").PlainSearchParameters;
    } & {
        geoSearch: {
            boundingBox: string;
        };
    } & {
        hierarchicalMenu: {
            [rootAttribute: string]: string[];
        };
    } & {
        hitsPerPage: number;
    } & {
        page: number;
    } & {
        menu: {
            [attribute: string]: string;
        };
    } & {
        numericMenu: {
            [attribute: string]: string;
        };
    } & {
        page: number;
    } & {
        range: {
            [attribute: string]: string;
        };
    } & {
        ratingMenu: {
            [attribute: string]: number;
        };
    } & {
        refinementList: {
            [attribute: string]: string[];
        };
    } & {
        relevantSort: number;
    } & {
        query: string;
    } & {
        sortBy: string;
    } & {
        toggle: {
            [attribute: string]: boolean;
        };
    } & {
        query: string;
    } & {
        places: {
            query: string;
            position: string;
        };
    }>) => Partial<{
        query: string;
    } & {
        configure: import("algoliasearch-helper").PlainSearchParameters;
    } & {
        geoSearch: {
            boundingBox: string;
        };
    } & {
        hierarchicalMenu: {
            [rootAttribute: string]: string[];
        };
    } & {
        hitsPerPage: number;
    } & {
        page: number;
    } & {
        menu: {
            [attribute: string]: string;
        };
    } & {
        numericMenu: {
            [attribute: string]: string;
        };
    } & {
        page: number;
    } & {
        range: {
            [attribute: string]: string;
        };
    } & {
        ratingMenu: {
            [attribute: string]: number;
        };
    } & {
        refinementList: {
            [attribute: string]: string[];
        };
    } & {
        relevantSort: number;
    } & {
        query: string;
    } & {
        sortBy: string;
    } & {
        toggle: {
            [attribute: string]: boolean;
        };
    } & {
        query: string;
    } & {
        places: {
            query: string;
            position: string;
        };
    }>)) => string;
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
    createURL: (nextState: import("algoliasearch-helper").SearchParameters | ((state: Partial<{
        query: string;
    } & {
        configure: import("algoliasearch-helper").PlainSearchParameters;
    } & {
        geoSearch: {
            boundingBox: string;
        };
    } & {
        hierarchicalMenu: {
            [rootAttribute: string]: string[];
        };
    } & {
        hitsPerPage: number;
    } & {
        page: number;
    } & {
        menu: {
            [attribute: string]: string;
        };
    } & {
        numericMenu: {
            [attribute: string]: string;
        };
    } & {
        page: number;
    } & {
        range: {
            [attribute: string]: string;
        };
    } & {
        ratingMenu: {
            [attribute: string]: number;
        };
    } & {
        refinementList: {
            [attribute: string]: string[];
        };
    } & {
        relevantSort: number;
    } & {
        query: string;
    } & {
        sortBy: string;
    } & {
        toggle: {
            [attribute: string]: boolean;
        };
    } & {
        query: string;
    } & {
        places: {
            query: string;
            position: string;
        };
    }>) => Partial<{
        query: string;
    } & {
        configure: import("algoliasearch-helper").PlainSearchParameters;
    } & {
        geoSearch: {
            boundingBox: string;
        };
    } & {
        hierarchicalMenu: {
            [rootAttribute: string]: string[];
        };
    } & {
        hitsPerPage: number;
    } & {
        page: number;
    } & {
        menu: {
            [attribute: string]: string;
        };
    } & {
        numericMenu: {
            [attribute: string]: string;
        };
    } & {
        page: number;
    } & {
        range: {
            [attribute: string]: string;
        };
    } & {
        ratingMenu: {
            [attribute: string]: number;
        };
    } & {
        refinementList: {
            [attribute: string]: string[];
        };
    } & {
        relevantSort: number;
    } & {
        query: string;
    } & {
        sortBy: string;
    } & {
        toggle: {
            [attribute: string]: boolean;
        };
    } & {
        query: string;
    } & {
        places: {
            query: string;
            position: string;
        };
    }>)) => string;
    searchMetadata: {
        isSearchStalled: boolean;
    };
    status: import("../InstantSearch").InstantSearchStatus;
    error: Error | undefined;
};
