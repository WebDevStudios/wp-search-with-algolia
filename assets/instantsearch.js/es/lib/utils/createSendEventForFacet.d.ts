import type { AlgoliaSearchHelper } from 'algoliasearch-helper';
import type { InstantSearch } from '../../types';
declare type BuiltInSendEventForFacet = (eventType: string, facetValue: string, eventName?: string) => void;
declare type CustomSendEventForFacet = (customPayload: any) => void;
export declare type SendEventForFacet = BuiltInSendEventForFacet & CustomSendEventForFacet;
declare type CreateSendEventForFacetOptions = {
    instantSearchInstance: InstantSearch;
    helper: AlgoliaSearchHelper;
    attribute: string | ((facetValue: string) => string);
    widgetType: string;
};
export declare function createSendEventForFacet({ instantSearchInstance, helper, attribute: attr, widgetType, }: CreateSendEventForFacetOptions): SendEventForFacet;
export {};
