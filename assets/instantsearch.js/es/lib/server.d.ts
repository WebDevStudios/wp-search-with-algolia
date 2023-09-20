import type { IndexWidget, InitialResults, InstantSearch } from '../types';
/**
 * Waits for the results from the search instance to coordinate the next steps
 * in `getServerState()`.
 */
export declare function waitForResults(search: InstantSearch): Promise<void>;
/**
 * Walks the InstantSearch root index to construct the initial results.
 */
export declare function getInitialResults(rootIndex: IndexWidget): InitialResults;
