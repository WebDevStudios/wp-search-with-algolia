
import { h } from 'preact';
export type SelectorOption = {
    value: string | number | undefined;
    label: string;
};
export type SelectorComponentCSSClasses = {
    root: string;
    select: string;
    option: string;
};
export type SelectorProps = {
    cssClasses: SelectorComponentCSSClasses;
    currentValue?: string | number;
    options: SelectorOption[];
    setValue: (value: string) => void;
};
declare function Selector({ currentValue, options, cssClasses, setValue, }: SelectorProps): h.JSX.Element;
export default Selector;
