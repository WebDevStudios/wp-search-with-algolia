
import { h } from 'preact';
import type { InsightsClient } from '../../types';
import type { InsightsEvent } from '../../middlewares/createInsightsMiddleware';
declare type WithInsightsListenerProps = {
    [key: string]: unknown;
    insights: InsightsClient;
    sendEvent?: (event: InsightsEvent) => void;
};
declare const insightsListener: (BaseComponent: any) => (props: WithInsightsListenerProps) => h.JSX.Element;
export default insightsListener;
