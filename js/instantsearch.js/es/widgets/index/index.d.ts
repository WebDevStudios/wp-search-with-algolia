import type { AlgoliaSearchHelper as Helper, SearchParameters, SearchResults } from 'algoliasearch-helper';
import type { UiState, IndexUiState, Widget, InitOptions, RenderOptions, ScopedResult } from '../../types';
export declare type IndexWidgetParams = {
    indexName: string;
    indexId?: string;
};
declare type IndexInitOptions = Pick<InitOptions, 'instantSearchInstance' | 'parent' | 'uiState'>;
declare type IndexRenderOptions = Pick<RenderOptions, 'instantSearchInstance'>;
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
export declare function isIndexWidget(widget: Widget | IndexWidget): widget is IndexWidget;
declare const index: (widgetParams: IndexWidgetParams) => IndexWidget;
export default index;
