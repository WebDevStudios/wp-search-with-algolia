"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _hooks = require("preact/hooks");

var _classnames = _interopRequireDefault(require("classnames"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Panel(props) {
  var _cx;

  var _useState = (0, _hooks.useState)(props.isCollapsed),
      _useState2 = _slicedToArray(_useState, 2),
      isCollapsed = _useState2[0],
      setIsCollapsed = _useState2[1];

  var _useState3 = (0, _hooks.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isControlled = _useState4[0],
      setIsControlled = _useState4[1];

  var bodyRef = (0, _hooks.useRef)(null);
  (0, _hooks.useEffect)(function () {
    if (!bodyRef.current) {
      return undefined;
    }

    bodyRef.current.appendChild(props.bodyElement);
    return function () {
      bodyRef.current.removeChild(props.bodyElement);
    };
  }, [bodyRef, props.bodyElement]);

  if (!isControlled && props.isCollapsed !== isCollapsed) {
    setIsCollapsed(props.isCollapsed);
  }

  return (0, _preact.h)("div", {
    className: (0, _classnames.default)(props.cssClasses.root, (_cx = {}, _defineProperty(_cx, props.cssClasses.noRefinementRoot, props.hidden), _defineProperty(_cx, props.cssClasses.collapsibleRoot, props.collapsible), _defineProperty(_cx, props.cssClasses.collapsedRoot, isCollapsed), _cx)),
    hidden: props.hidden
  }, props.templates.header && (0, _preact.h)("div", {
    className: props.cssClasses.header
  }, (0, _preact.h)(_Template.default, {
    templates: props.templates,
    templateKey: "header",
    rootTagName: "span",
    data: props.data
  }), props.collapsible && (0, _preact.h)("button", {
    className: props.cssClasses.collapseButton,
    "aria-expanded": !isCollapsed,
    onClick: function onClick(event) {
      event.preventDefault();
      setIsControlled(true);
      setIsCollapsed(function (prevIsCollapsed) {
        return !prevIsCollapsed;
      });
    }
  }, (0, _preact.h)(_Template.default, {
    templates: props.templates,
    templateKey: "collapseButtonText",
    rootTagName: "span",
    data: {
      collapsed: isCollapsed
    }
  }))), (0, _preact.h)("div", {
    className: props.cssClasses.body,
    ref: bodyRef
  }), props.templates.footer && (0, _preact.h)(_Template.default, {
    templates: props.templates,
    templateKey: "footer",
    rootProps: {
      className: props.cssClasses.footer
    },
    data: props.data
  }));
}

var _default = Panel;
exports.default = _default;