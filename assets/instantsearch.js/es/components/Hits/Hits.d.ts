
import { h } from 'preact';
import type { SearchResults } from 'algoliasearch-helper';
import type { BindEventForHits, SendEventForHits } from '../../lib/utils';
import type { PreparedTemplateProps } from '../../lib/templating';
import type { ComponentCSSClasses, Hit } from '../../types';
import type { HitsCSSClasses, HitsTemplates } from '../../widgets/hits/hits';
export declare type HitsComponentCSSClasses = ComponentCSSClasses<HitsCSSClasses>;
export declare type HitsComponentTemplates = Required<HitsTemplates>;
export declare type HitsProps = {
    results: SearchResults;
    hits: Hit[];
    sendEvent?: SendEventForHits;
    bindEvent?: BindEventForHits;
    cssClasses: HitsComponentCSSClasses;
    templateProps: PreparedTemplateProps<HitsComponentTemplates>;
};
declare const Hits: ({ results, hits, bindEvent, sendEvent, cssClasses, templateProps, }: HitsProps) => h.JSX.Element;
export default Hits;
