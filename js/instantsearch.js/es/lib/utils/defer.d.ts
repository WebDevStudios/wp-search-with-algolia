declare type Callback = (...args: any[]) => void;
declare type Defer = Callback & {
    wait(): Promise<void>;
    cancel(): void;
};
export declare function defer(callback: Callback): Defer;
export {};
