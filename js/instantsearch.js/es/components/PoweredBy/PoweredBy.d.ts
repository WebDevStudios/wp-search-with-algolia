/** @jsx h */
import { h } from 'preact';
import type { ComponentCSSClasses } from '../../types';
import type { PoweredByCSSClasses } from '../../widgets/powered-by/powered-by';
export declare type PoweredByComponentCSSClasses = ComponentCSSClasses<PoweredByCSSClasses>;
export declare type PoweredByProps = {
    url: string;
    theme: string;
    cssClasses: PoweredByComponentCSSClasses;
};
declare const PoweredBy: ({ url, theme, cssClasses }: PoweredByProps) => h.JSX.Element;
export default PoweredBy;
