/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import Selector from '../../components/Selector/Selector';
import connectHitsPerPage from '../../connectors/hits-per-page/connectHitsPerPage';
import { getContainerNode, createDocumentationMessageGenerator, find } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'hits-per-page'
});
var suit = component('HitsPerPage');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var items = _ref2.items,
        refine = _ref2.refine;
    if (isFirstRendering) return;

    var _ref3 = find(items, function (_ref4) {
      var isRefined = _ref4.isRefined;
      return isRefined;
    }) || {},
        currentValue = _ref3.value;

    render(h("div", {
      className: cssClasses.root
    }, h(Selector, {
      cssClasses: cssClasses,
      currentValue: currentValue,
      options: items,
      setValue: refine
    })), containerNode);
  };
};

var hitsPerPage = function hitsPerPage(widgetOptions) {
  var _ref5 = widgetOptions || {},
      container = _ref5.container,
      items = _ref5.items,
      _ref5$cssClasses = _ref5.cssClasses,
      userCssClasses = _ref5$cssClasses === void 0 ? {} : _ref5$cssClasses,
      transformItems = _ref5.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    select: cx(suit({
      descendantName: 'select'
    }), userCssClasses.select),
    option: cx(suit({
      descendantName: 'option'
    }), userCssClasses.option)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeHitsPerPage = connectHitsPerPage(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return makeHitsPerPage({
    items: items,
    transformItems: transformItems
  });
};

export default hitsPerPage;