/** @jsx h */
import type { WidgetFactory, Template } from '../../types';
import type { SearchBoxConnectorParams, SearchBoxWidgetDescription } from '../../connectors/search-box/connectSearchBox';
export declare type SearchBoxTemplates = Partial<{
    /**
     * Template used for displaying the submit button. Can accept a function or a Hogan string.
     */
    submit: Template;
    /**
     * Template used for displaying the reset button. Can accept a function or a Hogan string.
     */
    reset: Template;
    /**
     * Template used for displaying the loading indicator. Can accept a function or a Hogan string.
     */
    loadingIndicator: Template;
}>;
export declare type SearchBoxCSSClasses = Partial<{
    /**
     * CSS class to add to the wrapping `<div>`
     */
    root: string | string[];
    /**
     * CSS class to add to the form
     */
    form: string | string[];
    /**
     * CSS class to add to the input.
     */
    input: string | string[];
    /**
     * CSS classes added to the submit button.
     */
    submit: string | string[];
    /**
     * CSS classes added to the submit icon.
     */
    submitIcon: string | string[];
    /**
     * CSS classes added to the reset button.
     */
    reset: string | string[];
    /**
     * CSS classes added to the reset icon.
     */
    resetIcon: string | string[];
    /**
     * CSS classes added to the loading indicator element.
     */
    loadingIndicator: string | string[];
    /**
     * CSS classes added to the loading indicator icon.
     */
    loadingIcon: string | string[];
}>;
export declare type SearchBoxWidgetParams = {
    /**
     * CSS Selector or HTMLElement to insert the widget
     */
    container: string | HTMLElement;
    /**
     * The placeholder of the input
     */
    placeholder?: string;
    /**
     * Whether the input should be autofocused
     */
    autofocus?: boolean;
    /**
     * If set, trigger the search
     * once `<Enter>` is pressed only.
     */
    searchAsYouType?: boolean;
    /**
     * Whether to show the reset button
     */
    showReset?: boolean;
    /**
     * Whether to show the submit button
     */
    showSubmit?: boolean;
    /**
     * Whether to show the loading indicator (replaces the submit if
     * the search is stalled)
     */
    showLoadingIndicator?: boolean;
    /**
     * CSS classes to add
     */
    cssClasses?: SearchBoxCSSClasses;
    /**
     * Templates used for customizing the rendering of the searchbox
     */
    templates?: SearchBoxTemplates;
    /**
     * A function that is called every time a new search is done. You
     * will get the query as the first parameter and a search (query) function to call as the second parameter.
     * This `queryHook` can be used to debounce the number of searches done from the search box.
     */
    queryHook?: (query: string, hook: (value: string) => void) => void;
};
/**
 * The searchbox widget is used to let the user set a text based query.
 *
 * This is usually the  main entry point to start the search in an instantsearch context. For that
 * reason is usually placed on top, and not hidden so that the user can start searching right
 * away.
 *
 */
export declare type SearchBoxWidget = WidgetFactory<SearchBoxWidgetDescription & {
    $$widgetType: 'ais.searchBox';
}, SearchBoxConnectorParams, SearchBoxWidgetParams>;
declare const searchBox: SearchBoxWidget;
export default searchBox;
