import type { AlgoliaSearchHelper as Helper, SearchParameters, SearchResults } from 'algoliasearch-helper';
import type { InstantSearch, UiState, IndexUiState, Widget, ScopedResult } from '../../types';
export declare type IndexWidgetParams = {
    indexName: string;
    indexId?: string;
};
export declare type IndexInitOptions = {
    instantSearchInstance: InstantSearch;
    parent: IndexWidget | null;
    uiState: UiState;
};
export declare type IndexRenderOptions = {
    instantSearchInstance: InstantSearch;
};
export declare type IndexWidgetDescription = {
    $$type: 'ais.index';
    $$widgetType: 'ais.index';
};
export declare type IndexWidget = Omit<Widget<IndexWidgetDescription & {
    widgetParams: IndexWidgetParams;
}>, 'getWidgetUiState' | 'getWidgetState'> & {
    getIndexName(): string;
    getIndexId(): string;
    getHelper(): Helper | null;
    getResults(): SearchResults | null;
    getScopedResults(): ScopedResult[];
    getParent(): IndexWidget | null;
    getWidgets(): Array<Widget | IndexWidget>;
    createURL(state: SearchParameters): string;
    addWidgets(widgets: Array<Widget | IndexWidget>): IndexWidget;
    removeWidgets(widgets: Array<Widget | IndexWidget>): IndexWidget;
    init(options: IndexInitOptions): void;
    render(options: IndexRenderOptions): void;
    dispose(): void;
    /**
     * @deprecated
     */
    getWidgetState(uiState: UiState): UiState;
    getWidgetUiState<TUiState = UiState>(uiState: TUiState): TUiState;
    getWidgetSearchParameters(searchParameters: SearchParameters, searchParametersOptions: {
        uiState: IndexUiState;
    }): SearchParameters;
    refreshUiState(): void;
};
declare const index: (widgetParams: IndexWidgetParams) => IndexWidget;
export default index;
