"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverseHighlight;

var _index = require("../lib/utils/index.js");

var _suit = require("../lib/suit.js");

var suit = (0, _suit.component)('ReverseHighlight');

function reverseHighlight(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  var highlightAttributeResult = (0, _index.getPropertyByPath)(hit._highlightResult, attribute); // @MAJOR fallback to attribute value if highlight is not found

  process.env.NODE_ENV === 'development' ? (0, _index.warning)(highlightAttributeResult, "Could not enable reverse highlight for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is either searchable or specified in `attributesToHighlight`.\n\nSee: https://alg.li/highlighting\n")) : void 0;

  var _ref2 = highlightAttributeResult || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = (0, _index.concatHighlightedParts)((0, _index.reverseHighlightedParts)((0, _index.getHighlightedParts)(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_index.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_index.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}