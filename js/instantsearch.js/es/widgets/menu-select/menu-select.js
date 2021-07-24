function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import connectMenu from '../../connectors/menu/connectMenu';
import MenuSelect from '../../components/MenuSelect/MenuSelect';
import defaultTemplates from './defaultTemplates';
import { prepareTemplateProps, getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
var withUsage = createDocumentationMessageGenerator({
  name: 'menu-select'
});
var suit = component('MenuSelect');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var refine = _ref2.refine,
        items = _ref2.items,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(h(MenuSelect, {
      cssClasses: cssClasses,
      items: items,
      refine: refine,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var menuSelect = function menuSelect(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      attribute = _ref3.attribute,
      _ref3$sortBy = _ref3.sortBy,
      sortBy = _ref3$sortBy === void 0 ? ['name:asc'] : _ref3$sortBy,
      _ref3$limit = _ref3.limit,
      limit = _ref3$limit === void 0 ? 10 : _ref3$limit,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      transformItems = _ref3.transformItems;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinementRoot: cx(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    select: cx(suit({
      descendantName: 'select'
    }), userCssClasses.select),
    option: cx(suit({
      descendantName: 'option'
    }), userCssClasses.option)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    renderState: {},
    templates: templates
  });
  var makeWidget = connectMenu(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attribute: attribute,
    limit: limit,
    sortBy: sortBy,
    transformItems: transformItems
  })), {}, {
    $$widgetType: 'ais.menuSelect'
  });
};

export default menuSelect;