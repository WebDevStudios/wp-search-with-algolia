declare type SuitOptions = {
    descendantName?: string;
    modifierName?: string;
};
declare type SuitSelector = (names?: SuitOptions) => string;
export declare const component: (componentName: string) => SuitSelector;
export {};
