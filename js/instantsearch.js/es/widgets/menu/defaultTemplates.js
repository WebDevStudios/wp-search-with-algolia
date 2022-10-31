import { h } from 'preact';
import { formatNumber } from "../../lib/formatNumber.js";
import { cx } from '@algolia/ui-components-shared';
var defaultTemplates = {
  item: function item(_ref) {
    var cssClasses = _ref.cssClasses,
        url = _ref.url,
        label = _ref.label,
        count = _ref.count;
    return h("a", {
      className: cx(cssClasses.link),
      href: url
    }, h("span", {
      className: cx(cssClasses.label)
    }, label), h("span", {
      className: cx(cssClasses.count)
    }, formatNumber(count)));
  },
  showMoreText: function showMoreText(_ref2) {
    var isShowingMore = _ref2.isShowingMore;
    return isShowingMore ? 'Show less' : 'Show more';
  }
};
export default defaultTemplates;