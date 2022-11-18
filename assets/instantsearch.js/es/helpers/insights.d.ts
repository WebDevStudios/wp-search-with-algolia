import type { InsightsClientMethod, InsightsClientPayload } from '../types';
export declare function readDataAttributes(domElement: HTMLElement): {
    method: InsightsClientMethod;
    payload: Partial<InsightsClientPayload>;
};
export declare function hasDataAttributes(domElement: HTMLElement): boolean;
export declare function writeDataAttributes({ method, payload, }: {
    method: InsightsClientMethod;
    payload: Partial<InsightsClientPayload>;
}): string;
/**
 * @deprecated This function will be still supported in 4.x releases, but not further. It is replaced by the `insights` middleware. For more information, visit https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/click-through-and-conversions/how-to/send-click-and-conversion-events-with-instantsearch/js/
 */
export default function insights(method: InsightsClientMethod, payload: Partial<InsightsClientPayload>): string;
