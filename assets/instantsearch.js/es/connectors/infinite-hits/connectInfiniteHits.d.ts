import type { SendEventForHits, BindEventForHits } from '../../lib/utils';
import type { Connector, TransformItems, Hit, WidgetRenderState, BaseHit } from '../../types';
import type { PlainSearchParameters, SearchResults } from 'algoliasearch-helper';
export type InfiniteHitsCachedHits<THit extends BaseHit> = {
    [page: number]: Array<Hit<THit>>;
};
type Read<THit extends BaseHit> = ({ state, }: {
    state: PlainSearchParameters;
}) => InfiniteHitsCachedHits<THit> | null;
type Write<THit extends BaseHit> = ({ state, hits, }: {
    state: PlainSearchParameters;
    hits: InfiniteHitsCachedHits<THit>;
}) => void;
export type InfiniteHitsCache<THit extends BaseHit = BaseHit> = {
    read: Read<THit>;
    write: Write<THit>;
};
export type InfiniteHitsConnectorParams<THit extends BaseHit = BaseHit> = {
    /**
     * Escapes HTML entities from hits string values.
     *
     * @default `true`
     */
    escapeHTML?: boolean;
    /**
     * Enable the button to load previous results.
     *
     * @default `false`
     */
    showPrevious?: boolean;
    /**
     * Receives the items, and is called before displaying them.
     * Useful for mapping over the items to transform, and remove or reorder them.
     */
    transformItems?: TransformItems<Hit<THit>>;
    /**
     * Reads and writes hits from/to cache.
     * When user comes back to the search page after leaving for product page,
     * this helps restore InfiniteHits and its scroll position.
     */
    cache?: InfiniteHitsCache<THit>;
};
export type InfiniteHitsRenderState<THit extends BaseHit = BaseHit> = {
    /**
     * Loads the previous results.
     */
    showPrevious: () => void;
    /**
     * Loads the next page of hits.
     */
    showMore: () => void;
    /**
     * Indicates whether the first page of hits has been reached.
     */
    isFirstPage: boolean;
    /**
     * Indicates whether the last page of hits has been reached.
     */
    isLastPage: boolean;
    /**
     * Send event to insights middleware
     */
    sendEvent: SendEventForHits;
    /**
     * Returns a string of data-insights-event attribute for insights middleware
     */
    bindEvent: BindEventForHits;
    /**
     * Hits for the current page
     */
    currentPageHits: Array<Hit<THit>>;
    /**
     * Hits for current and cached pages
     */
    hits: Array<Hit<THit>>;
    /**
     * The response from the Algolia API.
     */
    results?: SearchResults<Hit<THit>>;
};
export type InfiniteHitsWidgetDescription<THit extends BaseHit = BaseHit> = {
    $$type: 'ais.infiniteHits';
    renderState: InfiniteHitsRenderState<THit>;
    indexRenderState: {
        infiniteHits: WidgetRenderState<InfiniteHitsRenderState<THit>, InfiniteHitsConnectorParams<THit>>;
    };
    indexUiState: {
        page: number;
    };
};
export type InfiniteHitsConnector<THit extends BaseHit = BaseHit> = Connector<InfiniteHitsWidgetDescription<THit>, InfiniteHitsConnectorParams<THit>>;
declare const connectInfiniteHits: InfiniteHitsConnector;
export default connectInfiniteHits;
