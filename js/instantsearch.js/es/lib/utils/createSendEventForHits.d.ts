import type { InsightsEvent } from '../../middlewares/createInsightsMiddleware';
import type { InstantSearch, Hit } from '../../types';
type BuiltInSendEventForHits = (eventType: string, hits: Hit | Hit[], eventName?: string) => void;
type CustomSendEventForHits = (customPayload: any) => void;
export type SendEventForHits = BuiltInSendEventForHits & CustomSendEventForHits;
export type BuiltInBindEventForHits = (eventType: string, hits: Hit | Hit[], eventName?: string) => string;
export type CustomBindEventForHits = (customPayload: any) => string;
export type BindEventForHits = BuiltInBindEventForHits & CustomBindEventForHits;
export declare function _buildEventPayloadsForHits({ index, widgetType, methodName, args, instantSearchInstance, }: {
    widgetType: string;
    index: string;
    methodName: 'sendEvent' | 'bindEvent';
    args: any[];
    instantSearchInstance: InstantSearch;
}): InsightsEvent[];
export declare function createSendEventForHits({ instantSearchInstance, index, widgetType, }: {
    instantSearchInstance: InstantSearch;
    index: string;
    widgetType: string;
}): SendEventForHits;
export declare function createBindEventForHits({ index, widgetType, instantSearchInstance, }: {
    index: string;
    widgetType: string;
    instantSearchInstance: InstantSearch;
}): BindEventForHits;
export {};
