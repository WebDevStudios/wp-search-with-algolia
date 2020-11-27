import { withInsights } from '../../lib/insights';
import connectHits from './connectHits';
var connectHitsWithInsights = withInsights(connectHits);
export default connectHitsWithInsights;