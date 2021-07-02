"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeHits = escapeHits;
exports.escapeFacets = escapeFacets;
exports.TAG_REPLACEMENT = exports.TAG_PLACEHOLDER = void 0;

var _escape = _interopRequireDefault(require("./escape"));

var _isPlainObject = _interopRequireDefault(require("./isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TAG_PLACEHOLDER = {
  highlightPreTag: '__ais-highlight__',
  highlightPostTag: '__/ais-highlight__'
};
exports.TAG_PLACEHOLDER = TAG_PLACEHOLDER;
var TAG_REPLACEMENT = {
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>'
};
exports.TAG_REPLACEMENT = TAG_REPLACEMENT;

function replaceTagsAndEscape(value) {
  return (0, _escape.default)(value).replace(new RegExp(TAG_PLACEHOLDER.highlightPreTag, 'g'), TAG_REPLACEMENT.highlightPreTag).replace(new RegExp(TAG_PLACEHOLDER.highlightPostTag, 'g'), TAG_REPLACEMENT.highlightPostTag);
}

function recursiveEscape(input) {
  if ((0, _isPlainObject.default)(input) && typeof input.value !== 'string') {
    return Object.keys(input).reduce(function (acc, key) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, key, recursiveEscape(input[key])));
    }, {});
  }

  if (Array.isArray(input)) {
    return input.map(recursiveEscape);
  }

  return _objectSpread(_objectSpread({}, input), {}, {
    value: replaceTagsAndEscape(input.value)
  });
}

function escapeHits(hits) {
  if (hits.__escaped === undefined) {
    // We don't override the value on hit because it will mutate the raw results
    // instead we make a shallow copy and we assign the escaped values on it.
    hits = hits.map(function (_ref) {
      var hit = _extends({}, _ref);

      if (hit._highlightResult) {
        hit._highlightResult = recursiveEscape(hit._highlightResult);
      }

      if (hit._snippetResult) {
        hit._snippetResult = recursiveEscape(hit._snippetResult);
      }

      return hit;
    });
    hits.__escaped = true;
  }

  return hits;
}

function escapeFacets(facetHits) {
  return facetHits.map(function (h) {
    return _objectSpread(_objectSpread({}, h), {}, {
      highlighted: replaceTagsAndEscape(h.highlighted)
    });
  });
}