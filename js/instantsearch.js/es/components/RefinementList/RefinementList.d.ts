/** @jsx h */
import type { JSX } from 'preact';
import { Component } from 'preact';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps';
import type { SearchBoxComponentCSSClasses, SearchBoxComponentTemplates } from '../SearchBox/SearchBox';
import type { HierarchicalMenuItem } from '../../connectors/hierarchical-menu/connectHierarchicalMenu';
import type { ComponentCSSClasses, CreateURL, Templates } from '../../types';
import type { RefinementListOwnCSSClasses } from '../../widgets/refinement-list/refinement-list';
import type { RatingMenuComponentCSSClasses } from '../../widgets/rating-menu/rating-menu';
import type { HierarchicalMenuComponentCSSClasses } from '../../widgets/hierarchical-menu/hierarchical-menu';
declare type RefinementListOptionalClasses = 'noResults' | 'checkbox' | 'labelText' | 'showMore' | 'disabledShowMore' | 'searchBox' | 'count';
declare type RefinementListWidgetCSSClasses = ComponentCSSClasses<RefinementListOwnCSSClasses>;
declare type RefinementListRequiredCSSClasses = Omit<RefinementListWidgetCSSClasses, RefinementListOptionalClasses> & Partial<Pick<RefinementListWidgetCSSClasses, RefinementListOptionalClasses>>;
export declare type RefinementListComponentCSSClasses = RefinementListRequiredCSSClasses & {
    searchable?: SearchBoxComponentCSSClasses;
} & Partial<Pick<RatingMenuComponentCSSClasses, 'disabledItem'>> & Partial<Pick<HierarchicalMenuComponentCSSClasses, 'childList' | 'parentItem'>>;
declare type FacetValue = {
    value: string;
    label: string;
    highlighted?: string;
    count?: number;
    isRefined: boolean;
    data?: HierarchicalMenuItem[] | null;
};
export declare type RefinementListProps<TTemplates extends Templates> = {
    createURL: CreateURL<string>;
    cssClasses: RefinementListComponentCSSClasses;
    depth?: number;
    facetValues?: FacetValue[];
    attribute?: string;
    templateProps: PreparedTemplateProps<TTemplates>;
    toggleRefinement: (value: string) => void;
    showMore?: boolean;
    toggleShowMore?: () => void;
    isShowingMore?: boolean;
    hasExhaustiveItems?: boolean;
    canToggleShowMore?: boolean;
    className?: string;
    children?: JSX.Element;
    isFromSearch?: boolean;
    searchIsAlwaysActive?: boolean;
    searchFacetValues?: (query: string) => void;
    searchPlaceholder?: string;
    searchBoxTemplateProps?: PreparedTemplateProps<SearchBoxComponentTemplates>;
};
declare const defaultProps: {
    cssClasses: {};
    depth: number;
};
declare type RefinementListPropsWithDefaultProps<TTemplates extends Templates> = RefinementListProps<TTemplates> & Readonly<typeof defaultProps>;
declare class RefinementList<TTemplates extends Templates> extends Component<RefinementListPropsWithDefaultProps<TTemplates>> {
    static defaultProps: {
        cssClasses: {};
        depth: number;
    };
    private searchBox;
    constructor(props: RefinementListPropsWithDefaultProps<TTemplates>);
    shouldComponentUpdate(nextProps: RefinementListPropsWithDefaultProps<TTemplates>): boolean;
    private refine;
    private _generateFacetItem;
    private handleItemClick;
    componentWillReceiveProps(nextProps: RefinementListPropsWithDefaultProps<TTemplates>): void;
    private refineFirstValue;
    render(): JSX.Element;
}
export default RefinementList;
