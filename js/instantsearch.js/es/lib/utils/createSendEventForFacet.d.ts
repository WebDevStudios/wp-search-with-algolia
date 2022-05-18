import type { AlgoliaSearchHelper } from 'algoliasearch-helper';
import type { InstantSearch } from '../../types';
declare type BuiltInSendEventForFacet = (eventType: string, facetValue: string, eventName?: string) => void;
declare type CustomSendEventForFacet = (customPayload: any) => void;
export declare type SendEventForFacet = BuiltInSendEventForFacet & CustomSendEventForFacet;
export declare function createSendEventForFacet({ instantSearchInstance, helper, attribute, widgetType, }: {
    instantSearchInstance: InstantSearch;
    helper: AlgoliaSearchHelper;
    attribute: string;
    widgetType: string;
}): SendEventForFacet;
export {};
