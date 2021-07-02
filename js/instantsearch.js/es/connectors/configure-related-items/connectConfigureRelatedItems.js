function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import algoliasearchHelper from 'algoliasearch-helper';
import { createDocumentationMessageGenerator, getObjectType, warning, getPropertyByPath } from '../../lib/utils';
import connectConfigure from '../configure/connectConfigure';
var withUsage = createDocumentationMessageGenerator({
  name: 'configure-related-items',
  connector: true
});

function createOptionalFilter(_ref) {
  var attributeName = _ref.attributeName,
      attributeValue = _ref.attributeValue,
      attributeScore = _ref.attributeScore;
  return "".concat(attributeName, ":").concat(attributeValue, "<score=").concat(attributeScore || 1, ">");
}

var connectConfigureRelatedItems = function connectConfigureRelatedItems(renderFn, unmountFn) {
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
        hit = _ref2.hit,
        matchingPatterns = _ref2.matchingPatterns,
        _ref2$transformSearch = _ref2.transformSearchParameters,
        transformSearchParameters = _ref2$transformSearch === void 0 ? function (x) {
      return x;
    } : _ref2$transformSearch;

    if (!hit) {
      throw new Error(withUsage('The `hit` option is required.'));
    }

    if (!matchingPatterns) {
      throw new Error(withUsage('The `matchingPatterns` option is required.'));
    }

    var optionalFilters = Object.keys(matchingPatterns).reduce(function (acc, attributeName) {
      var attribute = matchingPatterns[attributeName];
      var attributeValue = getPropertyByPath(hit, attributeName);
      var attributeScore = attribute.score;

      if (Array.isArray(attributeValue)) {
        return [].concat(_toConsumableArray(acc), [attributeValue.map(function (attributeSubValue) {
          return createOptionalFilter({
            attributeName: attributeName,
            attributeValue: attributeSubValue,
            attributeScore: attributeScore
          });
        })]);
      }

      if (typeof attributeValue === 'string') {
        return [].concat(_toConsumableArray(acc), [createOptionalFilter({
          attributeName: attributeName,
          attributeValue: attributeValue,
          attributeScore: attributeScore
        })]);
      }

      process.env.NODE_ENV === 'development' ? warning(false, "\nThe `matchingPatterns` option returned a value of type ".concat(getObjectType(attributeValue), " for the \"").concat(attributeName, "\" key. This value was not sent to Algolia because `optionalFilters` only supports strings and array of strings.\n\nYou can remove the \"").concat(attributeName, "\" key from the `matchingPatterns` option.\n\nSee https://www.algolia.com/doc/api-reference/api-parameters/optionalFilters/\n            ")) : void 0;
      return acc;
    }, []);

    var searchParameters = _objectSpread({}, transformSearchParameters(new algoliasearchHelper.SearchParameters({
      sumOrFiltersScores: true,
      facetFilters: ["objectID:-".concat(hit.objectID)],
      optionalFilters: optionalFilters
    })));

    var makeWidget = connectConfigure(renderFn, unmountFn);
    return _objectSpread(_objectSpread({}, makeWidget({
      searchParameters: searchParameters
    })), {}, {
      $$type: 'ais.configureRelatedItems'
    });
  };
};

export default connectConfigureRelatedItems;