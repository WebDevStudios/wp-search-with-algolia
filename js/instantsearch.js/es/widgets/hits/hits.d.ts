/** @jsx h */
import type { HitsConnectorParams, HitsWidgetDescription } from '../../connectors/hits/connectHits';
import type { Template, TemplateWithBindEvent, Hit, WidgetFactory } from '../../types';
export declare type HitsCSSClasses = Partial<{
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
export declare type HitsTemplates = Partial<{
    /**
     * Template to use when there are no results.
     *
     * @default 'No Results'
     */
    empty: Template;
    /**
     * Template to use for each result. This template will receive an object containing a single record.
     *
     * @default ''
     */
    item: TemplateWithBindEvent<Hit & {
        __hitIndex: number;
    }>;
}>;
export declare type HitsWidgetParams = {
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
export declare type HitsWidget = WidgetFactory<HitsWidgetDescription & {
    $$widgetType: 'ais.hits';
}, HitsConnectorParams, HitsWidgetParams>;
declare const hits: HitsWidget;
export default hits;
