"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
Object.defineProperty(exports, "EXPERIMENTAL_answers", {
  enumerable: true,
  get: function get() {
    return _answers.default;
  }
});
Object.defineProperty(exports, "EXPERIMENTAL_configureRelatedItems", {
  enumerable: true,
  get: function get() {
    return _configureRelatedItems.default;
  }
});
Object.defineProperty(exports, "dynamicWidgets", {
  enumerable: true,
  get: function get() {
    return _dynamicWidgets.default;
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
    return _index2.default;
  }
});
Object.defineProperty(exports, "infiniteHits", {
  enumerable: true,
  get: function get() {
    return _infiniteHits.default;
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
Object.defineProperty(exports, "voiceSearch", {
  enumerable: true,
  get: function get() {
    return _voiceSearch.default;
  }
});
exports.EXPERIMENTAL_dynamicWidgets = void 0;

var _analytics = _interopRequireDefault(require("./analytics/analytics.js"));

var _breadcrumb = _interopRequireDefault(require("./breadcrumb/breadcrumb.js"));

var _clearRefinements = _interopRequireDefault(require("./clear-refinements/clear-refinements.js"));

var _configure = _interopRequireDefault(require("./configure/configure.js"));

var _currentRefinements = _interopRequireDefault(require("./current-refinements/current-refinements.js"));

var _answers = _interopRequireDefault(require("./answers/answers.js"));

var _configureRelatedItems = _interopRequireDefault(require("./configure-related-items/configure-related-items.js"));

var _dynamicWidgets = _interopRequireDefault(require("./dynamic-widgets/dynamic-widgets.js"));

var _index = require("../lib/utils/index.js");

var _geoSearch = _interopRequireDefault(require("./geo-search/geo-search.js"));

var _hierarchicalMenu = _interopRequireDefault(require("./hierarchical-menu/hierarchical-menu.js"));

var _hits = _interopRequireDefault(require("./hits/hits.js"));

var _hitsPerPage = _interopRequireDefault(require("./hits-per-page/hits-per-page.js"));

var _index2 = _interopRequireDefault(require("./index/index.js"));

var _infiniteHits = _interopRequireDefault(require("./infinite-hits/infinite-hits.js"));

var _menu = _interopRequireDefault(require("./menu/menu.js"));

var _menuSelect = _interopRequireDefault(require("./menu-select/menu-select.js"));

var _numericMenu = _interopRequireDefault(require("./numeric-menu/numeric-menu.js"));

var _pagination = _interopRequireDefault(require("./pagination/pagination.js"));

var _panel = _interopRequireDefault(require("./panel/panel.js"));

var _places = _interopRequireDefault(require("./places/places.js"));

var _poweredBy = _interopRequireDefault(require("./powered-by/powered-by.js"));

var _queryRuleContext = _interopRequireDefault(require("./query-rule-context/query-rule-context.js"));

var _queryRuleCustomData = _interopRequireDefault(require("./query-rule-custom-data/query-rule-custom-data.js"));

var _rangeInput = _interopRequireDefault(require("./range-input/range-input.js"));

var _rangeSlider = _interopRequireDefault(require("./range-slider/range-slider.js"));

var _ratingMenu = _interopRequireDefault(require("./rating-menu/rating-menu.js"));

var _refinementList = _interopRequireDefault(require("./refinement-list/refinement-list.js"));

var _relevantSort = _interopRequireDefault(require("./relevant-sort/relevant-sort.js"));

var _searchBox = _interopRequireDefault(require("./search-box/search-box.js"));

var _sortBy = _interopRequireDefault(require("./sort-by/sort-by.js"));

var _stats = _interopRequireDefault(require("./stats/stats.js"));

var _toggleRefinement = _interopRequireDefault(require("./toggle-refinement/toggle-refinement.js"));

var _voiceSearch = _interopRequireDefault(require("./voice-search/voice-search.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @deprecated use dynamicWidgets */
var EXPERIMENTAL_dynamicWidgets = (0, _index.deprecate)(_dynamicWidgets.default, 'use dynamicWidgets');
exports.EXPERIMENTAL_dynamicWidgets = EXPERIMENTAL_dynamicWidgets;