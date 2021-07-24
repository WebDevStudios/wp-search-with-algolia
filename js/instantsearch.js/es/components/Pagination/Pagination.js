function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { Component, h } from 'preact';
import cx from 'classnames';
import PaginationLink from './PaginationLink';
import { isSpecialClick } from '../../lib/utils';
var defaultProps = {
  currentPage: 0,
  nbPages: 0,
  pages: []
};

var Pagination = /*#__PURE__*/function (_Component) {
  _inherits(Pagination, _Component);

  var _super = _createSuper(Pagination);

  function Pagination() {
    var _this;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (pageNumber, event) {
      if (isSpecialClick(event)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }

      event.preventDefault();

      _this.props.setCurrentPage(pageNumber);
    });

    _defineProperty(_assertThisInitialized(_this), "previousPageLink", function () {
      return _this.pageLink({
        ariaLabel: 'Previous',
        additionalClassName: _this.props.cssClasses.previousPageItem,
        isDisabled: _this.props.isFirstPage,
        label: _this.props.templates.previous,
        pageNumber: _this.props.currentPage - 1,
        createURL: _this.props.createURL
      });
    });

    _defineProperty(_assertThisInitialized(_this), "nextPageLink", function () {
      return _this.pageLink({
        ariaLabel: 'Next',
        additionalClassName: _this.props.cssClasses.nextPageItem,
        isDisabled: _this.props.isLastPage,
        label: _this.props.templates.next,
        pageNumber: _this.props.currentPage + 1,
        createURL: _this.props.createURL
      });
    });

    _defineProperty(_assertThisInitialized(_this), "firstPageLink", function () {
      return _this.pageLink({
        ariaLabel: 'First',
        additionalClassName: _this.props.cssClasses.firstPageItem,
        isDisabled: _this.props.isFirstPage,
        label: _this.props.templates.first,
        pageNumber: 0,
        createURL: _this.props.createURL
      });
    });

    _defineProperty(_assertThisInitialized(_this), "lastPageLink", function () {
      return _this.pageLink({
        ariaLabel: 'Last',
        additionalClassName: _this.props.cssClasses.lastPageItem,
        isDisabled: _this.props.isLastPage,
        label: _this.props.templates.last,
        pageNumber: _this.props.nbPages - 1,
        createURL: _this.props.createURL
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pages", function () {
      return _this.props.pages.map(function (pageNumber) {
        return _this.pageLink({
          ariaLabel: "".concat(pageNumber + 1),
          additionalClassName: _this.props.cssClasses.pageItem,
          isSelected: pageNumber === _this.props.currentPage,
          label: "".concat(pageNumber + 1),
          pageNumber: pageNumber,
          createURL: _this.props.createURL
        });
      });
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
        item: cx(this.props.cssClasses.item, additionalClassName),
        link: this.props.cssClasses.link
      };

      if (isDisabled) {
        cssClasses.item = cx(cssClasses.item, this.props.cssClasses.disabledItem);
      } else if (isSelected) {
        cssClasses.item = cx(cssClasses.item, this.props.cssClasses.selectedItem);
      }

      var url = !isDisabled ? createURL(pageNumber) : '#';
      return h(PaginationLink, {
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
    key: "render",
    value: function render() {
      return h("div", {
        className: cx(this.props.cssClasses.root, _defineProperty({}, this.props.cssClasses.noRefinementRoot, this.props.nbPages <= 1))
      }, h("ul", {
        className: this.props.cssClasses.list
      }, this.props.showFirst && this.firstPageLink(), this.props.showPrevious && this.previousPageLink(), this.pages(), this.props.showNext && this.nextPageLink(), this.props.showLast && this.lastPageLink()));
    }
  }]);

  return Pagination;
}(Component);

_defineProperty(Pagination, "defaultProps", defaultProps);

export default Pagination;