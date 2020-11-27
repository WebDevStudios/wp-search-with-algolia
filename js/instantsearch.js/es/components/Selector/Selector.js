function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import PropTypes from 'prop-types';
import React, { Component } from 'preact-compat';
import cx from 'classnames';

var Selector =
/*#__PURE__*/
function (_Component) {
  _inherits(Selector, _Component);

  function Selector() {
    _classCallCheck(this, Selector);

    return _possibleConstructorReturn(this, _getPrototypeOf(Selector).apply(this, arguments));
  }

  _createClass(Selector, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.handleChange = this.handleChange.bind(this);
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.props.setValue(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          currentValue = _this$props.currentValue,
          options = _this$props.options;
      return React.createElement("select", {
        className: cx(this.props.cssClasses.select),
        onChange: this.handleChange,
        value: "".concat(currentValue)
      }, options.map(function (option) {
        return React.createElement("option", {
          className: cx(_this.props.cssClasses.option),
          key: option.label + option.value,
          value: "".concat(option.value)
        }, option.label);
      }));
    }
  }]);

  return Selector;
}(Component);

export default Selector;