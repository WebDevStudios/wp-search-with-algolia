function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import connectQueryRules from '../../connectors/query-rules/connectQueryRules';
import CustomData from '../../components/QueryRuleCustomData/QueryRuleCustomData';
var withUsage = createDocumentationMessageGenerator({
  name: 'query-rule-custom-data'
});
var suit = component('QueryRuleCustomData');

var renderer = function renderer(_ref) {
  var items = _ref.items,
      widgetParams = _ref.widgetParams;
  var container = widgetParams.container,
      cssClasses = widgetParams.cssClasses,
      templates = widgetParams.templates;
  render(React.createElement(CustomData, {
    cssClasses: cssClasses,
    templates: templates,
    items: items
  }), container);
};

var queryRuleCustomData = function queryRuleCustomData() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref2.container,
      _ref2$cssClasses = _ref2.cssClasses,
      userCssClasses = _ref2$cssClasses === void 0 ? {} : _ref2$cssClasses,
      _ref2$templates = _ref2.templates,
      userTemplates = _ref2$templates === void 0 ? {} : _ref2$templates,
      _ref2$transformItems = _ref2.transformItems,
      transformItems = _ref2$transformItems === void 0 ? function (items) {
    return items;
  } : _ref2$transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var cssClasses = {
    root: cx(suit(), userCssClasses.root)
  };
  var defaultTemplates = {
    default: function _default(_ref3) {
      var items = _ref3.items;
      return JSON.stringify(items, null, 2);
    }
  };

  var templates = _objectSpread({}, defaultTemplates, {}, userTemplates);

  var containerNode = getContainerNode(container);
  var makeQueryRuleCustomData = connectQueryRules(renderer, function () {
    unmountComponentAtNode(containerNode);
  });
  return makeQueryRuleCustomData({
    container: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    transformItems: transformItems
  });
};

export default queryRuleCustomData;