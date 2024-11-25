function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { cx } from '@algolia/ui-components-shared';
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import Template from "../Template/Template.js";
function Panel(props) {
  var _useState = useState(props.isCollapsed),
    _useState2 = _slicedToArray(_useState, 2),
    isCollapsed = _useState2[0],
    setIsCollapsed = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isControlled = _useState4[0],
    setIsControlled = _useState4[1];
  var bodyRef = useRef(null);
  useEffect(function () {
    var node = bodyRef.current;
    if (!node) {
      return undefined;
    }
    node.appendChild(props.bodyElement);
    return function () {
      node.removeChild(props.bodyElement);
    };
  }, [bodyRef, props.bodyElement]);
  if (!isControlled && props.isCollapsed !== isCollapsed) {
    setIsCollapsed(props.isCollapsed);
  }
  return h("div", {
    className: cx(props.cssClasses.root, props.hidden && props.cssClasses.noRefinementRoot, props.collapsible && props.cssClasses.collapsibleRoot, isCollapsed && props.cssClasses.collapsedRoot),
    hidden: props.hidden
  }, props.templates.header && h("div", {
    className: props.cssClasses.header
  }, h(Template, {
    templates: props.templates,
    templateKey: "header",
    rootTagName: "span",
    data: props.data
  }), props.collapsible && h("button", {
    className: props.cssClasses.collapseButton,
    "aria-expanded": !isCollapsed,
    onClick: function onClick(event) {
      event.preventDefault();
      setIsControlled(true);
      setIsCollapsed(function (prevIsCollapsed) {
        return !prevIsCollapsed;
      });
    }
  }, h(Template, {
    templates: props.templates,
    templateKey: "collapseButtonText",
    rootTagName: "span",
    data: {
      collapsed: isCollapsed
    }
  }))), h("div", {
    className: props.cssClasses.body,
    ref: bodyRef
  }), props.templates.footer && h(Template, {
    templates: props.templates,
    templateKey: "footer",
    rootProps: {
      className: props.cssClasses.footer
    },
    data: props.data
  }));
}
export default Panel;