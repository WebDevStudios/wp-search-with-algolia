import type { SendEventForHits, BindEventForHits } from '../../lib/utils';
import type { TransformItems, Connector, Hit, WidgetRenderState, BaseHit } from '../../types';
import type { SearchResults } from 'algoliasearch-helper';
export type HitsRenderState<THit extends BaseHit = BaseHit> = {
    /**
     * The matched hits from Algolia API.
     */
    hits: Array<Hit<THit>>;
    /**
     * The response from the Algolia API.
     */
    results?: SearchResults<Hit<THit>>;
    /**
     * Sends an event to the Insights middleware.
     */
    sendEvent: SendEventForHits;
    /**
     * Returns a string for the `data-insights-event` attribute for the Insights middleware
     */
    bindEvent: BindEventForHits;
};
export type HitsConnectorParams<THit extends BaseHit = BaseHit> = {
    /**
     * Whether to escape HTML tags from hits string values.
     *
     * @default true
     */
    escapeHTML?: boolean;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<Hit<THit>>;
};
export type HitsWidgetDescription<THit extends BaseHit = BaseHit> = {
    $$type: 'ais.hits';
    renderState: HitsRenderState<THit>;
    indexRenderState: {
        hits: WidgetRenderState<HitsRenderState<THit>, HitsConnectorParams<THit>>;
    };
};
export type HitsConnector<THit extends BaseHit = BaseHit> = Connector<HitsWidgetDescription<THit>, HitsConnectorParams<THit>>;
declare const connectHits: HitsConnector;
export default connectHits;
