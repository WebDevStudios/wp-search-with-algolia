var _excluded = ["hit", "attribute", "cssClasses"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { h } from 'preact';
import { Snippet as SnippetUiComponent } from "../../components/Snippet/Snippet.js";
import { getPropertyByPath, unescape, toArray, warning, getHighlightedParts } from "../../lib/utils/index.js";
export function Snippet(_ref) {
  var hit = _ref.hit,
    attribute = _ref.attribute,
    cssClasses = _ref.cssClasses,
    props = _objectWithoutProperties(_ref, _excluded);
  var property = getPropertyByPath(hit._snippetResult, attribute) || [];
  var properties = toArray(property);
  process.env.NODE_ENV === 'development' ? warning(Boolean(properties.length), "Could not enable snippet for \"".concat(attribute.toString(), "\", will display an empty string.\nPlease check whether this attribute exists and is specified in `attributesToSnippet`.\n\nSee: https://alg.li/highlighting\n")) : void 0;
  var parts = properties.map(function (_ref2) {
    var value = _ref2.value;
    return getHighlightedParts(unescape(value || ''));
  });
  return h(SnippetUiComponent, _extends({}, props, {
    parts: parts,
    classNames: cssClasses
  }));
}