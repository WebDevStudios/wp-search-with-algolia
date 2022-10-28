import type { InsightsClient, InsightsClientMethod, InternalMiddleware, Hit } from '../types';
export declare type InsightsEvent = {
    insightsMethod?: InsightsClientMethod;
    payload: any;
    widgetType: string;
    eventType: string;
    hits?: Hit[];
    attribute?: string;
};
export declare type InsightsProps<TInsightsClient extends null | InsightsClient = InsightsClient | null> = {
    insightsClient: TInsightsClient;
    insightsInitParams?: {
        userHasOptedOut?: boolean;
        useCookie?: boolean;
        cookieDuration?: number;
        region?: 'de' | 'us';
    };
    onEvent?: (event: InsightsEvent, insightsClient: TInsightsClient) => void;
};
export declare type CreateInsightsMiddleware = typeof createInsightsMiddleware;
export declare function createInsightsMiddleware<TInsightsClient extends null | InsightsClient>(props: InsightsProps<TInsightsClient>): InternalMiddleware;
