/** @jsx h */
import { h } from 'preact';
import type { StatsCSSClasses, StatsTemplates } from '../../widgets/stats/stats';
import type { ComponentCSSClasses } from '../../types';
export declare type StatsComponentCSSClasses = ComponentCSSClasses<StatsCSSClasses>;
export declare type StatsComponentTemplates = Required<StatsTemplates>;
declare type StatsProps = {
    cssClasses: StatsComponentCSSClasses;
    templateProps: {
        [key: string]: any;
        templates: StatsComponentTemplates;
    };
    hitsPerPage: number | undefined;
    nbHits: number;
    nbSortedHits: number | undefined;
    areHitsSorted: boolean;
    nbPages: number;
    page: number;
    processingTimeMS: number;
    query: string;
};
declare const Stats: ({ nbHits, nbSortedHits, cssClasses, templateProps, ...rest }: StatsProps) => h.JSX.Element;
export default Stats;
