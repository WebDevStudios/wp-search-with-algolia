import type { HoganHelpers } from '../types';
declare type DefaultHoganHelpers = HoganHelpers<'formatNumber' | 'highlight' | 'reverseHighlight' | 'snippet' | 'reverseSnippet' | 'insights'>;
export default function hoganHelpers({ numberLocale, }: {
    numberLocale?: string;
}): DefaultHoganHelpers;
export {};
