import type { SearchParameters } from 'algoliasearch-helper';
import type { IndexWidget } from '../../widgets/index/index';
declare const resolveSearchParameters: (current: IndexWidget) => SearchParameters[];
export default resolveSearchParameters;
