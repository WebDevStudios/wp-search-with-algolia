declare type Callback = (...args: any[]) => void;
declare type Defer = Callback & {
    wait(): Promise<void>;
    cancel(): void;
};
declare const defer: (callback: Callback) => Defer;
export default defer;
