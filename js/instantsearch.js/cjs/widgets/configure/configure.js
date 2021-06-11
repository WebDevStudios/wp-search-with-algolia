"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connectConfigure = _interopRequireDefault(require("../../connectors/configure/connectConfigure"));

var _utils = require("../../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configure = function configure(widgetParams) {
  // This is a renderless widget that falls back to the connector's
  // noop render and unmount functions.
  var makeWidget = (0, _connectConfigure.default)(_utils.noop);
  return makeWidget({
    searchParameters: widgetParams
  });
};

var _default = configure;
exports.default = _default;