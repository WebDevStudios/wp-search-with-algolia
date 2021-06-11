"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  text: "{{#hasNoResults}}No results{{/hasNoResults}}\n    {{#hasOneResult}}1 result{{/hasOneResult}}\n    {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}} found in {{processingTimeMS}}ms"
};
exports.default = _default;