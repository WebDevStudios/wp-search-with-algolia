import type { InstantSearch, UiState, IndexUiState, Widget, ScopedResult, RecommendResponse } from '../../types';
import type { AlgoliaSearchHelper as Helper, SearchParameters, SearchResults } from 'algoliasearch-helper';
export type IndexWidgetParams = {
    indexName: string;
    indexId?: string;
};
export type IndexInitOptions = {
    instantSearchInstance: InstantSearch;
    parent: IndexWidget | null;
    uiState: UiState;
};
export type IndexRenderOptions = {
    instantSearchInstance: InstantSearch;
};
export type IndexWidgetDescription = {
    $$type: 'ais.index';
    $$widgetType: 'ais.index';
};
export type IndexWidget<TUiState extends UiState = UiState> = Omit<Widget<IndexWidgetDescription & {
    widgetParams: IndexWidgetParams;
}>, 'getWidgetUiState' | 'getWidgetState'> & {
    getIndexName: () => string;
    getIndexId: () => string;
    getHelper: () => Helper | null;
    getResults: () => SearchResults | null;
    getResultsForWidget: (widget: IndexWidget | Widget) => SearchResults | RecommendResponse<any> | null;
    getPreviousState: () => SearchParameters | null;
    getScopedResults: () => ScopedResult[];
    getParent: () => IndexWidget | null;
    getWidgets: () => Array<Widget | IndexWidget>;
    createURL: (nextState: SearchParameters | ((state: IndexUiState) => IndexUiState)) => string;
    addWidgets: (widgets: Array<Widget | IndexWidget>) => IndexWidget;
    removeWidgets: (widgets: Array<Widget | IndexWidget>) => IndexWidget;
    init: (options: IndexInitOptions) => void;
    render: (options: IndexRenderOptions) => void;
    dispose: () => void;
    /**
     * @deprecated
     */
    getWidgetState: (uiState: UiState) => UiState;
    getWidgetUiState: <TSpecificUiState extends UiState = TUiState>(uiState: TSpecificUiState) => TSpecificUiState;
    getWidgetSearchParameters: (searchParameters: SearchParameters, searchParametersOptions: {
        uiState: IndexUiState;
    }) => SearchParameters;
    /**
     * Set this index' UI state back to the state defined by the widgets.
     * Can only be called after `init`.
     */
    refreshUiState: () => void;
    /**
     * Set this index' UI state and search. This is the equivalent of calling
     * a spread `setUiState` on the InstantSearch instance.
     * Can only be called after `init`.
     */
    setIndexUiState: (indexUiState: TUiState[string] | ((previousIndexUiState: TUiState[string]) => TUiState[string])) => void;
};
declare const index: (widgetParams: IndexWidgetParams) => IndexWidget;
export default index;
