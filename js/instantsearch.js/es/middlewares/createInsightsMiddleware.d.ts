import type { InsightsClient, InsightsClientMethod, InternalMiddleware, Hit } from '../types';
export declare type InsightsEvent = {
    insightsMethod?: InsightsClientMethod;
    payload: any;
    widgetType: string;
    eventType: string;
    hits?: Hit[];
    attribute?: string;
};
export declare type InsightsProps = {
    insightsClient: null | InsightsClient;
    insightsInitParams?: {
        userHasOptedOut?: boolean;
        useCookie?: boolean;
        cookieDuration?: number;
        region?: 'de' | 'us';
    };
    onEvent?: (event: InsightsEvent, insightsClient: null | InsightsClient) => void;
};
export declare type CreateInsightsMiddleware = (props: InsightsProps) => InternalMiddleware;
export declare const createInsightsMiddleware: CreateInsightsMiddleware;
