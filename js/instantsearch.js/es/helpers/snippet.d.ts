import type { Hit } from '../types';
export declare type SnippetOptions = {
    attribute: string | string[];
    highlightedTagName?: string;
    hit: Partial<Hit>;
    cssClasses?: {
        highlighted?: string;
    };
};
export default function snippet({ attribute, highlightedTagName, hit, cssClasses, }: SnippetOptions): string;
