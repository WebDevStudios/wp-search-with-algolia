"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * This implementation is taken from Lodash implementation.
 * See: https://github.com/lodash/lodash/blob/4.17.11-npm/escape.js
 */
// Used to map characters to HTML entities.
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}; // Used to match HTML entities and HTML characters.

var regexUnescapedHtml = /[&<>"']/g;
var regexHasUnescapedHtml = RegExp(regexUnescapedHtml.source);
/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 */

function escape(value) {
  return value && regexHasUnescapedHtml.test(value) ? value.replace(regexUnescapedHtml, function (character) {
    return htmlEscapes[character];
  }) : value;
}

var _default = escape;
exports.default = _default;