/** @jsx h */
import { h } from 'preact';
import type { ComponentCSSClasses } from '../../types';
import type { QueryRuleCustomDataCSSClasses, QueryRuleCustomDataTemplates } from '../../widgets/query-rule-custom-data/query-rule-custom-data';
export declare type QueryRuleCustomDataComponentCSSClasses = ComponentCSSClasses<QueryRuleCustomDataCSSClasses>;
export declare type QueryRuleCustomDataComponentTemplates = Required<QueryRuleCustomDataTemplates>;
export declare type QueryRuleCustomDataProps = {
    cssClasses: QueryRuleCustomDataComponentCSSClasses;
    templates: QueryRuleCustomDataComponentTemplates;
    items: any[];
};
declare const QueryRuleCustomData: ({ cssClasses, templates, items, }: QueryRuleCustomDataProps) => h.JSX.Element;
export default QueryRuleCustomData;
