
import { h } from 'preact';
import type { BaseHit, Hit, PartialKeys } from '../../types';
import type { ReverseSnippetProps as ReverseSnippetUiComponentProps } from '../../components/ReverseSnippet/ReverseSnippet';
export declare type ReverseSnippetProps<THit extends Hit<BaseHit>> = {
    hit: THit;
    attribute: keyof THit | string[];
    cssClasses?: ReverseSnippetUiComponentProps['classNames'];
} & PartialKeys<Omit<ReverseSnippetUiComponentProps, 'parts' | 'classNames'>, 'highlightedTagName' | 'nonHighlightedTagName' | 'separator'>;
export declare function ReverseSnippet<THit extends Hit<BaseHit>>({ hit, attribute, cssClasses, ...props }: ReverseSnippetProps<THit>): h.JSX.Element;
