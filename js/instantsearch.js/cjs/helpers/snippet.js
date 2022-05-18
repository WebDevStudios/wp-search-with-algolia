"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = snippet;

var _suit = require("../lib/suit.js");

var _index = require("../lib/utils/index.js");

var suit = (0, _suit.component)('Snippet');

function snippet(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  var snippetAttributeResult = (0, _index.getPropertyByPath)(hit._snippetResult, attribute); // @MAJOR fallback to attribute value if snippet is not found

  process.env.NODE_ENV === 'development' ? (0, _index.warning)(snippetAttributeResult, "Could not enable snippet for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) : void 0;

  var _ref2 = snippetAttributeResult || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  return attributeValue.replace(new RegExp(_index.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_index.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}