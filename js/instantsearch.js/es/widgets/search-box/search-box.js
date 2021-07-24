function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import connectSearchBox from '../../connectors/search-box/connectSearchBox';
import SearchBox from '../../components/SearchBox/SearchBox';
import defaultTemplates from './defaultTemplates';
var withUsage = createDocumentationMessageGenerator({
  name: 'search-box'
});
var suit = component('SearchBox');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      placeholder = _ref.placeholder,
      templates = _ref.templates,
      autofocus = _ref.autofocus,
      searchAsYouType = _ref.searchAsYouType,
      showReset = _ref.showReset,
      showSubmit = _ref.showSubmit,
      showLoadingIndicator = _ref.showLoadingIndicator;
  return function (_ref2) {
    var refine = _ref2.refine,
        query = _ref2.query,
        isSearchStalled = _ref2.isSearchStalled;
    render(h(SearchBox, {
      query: query,
      placeholder: placeholder,
      autofocus: autofocus,
      refine: refine,
      searchAsYouType: searchAsYouType,
      templates: templates,
      showSubmit: showSubmit,
      showReset: showReset,
      showLoadingIndicator: showLoadingIndicator,
      isSearchStalled: isSearchStalled,
      cssClasses: cssClasses
    }), containerNode);
  };
};
/**
 * The searchbox widget is used to let the user set a text based query.
 *
 * This is usually the  main entry point to start the search in an instantsearch context. For that
 * reason is usually placed on top, and not hidden so that the user can start searching right
 * away.
 *
 */


var searchBox = function searchBox(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$placeholder = _ref3.placeholder,
      placeholder = _ref3$placeholder === void 0 ? '' : _ref3$placeholder,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$autofocus = _ref3.autofocus,
      autofocus = _ref3$autofocus === void 0 ? false : _ref3$autofocus,
      _ref3$searchAsYouType = _ref3.searchAsYouType,
      searchAsYouType = _ref3$searchAsYouType === void 0 ? true : _ref3$searchAsYouType,
      _ref3$showReset = _ref3.showReset,
      showReset = _ref3$showReset === void 0 ? true : _ref3$showReset,
      _ref3$showSubmit = _ref3.showSubmit,
      showSubmit = _ref3$showSubmit === void 0 ? true : _ref3$showSubmit,
      _ref3$showLoadingIndi = _ref3.showLoadingIndicator,
      showLoadingIndicator = _ref3$showLoadingIndi === void 0 ? true : _ref3$showLoadingIndi,
      queryHook = _ref3.queryHook,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    form: cx(suit({
      descendantName: 'form'
    }), userCssClasses.form),
    input: cx(suit({
      descendantName: 'input'
    }), userCssClasses.input),
    submit: cx(suit({
      descendantName: 'submit'
    }), userCssClasses.submit),
    submitIcon: cx(suit({
      descendantName: 'submitIcon'
    }), userCssClasses.submitIcon),
    reset: cx(suit({
      descendantName: 'reset'
    }), userCssClasses.reset),
    resetIcon: cx(suit({
      descendantName: 'resetIcon'
    }), userCssClasses.resetIcon),
    loadingIndicator: cx(suit({
      descendantName: 'loadingIndicator'
    }), userCssClasses.loadingIndicator),
    loadingIcon: cx(suit({
      descendantName: 'loadingIcon'
    }), userCssClasses.loadingIcon)
  };

  var templates = _objectSpread(_objectSpread({}, defaultTemplates), userTemplates);

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    placeholder: placeholder,
    templates: templates,
    autofocus: autofocus,
    searchAsYouType: searchAsYouType,
    showReset: showReset,
    showSubmit: showSubmit,
    showLoadingIndicator: showLoadingIndicator
  });
  var makeWidget = connectSearchBox(specializedRenderer, function () {
    return render(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    queryHook: queryHook
  })), {}, {
    $$widgetType: 'ais.searchBox'
  });
};

export default searchBox;