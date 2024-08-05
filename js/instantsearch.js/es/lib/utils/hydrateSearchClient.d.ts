import type { SearchClient, InitialResults } from '../../types';
export declare function hydrateSearchClient(client: SearchClient & {
    _cacheHydrated?: boolean;
    _useCache?: boolean;
}, results?: InitialResults): void;
