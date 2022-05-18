/** @jsx h */
import type { ClearRefinementsConnectorParams, ClearRefinementsWidgetDescription } from '../../connectors/clear-refinements/connectClearRefinements';
import type { WidgetFactory, Template } from '../../types';
export declare type ClearRefinementsCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapper element.
     */
    root: string | string[];
    /**
     * CSS class to add to the button of the widget.
     */
    button: string | string[];
    /**
     * CSS class to add to the button when there are no refinements.
     */
    disabledButton: string | string[];
}>;
export declare type ClearRefinementsTemplates = Partial<{
    /**
     * Template for the content of the button
     */
    resetLabel: Template;
}>;
export declare type ClearRefinementsWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Templates to use for the widget.
     */
    templates?: ClearRefinementsTemplates;
    /**
     * CSS classes to be added.
     */
    cssClasses?: ClearRefinementsCSSClasses;
};
export declare type ClearRefinementsWidget = WidgetFactory<ClearRefinementsWidgetDescription & {
    $$widgetType: 'ais.clearRefinements';
}, ClearRefinementsConnectorParams, ClearRefinementsWidgetParams>;
declare const clearRefinements: ClearRefinementsWidget;
export default clearRefinements;
