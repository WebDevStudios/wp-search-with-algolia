/**
 * @jest-environment jsdom
 */
import type { InstantSearch, Hit, Hits } from '../../types';
declare type BuiltInSendEventForHits = (eventType: string, hits: Hit | Hits, eventName?: string) => void;
declare type CustomSendEventForHits = (customPayload: any) => void;
export declare type SendEventForHits = BuiltInSendEventForHits & CustomSendEventForHits;
declare type BuiltInBindEventForHits = (eventType: string, hits: Hit | Hits, eventName?: string) => string;
declare type CustomBindEventForHits = (customPayload: any) => string;
export declare type BindEventForHits = BuiltInBindEventForHits & CustomBindEventForHits;
export declare function createSendEventForHits({ instantSearchInstance, index, widgetType, }: {
    instantSearchInstance: InstantSearch;
    index: string;
    widgetType: string;
}): SendEventForHits;
export declare function createBindEventForHits({ index, widgetType, }: {
    index: string;
    widgetType: string;
}): BindEventForHits;
export {};
