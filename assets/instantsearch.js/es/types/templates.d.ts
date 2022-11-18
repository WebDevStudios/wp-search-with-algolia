import type { VNode } from 'preact';
import type { Highlight, ReverseHighlight, ReverseSnippet, Snippet } from '../helpers/components';
import type { html } from 'htm/preact';
import type { BindEventForHits, SendEventForHits } from '../lib/utils';
export declare type Template<TTemplateData = void> = string | ((data: TTemplateData, params: TemplateParams) => VNode | VNode[] | string);
export declare type TemplateParams = BindEventForHits & {
    html: typeof html;
    components: {
        Highlight: typeof Highlight;
        ReverseHighlight: typeof ReverseHighlight;
        Snippet: typeof Snippet;
        ReverseSnippet: typeof ReverseSnippet;
    };
    sendEvent?: SendEventForHits;
};
export declare type TemplateWithBindEvent<TTemplateData = void> = string | ((data: TTemplateData, params: TemplateParams) => VNode | VNode[] | string);
export declare type Templates = {
    [key: string]: Template<any> | TemplateWithBindEvent<any> | undefined;
};
export declare type HoganHelpers<TKeys extends string = string> = Record<TKeys, (text: string, render: (value: string) => string) => string>;
