"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _insights = require("../../helpers/insights");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(BaseComponent) {
  function WithInsightsListener(props) {
    var handleClick = function handleClick(event) {
      if (!(0, _insights.hasDataAttributes)(event.target)) {
        return;
      }

      if (!props.insights) {
        throw new Error('The `insightsClient` option has not been provided to `instantsearch`.');
      }

      var _readDataAttributes = (0, _insights.readDataAttributes)(event.target),
          method = _readDataAttributes.method,
          payload = _readDataAttributes.payload;

      props.insights(method, payload);
    };

    return _preactCompat.default.createElement("div", {
      onClick: handleClick
    }, _preactCompat.default.createElement(BaseComponent, props));
  }

  return WithInsightsListener;
};

exports.default = _default;