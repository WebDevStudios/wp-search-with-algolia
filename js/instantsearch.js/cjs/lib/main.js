"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _InstantSearch = _interopRequireDefault(require("./InstantSearch"));

var _version = _interopRequireDefault(require("./version"));

var connectors = _interopRequireWildcard(require("../connectors/index"));

var widgets = _interopRequireWildcard(require("../widgets/index"));

var helpers = _interopRequireWildcard(require("../helpers/index"));

var middlewares = _interopRequireWildcard(require("../middlewares/index"));

var routers = _interopRequireWildcard(require("./routers/index"));

var stateMappings = _interopRequireWildcard(require("./stateMappings/index"));

var _index7 = require("./infiniteHitsCache/index");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * InstantSearch is the main component of InstantSearch.js. This object
 * manages the widget and lets you add new ones.
 *
 * Two parameters are required to get you started with InstantSearch.js:
 *  - `indexName`: the main index that you will use for your new search UI
 *  - `searchClient`: the search client to plug to InstantSearch.js
 *
 * The [search client provided by Algolia](https://github.com/algolia/algoliasearch-client-javascript)
 * needs an `appId` and an `apiKey`. Those parameters can be found in your
 * [Algolia dashboard](https://www.algolia.com/api-keys).
 *
 * If you want to get up and running quickly with InstantSearch.js, have a
 * look at the [getting started](getting-started.html).
 * @function instantsearch
 * @param {InstantSearchOptions} options The options
 */
var instantsearch = function instantsearch(options) {
  return new _InstantSearch.default(options);
};

instantsearch.routers = routers;
instantsearch.stateMappings = stateMappings;
instantsearch.connectors = connectors;
instantsearch.widgets = widgets;
instantsearch.version = _version.default;
instantsearch.createInfiniteHitsSessionStorageCache = _index7.createInfiniteHitsSessionStorageCache;
instantsearch.highlight = helpers.highlight;
instantsearch.reverseHighlight = helpers.reverseHighlight;
instantsearch.snippet = helpers.snippet;
instantsearch.reverseSnippet = helpers.reverseSnippet;
instantsearch.insights = helpers.insights;
instantsearch.middlewares = middlewares;
var _default = instantsearch;
exports.default = _default;