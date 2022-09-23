import type { AlgoliaSearchHelper } from 'algoliasearch-helper';
import EventEmitter from '@algolia/events';
import type { IndexWidget } from '../widgets/index/index';
import type { InsightsClient as AlgoliaInsightsClient, SearchClient, Widget, UiState, CreateURL, Middleware, MiddlewareDefinition, RenderState, InitialResults } from '../types';
import type { RouterProps } from '../middlewares/createRouterMiddleware';
import type { InsightsEvent } from '../middlewares/createInsightsMiddleware';
declare type NoInfer<T> = [T][T extends any ? 0 : never];
/**
 * Global options for an InstantSearch instance.
 */
export declare type InstantSearchOptions<TUiState extends UiState = UiState, TRouteState = TUiState> = {
    /**
     * The name of the main index
     */
    indexName: string;
    /**
     * The search client to plug to InstantSearch.js
     *
     * Usage:
     * ```javascript
     * // Using the default Algolia search client
     * instantsearch({
     *   indexName: 'indexName',
     *   searchClient: algoliasearch('appId', 'apiKey')
     * });
     *
     * // Using a custom search client
     * instantsearch({
     *   indexName: 'indexName',
     *   searchClient: {
     *     search(requests) {
     *       // fetch response based on requests
     *       return response;
     *     },
     *     searchForFacetValues(requests) {
     *       // fetch response based on requests
     *       return response;
     *     }
     *   }
     * });
     * ```
     */
    searchClient: SearchClient;
    /**
     * The locale used to display numbers. This will be passed
     * to `Number.prototype.toLocaleString()`
     */
    numberLocale?: string;
    /**
     * A hook that will be called each time a search needs to be done, with the
     * helper as a parameter. It's your responsibility to call `helper.search()`.
     * This option allows you to avoid doing searches at page load for example.
     */
    searchFunction?: (helper: AlgoliaSearchHelper) => void;
    /**
     * Function called when the state changes.
     *
     * Using this function makes the instance controlled. This means that you
     * become in charge of updating the UI state with the `setUiState` function.
     */
    onStateChange?: (params: {
        uiState: TUiState;
        setUiState(uiState: TUiState | ((previousUiState: TUiState) => TUiState)): void;
    }) => void;
    /**
     * Injects a `uiState` to the `instantsearch` instance. You can use this option
     * to provide an initial state to a widget. Note that the state is only used
     * for the first search. To unconditionally pass additional parameters to the
     * Algolia API, take a look at the `configure` widget.
     */
    initialUiState?: NoInfer<TUiState>;
    /**
     * Time before a search is considered stalled. The default is 200ms
     */
    stalledSearchDelay?: number;
    /**
     * Router configuration used to save the UI State into the URL or any other
     * client side persistence. Passing `true` will use the default URL options.
     */
    routing?: RouterProps<TUiState, TRouteState> | boolean;
    /**
     * the instance of search-insights to use for sending insights events inside
     * widgets like `hits`.
     *
     * @deprecated This property will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
     */
    insightsClient?: AlgoliaInsightsClient;
};
/**
 * The actual implementation of the InstantSearch. This is
 * created using the `instantsearch` factory function.
 * It emits the 'render' event every time a search is done
 */
declare class InstantSearch<TUiState extends UiState = UiState, TRouteState = TUiState> extends EventEmitter {
    client: InstantSearchOptions['searchClient'];
    indexName: string;
    insightsClient: AlgoliaInsightsClient | null;
    onStateChange: InstantSearchOptions<TUiState>['onStateChange'] | null;
    helper: AlgoliaSearchHelper | null;
    mainHelper: AlgoliaSearchHelper | null;
    mainIndex: IndexWidget;
    started: boolean;
    templatesConfig: Record<string, unknown>;
    renderState: RenderState;
    _stalledSearchDelay: number;
    _searchStalledTimer: any;
    _isSearchStalled: boolean;
    _initialUiState: TUiState;
    _initialResults: InitialResults | null;
    _createURL: CreateURL<TUiState>;
    _searchFunction?: InstantSearchOptions['searchFunction'];
    _mainHelperSearch?: AlgoliaSearchHelper['search'];
    middleware: Array<{
        creator: Middleware;
        instance: MiddlewareDefinition;
    }>;
    sendEventToInsights: (event: InsightsEvent) => void;
    constructor(options: InstantSearchOptions<TUiState, TRouteState>);
    /**
     * Hooks a middleware into the InstantSearch lifecycle.
     */
    use(...middleware: Middleware[]): this;
    /**
     * Removes a middleware from the InstantSearch lifecycle.
     */
    unuse(...middlewareToUnuse: Middleware[]): this;
    EXPERIMENTAL_use(...middleware: Middleware[]): this;
    /**
     * Adds a widget to the search instance.
     * A widget can be added either before or after InstantSearch has started.
     * @param widget The widget to add to InstantSearch.
     *
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `addWidgets([widget])`.
     */
    addWidget(widget: Widget): this;
    /**
     * Adds multiple widgets to the search instance.
     * Widgets can be added either before or after InstantSearch has started.
     * @param widgets The array of widgets to add to InstantSearch.
     */
    addWidgets(widgets: Array<Widget | IndexWidget>): this;
    /**
     * Removes a widget from the search instance.
     * @deprecated This method will still be supported in 4.x releases, but not further. It is replaced by `removeWidgets([widget])`
     * @param widget The widget instance to remove from InstantSearch.
     *
     * The widget must implement a `dispose()` method to clear its state.
     */
    removeWidget(widget: Widget | IndexWidget): this;
    /**
     * Removes multiple widgets from the search instance.
     * @param widgets Array of widgets instances to remove from InstantSearch.
     *
     * The widgets must implement a `dispose()` method to clear their states.
     */
    removeWidgets(widgets: Array<Widget | IndexWidget>): this;
    /**
     * Ends the initialization of InstantSearch.js and triggers the
     * first search. This method should be called after all widgets have been added
     * to the instance of InstantSearch.js. InstantSearch.js also supports adding and removing
     * widgets after the start as an **EXPERIMENTAL** feature.
     */
    start(): void;
    /**
     * Removes all widgets without triggering a search afterwards. This is an **EXPERIMENTAL** feature,
     * if you find an issue with it, please
     * [open an issue](https://github.com/algolia/instantsearch.js/issues/new?title=Problem%20with%20dispose).
     * @return {undefined} This method does not return anything
     */
    dispose(): void;
    scheduleSearch: ((...args: any[]) => void) & {
        wait(): Promise<void>;
        cancel(): void;
    };
    scheduleRender: ((...args: any[]) => void) & {
        wait(): Promise<void>;
        cancel(): void;
    };
    scheduleStalledRender(): void;
    /**
     * Set the UI state and trigger a search.
     * @param uiState The next UI state or a function computing it from the current state
     * @param callOnStateChange private parameter used to know if the method is called from a state change
     */
    setUiState(uiState: TUiState | ((previousUiState: TUiState) => TUiState), callOnStateChange?: boolean): void;
    getUiState(): TUiState;
    onInternalStateChange: ((...args: any[]) => void) & {
        wait(): Promise<void>;
        cancel(): void;
    };
    createURL(nextState?: TUiState): string;
    refresh(): void;
}
export default InstantSearch;
