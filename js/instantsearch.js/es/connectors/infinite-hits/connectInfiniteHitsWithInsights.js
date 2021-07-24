import { withInsights } from '../../lib/insights';
import connectInfiniteHits from './connectInfiniteHits';
var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits);
export default connectInfiniteHitsWithInsights;