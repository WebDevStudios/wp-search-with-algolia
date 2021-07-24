"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppIdAndApiKey = getAppIdAndApiKey;

// typed as any, since it accepts the _real_ js clients, not the interface we otherwise expect
function getAppIdAndApiKey(searchClient) {
  if (searchClient.transporter) {
    // searchClient v4
    var _searchClient$transpo = searchClient.transporter,
        headers = _searchClient$transpo.headers,
        queryParameters = _searchClient$transpo.queryParameters;
    var APP_ID = 'x-algolia-application-id';
    var API_KEY = 'x-algolia-api-key';
    var appId = headers[APP_ID] || queryParameters[APP_ID];
    var apiKey = headers[API_KEY] || queryParameters[API_KEY];
    return [appId, apiKey];
  } else {
    // searchClient v3
    return [searchClient.applicationID, searchClient.apiKey];
  }
}