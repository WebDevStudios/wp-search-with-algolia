"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = searchBox;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

var _connectSearchBox = _interopRequireDefault(require("../../connectors/search-box/connectSearchBox"));

var _SearchBox = _interopRequireDefault(require("../../components/SearchBox/SearchBox"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'search-box'
});
var suit = (0, _suit.component)('SearchBox');

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
    (0, _preact.render)((0, _preact.h)(_SearchBox.default, {
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
 * @typedef {Object} SearchBoxTemplates
 * @property {function|string} submit Template used for displaying the submit. Can accept a function or a Hogan string.
 * @property {function|string} reset Template used for displaying the button. Can accept a function or a Hogan string.
 * @property {function|string} loadingIndicator Template used for displaying the button. Can accept a function or a Hogan string.
 */

/**
 * @typedef {Object} SearchBoxCSSClasses
 * @property {string|string[]} [root] CSS class to add to the wrapping `<div>`
 * @property {string|string[]} [form] CSS class to add to the form
 * @property {string|string[]} [input] CSS class to add to the input.
 * @property {string|string[]} [submit] CSS classes added to the submit button.
 * @property {string|string[]} [submitIcon] CSS classes added to the submit icon.
 * @property {string|string[]} [reset] CSS classes added to the reset button.
 * @property {string|string[]} [resetIcon] CSS classes added to the reset icon.
 * @property {string|string[]} [loadingIndicator] CSS classes added to the loading indicator element.
 * @property {string|string[]} [loadingIcon] CSS classes added to the loading indicator icon.
 */

/**
 * @typedef {Object} SearchBoxWidgetOptions
 * @property {string|HTMLElement} container CSS Selector or HTMLElement to insert the widget
 * @property {string} [placeholder] The placeholder of the input
 * @property {boolean} [autofocus=false] Whether the input should be autofocused
 * @property {boolean} [searchAsYouType=true] If set, trigger the search
 * once `<Enter>` is pressed only.
 * @property {boolean} [showReset=true] Whether to show the reset button
 * @property {boolean} [showSubmit=true] Whether to show the submit button
 * @property {boolean} [showLoadingIndicator=true] Whether to show the loading indicator (replaces the submit if
 * the search is stalled)
 * @property {SearchBoxCSSClasses} [cssClasses] CSS classes to add
 * @property {SearchBoxTemplates} [templates] Templates used for customizing the rendering of the searchbox
 * @property {function} [queryHook] A function that is called every time a new search is done. You
 * will get the query as the first parameter and a search (query) function to call as the second parameter.
 * This `queryHook` can be used to debounce the number of searches done from the search box.
 */

/**
 * The searchbox widget is used to let the user set a text based query.
 *
 * This is usually the  main entry point to start the search in an instantsearch context. For that
 * reason is usually placed on top, and not hidden so that the user can start searching right
 * away.
 *
 * @type {WidgetFactory}
 * @devNovel SearchBox
 * @category basic
 * @param {SearchBoxWidgetOptions} $0 Options used to configure a SearchBox widget.
 * @return {Widget} Creates a new instance of the SearchBox widget.
 * @example
 * search.addWidgets([
 *   instantsearch.widgets.searchBox({
 *     container: '#q',
 *     placeholder: 'Search for products',
 *   })
 * ]);
 */


function searchBox() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
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
      templates = _ref3.templates;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    form: (0, _classnames.default)(suit({
      descendantName: 'form'
    }), userCssClasses.form),
    input: (0, _classnames.default)(suit({
      descendantName: 'input'
    }), userCssClasses.input),
    submit: (0, _classnames.default)(suit({
      descendantName: 'submit'
    }), userCssClasses.submit),
    submitIcon: (0, _classnames.default)(suit({
      descendantName: 'submitIcon'
    }), userCssClasses.submitIcon),
    reset: (0, _classnames.default)(suit({
      descendantName: 'reset'
    }), userCssClasses.reset),
    resetIcon: (0, _classnames.default)(suit({
      descendantName: 'resetIcon'
    }), userCssClasses.resetIcon),
    loadingIndicator: (0, _classnames.default)(suit({
      descendantName: 'loadingIndicator'
    }), userCssClasses.loadingIndicator),
    loadingIcon: (0, _classnames.default)(suit({
      descendantName: 'loadingIcon'
    }), userCssClasses.loadingIcon)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    placeholder: placeholder,
    templates: _objectSpread({}, _defaultTemplates.default, {}, templates),
    autofocus: autofocus,
    searchAsYouType: searchAsYouType,
    showReset: showReset,
    showSubmit: showSubmit,
    showLoadingIndicator: showLoadingIndicator
  });
  var makeWidget = (0, _connectSearchBox.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return makeWidget({
    queryHook: queryHook
  });
}