import type { BindEventForHits } from '../lib/utils';
export declare type Template<TTemplateData = void> = string | ((data: TTemplateData) => string);
export declare type TemplateWithBindEvent<TTemplateData = void> = string | ((data: TTemplateData, bindEvent: BindEventForHits) => string);
export declare type Templates = {
    [key: string]: Template<any> | TemplateWithBindEvent<any> | undefined;
};
export declare type HoganHelpers<TKeys extends string = string> = Record<TKeys, (text: string, render: (value: string) => string) => string>;
