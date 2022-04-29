/** @jsx h */
import type { StatsComponentTemplates } from '../../components/Stats/Stats';
import type { StatsConnectorParams, StatsRenderState, StatsWidgetDescription } from '../../connectors/stats/connectStats';
import type { Template, WidgetFactory } from '../../types';
export declare type StatsCSSClasses = Partial<{
    /**
     * CSS class to add to the root element.
     */
    root: string | string[];
    /**
     * CSS class to add to the text span element.
     */
    text: string | string[];
}>;
export declare type StatsTemplates = Partial<{
    /**
     * Text template, provided with `hasManyResults`, `hasNoResults`, `hasOneResult`, `hitsPerPage`, `nbHits`, `nbSortedHits`, `nbPages`, `areHitsSorted`, `page`, `processingTimeMS`, `query`.
     */
    text: Template<{
        hasManyResults: boolean;
        hasNoResults: boolean;
        hasOneResult: boolean;
    } & StatsRenderState>;
}>;
export declare type StatsWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: StatsTemplates;
    /**
     * CSS classes to add.
     */
    cssClasses?: StatsCSSClasses;
};
export declare type StatsWidget = WidgetFactory<StatsWidgetDescription & {
    $$widgetType: 'ais.stats';
}, StatsConnectorParams, StatsWidgetParams>;
export declare const defaultTemplates: StatsComponentTemplates;
/**
 * The `stats` widget is used to display useful insights about the current results.
 *
 * By default, it will display the **number of hits** and the time taken to compute the
 * results inside the engine.
 */
declare const stats: StatsWidget;
export default stats;
