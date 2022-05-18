/** @jsx h */
import type { JSX } from 'preact';
export declare type RefinementListItemProps = {
    facetValueToRefine: string;
    handleClick: (args: {
        facetValueToRefine: string;
        isRefined: boolean;
        originalEvent: MouseEvent;
    }) => void;
    isRefined: boolean;
    subItems?: JSX.Element;
    templateData: Record<string, any>;
    templateKey: string;
    templateProps?: Record<string, any>;
    className: string;
};
declare function RefinementListItem({ className, handleClick, facetValueToRefine, isRefined, templateProps, templateKey, templateData, subItems, }: RefinementListItemProps): JSX.Element;
export default RefinementListItem;
