"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

  var templates = _objectSpread(_objectSpread({}, _defaultTemplates.default), userTemplates);

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
  var makeWidget = (0, _connectSearchBox.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    queryHook: queryHook
  })), {}, {
    $$widgetType: 'ais.searchBox'
  });
};

var _default = searchBox;
exports.default = _default;