import { h } from 'preact';
import type { HighlightProps as InternalHighlightProps, HighlightClassNames as InternalHighlightClassNames } from '@algolia/ui-components-highlight-vdom';
export type ReverseSnippetClassNames = InternalHighlightClassNames;
export type ReverseSnippetProps = Omit<InternalHighlightProps, 'classNames'> & {
    classNames?: Partial<ReverseSnippetClassNames>;
};
export declare function ReverseSnippet({ classNames, ...props }: ReverseSnippetProps): h.JSX.Element;
