'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(AutoHide, _Component);

    function AutoHide() {
      _classCallCheck(this, AutoHide);

      return _possibleConstructorReturn(this, (AutoHide.__proto__ || Object.getPrototypeOf(AutoHide)).apply(this, arguments));
    }

    _createClass(AutoHide, [{
      key: 'render',
      value: function render() {
        var shouldAutoHideContainer = this.props.shouldAutoHideContainer;

        return _react2.default.createElement(
          'div',
          { style: { display: shouldAutoHideContainer ? 'none' : '' } },
          _react2.default.createElement(ComposedComponent, this.props)
        );
      }
    }]);

    return AutoHide;
  }(_react.Component), _class.displayName = ComposedComponent.name + '-AutoHide', _temp;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }