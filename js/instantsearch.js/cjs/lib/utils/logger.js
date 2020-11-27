"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.deprecate = exports.warn = void 0;

var _noop = _interopRequireDefault(require("./noop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deprecate = _noop.default;
exports.deprecate = deprecate;
var warn = _noop.default;
/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 *
 * @returns {undefined}
 */

exports.warn = warn;
var _warning = _noop.default;
exports.warning = _warning;

if (process.env.NODE_ENV === 'development') {
  exports.warn = warn = function warn(message) {
    // eslint-disable-next-line no-console
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };

  exports.deprecate = deprecate = function deprecate(fn, message) {
    var hasAlreadyPrinted = false;
    return function () {
      if (!hasAlreadyPrinted) {
        hasAlreadyPrinted = true;
        warn(message);
      }

      return fn.apply(void 0, arguments);
    };
  };

  exports.warning = _warning = function warning(condition, message) {
    if (condition) {
      return;
    }

    var hasAlreadyPrinted = _warning.cache[message];

    if (!hasAlreadyPrinted) {
      _warning.cache[message] = true;
      warn(message);
    }
  };

  _warning.cache = {};
}