import { h } from 'preact';
import type { HighlightProps as InternalHighlightProps, HighlightClassNames as InternalHighlightClassNames } from '@algolia/ui-components-highlight-vdom';
export declare type ReverseHighlightClassNames = InternalHighlightClassNames;
export declare type ReverseHighlightProps = Omit<InternalHighlightProps, 'classNames'> & {
    classNames?: Partial<ReverseHighlightClassNames>;
};
export declare function ReverseHighlight({ classNames, ...props }: ReverseHighlightProps): h.JSX.Element;
