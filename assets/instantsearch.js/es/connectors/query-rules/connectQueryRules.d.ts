import type { Connector, TransformItems, WidgetRenderState } from '../../types';
declare type TrackedFilterRefinement = string | number | boolean;
export declare type ParamTrackedFilters = {
    [facetName: string]: (facetValues: TrackedFilterRefinement[]) => TrackedFilterRefinement[];
};
export declare type ParamTransformRuleContexts = (ruleContexts: string[]) => string[];
export declare type QueryRulesConnectorParams = {
    trackedFilters?: ParamTrackedFilters;
    transformRuleContexts?: ParamTransformRuleContexts;
    transformItems?: TransformItems<any>;
};
export declare type QueryRulesRenderState = {
    items: any[];
};
export declare type QueryRulesWidgetDescription = {
    $$type: 'ais.queryRules';
    renderState: QueryRulesRenderState;
    indexRenderState: {
        queryRules: WidgetRenderState<QueryRulesRenderState, QueryRulesConnectorParams>;
    };
};
export declare type QueryRulesConnector = Connector<QueryRulesWidgetDescription, QueryRulesConnectorParams>;
declare const connectQueryRules: QueryRulesConnector;
export default connectQueryRules;
