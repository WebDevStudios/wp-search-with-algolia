/** @jsx h */
import type { WidgetFactory, Template } from '../../types';
import type { RelevantSortConnectorParams, RelevantSortWidgetDescription } from '../../connectors/relevant-sort/connectRelevantSort';
export declare type RelevantSortCSSClasses = Partial<{
    root: string;
    text: string;
    button: string;
}>;
export declare type RelevantSortTemplates = Partial<{
    text: Template<{
        isRelevantSorted: boolean;
    }>;
    button: Template<{
        isRelevantSorted: boolean;
    }>;
}>;
export declare type RelevantSortWidgetParams = {
    container: string | HTMLElement;
    cssClasses?: RelevantSortCSSClasses;
    templates?: RelevantSortTemplates;
};
export declare type RelevantSortWidget = WidgetFactory<RelevantSortWidgetDescription & {
    $$widgetType: 'ais.relevantSort';
}, RelevantSortConnectorParams, RelevantSortWidgetParams>;
declare const relevantSort: RelevantSortWidget;
export default relevantSort;
