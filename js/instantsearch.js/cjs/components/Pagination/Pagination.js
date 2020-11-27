"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _PaginationLink = _interopRequireDefault(require("./PaginationLink"));

var _utils = require("../../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pagination =
/*#__PURE__*/
function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (pageNumber, event) {
      if ((0, _utils.isSpecialClick)(event)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }

      event.preventDefault();

      _this.props.setCurrentPage(pageNumber);
    });

    return _this;
  }

  _createClass(Pagination, [{
    key: "pageLink",
    value: function pageLink(_ref) {
      var label = _ref.label,
          ariaLabel = _ref.ariaLabel,
          pageNumber = _ref.pageNumber,
          _ref$additionalClassN = _ref.additionalClassName,
          additionalClassName = _ref$additionalClassN === void 0 ? null : _ref$additionalClassN,
          _ref$isDisabled = _ref.isDisabled,
          isDisabled = _ref$isDisabled === void 0 ? false : _ref$isDisabled,
          _ref$isSelected = _ref.isSelected,
          isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
          createURL = _ref.createURL;
      var cssClasses = {
        item: (0, _classnames.default)(this.props.cssClasses.item, additionalClassName),
        link: this.props.cssClasses.link
      };

      if (isDisabled) {
        cssClasses.item = (0, _classnames.default)(cssClasses.item, this.props.cssClasses.disabledItem);
      } else if (isSelected) {
        cssClasses.item = (0, _classnames.default)(cssClasses.item, this.props.cssClasses.selectedItem);
      }

      var url = createURL && !isDisabled ? createURL(pageNumber) : '#';
      return _preactCompat.default.createElement(_PaginationLink.default, {
        ariaLabel: ariaLabel,
        cssClasses: cssClasses,
        handleClick: this.handleClick,
        isDisabled: isDisabled,
        key: label + pageNumber + ariaLabel,
        label: label,
        pageNumber: pageNumber,
        url: url
      });
    }
  }, {
    key: "previousPageLink",
    value: function previousPageLink(_ref2) {
      var isFirstPage = _ref2.isFirstPage,
          currentPage = _ref2.currentPage,
          createURL = _ref2.createURL;
      return this.pageLink({
        ariaLabel: 'Previous',
        additionalClassName: this.props.cssClasses.previousPageItem,
        isDisabled: this.props.nbHits === 0 || isFirstPage,
        label: this.props.templates.previous,
        pageNumber: currentPage - 1,
        createURL: createURL
      });
    }
  }, {
    key: "nextPageLink",
    value: function nextPageLink(_ref3) {
      var isLastPage = _ref3.isLastPage,
          currentPage = _ref3.currentPage,
          createURL = _ref3.createURL;
      return this.pageLink({
        ariaLabel: 'Next',
        additionalClassName: this.props.cssClasses.nextPageItem,
        isDisabled: this.props.nbHits === 0 || isLastPage,
        label: this.props.templates.next,
        pageNumber: currentPage + 1,
        createURL: createURL
      });
    }
  }, {
    key: "firstPageLink",
    value: function firstPageLink(_ref4) {
      var isFirstPage = _ref4.isFirstPage,
          createURL = _ref4.createURL;
      return this.pageLink({
        ariaLabel: 'First',
        additionalClassName: this.props.cssClasses.firstPageItem,
        isDisabled: this.props.nbHits === 0 || isFirstPage,
        label: this.props.templates.first,
        pageNumber: 0,
        createURL: createURL
      });
    }
  }, {
    key: "lastPageLink",
    value: function lastPageLink(_ref5) {
      var isLastPage = _ref5.isLastPage,
          nbPages = _ref5.nbPages,
          createURL = _ref5.createURL;
      return this.pageLink({
        ariaLabel: 'Last',
        additionalClassName: this.props.cssClasses.lastPageItem,
        isDisabled: this.props.nbHits === 0 || isLastPage,
        label: this.props.templates.last,
        pageNumber: nbPages - 1,
        createURL: createURL
      });
    }
  }, {
    key: "pages",
    value: function pages(_ref6) {
      var _this2 = this;

      var currentPage = _ref6.currentPage,
          _pages = _ref6.pages,
          createURL = _ref6.createURL;
      return _pages.map(function (pageNumber) {
        return _this2.pageLink({
          ariaLabel: pageNumber + 1,
          additionalClassName: _this2.props.cssClasses.pageItem,
          isSelected: pageNumber === currentPage,
          label: pageNumber + 1,
          pageNumber: pageNumber,
          createURL: createURL
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _preactCompat.default.createElement("div", {
        className: (0, _classnames.default)(this.props.cssClasses.root, _defineProperty({}, this.props.cssClasses.noRefinementRoot, this.props.isFirstPage))
      }, _preactCompat.default.createElement("ul", {
        className: this.props.cssClasses.list
      }, this.props.showFirst && this.firstPageLink(this.props), this.props.showPrevious && this.previousPageLink(this.props), this.pages(this.props), this.props.showNext && this.nextPageLink(this.props), this.props.showLast && this.lastPageLink(this.props)));
    }
  }]);

  return Pagination;
}(_preactCompat.Component);

Pagination.defaultProps = {
  nbHits: 0,
  currentPage: 0,
  nbPages: 0
};
var _default = Pagination;
exports.default = _default;