
import { h } from 'preact';
import type { BaseHit, Hit, PartialKeys } from '../../types';
import type { HighlightProps as HighlightUiComponentProps } from '../../components/Highlight/Highlight';
export declare type HighlightProps<THit extends Hit<BaseHit>> = {
    hit: THit;
    attribute: keyof THit | string[];
    cssClasses?: HighlightUiComponentProps['classNames'];
} & PartialKeys<Omit<HighlightUiComponentProps, 'parts' | 'classNames'>, 'highlightedTagName' | 'nonHighlightedTagName' | 'separator'>;
export declare function Highlight<THit extends Hit<BaseHit>>({ hit, attribute, cssClasses, ...props }: HighlightProps<THit>): h.JSX.Element;
