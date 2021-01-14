export default function hasDetectedInsightsClient() {
  return typeof window !== 'undefined' && Boolean(window.AlgoliaAnalyticsObject);
}