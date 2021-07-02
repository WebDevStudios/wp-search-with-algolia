function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
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
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
  return function (_ref2) {
    var items = _ref2.items;
    render(h(CustomData, {
      cssClasses: cssClasses,
      templates: templates,
      items: items
    }), containerNode);
  };
};

var queryRuleCustomData = function queryRuleCustomData(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$transformItems = _ref3.transformItems,
      transformItems = _ref3$transformItems === void 0 ? function (items) {
    return items;
  } : _ref3$transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var cssClasses = {
    root: cx(suit(), userCssClasses.root)
  };
  var containerNode = getContainerNode(container);
  var defaultTemplates = {
    default: function _default(_ref4) {
      var items = _ref4.items;
      return JSON.stringify(items, null, 2);
    }
  };

  var templates = _objectSpread(_objectSpread({}, defaultTemplates), userTemplates);

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = connectQueryRules(specializedRenderer, function () {
    render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.queryRuleCustomData'
  });
};

export default queryRuleCustomData;