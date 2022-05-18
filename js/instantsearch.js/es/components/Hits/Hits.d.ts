/** @jsx h */
import { h } from 'preact';
import type { SearchResults } from 'algoliasearch-helper';
import type { BindEventForHits, SendEventForHits } from '../../lib/utils';
import type { ComponentCSSClasses, Hits as HitsArray } from '../../types';
import type { HitsCSSClasses, HitsTemplates } from '../../widgets/hits/hits';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps';
export declare type HitsComponentCSSClasses = ComponentCSSClasses<HitsCSSClasses>;
export declare type HitsComponentTemplates = Required<HitsTemplates>;
export declare type HitsProps = {
    results: SearchResults;
    hits: HitsArray;
    sendEvent?: SendEventForHits;
    bindEvent?: BindEventForHits;
    cssClasses: HitsComponentCSSClasses;
    templateProps: PreparedTemplateProps<HitsComponentTemplates>;
};
declare const Hits: ({ results, hits, bindEvent, cssClasses, templateProps, }: HitsProps) => h.JSX.Element;
export default Hits;
