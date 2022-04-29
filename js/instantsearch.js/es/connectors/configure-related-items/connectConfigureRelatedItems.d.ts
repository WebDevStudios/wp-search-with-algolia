import type { SearchParameters, PlainSearchParameters } from 'algoliasearch-helper';
import type { AlgoliaHit, Connector } from '../../types';
import type { ConfigureWidgetDescription } from '../configure/connectConfigure';
export declare type MatchingPatterns = {
    [attribute: string]: {
        /**
         * The score of the optional filter.
         *
         * @see https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/in-depth/optional-filters/
         */
        score: number;
    };
};
export declare type TransformSearchParameters = (searchParameters: SearchParameters) => PlainSearchParameters;
export declare type ConfigureRelatedItemsConnectorParams = {
    /**
     * The reference hit to extract the filters from.
     */
    hit: AlgoliaHit;
    /**
     * The schema to create the optional filters.
     * Each key represents an attribute from the hit.
     */
    matchingPatterns: MatchingPatterns;
    /**
     * Function to transform the generated search parameters.
     */
    transformSearchParameters?: TransformSearchParameters;
};
export declare type ConfigureRelatedItemsWidgetDescription = {
    $$type: 'ais.configureRelatedItems';
} & Omit<ConfigureWidgetDescription, '$$type'>;
export declare type ConfigureRelatedItemsConnector = Connector<ConfigureRelatedItemsWidgetDescription, ConfigureRelatedItemsConnectorParams>;
declare const connectConfigureRelatedItems: ConfigureRelatedItemsConnector;
export default connectConfigureRelatedItems;
