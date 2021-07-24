"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultTemplates = {
  item: "{{#count}}<a class=\"{{cssClasses.link}}\" aria-label=\"{{value}} & up\" href=\"{{url}}\">{{/count}}{{^count}}<div class=\"{{cssClasses.link}}\" aria-label=\"{{value}} & up\" disabled>{{/count}}\n  {{#stars}}<svg class=\"{{cssClasses.starIcon}} {{#.}}{{cssClasses.fullStarIcon}}{{/.}}{{^.}}{{cssClasses.emptyStarIcon}}{{/.}}\" aria-hidden=\"true\" width=\"24\" height=\"24\">\n    {{#.}}<use xlink:href=\"#ais-RatingMenu-starSymbol\"></use>{{/.}}{{^.}}<use xlink:href=\"#ais-RatingMenu-starEmptySymbol\"></use>{{/.}}\n  </svg>{{/stars}}\n  <span class=\"{{cssClasses.label}}\">& Up</span>\n  {{#count}}<span class=\"{{cssClasses.count}}\">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span>{{/count}}\n{{#count}}</a>{{/count}}{{^count}}</div>{{/count}}"
};
var _default = defaultTemplates;
exports.default = _default;