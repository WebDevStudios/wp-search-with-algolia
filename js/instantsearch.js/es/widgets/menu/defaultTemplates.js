var defaultTemplates = {
  item: '<a class="{{cssClasses.link}}" href="{{url}}">' + '<span class="{{cssClasses.label}}">{{label}}</span>' + '<span class="{{cssClasses.count}}">{{#helpers.formatNumber}}{{count}}{{/helpers.formatNumber}}</span>' + '</a>',
  showMoreText: "\n    {{#isShowingMore}}\n      Show less\n    {{/isShowingMore}}\n    {{^isShowingMore}}\n      Show more\n    {{/isShowingMore}}\n  "
};
export default defaultTemplates;