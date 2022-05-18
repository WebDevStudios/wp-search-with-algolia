declare type FacetValue = string | number | undefined;
export declare function unescapeFacetValue<TFacetValue extends FacetValue>(value: TFacetValue): TFacetValue;
export declare function escapeFacetValue<TFacetValue extends FacetValue>(value: TFacetValue): TFacetValue;
export {};
