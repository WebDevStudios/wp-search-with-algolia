
import { h } from 'preact';
import type { PaginationCSSClasses, PaginationTemplates } from '../../widgets/pagination/pagination';
import type { ComponentCSSClasses } from '../../types';
export declare type PaginationComponentCSSClasses = ComponentCSSClasses<PaginationCSSClasses>;
export declare type PaginationComponentTemplates = Required<PaginationTemplates>;
export declare type PaginationProps = {
    createURL(value: number): string;
    cssClasses: PaginationComponentCSSClasses;
    templates: PaginationComponentTemplates;
    currentPage: number;
    nbPages: number;
    pages: number[];
    isFirstPage: boolean;
    isLastPage: boolean;
    setCurrentPage(value: number): void;
    showFirst?: boolean;
    showLast?: boolean;
    showPrevious?: boolean;
    showNext?: boolean;
};
declare function Pagination(props: PaginationProps): h.JSX.Element;
export default Pagination;
