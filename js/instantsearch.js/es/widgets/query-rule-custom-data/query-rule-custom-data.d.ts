/** @jsx h */
import type { WidgetFactory, Template } from '../../types';
import type { QueryRulesConnectorParams, QueryRulesWidgetDescription } from '../../connectors/query-rules/connectQueryRules';
import type { QueryRuleCustomDataComponentTemplates } from '../../components/QueryRuleCustomData/QueryRuleCustomData';
export declare type QueryRuleCustomDataCSSClasses = Partial<{
    root: string | string[];
}>;
export declare type QueryRuleCustomDataTemplates = Partial<{
    default: Template<{
        items: any[];
    }>;
}>;
export declare type QueryRuleCustomDataWidgetParams = {
    container: string | HTMLElement;
    cssClasses?: QueryRuleCustomDataCSSClasses;
    templates?: QueryRuleCustomDataTemplates;
};
export declare type QueryRuleCustomDataWidget = WidgetFactory<QueryRulesWidgetDescription & {
    $$widgetType: 'ais.queryRuleCustomData';
}, QueryRulesConnectorParams, QueryRuleCustomDataWidgetParams>;
export declare const defaultTemplates: QueryRuleCustomDataComponentTemplates;
declare const queryRuleCustomData: QueryRuleCustomDataWidget;
export default queryRuleCustomData;
