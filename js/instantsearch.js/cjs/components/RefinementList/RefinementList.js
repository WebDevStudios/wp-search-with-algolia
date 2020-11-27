"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _Template = _interopRequireDefault(require("../Template/Template"));

var _RefinementListItem = _interopRequireDefault(require("./RefinementListItem"));

var _SearchBox = _interopRequireDefault(require("../SearchBox/SearchBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RefinementList =
/*#__PURE__*/
function (_Component) {
  _inherits(RefinementList, _Component);

  function RefinementList(props) {
    var _this;

    _classCallCheck(this, RefinementList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RefinementList).call(this, props));
    _this.handleItemClick = _this.handleItemClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RefinementList, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var isStateDifferent = nextState !== this.state;
      var isFacetValuesDifferent = !(0, _utils.isEqual)(this.props.facetValues, nextProps.facetValues);
      var shouldUpdate = isStateDifferent || isFacetValuesDifferent;
      return shouldUpdate;
    }
  }, {
    key: "refine",
    value: function refine(facetValueToRefine, isRefined) {
      this.props.toggleRefinement(facetValueToRefine, isRefined);
    }
  }, {
    key: "_generateFacetItem",
    value: function _generateFacetItem(facetValue) {
      var _cx;

      var subItems;
      var hasChildren = facetValue.data && facetValue.data.length > 0;

      if (hasChildren) {
        subItems = _preactCompat.default.createElement(RefinementList, _extends({}, this.props, {
          depth: this.props.depth + 1,
          facetValues: facetValue.data,
          showMore: false,
          className: this.props.cssClasses.childList
        }));
      }

      var url = this.props.createURL(facetValue.value);

      var templateData = _objectSpread({}, facetValue, {
        url: url,
        attribute: this.props.attribute,
        cssClasses: this.props.cssClasses
      });

      var key = facetValue.value;

      if (facetValue.isRefined !== undefined) {
        key += "/".concat(facetValue.isRefined);
      }

      if (facetValue.count !== undefined) {
        key += "/".concat(facetValue.count);
      }

      return _preactCompat.default.createElement(_RefinementListItem.default, {
        templateKey: "item",
        key: key,
        facetValueToRefine: facetValue.value,
        handleClick: this.handleItemClick,
        isRefined: facetValue.isRefined,
        className: (0, _classnames.default)(this.props.cssClasses.item, (_cx = {}, _defineProperty(_cx, this.props.cssClasses.selectedItem, facetValue.isRefined), _defineProperty(_cx, this.props.cssClasses.disabledItem, !facetValue.count), _defineProperty(_cx, this.props.cssClasses.parentItem, hasChildren), _cx)),
        subItems: subItems,
        templateData: templateData,
        templateProps: this.props.templateProps
      });
    } // Click events on DOM tree like LABEL > INPUT will result in two click events
    // instead of one.
    // No matter the framework, see https://www.google.com/search?q=click+label+twice
    //
    // Thus making it hard to distinguish activation from deactivation because both click events
    // are very close. Debounce is a solution but hacky.
    //
    // So the code here checks if the click was done on or in a LABEL. If this LABEL
    // has a checkbox inside, we ignore the first click event because we will get another one.
    //
    // We also check if the click was done inside a link and then e.preventDefault() because we already
    // handle the url
    //
    // Finally, we always stop propagation of the event to avoid multiple levels RefinementLists to fail: click
    // on child would click on parent also

  }, {
    key: "handleItemClick",
    value: function handleItemClick(_ref) {
      var facetValueToRefine = _ref.facetValueToRefine,
          originalEvent = _ref.originalEvent,
          isRefined = _ref.isRefined;

      if ((0, _utils.isSpecialClick)(originalEvent)) {
        // do not alter the default browser behavior
        // if one special key is down
        return;
      }

      if (isRefined && originalEvent.target.parentNode.querySelector('input[type="radio"]:checked')) {
        // Prevent refinement for being reset if the user clicks on an already checked radio button
        return;
      }

      if (originalEvent.target.tagName === 'INPUT') {
        this.refine(facetValueToRefine, isRefined);
        return;
      }

      var parent = originalEvent.target;

      while (parent !== originalEvent.currentTarget) {
        if (parent.tagName === 'LABEL' && (parent.querySelector('input[type="checkbox"]') || parent.querySelector('input[type="radio"]'))) {
          return;
        }

        if (parent.tagName === 'A' && parent.href) {
          originalEvent.preventDefault();
        }

        parent = parent.parentNode;
      }

      originalEvent.stopPropagation();
      this.refine(facetValueToRefine, isRefined);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.searchBox && !nextProps.isFromSearch) {
        this.searchBox.resetInput();
      }
    }
  }, {
    key: "refineFirstValue",
    value: function refineFirstValue() {
      var firstValue = this.props.facetValues[0];

      if (firstValue) {
        var actualValue = firstValue.value;
        this.props.toggleRefinement(actualValue);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Adding `-lvl0` classes
      var cssClassList = (0, _classnames.default)(this.props.cssClasses.list, _defineProperty({}, "".concat(this.props.cssClasses.depth).concat(this.props.depth), this.props.cssClasses.depth));
      var showMoreButtonClassName = (0, _classnames.default)(this.props.cssClasses.showMore, _defineProperty({}, this.props.cssClasses.disabledShowMore, !(this.props.showMore === true && this.props.canToggleShowMore)));

      var showMoreButton = this.props.showMore === true && _preactCompat.default.createElement(_Template.default, _extends({}, this.props.templateProps, {
        templateKey: "showMoreText",
        rootTagName: "button",
        rootProps: {
          className: showMoreButtonClassName,
          disabled: !this.props.canToggleShowMore,
          onClick: this.props.toggleShowMore
        },
        data: {
          isShowingMore: this.props.isShowingMore
        }
      }));

      var shouldDisableSearchBox = this.props.searchIsAlwaysActive !== true && !(this.props.isFromSearch || !this.props.hasExhaustiveItems);

      var searchBox = this.props.searchFacetValues && _preactCompat.default.createElement("div", {
        className: this.props.cssClasses.searchBox
      }, _preactCompat.default.createElement(_SearchBox.default, {
        ref: function ref(searchBoxRef) {
          return _this2.searchBox = searchBoxRef;
        },
        placeholder: this.props.searchPlaceholder,
        disabled: shouldDisableSearchBox,
        cssClasses: this.props.cssClasses.searchable,
        templates: this.props.templateProps.templates,
        onChange: function onChange(event) {
          return _this2.props.searchFacetValues(event.target.value);
        },
        onReset: function onReset() {
          return _this2.props.searchFacetValues('');
        },
        onSubmit: function onSubmit() {
          return _this2.refineFirstValue();
        } // This sets the search box to a controlled state because
        // we don't rely on the `refine` prop but on `onChange`.
        ,
        searchAsYouType: false
      }));

      var facetValues = this.props.facetValues && this.props.facetValues.length > 0 && _preactCompat.default.createElement("ul", {
        className: cssClassList
      }, this.props.facetValues.map(this._generateFacetItem, this));

      var noResults = this.props.searchFacetValues && this.props.isFromSearch && this.props.facetValues.length === 0 && _preactCompat.default.createElement(_Template.default, _extends({}, this.props.templateProps, {
        templateKey: "searchableNoResults",
        rootProps: {
          className: this.props.cssClasses.noResults
        }
      }));

      return _preactCompat.default.createElement("div", {
        className: (0, _classnames.default)(this.props.cssClasses.root, _defineProperty({}, this.props.cssClasses.noRefinementRoot, !this.props.facetValues || this.props.facetValues.length === 0), this.props.className)
      }, this.props.children, searchBox, facetValues, noResults, showMoreButton);
    }
  }]);

  return RefinementList;
}(_preactCompat.Component);

RefinementList.defaultProps = {
  cssClasses: {},
  depth: 0
};
var _default = RefinementList;
exports.default = _default;