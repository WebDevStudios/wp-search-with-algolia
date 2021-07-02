function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import connectRelevantSort from '../../connectors/relevant-sort/connectRelevantSort';
import RelevantSort from '../../components/RelevantSort/RelevantSort';
import defaultTemplates from './defaultTemplates';
var withUsage = createDocumentationMessageGenerator({
  name: 'relevant-sort'
});
var suit = component('RelevantSort');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
  return function (_ref2) {
    var isRelevantSorted = _ref2.isRelevantSorted,
        isVirtualReplica = _ref2.isVirtualReplica,
        refine = _ref2.refine;
    render(h(RelevantSort, {
      cssClasses: cssClasses,
      templates: templates,
      isRelevantSorted: isRelevantSorted,
      isVirtualReplica: isVirtualReplica,
      refine: refine
    }), containerNode);
  };
};

var relevantSort = function relevantSort(widgetParams) {
  var container = widgetParams.container,
      _widgetParams$templat = widgetParams.templates,
      userTemplates = _widgetParams$templat === void 0 ? {} : _widgetParams$templat,
      _widgetParams$cssClas = widgetParams.cssClasses,
      userCssClasses = _widgetParams$cssClas === void 0 ? {} : _widgetParams$cssClas;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    text: cx(suit({
      descendantName: 'text'
    }), userCssClasses.text),
    button: cx(suit({
      descendantName: 'button'
    }), userCssClasses.button)
  };

  var templates = _objectSpread(_objectSpread({}, defaultTemplates), userTemplates);

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = connectRelevantSort(specializedRenderer, function () {
    render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({})), {}, {
    $$widgetType: 'ais.relevantSort'
  });
};

export default relevantSort;