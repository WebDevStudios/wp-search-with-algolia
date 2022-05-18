import type { PlainSearchParameters } from 'algoliasearch-helper';
import type { Connector, WidgetRenderState } from '../../types';
/**
 * Refine the given search parameters.
 */
declare type Refine = (searchParameters: PlainSearchParameters) => void;
export declare type ConfigureConnectorParams = {
    /**
     * A list of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)
     * to enable when the widget mounts.
     */
    searchParameters: PlainSearchParameters;
};
export declare type ConfigureRenderState = {
    /**
     * Refine the given search parameters.
     */
    refine: Refine;
};
export declare type ConfigureWidgetDescription = {
    $$type: 'ais.configure';
    renderState: ConfigureRenderState;
    indexRenderState: {
        configure: WidgetRenderState<ConfigureRenderState, ConfigureConnectorParams>;
    };
    indexUiState: {
        configure: PlainSearchParameters;
    };
};
export declare type ConfigureConnector = Connector<ConfigureWidgetDescription, ConfigureConnectorParams>;
declare const connectConfigure: ConfigureConnector;
export default connectConfigure;
