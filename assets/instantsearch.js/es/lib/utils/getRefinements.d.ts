import type { SearchParameters, SearchResults } from 'algoliasearch-helper';
export declare type FacetRefinement = {
    type: 'facet' | 'disjunctive' | 'hierarchical';
    attribute: string;
    name: string;
    escapedValue: string;
    count?: number;
    exhaustive?: boolean;
};
export declare type TagRefinement = {
    type: 'tag';
    attribute: string;
    name: string;
};
export declare type QueryRefinement = {
    type: 'query';
    attribute: 'query';
    query: string;
    name: string;
};
export declare type NumericRefinement = {
    type: 'numeric';
    numericValue: number;
    operator: '<' | '<=' | '=' | '!=' | '>=' | '>';
    attribute: string;
    name: string;
    count?: number;
    exhaustive?: boolean;
};
export declare type FacetExcludeRefinement = {
    type: 'exclude';
    exclude: boolean;
    attribute: string;
    name: string;
    count?: number;
    exhaustive?: boolean;
};
export declare type Refinement = FacetRefinement | QueryRefinement | NumericRefinement | FacetExcludeRefinement | TagRefinement;
export declare function getRefinements(results: SearchResults | Record<string, never>, state: SearchParameters, includesQuery?: boolean): Refinement[];
