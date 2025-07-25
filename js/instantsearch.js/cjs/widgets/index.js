"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPERIMENTAL_dynamicWidgets = exports.EXPERIMENTAL_configureRelatedItems = exports.EXPERIMENTAL_answers = void 0;
Object.defineProperty(exports, "analytics", {
  enumerable: true,
  get: function get() {
    return _analytics.default;
  }
});
Object.defineProperty(exports, "breadcrumb", {
  enumerable: true,
  get: function get() {
    return _breadcrumb.default;
  }
});
Object.defineProperty(exports, "clearRefinements", {
  enumerable: true,
  get: function get() {
    return _clearRefinements.default;
  }
});
Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function get() {
    return _configure.default;
  }
});
Object.defineProperty(exports, "currentRefinements", {
  enumerable: true,
  get: function get() {
    return _currentRefinements.default;
  }
});
Object.defineProperty(exports, "dynamicWidgets", {
  enumerable: true,
  get: function get() {
    return _dynamicWidgets.default;
  }
});
Object.defineProperty(exports, "frequentlyBoughtTogether", {
  enumerable: true,
  get: function get() {
    return _frequentlyBoughtTogether.default;
  }
});
Object.defineProperty(exports, "geoSearch", {
  enumerable: true,
  get: function get() {
    return _geoSearch.default;
  }
});
Object.defineProperty(exports, "hierarchicalMenu", {
  enumerable: true,
  get: function get() {
    return _hierarchicalMenu.default;
  }
});
Object.defineProperty(exports, "hits", {
  enumerable: true,
  get: function get() {
    return _hits.default;
  }
});
Object.defineProperty(exports, "hitsPerPage", {
  enumerable: true,
  get: function get() {
    return _hitsPerPage.default;
  }
});
Object.defineProperty(exports, "index", {
  enumerable: true,
  get: function get() {
    return _index.default;
  }
});
Object.defineProperty(exports, "infiniteHits", {
  enumerable: true,
  get: function get() {
    return _infiniteHits.default;
  }
});
Object.defineProperty(exports, "lookingSimilar", {
  enumerable: true,
  get: function get() {
    return _lookingSimilar.default;
  }
});
Object.defineProperty(exports, "menu", {
  enumerable: true,
  get: function get() {
    return _menu.default;
  }
});
Object.defineProperty(exports, "menuSelect", {
  enumerable: true,
  get: function get() {
    return _menuSelect.default;
  }
});
Object.defineProperty(exports, "numericMenu", {
  enumerable: true,
  get: function get() {
    return _numericMenu.default;
  }
});
Object.defineProperty(exports, "pagination", {
  enumerable: true,
  get: function get() {
    return _pagination.default;
  }
});
Object.defineProperty(exports, "panel", {
  enumerable: true,
  get: function get() {
    return _panel.default;
  }
});
Object.defineProperty(exports, "places", {
  enumerable: true,
  get: function get() {
    return _places.default;
  }
});
Object.defineProperty(exports, "poweredBy", {
  enumerable: true,
  get: function get() {
    return _poweredBy.default;
  }
});
Object.defineProperty(exports, "queryRuleContext", {
  enumerable: true,
  get: function get() {
    return _queryRuleContext.default;
  }
});
Object.defineProperty(exports, "queryRuleCustomData", {
  enumerable: true,
  get: function get() {
    return _queryRuleCustomData.default;
  }
});
Object.defineProperty(exports, "rangeInput", {
  enumerable: true,
  get: function get() {
    return _rangeInput.default;
  }
});
Object.defineProperty(exports, "rangeSlider", {
  enumerable: true,
  get: function get() {
    return _rangeSlider.default;
  }
});
Object.defineProperty(exports, "ratingMenu", {
  enumerable: true,
  get: function get() {
    return _ratingMenu.default;
  }
});
Object.defineProperty(exports, "refinementList", {
  enumerable: true,
  get: function get() {
    return _refinementList.default;
  }
});
Object.defineProperty(exports, "relatedProducts", {
  enumerable: true,
  get: function get() {
    return _relatedProducts.default;
  }
});
Object.defineProperty(exports, "relevantSort", {
  enumerable: true,
  get: function get() {
    return _relevantSort.default;
  }
});
Object.defineProperty(exports, "searchBox", {
  enumerable: true,
  get: function get() {
    return _searchBox.default;
  }
});
Object.defineProperty(exports, "sortBy", {
  enumerable: true,
  get: function get() {
    return _sortBy.default;
  }
});
Object.defineProperty(exports, "stats", {
  enumerable: true,
  get: function get() {
    return _stats.default;
  }
});
Object.defineProperty(exports, "toggleRefinement", {
  enumerable: true,
  get: function get() {
    return _toggleRefinement.default;
  }
});
Object.defineProperty(exports, "trendingItems", {
  enumerable: true,
  get: function get() {
    return _trendingItems.default;
  }
});
Object.defineProperty(exports, "voiceSearch", {
  enumerable: true,
  get: function get() {
    return _voiceSearch.default;
  }
});
var _utils = require("../lib/utils");
var _answers = _interopRequireDefault(require("./answers/answers"));
var _configureRelatedItems = _interopRequireDefault(require("./configure-related-items/configure-related-items"));
var _dynamicWidgets = _interopRequireDefault(require("./dynamic-widgets/dynamic-widgets"));
var _analytics = _interopRequireDefault(require("./analytics/analytics"));
var _breadcrumb = _interopRequireDefault(require("./breadcrumb/breadcrumb"));
var _clearRefinements = _interopRequireDefault(require("./clear-refinements/clear-refinements"));
var _configure = _interopRequireDefault(require("./configure/configure"));
var _currentRefinements = _interopRequireDefault(require("./current-refinements/current-refinements"));
var _geoSearch = _interopRequireDefault(require("./geo-search/geo-search"));
var _hierarchicalMenu = _interopRequireDefault(require("./hierarchical-menu/hierarchical-menu"));
var _hits = _interopRequireDefault(require("./hits/hits"));
var _hitsPerPage = _interopRequireDefault(require("./hits-per-page/hits-per-page"));
var _index = _interopRequireDefault(require("./index/index"));
var _infiniteHits = _interopRequireDefault(require("./infinite-hits/infinite-hits"));
var _menu = _interopRequireDefault(require("./menu/menu"));
var _menuSelect = _interopRequireDefault(require("./menu-select/menu-select"));
var _numericMenu = _interopRequireDefault(require("./numeric-menu/numeric-menu"));
var _pagination = _interopRequireDefault(require("./pagination/pagination"));
var _panel = _interopRequireDefault(require("./panel/panel"));
var _places = _interopRequireDefault(require("./places/places"));
var _poweredBy = _interopRequireDefault(require("./powered-by/powered-by"));
var _queryRuleContext = _interopRequireDefault(require("./query-rule-context/query-rule-context"));
var _queryRuleCustomData = _interopRequireDefault(require("./query-rule-custom-data/query-rule-custom-data"));
var _relatedProducts = _interopRequireDefault(require("./related-products/related-products"));
var _rangeInput = _interopRequireDefault(require("./range-input/range-input"));
var _rangeSlider = _interopRequireDefault(require("./range-slider/range-slider"));
var _ratingMenu = _interopRequireDefault(require("./rating-menu/rating-menu"));
var _refinementList = _interopRequireDefault(require("./refinement-list/refinement-list"));
var _relevantSort = _interopRequireDefault(require("./relevant-sort/relevant-sort"));
var _searchBox = _interopRequireDefault(require("./search-box/search-box"));
var _sortBy = _interopRequireDefault(require("./sort-by/sort-by"));
var _stats = _interopRequireDefault(require("./stats/stats"));
var _toggleRefinement = _interopRequireDefault(require("./toggle-refinement/toggle-refinement"));
var _trendingItems = _interopRequireDefault(require("./trending-items/trending-items"));
var _voiceSearch = _interopRequireDefault(require("./voice-search/voice-search"));
var _frequentlyBoughtTogether = _interopRequireDefault(require("./frequently-bought-together/frequently-bought-together"));
var _lookingSimilar = _interopRequireDefault(require("./looking-similar/looking-similar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @deprecated answers is no longer supported */
var EXPERIMENTAL_answers = exports.EXPERIMENTAL_answers = (0, _utils.deprecate)(_answers.default, 'answers is no longer supported');

/** @deprecated use relatedItems instead */
var EXPERIMENTAL_configureRelatedItems = exports.EXPERIMENTAL_configureRelatedItems = (0, _utils.deprecate)(_configureRelatedItems.default, 'EXPERIMENTAL_configureRelatedItems is deprecated and will be removed in a next minor version of InstantSearch. Please use relatedItems instead.');

/** @deprecated use dynamicWidgets */
var EXPERIMENTAL_dynamicWidgets = exports.EXPERIMENTAL_dynamicWidgets = (0, _utils.deprecate)(_dynamicWidgets.default, 'use dynamicWidgets');