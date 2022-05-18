import type { WidgetFactory } from '../../types';
import type { ParamTrackedFilters, ParamTransformRuleContexts, QueryRulesConnectorParams, QueryRulesWidgetDescription } from '../../connectors/query-rules/connectQueryRules';
export declare type QueryRuleContextWidgetParams = {
    trackedFilters: ParamTrackedFilters;
    transformRuleContexts?: ParamTransformRuleContexts;
};
export declare type QueryRuleContextWidget = WidgetFactory<QueryRulesWidgetDescription & {
    $$widgetType: 'ais.queryRuleContext';
}, QueryRulesConnectorParams, QueryRuleContextWidgetParams>;
declare const queryRuleContext: QueryRuleContextWidget;
export default queryRuleContext;
