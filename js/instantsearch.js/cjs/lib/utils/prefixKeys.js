'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _mapKeys = _interopRequireDefault(require('lodash/mapKeys'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function prefixKeys(prefix, obj) {
  if (obj) {
    return (0, _mapKeys.default)(obj, function(_0, key) {
      return prefix + key;
    });
  }

  return undefined;
}

var _default = prefixKeys;
exports.default = _default;
