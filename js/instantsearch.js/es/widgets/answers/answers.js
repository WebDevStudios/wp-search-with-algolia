function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import defaultTemplates from './defaultTemplates';
import { createDocumentationMessageGenerator, getContainerNode, prepareTemplateProps } from '../../lib/utils';
import { component } from '../../lib/suit';
import Answers from '../../components/Answers/Answers';
import connectAnswers from '../../connectors/answers/connectAnswers';
var withUsage = createDocumentationMessageGenerator({
  name: 'answers'
});
var suit = component('Answers');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      renderState = _ref.renderState,
      templates = _ref.templates;
  return function (_ref2, isFirstRendering) {
    var hits = _ref2.hits,
        isLoading = _ref2.isLoading,
        instantSearchInstance = _ref2.instantSearchInstance;

    if (isFirstRendering) {
      renderState.templateProps = prepareTemplateProps({
        defaultTemplates: defaultTemplates,
        templatesConfig: instantSearchInstance.templatesConfig,
        templates: templates
      });
      return;
    }

    render(h(Answers, {
      cssClasses: cssClasses,
      hits: hits,
      isLoading: isLoading,
      templateProps: renderState.templateProps
    }), containerNode);
  };
};

var answersWidget = function answersWidget(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      attributesForPrediction = _ref3.attributesForPrediction,
      queryLanguages = _ref3.queryLanguages,
      nbHits = _ref3.nbHits,
      searchDebounceTime = _ref3.searchDebounceTime,
      renderDebounceTime = _ref3.renderDebounceTime,
      escapeHTML = _ref3.escapeHTML,
      extraParameters = _ref3.extraParameters,
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    emptyRoot: cx(suit({
      modifierName: 'empty'
    }), userCssClasses.emptyRoot),
    header: cx(suit({
      descendantName: 'header'
    }), userCssClasses.header),
    loader: cx(suit({
      descendantName: 'loader'
    }), userCssClasses.loader),
    list: cx(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: cx(suit({
      descendantName: 'item'
    }), userCssClasses.item)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    renderState: {}
  });
  var makeWidget = connectAnswers(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    attributesForPrediction: attributesForPrediction,
    queryLanguages: queryLanguages,
    nbHits: nbHits,
    searchDebounceTime: searchDebounceTime,
    renderDebounceTime: renderDebounceTime,
    escapeHTML: escapeHTML,
    extraParameters: extraParameters
  })), {}, {
    $$widgetType: 'ais.answers'
  });
};

export default answersWidget;