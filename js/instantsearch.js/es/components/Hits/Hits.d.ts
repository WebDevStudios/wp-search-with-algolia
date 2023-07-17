
import { h } from 'preact';
import type { PreparedTemplateProps } from '../../lib/templating';
import type { BindEventForHits, SendEventForHits } from '../../lib/utils';
import type { ComponentCSSClasses, Hit, InsightsClient } from '../../types';
import type { HitsCSSClasses, HitsTemplates } from '../../widgets/hits/hits';
import type { SearchResults } from 'algoliasearch-helper';
export type HitsComponentCSSClasses = ComponentCSSClasses<HitsCSSClasses>;
export type HitsComponentTemplates = Required<HitsTemplates>;
export type HitsProps = {
    results: SearchResults;
    hits: Hit[];
    insights?: InsightsClient;
    sendEvent: SendEventForHits;
    bindEvent: BindEventForHits;
    cssClasses: HitsComponentCSSClasses;
    templateProps: PreparedTemplateProps<HitsComponentTemplates>;
};
export default function Hits({ results, hits, insights, bindEvent, sendEvent, cssClasses, templateProps, }: HitsProps): h.JSX.Element;
