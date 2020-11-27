function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import uniq from './uniq';
import isPlainObject from './isPlainObject';
/**
 * Deeply merges all the object values in a new object.
 *
 * - Primitive values are replaced
 * - Arrays a concatenated and their values are made unique
 */

function mergeDeep() {
  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
    values[_key] = arguments[_key];
  }

  return values.reduce(function (acc) {
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(source).forEach(function (key) {
      var previousValue = acc[key];
      var nextValue = source[key];

      if (Array.isArray(previousValue) && Array.isArray(nextValue)) {
        acc[key] = uniq([].concat(_toConsumableArray(previousValue), _toConsumableArray(nextValue)));
      } else if (isPlainObject(previousValue) && isPlainObject(nextValue)) {
        acc[key] = mergeDeep(previousValue, nextValue);
      } else {
        acc[key] = nextValue;
      }
    });
    return acc;
  }, {});
}

export default mergeDeep;