import { h } from 'preact';
import type { HighlightProps as InternalHighlightProps, HighlightClassNames as InternalHighlightClassNames } from '@algolia/ui-components-highlight-vdom';
export declare type HighlightClassNames = InternalHighlightClassNames;
export declare type HighlightProps = Omit<InternalHighlightProps, 'classNames'> & {
    classNames?: Partial<HighlightClassNames>;
};
export declare function Highlight({ classNames, ...props }: HighlightProps): h.JSX.Element;
