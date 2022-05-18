import type algoliasearch from 'algoliasearch/lite';
import type * as AlgoliaSearch from 'algoliasearch/lite';
// @ts-ignore
import type * as ClientSearch from '@algolia/client-search';
// @ts-ignore
declare type SearchResponseV3<TObject> = AlgoliaSearch.Response<TObject>;
// @ts-ignore
declare type SearchResponseV4<TObject> = ClientSearch.SearchResponse<TObject>;
declare type SearchForFacetValuesResponseV3 = 
// @ts-ignore
AlgoliaSearch.SearchForFacetValues.Response;
// @ts-ignore
declare type SearchForFacetValuesResponseV4 = ClientSearch.SearchForFacetValuesResponse;
declare type RelevantSortResponse = {
    appliedRelevancyStrictness?: number;
    nbSortedHits?: number;
};
declare type DummySearchClientV4 = {
    readonly transporter: any;
};
declare type DefaultSearchClient = ReturnType<typeof algoliasearch>;
declare type SearchIndex = ReturnType<DefaultSearchClient['initIndex']>;
export declare type SearchClient = {
    search: DefaultSearchClient['search'];
    searchForFacetValues: DefaultSearchClient['searchForFacetValues'];
    addAlgoliaAgent?: DefaultSearchClient['addAlgoliaAgent'];
    initIndex?: (indexName: string) => SearchIndex extends {
        findAnswers: any;
    } ? Partial<Pick<SearchIndex, 'findAnswers'>> : SearchIndex;
};
export declare type MultiResponse<THit = any> = {
    results: Array<SearchResponse<THit>>;
};
export declare type SearchResponse<THit> = DefaultSearchClient extends DummySearchClientV4 ? SearchResponseV4<THit> : SearchResponseV3<THit> & RelevantSortResponse;
export declare type SearchForFacetValuesResponse = DefaultSearchClient extends DummySearchClientV4 ? SearchForFacetValuesResponseV4 : SearchForFacetValuesResponseV3;
export declare type FindAnswersParameters = SearchIndex extends {
    findAnswers: (...params: infer Params) => any;
} ? Params : any;
export declare type FindAnswersOptions = DefaultSearchClient extends DummySearchClientV4 ? ClientSearch.FindAnswersOptions : any;
export declare type FindAnswersResponse<TObject> = DefaultSearchClient extends DummySearchClientV4 ? ClientSearch.FindAnswersResponse<TObject> : any;
export {};
