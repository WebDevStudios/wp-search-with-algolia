function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { h } from 'preact';
import Template from "../Template/Template.js";
function RefinementListItem(_ref) {
  var className = _ref.className,
    handleClick = _ref.handleClick,
    facetValueToRefine = _ref.facetValueToRefine,
    isRefined = _ref.isRefined,
    templateProps = _ref.templateProps,
    templateKey = _ref.templateKey,
    templateData = _ref.templateData,
    subItems = _ref.subItems;
  return h("li", {
    className: className,
    onClick: function onClick(originalEvent) {
      handleClick({
        facetValueToRefine: facetValueToRefine,
        isRefined: isRefined,
        originalEvent: originalEvent
      });
    }
  }, h(Template, _extends({}, templateProps, {
    templateKey: templateKey,
    data: templateData
  })), subItems);
}
export default RefinementListItem;