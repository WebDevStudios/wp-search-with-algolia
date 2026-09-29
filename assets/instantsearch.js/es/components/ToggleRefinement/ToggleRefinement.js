function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { h } from 'preact';
import Template from "../Template/Template.js";
var ToggleRefinement = function ToggleRefinement(_ref) {
  var currentRefinement = _ref.currentRefinement,
    refine = _ref.refine,
    cssClasses = _ref.cssClasses,
    templateProps = _ref.templateProps;
  return h("div", {
    className: cssClasses.root
  }, h("label", {
    className: cssClasses.label
  }, h("input", {
    className: cssClasses.checkbox,
    type: "checkbox",
    checked: currentRefinement.isRefined,
    onChange: function onChange(event) {
      return refine({
        isRefined: !event.target.checked
      });
    }
  }), h(Template, _extends({}, templateProps, {
    rootTagName: "span",
    rootProps: {
      className: cssClasses.labelText
    },
    templateKey: "labelText",
    data: currentRefinement
  }))));
};
export default ToggleRefinement;