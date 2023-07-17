"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uiComponentsShared = require("@algolia/ui-components-shared");
var _preact = require("preact");
var _Pagination = _interopRequireDefault(require("../../components/Pagination/Pagination"));
var _connectPagination = _interopRequireDefault(require("../../connectors/pagination/connectPagination"));
var _suit = require("../../lib/suit");
var _utils = require("../../lib/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var suit = (0, _suit.component)('Pagination');
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'pagination'
});
var defaultTemplates = {
  previous: function previous() {
    return '‹';
  },
  next: function next() {
    return '›';
  },
  page: function page(_ref) {
    var _page = _ref.page;
    return "".concat(_page);
  },
  first: function first() {
    return '«';
  },
  last: function last() {
    return '»';
  }
};
var renderer = function renderer(_ref2) {
  var containerNode = _ref2.containerNode,
    cssClasses = _ref2.cssClasses,
    templates = _ref2.templates,
    showFirst = _ref2.showFirst,
    showLast = _ref2.showLast,
    showPrevious = _ref2.showPrevious,
    showNext = _ref2.showNext,
    scrollToNode = _ref2.scrollToNode;
  return function (_ref3, isFirstRendering) {
    var createURL = _ref3.createURL,
      currentRefinement = _ref3.currentRefinement,
      nbPages = _ref3.nbPages,
      pages = _ref3.pages,
      isFirstPage = _ref3.isFirstPage,
      isLastPage = _ref3.isLastPage,
      refine = _ref3.refine;
    if (isFirstRendering) return;
    var setCurrentPage = function setCurrentPage(pageNumber) {
      refine(pageNumber);
      if (scrollToNode !== false) {
        scrollToNode.scrollIntoView();
      }
    };
    (0, _preact.render)((0, _preact.h)(_Pagination.default, {
      createURL: createURL,
      cssClasses: cssClasses,
      currentPage: currentRefinement,
      templates: templates,
      nbPages: nbPages,
      pages: pages,
      isFirstPage: isFirstPage,
      isLastPage: isLastPage,
      setCurrentPage: setCurrentPage,
      showFirst: showFirst,
      showLast: showLast,
      showPrevious: showPrevious,
      showNext: showNext
    }), containerNode);
  };
};
var pagination = function pagination(widgetParams) {
  var _ref4 = widgetParams || {},
    container = _ref4.container,
    _ref4$templates = _ref4.templates,
    userTemplates = _ref4$templates === void 0 ? {} : _ref4$templates,
    _ref4$cssClasses = _ref4.cssClasses,
    userCssClasses = _ref4$cssClasses === void 0 ? {} : _ref4$cssClasses,
    totalPages = _ref4.totalPages,
    padding = _ref4.padding,
    _ref4$showFirst = _ref4.showFirst,
    showFirst = _ref4$showFirst === void 0 ? true : _ref4$showFirst,
    _ref4$showLast = _ref4.showLast,
    showLast = _ref4$showLast === void 0 ? true : _ref4$showLast,
    _ref4$showPrevious = _ref4.showPrevious,
    showPrevious = _ref4$showPrevious === void 0 ? true : _ref4$showPrevious,
    _ref4$showNext = _ref4.showNext,
    showNext = _ref4$showNext === void 0 ? true : _ref4$showNext,
    _ref4$scrollTo = _ref4.scrollTo,
    userScrollTo = _ref4$scrollTo === void 0 ? 'body' : _ref4$scrollTo;
  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }
  var containerNode = (0, _utils.getContainerNode)(container);
  var scrollTo = userScrollTo === true ? 'body' : userScrollTo;
  var scrollToNode = scrollTo !== false ? (0, _utils.getContainerNode)(scrollTo) : false;
  var cssClasses = {
    root: (0, _uiComponentsShared.cx)(suit(), userCssClasses.root),
    noRefinementRoot: (0, _uiComponentsShared.cx)(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    firstPageItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'firstPage'
    }), userCssClasses.firstPageItem),
    lastPageItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'lastPage'
    }), userCssClasses.lastPageItem),
    previousPageItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'previousPage'
    }), userCssClasses.previousPageItem),
    nextPageItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'nextPage'
    }), userCssClasses.nextPageItem),
    pageItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'page'
    }), userCssClasses.pageItem),
    selectedItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    disabledItem: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'item',
      modifierName: 'disabled'
    }), userCssClasses.disabledItem),
    link: (0, _uiComponentsShared.cx)(suit({
      descendantName: 'link'
    }), userCssClasses.link)
  };
  var templates = _objectSpread(_objectSpread({}, defaultTemplates), userTemplates);
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    showFirst: showFirst,
    showLast: showLast,
    showPrevious: showPrevious,
    showNext: showNext,
    scrollToNode: scrollToNode
  });
  var makeWidget = (0, _connectPagination.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    totalPages: totalPages,
    padding: padding
  })), {}, {
    $$widgetType: 'ais.pagination'
  });
};
var _default = pagination;
exports.default = _default;