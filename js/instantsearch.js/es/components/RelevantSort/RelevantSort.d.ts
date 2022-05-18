/** @jsx h */
import { h } from 'preact';
import type { RelevantSortCSSClasses, RelevantSortTemplates } from '../../widgets/relevant-sort/relevant-sort';
import type { ComponentCSSClasses } from '../../types';
export declare type RelevantSortComponentCSSClasses = ComponentCSSClasses<RelevantSortCSSClasses>;
export declare type RelevantSortComponentTemplates = Required<RelevantSortTemplates>;
declare type RelevantSortProps = {
    cssClasses: RelevantSortComponentCSSClasses;
    templates: RelevantSortComponentTemplates;
    isRelevantSorted: boolean;
    isVirtualReplica: boolean;
    refine(relevancyStrictness: number | undefined): void;
};
declare const RelevantSort: ({ cssClasses, templates, isRelevantSorted, isVirtualReplica, refine, }: RelevantSortProps) => h.JSX.Element | null;
export default RelevantSort;
