/** @jsx h */
import { h } from 'preact';
export declare type SelectorOption = {
    value?: string | number;
    label: string;
};
export declare type SelectorComponentCSSClasses = {
    root: string;
    select: string;
    option: string;
};
export declare type SelectorProps = {
    cssClasses: SelectorComponentCSSClasses;
    currentValue?: string | number;
    options: SelectorOption[];
    setValue(value: SelectorOption['value']): void;
};
declare function Selector({ currentValue, options, cssClasses, setValue, }: SelectorProps): h.JSX.Element;
export default Selector;
