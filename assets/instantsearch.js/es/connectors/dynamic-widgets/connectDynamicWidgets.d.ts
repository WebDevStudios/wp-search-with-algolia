import type { Connector, TransformItems, TransformItemsMetadata, Widget } from '../../types';
export type DynamicWidgetsRenderState = {
    attributesToRender: string[];
};
export type DynamicWidgetsConnectorParams = {
    /**
     * An array of widgets, displayed in the order defined by `facetOrdering`.
     */
    widgets: Widget[];
    /**
     * Function to return a fallback widget when an attribute isn't found in
     * `widgets`.
     */
    fallbackWidget?: (args: {
        /** The attribute name to create a widget for. */
        attribute: string;
    }) => Widget;
    /**
     * Function to transform the items to render.
     * The function also exposes the full search response.
     */
    transformItems?: TransformItems<string, Omit<TransformItemsMetadata, 'results'> & {
        results: NonNullable<TransformItemsMetadata['results']>;
    }>;
    /**
     * To prevent unneeded extra network requests when widgets mount or unmount,
     * we request all facet values.
     *
     * @default ['*']
     */
    facets?: ['*'] | never[];
    /**
     * If you have more than 20 facet values pinned, you need to increase the
     * maxValuesPerFacet to at least that value.
     *
     * @default 20
     */
    maxValuesPerFacet?: number;
};
export type DynamicWidgetsWidgetDescription = {
    $$type: 'ais.dynamicWidgets';
    renderState: DynamicWidgetsRenderState;
    indexRenderState: {
        dynamicWidgets: DynamicWidgetsRenderState;
    };
};
export type DynamicWidgetsConnector = Connector<DynamicWidgetsWidgetDescription, DynamicWidgetsConnectorParams>;
declare const connectDynamicWidgets: DynamicWidgetsConnector;
export default connectDynamicWidgets;
