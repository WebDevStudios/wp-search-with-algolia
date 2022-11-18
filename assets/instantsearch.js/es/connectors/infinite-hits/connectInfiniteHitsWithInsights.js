import { withInsights } from "../../lib/insights/index.js";
import connectInfiniteHits from "./connectInfiniteHits.js";
var connectInfiniteHitsWithInsights = withInsights(connectInfiniteHits);
export default connectInfiniteHitsWithInsights;