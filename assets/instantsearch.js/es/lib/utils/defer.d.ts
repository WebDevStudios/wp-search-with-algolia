declare type Callback = (...args: any[]) => void;
declare type Defer = {
    wait(): Promise<void>;
    cancel(): void;
};
export declare function defer<TCallback extends Callback>(callback: TCallback): TCallback & Defer;
export {};
