"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var connectors = _interopRequireWildcard(require("./connectors/index"));
var helpers = _interopRequireWildcard(require("./helpers/index"));
var _index3 = require("./lib/infiniteHitsCache/index");
var _InstantSearch = _interopRequireDefault(require("./lib/InstantSearch"));
var routers = _interopRequireWildcard(require("./lib/routers/index"));
var stateMappings = _interopRequireWildcard(require("./lib/stateMappings/index"));
var _version = _interopRequireDefault(require("./lib/version"));
var middlewares = _interopRequireWildcard(require("./middlewares/index"));
var templates = _interopRequireWildcard(require("./templates/index"));
var widgets = _interopRequireWildcard(require("./widgets/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * InstantSearch is the main component of InstantSearch.js. This object
 * manages the widget and lets you add new ones.
 *
 * Two parameters are required to get you started with InstantSearch.js:
 *  - `indexName`: the main index that you will use for your new search UI
 *  - `searchClient`: the search client to plug to InstantSearch.js
 *
 * The [search client provided by Algolia](algolia.com/doc/api-client/getting-started/what-is-the-api-client/javascript/)
 * needs an `appId` and an `apiKey`. Those parameters can be found in your
 * [Algolia dashboard](https://www.algolia.com/api-keys).
 *
 * If you want to get up and running quickly with InstantSearch.js, have a
 * look at the [getting started](https://www.algolia.com/doc/guides/building-search-ui/getting-started/js/).
 */
var instantsearch = function instantsearch(options) {
  return new _InstantSearch.default(options);
};
instantsearch.version = _version.default;
instantsearch.connectors = connectors;
instantsearch.widgets = widgets;
instantsearch.middlewares = middlewares;
instantsearch.routers = routers;
instantsearch.stateMappings = stateMappings;
instantsearch.templates = templates;
instantsearch.createInfiniteHitsSessionStorageCache = _index3.createInfiniteHitsSessionStorageCache;
instantsearch.highlight = helpers.highlight;
instantsearch.reverseHighlight = helpers.reverseHighlight;
instantsearch.snippet = helpers.snippet;
instantsearch.reverseSnippet = helpers.reverseSnippet;
instantsearch.insights = helpers.insights;
var _default = exports.default = instantsearch;