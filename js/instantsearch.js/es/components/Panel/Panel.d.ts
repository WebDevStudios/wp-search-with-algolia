/** @jsx h */
import { h } from 'preact';
import type { PanelCSSClasses, PanelSharedOptions, PanelTemplates } from '../../widgets/panel/panel';
import type { ComponentCSSClasses, UnknownWidgetFactory } from '../../types';
export declare type PanelComponentCSSClasses = ComponentCSSClasses<Omit<PanelCSSClasses, 'collapseIcon'>>;
export declare type PanelComponentTemplates<TWidget extends UnknownWidgetFactory> = Required<PanelTemplates<TWidget>>;
export declare type PanelProps<TWidget extends UnknownWidgetFactory> = {
    hidden: boolean;
    collapsible: boolean;
    isCollapsed: boolean;
    data: PanelSharedOptions<TWidget>;
    cssClasses: PanelComponentCSSClasses;
    templates: PanelComponentTemplates<TWidget>;
    bodyElement: HTMLElement;
};
declare function Panel<TWidget extends UnknownWidgetFactory>(props: PanelProps<TWidget>): h.JSX.Element;
export default Panel;
