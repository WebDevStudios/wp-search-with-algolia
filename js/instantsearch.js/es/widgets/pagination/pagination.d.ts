/** @jsx h */
import type { PaginationConnectorParams, PaginationWidgetDescription } from '../../connectors/pagination/connectPagination';
import type { WidgetFactory } from '../../types';
export declare type PaginationCSSClasses = Partial<{
    /**
     * CSS classes added to the root element of the widget.
     */
    root: string | string[];
    /**
     * CSS class to add to the root element of the widget if there are no refinements.
     */
    noRefinementRoot: string | string[];
    /**
     * CSS classes added to the wrapping `<ul>`.
     */
    list: string | string[];
    /**
     * CSS classes added to each `<li>`.
     */
    item: string | string[];
    /**
     * CSS classes added to the first `<li>`.
     */
    firstPageItem: string | string[];
    /**
     * CSS classes added to the last `<li>`.
     */
    lastPageItem: string | string[];
    /**
     * CSS classes added to the previous `<li>`.
     */
    previousPageItem: string | string[];
    /**
     * CSS classes added to the next `<li>`.
     */
    nextPageItem: string | string[];
    /**
     * CSS classes added to page `<li>`.
     */
    pageItem: string | string[];
    /**
     * CSS classes added to the selected `<li>`.
     */
    selectedItem: string | string[];
    /**
     * CSS classes added to the disabled `<li>`.
     */
    disabledItem: string | string[];
    /**
     * CSS classes added to each link.
     */
    link: string | string[];
}>;
export declare type PaginationTemplates = Partial<{
    /**
     * Label for the Previous link.
     */
    previous: string;
    /**
     * Label for the Next link.
     */
    next: string;
    /**
     * Label for the First link.
     */
    first: string;
    /**
     * Label for the Last link.
     */
    last: string;
}>;
export declare type PaginationWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget.
     */
    container: string | HTMLElement;
    /**
     * The max number of pages to browse.
     */
    totalPages?: number;
    /**
     * The number of pages to display on each side of the current page.
     * @default 3
     */
    padding?: number;
    /**
     * Where to scroll after a click, set to `false` to disable.
     * @default body
     */
    scrollTo?: string | HTMLElement | boolean;
    /**
     * Whether to show the "first page" control
     * @default true
     */
    showFirst?: boolean;
    /**
     * Whether to show the "last page" control
     * @default true
     */
    showLast?: boolean;
    /**
     * Whether to show the "next page" control
     * @default true
     */
    showNext?: boolean;
    /**
     * Whether to show the "previous page" control
     * @default true
     */
    showPrevious?: boolean;
    /**
     * Text to display in the links.
     */
    templates?: PaginationTemplates;
    /**
     * CSS classes to be added.
     */
    cssClasses?: PaginationCSSClasses;
};
export declare type PaginationWidget = WidgetFactory<PaginationWidgetDescription & {
    $$widgetType: 'ais.pagination';
}, PaginationConnectorParams, PaginationWidgetParams>;
declare const pagination: PaginationWidget;
export default pagination;
