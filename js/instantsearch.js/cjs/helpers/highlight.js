"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = highlight;

var _utils = require("../lib/utils");

var _escapeHighlight = require("../lib/escape-highlight");

var _suit = require("../lib/suit");

var suit = (0, _suit.component)('Highlight');

function highlight(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit;
  var attributeValue = (0, _utils.getPropertyByPath)(hit, "_highlightResult.".concat(attribute, ".value")) || '';
  var className = suit({
    descendantName: 'highlighted'
  });
  return attributeValue.replace(new RegExp(_escapeHighlight.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_escapeHighlight.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}