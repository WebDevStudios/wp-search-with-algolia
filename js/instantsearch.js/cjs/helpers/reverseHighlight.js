"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverseHighlight;

var _utils = require("../lib/utils");

var _suit = require("../lib/suit");

var suit = (0, _suit.component)('ReverseHighlight');

function reverseHighlight(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

  var _ref2 = (0, _utils.getPropertyByPath)(hit._highlightResult, attribute) || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = (0, _utils.concatHighlightedParts)((0, _utils.reverseHighlightedParts)((0, _utils.getHighlightedParts)(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_utils.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_utils.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}