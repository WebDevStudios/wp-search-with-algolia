declare type BrowserCallback<TReturn> = (params: {
    window: typeof window;
}) => TReturn;
declare type SafelyRunOnBrowserOptions<TReturn> = {
    /**
     * Fallback to run on server environments.
     */
    fallback: () => TReturn;
};
/**
 * Runs code on browser enviromnents safely.
 */
export declare function safelyRunOnBrowser<TReturn>(callback: BrowserCallback<TReturn>, { fallback }?: SafelyRunOnBrowserOptions<TReturn>): TReturn;
export {};
