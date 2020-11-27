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

import React, { Component } from 'preact-compat';
import PropTypes from 'prop-types';
import { noop } from '../../lib/utils';
import Template from '../Template/Template';

var SearchBox =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchBox, _Component);

  function SearchBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      query: _this.props.searchAsYouType ? '' : _this.props.query
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props = _this.props,
          searchAsYouType = _this$props.searchAsYouType,
          refine = _this$props.refine,
          onChange = _this$props.onChange;
      var query = event.target.value;

      if (searchAsYouType) {
        refine(query);
      } else {
        _this.setState({
          query: query
        });
      }

      onChange(event);
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      var _this$props2 = _this.props,
          searchAsYouType = _this$props2.searchAsYouType,
          refine = _this$props2.refine,
          onSubmit = _this$props2.onSubmit;
      event.preventDefault();
      event.stopPropagation();

      _this.input.blur();

      if (!searchAsYouType) {
        refine(_this.state.query);
      }

      onSubmit(event);
      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "onReset", function (event) {
      var _this$props3 = _this.props,
          searchAsYouType = _this$props3.searchAsYouType,
          refine = _this$props3.refine,
          onReset = _this$props3.onReset;
      var query = '';

      _this.input.focus();

      refine(query);

      if (!searchAsYouType) {
        _this.setState({
          query: query
        });
      }

      onReset(event);
    });

    return _this;
  }

  _createClass(SearchBox, [{
    key: "resetInput",

    /**
     * This public method is used in the RefinementList SFFV search box
     * to reset the input state when an item is selected.
     *
     * @see RefinementList#componentWillReceiveProps
     * @return {undefined}
     */
    value: function resetInput() {
      this.setState({
        query: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          cssClasses = _this$props4.cssClasses,
          placeholder = _this$props4.placeholder,
          autofocus = _this$props4.autofocus,
          showSubmit = _this$props4.showSubmit,
          showReset = _this$props4.showReset,
          showLoadingIndicator = _this$props4.showLoadingIndicator,
          templates = _this$props4.templates,
          isSearchStalled = _this$props4.isSearchStalled,
          searchAsYouType = _this$props4.searchAsYouType;
      var query = searchAsYouType ? this.props.query : this.state.query;
      return React.createElement("div", {
        className: cssClasses.root
      }, React.createElement("form", {
        action: "",
        role: "search",
        className: cssClasses.form,
        noValidate: true,
        onSubmit: this.onSubmit,
        onReset: this.onReset
      }, React.createElement("input", {
        ref: function ref(inputRef) {
          return _this2.input = inputRef;
        },
        value: query,
        disabled: this.props.disabled,
        className: cssClasses.input,
        type: "search",
        placeholder: placeholder,
        autoFocus: autofocus,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: false,
        maxLength: 512,
        onChange: this.onChange
      }), React.createElement(Template, {
        templateKey: "submit",
        rootTagName: "button",
        rootProps: {
          className: cssClasses.submit,
          type: 'submit',
          title: 'Submit the search query.',
          hidden: !showSubmit
        },
        templates: templates,
        data: {
          cssClasses: cssClasses
        }
      }), React.createElement(Template, {
        templateKey: "reset",
        rootTagName: "button",
        rootProps: {
          className: cssClasses.reset,
          type: 'reset',
          title: 'Clear the search query.',
          hidden: !(showReset && query.trim() && !isSearchStalled)
        },
        templates: templates,
        data: {
          cssClasses: cssClasses
        }
      }), showLoadingIndicator && React.createElement(Template, {
        templateKey: "loadingIndicator",
        rootTagName: "span",
        rootProps: {
          className: cssClasses.loadingIndicator,
          hidden: !isSearchStalled
        },
        templates: templates,
        data: {
          cssClasses: cssClasses
        }
      })));
    }
  }]);

  return SearchBox;
}(Component);

_defineProperty(SearchBox, "defaultProps", {
  query: '',
  showSubmit: true,
  showReset: true,
  showLoadingIndicator: true,
  autofocus: false,
  searchAsYouType: true,
  isSearchStalled: false,
  disabled: false,
  onChange: noop,
  onSubmit: noop,
  onReset: noop,
  refine: noop
});

export default SearchBox;