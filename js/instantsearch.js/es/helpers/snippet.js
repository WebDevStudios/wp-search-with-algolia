import { component } from '../lib/suit';
import { TAG_REPLACEMENT, getPropertyByPath } from '../lib/utils';
var suit = component('Snippet');
export default function snippet(_ref) {
  var attribute = _ref.attribute,
      _ref$highlightedTagNa = _ref.highlightedTagName,
      highlightedTagName = _ref$highlightedTagNa === void 0 ? 'mark' : _ref$highlightedTagNa,
      hit = _ref.hit,
      _ref$cssClasses = _ref.cssClasses,
      cssClasses = _ref$cssClasses === void 0 ? {} : _ref$cssClasses;

  var _ref2 = getPropertyByPath(hit._snippetResult, attribute) || {},
      _ref2$value = _ref2.value,
      attributeValue = _ref2$value === void 0 ? '' : _ref2$value; // cx is not used, since it would be bundled as a dependency for Vue & Angular


  var className = suit({
    descendantName: 'highlighted'
  }) + (cssClasses.highlighted ? " ".concat(cssClasses.highlighted) : '');
  return attributeValue.replace(new RegExp(TAG_REPLACEMENT.highlightPreTag, 'g'), "<".concat(highlightedTagName, " class=\"").concat(className, "\">")).replace(new RegExp(TAG_REPLACEMENT.highlightPostTag, 'g'), "</".concat(highlightedTagName, ">"));
}