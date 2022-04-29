/** @jsx h */
import type { SortByConnectorParams, SortByItem, SortByWidgetDescription } from '../../connectors/sort-by/connectSortBy';
import type { TransformItems, WidgetFactory } from '../../types';
export declare type SortByWidgetCssClasses = Partial<{
    /**
     * CSS classes added to the outer `<div>`.
     */
    root: string | string[];
    /**
     * CSS classes added to the parent `<select>`.
     */
    select: string | string[];
    /**
     * CSS classes added to each `<option>`.
     */
    option: string | string[];
}>;
export declare type SortByIndexDefinition = {
    /**
     * The name of the index to target.
     */
    value: string;
    /**
     * The label of the index to display.
     */
    label: string;
};
export declare type SortByWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * Array of objects defining the different indices to choose from.
     */
    items: SortByIndexDefinition[];
    /**
     * CSS classes to be added.
     */
    cssClasses?: SortByWidgetCssClasses;
    /**
     * Function to transform the items passed to the templates.
     */
    transformItems?: TransformItems<SortByItem>;
};
export declare type SortByWidget = WidgetFactory<SortByWidgetDescription & {
    $$widgetType: 'ais.sortBy';
}, SortByConnectorParams, SortByWidgetParams>;
/**
 * Sort by selector is a widget used for letting the user choose between different
 * indices that contains the same data with a different order / ranking formula.
 */
declare const sortBy: SortByWidget;
export default sortBy;
