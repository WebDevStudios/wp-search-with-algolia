import type { InsightsEvent } from '../../middlewares/createInsightsMiddleware';
import type { InstantSearch, Hit } from '../../types';
type BuiltInSendEventForHits = (eventType: string, hits: Hit | Hit[], eventName?: string, additionalData?: Record<string, any>) => void;
type CustomSendEventForHits = (customPayload: any) => void;
export type SendEventForHits = BuiltInSendEventForHits & CustomSendEventForHits;
export type BuiltInBindEventForHits = (eventType: string, hits: Hit | Hit[], eventName?: string, additionalData?: Record<string, any>) => string;
export type CustomBindEventForHits = (customPayload: any) => string;
export type BindEventForHits = BuiltInBindEventForHits & CustomBindEventForHits;
export declare function _buildEventPayloadsForHits({ getIndex, widgetType, methodName, args, instantSearchInstance, }: {
    widgetType: string;
    getIndex: () => string;
    methodName: 'sendEvent' | 'bindEvent';
    args: any[];
    instantSearchInstance: InstantSearch;
}): InsightsEvent[];
export declare function createSendEventForHits({ instantSearchInstance, getIndex, widgetType, }: {
    instantSearchInstance: InstantSearch;
    getIndex: () => string;
    widgetType: string;
}): SendEventForHits;
export declare function createBindEventForHits({ getIndex, widgetType, instantSearchInstance, }: {
    getIndex: () => string;
    widgetType: string;
    instantSearchInstance: InstantSearch;
}): BindEventForHits;
export {};
