import { h } from 'preact';
import type { HighlightProps as InternalHighlightProps, HighlightClassNames as InternalHighlightClassNames } from '@algolia/ui-components-highlight-vdom';
export type SnippetClassNames = InternalHighlightClassNames;
export type SnippetProps = Omit<InternalHighlightProps, 'classNames'> & {
    classNames?: Partial<SnippetClassNames>;
};
export declare function Snippet({ classNames, ...props }: SnippetProps): h.JSX.Element;
