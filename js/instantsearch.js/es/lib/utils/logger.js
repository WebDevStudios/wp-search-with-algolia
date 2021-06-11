import noop from './noop';

/**
 * Logs a warning when this function is called, in development environment only.
 */
var deprecate = function deprecate(fn) {
  return fn;
};
/**
 * Logs a warning
 * This is used to log issues in development environment only.
 */


var warn = noop;
/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */

var _warning = noop;

if (process.env.NODE_ENV === 'development') {
  warn = function warn(message) {
    // eslint-disable-next-line no-console
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };

  deprecate = function deprecate(fn, message) {
    var hasAlreadyPrinted = false;
    return function () {
      if (!hasAlreadyPrinted) {
        hasAlreadyPrinted = true;
        warn(message);
      }

      return fn.apply(void 0, arguments);
    };
  };

  _warning = function warning(condition, message) {
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

export { warn, deprecate, _warning as warning };