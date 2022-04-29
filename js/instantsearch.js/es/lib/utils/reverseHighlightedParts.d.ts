import type { HighlightedParts } from '../../types';
export default function reverseHighlightedParts(parts: HighlightedParts[]): {
    isHighlighted: boolean;
    value: string;
}[];
