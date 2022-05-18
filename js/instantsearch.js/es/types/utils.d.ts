export declare type HighlightedParts = {
    value: string;
    isHighlighted: boolean;
};
export declare type AtLeastOne<TTarget, TMapped = {
    [Key in keyof TTarget]: Pick<TTarget, Key>;
}> = Partial<TTarget> & TMapped[keyof TMapped];
export declare type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;
export declare type RequiredKeys<TObject, TKeys extends keyof TObject> = Expand<Required<Pick<TObject, TKeys>> & Omit<TObject, TKeys>>;
export declare type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
