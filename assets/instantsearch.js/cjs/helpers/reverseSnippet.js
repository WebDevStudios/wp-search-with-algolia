"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reverseSnippet;
var _suit = require("../lib/suit");
var _utils = require("../lib/utils");
var suit = (0, _suit.component)('ReverseSnippet');

/**
 * @deprecated use html tagged templates and the ReverseSnippet component instead
 */
function reverseSnippet(_ref) {
  var attribute = _ref.attribute,
    _ref$highlightedTagNa = _ref.highlightedTagName,
    highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
    hit = _ref.hit,
    _ref$cssClasses = _ref.cssClasses,
    cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;
  process.env.NODE_ENV === 'development' ? (0, _utils.warning)(false, "`instantsearch.reverseSnippet` function has been deprecated. It is still supported in 4.x releases, but not further. It is replaced by the `ReverseSnippet` component.\n\nFor more information, visit https://www.algolia.com/doc/guides/building-search-ui/upgrade-guides/js/?client=html+tagged+templates#upgrade-templates") : void 0;
  var snippetAttributeResult = (0, _utils.getPropertyByPath)(hit._snippetResult, attribute);

  // @MAJOR fallback to attribute value if snippet is not found
  process.env.NODE_ENV === 'development' ? (0, _utils.warning)(snippetAttributeResult, "Could not enable reverse snippet for \"".concat(attribute, "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) : void 0;
  var _ref2 = snippetAttributeResult || {},
    _ref2$value = _ref2.value,
    attributeValue = _ref2$value === void 0 ? '' : _ref2$value;

  // cx is not used, since it would be bundled as a dependency for Vue & Angular
  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  var reverseHighlightedValue = (0, _utils.concatHighlightedParts)((0, _utils.reverseHighlightedParts)((0, _utils.getHighlightedParts)(attributeValue)));
  return reverseHighlightedValue.replace(new RegExp(_utils.TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(_utils.TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}