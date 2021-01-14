"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getObjectType = _interopRequireDefault(require("./getObjectType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkRendering(rendering, usage) {
  if (rendering === undefined || typeof rendering !== 'function') {
    throw new Error("The render function is not valid (received type ".concat((0, _getObjectType.default)(rendering), ").\n\n").concat(usage));
  }
}

var _default = checkRendering;
exports.default = _default;