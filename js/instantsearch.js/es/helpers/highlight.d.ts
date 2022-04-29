import type { Hit } from '../types';
export declare type HighlightOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: Partial<{
        highlighted: string;
    }>;
};
export default function highlight({ attribute, highlightedTagName, hit, cssClasses, }: HighlightOptions): string;
