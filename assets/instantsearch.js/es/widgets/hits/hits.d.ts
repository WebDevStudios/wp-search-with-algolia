
import type { HitsConnectorParams, HitsWidgetDescription } from '../../connectors/hits/connectHits';
import type { Template, TemplateWithBindEvent, Hit, WidgetFactory } from '../../types';
import type { SearchResults } from 'algoliasearch-helper';
export type HitsCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapping element.
     */
    root: string | string[];
    /**
     * CSS class to add to the wrapping element when no results.
     */
    emptyRoot: string | string[];
    /**
     * CSS class to add to the list of results.
     */
    list: string | string[];
    /**
     * CSS class to add to each result.
     */
    item: string | string[];
}>;
export type HitsTemplates = Partial<{
    /**
     * Template to use when there are no results.
     *
     * @default 'No Results'
     */
    empty: Template<SearchResults>;
    /**
     * Template to use for each result. This template will receive an object containing a single record.
     *
     * @default ''
     */
    item: TemplateWithBindEvent<Hit & {
        /** @deprecated the index in the hits array, use __position instead, which is the absolute position */
        __hitIndex: number;
    }>;
}>;
export type HitsWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: HitsTemplates;
    /**
     * CSS classes to add.
     */
    cssClasses?: HitsCSSClasses;
};
export type HitsWidget = WidgetFactory<HitsWidgetDescription & {
    $$widgetType: 'ais.hits';
}, HitsConnectorParams, HitsWidgetParams>;
declare const hits: HitsWidget;
export default hits;
