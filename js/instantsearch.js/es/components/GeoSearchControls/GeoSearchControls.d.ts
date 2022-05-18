/** @jsx h */
import { h } from 'preact';
import type { GeoSearchCSSClasses, GeoSearchTemplates } from '../../widgets/geo-search/geo-search';
import type { ComponentCSSClasses } from '../../types';
import type { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps';
declare type Props = {
    cssClasses: ComponentCSSClasses<GeoSearchCSSClasses>;
    enableRefine: boolean;
    enableRefineControl: boolean;
    enableClearMapRefinement: boolean;
    isRefineOnMapMove: boolean;
    isRefinedWithMap: boolean;
    hasMapMoveSinceLastRefine: boolean;
    onRefineToggle(event: Event): void;
    onRefineClick(event: MouseEvent): void;
    onClearClick(event: MouseEvent): void;
    templateProps: PreparedTemplateProps<GeoSearchTemplates>;
};
declare const GeoSearchControls: ({ cssClasses, enableRefine, enableRefineControl, enableClearMapRefinement, isRefineOnMapMove, isRefinedWithMap, hasMapMoveSinceLastRefine, onRefineToggle, onRefineClick, onClearClick, templateProps, }: Props) => h.JSX.Element;
export default GeoSearchControls;
