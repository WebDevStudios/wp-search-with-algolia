
import { h } from 'preact';
import type { CurrentRefinementsConnectorParamsItem } from '../../connectors/current-refinements/connectCurrentRefinements';
import type { CurrentRefinementsCSSClasses } from '../../widgets/current-refinements/current-refinements';
import type { ComponentCSSClasses } from '../../types';
export declare type CurrentRefinementsComponentCSSClasses = ComponentCSSClasses<CurrentRefinementsCSSClasses>;
export declare type CurrentRefinementsProps = {
    items: CurrentRefinementsConnectorParamsItem[];
    cssClasses: CurrentRefinementsComponentCSSClasses;
    canRefine: boolean;
};
declare const CurrentRefinements: ({ items, cssClasses, canRefine, }: CurrentRefinementsProps) => h.JSX.Element;
export default CurrentRefinements;
