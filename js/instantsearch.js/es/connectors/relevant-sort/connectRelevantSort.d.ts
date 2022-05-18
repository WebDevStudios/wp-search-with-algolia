import type { Connector, WidgetRenderState } from '../../types';
export declare type RelevantSortConnectorParams = Record<string, unknown>;
declare type Refine = (relevancyStrictness: number) => void;
export declare type RelevantSortRenderState = {
    /**
     * Indicates if it has appliedRelevancyStrictness greater than zero
     */
    isRelevantSorted: boolean;
    /**
     * Indicates if the results come from a virtual replica
     */
    isVirtualReplica: boolean;
    /**
     * Indicates if search state can be refined
     */
    canRefine: boolean;
    /**
     * Sets the value as relevancyStrictness and trigger a new search
     */
    refine: Refine;
};
export declare type RelevantSortWidgetDescription = {
    $$type: 'ais.relevantSort';
    renderState: RelevantSortRenderState;
    indexRenderState: {
        relevantSort: WidgetRenderState<RelevantSortRenderState, RelevantSortConnectorParams>;
    };
    indexUiState: {
        relevantSort: number;
    };
};
export declare type RelevantSortConnector = Connector<RelevantSortWidgetDescription, RelevantSortConnectorParams>;
declare const connectRelevantSort: RelevantSortConnector;
export default connectRelevantSort;
