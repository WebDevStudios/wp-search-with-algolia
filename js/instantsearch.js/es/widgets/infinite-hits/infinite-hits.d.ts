/** @jsx h */
import type { SearchResults } from 'algoliasearch-helper';
import type { InfiniteHitsConnectorParams, InfiniteHitsCache, InfiniteHitsWidgetDescription } from '../../connectors/infinite-hits/connectInfiniteHits';
import type { WidgetFactory, Template, TemplateWithBindEvent, Hit } from '../../types';
export declare type InfiniteHitsCSSClasses = Partial<{
    /**
     * The root element of the widget.
     */
    root: string | string[];
    /**
     * The root container without results.
     */
    emptyRoot: string | string[];
    /**
     * The list of results.
     */
    list: string | string[];
    /**
     * The list item.
     */
    item: string | string[];
    /**
     * The “Show previous” button.
     */
    loadPrevious: string | string[];
    /**
     * The disabled “Show previous” button.
     */
    disabledLoadPrevious: string | string[];
    /**
     * The “Show more” button.
     */
    loadMore: string | string[];
    /**
     * The disabled “Show more” button.
     */
    disabledLoadMore: string | string[];
}>;
export declare type InfiniteHitsTemplates = Partial<{
    /**
     * The template to use when there are no results.
     */
    empty: Template<{
        results: SearchResults;
    }>;
    /**
     * The template to use for the “Show previous” label.
     */
    showPreviousText: Template;
    /**
     * The template to use for the “Show more” label.
     */
    showMoreText: Template;
    /**
     * The template to use for each result.
     */
    item: TemplateWithBindEvent<Hit & {
        __hitIndex: number;
    }>;
}>;
export declare type InfiniteHitsWidgetParams = {
    /**
     * The CSS Selector or `HTMLElement` to insert the widget into.
     */
    container: string | HTMLElement;
    /**
     * The CSS classes to override.
     */
    cssClasses?: InfiniteHitsCSSClasses;
    /**
     * The templates to use for the widget.
     */
    templates?: InfiniteHitsTemplates;
    /**
     * Reads and writes hits from/to cache.
     * When user comes back to the search page after leaving for product page,
     * this helps restore InfiniteHits and its scroll position.
     */
    cache?: InfiniteHitsCache;
};
export declare type InfiniteHitsWidget = WidgetFactory<InfiniteHitsWidgetDescription & {
    $$widgetType: 'ais.infiniteHits';
}, InfiniteHitsConnectorParams, InfiniteHitsWidgetParams>;
declare const infiniteHits: InfiniteHitsWidget;
export default infiniteHits;
