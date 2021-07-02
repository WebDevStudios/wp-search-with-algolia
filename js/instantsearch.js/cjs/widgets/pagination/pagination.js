"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Pagination = _interopRequireDefault(require("../../components/Pagination/Pagination"));

var _connectPagination = _interopRequireDefault(require("../../connectors/pagination/connectPagination"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var suit = (0, _suit.component)('Pagination');
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'pagination'
});
var defaultTemplates = {
  previous: '‹',
  next: '›',
  first: '«',
  last: '»'
};

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates,
      showFirst = _ref.showFirst,
      showLast = _ref.showLast,
      showPrevious = _ref.showPrevious,
      showNext = _ref.showNext,
      scrollToNode = _ref.scrollToNode;
  return function (_ref2, isFirstRendering) {
    var createURL = _ref2.createURL,
        currentRefinement = _ref2.currentRefinement,
        nbPages = _ref2.nbPages,
        pages = _ref2.pages,
        isFirstPage = _ref2.isFirstPage,
        isLastPage = _ref2.isLastPage,
        refine = _ref2.refine;
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
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      totalPages = _ref3.totalPages,
      padding = _ref3.padding,
      _ref3$showFirst = _ref3.showFirst,
      showFirst = _ref3$showFirst === void 0 ? true : _ref3$showFirst,
      _ref3$showLast = _ref3.showLast,
      showLast = _ref3$showLast === void 0 ? true : _ref3$showLast,
      _ref3$showPrevious = _ref3.showPrevious,
      showPrevious = _ref3$showPrevious === void 0 ? true : _ref3$showPrevious,
      _ref3$showNext = _ref3.showNext,
      showNext = _ref3$showNext === void 0 ? true : _ref3$showNext,
      _ref3$scrollTo = _ref3.scrollTo,
      userScrollTo = _ref3$scrollTo === void 0 ? 'body' : _ref3$scrollTo;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var scrollTo = userScrollTo === true ? 'body' : userScrollTo;
  var scrollToNode = scrollTo !== false ? (0, _utils.getContainerNode)(scrollTo) : false;
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    noRefinementRoot: (0, _classnames.default)(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    list: (0, _classnames.default)(suit({
      descendantName: 'list'
    }), userCssClasses.list),
    item: (0, _classnames.default)(suit({
      descendantName: 'item'
    }), userCssClasses.item),
    firstPageItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'firstPage'
    }), userCssClasses.firstPageItem),
    lastPageItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'lastPage'
    }), userCssClasses.lastPageItem),
    previousPageItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'previousPage'
    }), userCssClasses.previousPageItem),
    nextPageItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'nextPage'
    }), userCssClasses.nextPageItem),
    pageItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'page'
    }), userCssClasses.pageItem),
    selectedItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'selected'
    }), userCssClasses.selectedItem),
    disabledItem: (0, _classnames.default)(suit({
      descendantName: 'item',
      modifierName: 'disabled'
    }), userCssClasses.disabledItem),
    link: (0, _classnames.default)(suit({
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