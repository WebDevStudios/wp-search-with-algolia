import { withInsights } from "../../lib/insights/index.js";
import connectHits from "./connectHits.js";
var connectHitsWithInsights = withInsights(connectHits);
export default connectHitsWithInsights;