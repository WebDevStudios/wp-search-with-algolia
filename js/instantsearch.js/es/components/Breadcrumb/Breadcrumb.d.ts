/** @jsx h */
import { h } from 'preact';
import type { BreadcrumbCSSClasses, BreadcrumbTemplates } from '../../widgets/breadcrumb/breadcrumb';
import type { ComponentCSSClasses } from '../../types';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps';
import type { BreadcrumbConnectorParamsItem } from '../../connectors/breadcrumb/connectBreadcrumb';
export declare type BreadcrumbComponentCSSClasses = ComponentCSSClasses<BreadcrumbCSSClasses>;
export declare type BreadcrumbComponentTemplates = Required<BreadcrumbTemplates>;
export declare type BreadcrumbProps = {
    items: BreadcrumbConnectorParamsItem[];
    cssClasses: BreadcrumbComponentCSSClasses;
    templateProps: PreparedTemplateProps<BreadcrumbComponentTemplates>;
    createURL(value?: string | null): string;
    refine(value?: string | null): void;
    canRefine?: boolean;
};
declare const Breadcrumb: ({ items, cssClasses, templateProps, createURL, refine, }: BreadcrumbProps) => h.JSX.Element;
export default Breadcrumb;
