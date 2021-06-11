export default {
  text: "{{#hasNoResults}}No results{{/hasNoResults}}\n    {{#hasOneResult}}1 result{{/hasOneResult}}\n    {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}} found in {{processingTimeMS}}ms"
};