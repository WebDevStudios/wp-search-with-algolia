import type { SendEventForFacet } from '../../lib/utils';
import type { Connector, CreateURL, WidgetRenderState } from '../../types';
declare type ToggleRefinementConnectorParams = {
    attribute: string;
    on: string | string[];
    off: string | string[];
};
declare type FacetValue = {
    isRefined: boolean;
    count: number;
};
declare type ToggleRefinementRenderState = {
    value: {
        name: string;
        isRefined: boolean;
        count: number | null;
        onFacetValue: FacetValue;
        offFacetValue: FacetValue;
    };
    createURL: CreateURL<string>;
    sendEvent: SendEventForFacet;
    canRefine: boolean;
    refine: (value: string) => void;
};
export declare type ToggleRefinementWidgetDescription = {
    $$type: 'ais.toggleRefinement';
    renderState: ToggleRefinementRenderState;
    indexRenderState: {
        toggleRefinement: {
            [attribute: string]: WidgetRenderState<ToggleRefinementRenderState, ToggleRefinementConnectorParams>;
        };
    };
    indexUiState: {
        toggle: {
            [attribute: string]: boolean;
        };
    };
};
export declare type ToggleRefinementConnector = Connector<ToggleRefinementWidgetDescription, ToggleRefinementConnectorParams>;
export {};
