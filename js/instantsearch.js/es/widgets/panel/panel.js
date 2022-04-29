function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, render } from 'preact';
import cx from 'classnames';
import { createDocumentationMessageGenerator, getContainerNode, getObjectType, warning } from "../../lib/utils/index.js";
import { component } from "../../lib/suit.js";
import Panel from "../../components/Panel/Panel.js";
var withUsage = createDocumentationMessageGenerator({
  name: 'panel'
});
var suit = component('Panel');

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      bodyContainerNode = _ref.bodyContainerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
  return function (_ref2) {
    var options = _ref2.options,
        hidden = _ref2.hidden,
        collapsible = _ref2.collapsible,
        collapsed = _ref2.collapsed;
    render(h(Panel, {
      cssClasses: cssClasses,
      hidden: hidden,
      collapsible: collapsible,
      isCollapsed: collapsed,
      templates: templates,
      data: options,
      bodyElement: bodyContainerNode
    }), containerNode);
  };
};

/**
 * The panel widget wraps other widgets in a consistent panel design.
 * It also reacts, indicates and sets CSS classes when widgets are no longer relevant for refining.
 */
var panel = function panel(panelWidgetParams) {
  var _ref3 = panelWidgetParams || {},
      _ref3$templates = _ref3.templates,
      templates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$hidden = _ref3.hidden,
      hidden = _ref3$hidden === void 0 ? function () {
    return false;
  } : _ref3$hidden,
      collapsed = _ref3.collapsed,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses;

  process.env.NODE_ENV === 'development' ? warning(typeof hidden === 'function', "The `hidden` option in the \"panel\" widget expects a function returning a boolean (received type ".concat(getObjectType(hidden), ").")) : void 0;
  process.env.NODE_ENV === 'development' ? warning(typeof collapsed === 'undefined' || typeof collapsed === 'function', "The `collapsed` option in the \"panel\" widget expects a function returning a boolean (received type ".concat(getObjectType(collapsed), ").")) : void 0;
  var bodyContainerNode = document.createElement('div');
  var collapsible = Boolean(collapsed);
  var collapsedFn = typeof collapsed === 'function' ? collapsed : function () {
    return false;
  };
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    noRefinementRoot: cx(suit({
      modifierName: 'noRefinement'
    }), userCssClasses.noRefinementRoot),
    collapsibleRoot: cx(suit({
      modifierName: 'collapsible'
    }), userCssClasses.collapsibleRoot),
    collapsedRoot: cx(suit({
      modifierName: 'collapsed'
    }), userCssClasses.collapsedRoot),
    collapseButton: cx(suit({
      descendantName: 'collapseButton'
    }), userCssClasses.collapseButton),
    collapseIcon: cx(suit({
      descendantName: 'collapseIcon'
    }), userCssClasses.collapseIcon),
    body: cx(suit({
      descendantName: 'body'
    }), userCssClasses.body),
    header: cx(suit({
      descendantName: 'header'
    }), userCssClasses.header),
    footer: cx(suit({
      descendantName: 'footer'
    }), userCssClasses.footer)
  };
  return function (widgetFactory) {
    return function (widgetParams) {
      if (!(widgetParams && widgetParams.container)) {
        throw new Error(withUsage("The `container` option is required in the widget within the panel."));
      }

      var containerNode = getContainerNode(widgetParams.container);
      var defaultTemplates = {
        header: '',
        footer: '',
        collapseButtonText: function collapseButtonText(_ref4) {
          var isCollapsed = _ref4.collapsed;
          return "<svg\n          class=\"".concat(cssClasses.collapseIcon, "\"\n          width=\"1em\"\n          height=\"1em\"\n          viewBox=\"0 0 500 500\"\n        >\n        <path d=\"").concat(isCollapsed ? 'M100 250l300-150v300z' : 'M250 400l150-300H100z', "\" fill=\"currentColor\" />\n        </svg>");
        }
      };
      var renderPanel = renderer({
        containerNode: containerNode,
        bodyContainerNode: bodyContainerNode,
        cssClasses: cssClasses,
        templates: _objectSpread(_objectSpread({}, defaultTemplates), templates)
      });
      var widget = widgetFactory(_objectSpread(_objectSpread({}, widgetParams), {}, {
        container: bodyContainerNode
      })); // TypeScript somehow loses track of the ...widget type, since it's
      // not directly returned. Eventually the "as AugmentedWidget<typeof widgetFactory>"
      // will not be needed anymore.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions

      return _objectSpread(_objectSpread({}, widget), {}, {
        init: function init() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var renderOptions = args[0];

          var options = _objectSpread(_objectSpread({}, widget.getWidgetRenderState ? widget.getWidgetRenderState(renderOptions) : {}), renderOptions);

          renderPanel({
            options: options,
            hidden: true,
            collapsible: collapsible,
            collapsed: false
          });

          if (typeof widget.init === 'function') {
            var _widget$init;

            (_widget$init = widget.init).call.apply(_widget$init, [this].concat(args));
          }
        },
        render: function render() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var renderOptions = args[0];

          var options = _objectSpread(_objectSpread({}, widget.getWidgetRenderState ? widget.getWidgetRenderState(renderOptions) : {}), renderOptions);

          renderPanel({
            options: options,
            hidden: Boolean(hidden(options)),
            collapsible: collapsible,
            collapsed: Boolean(collapsedFn(options))
          });

          if (typeof widget.render === 'function') {
            var _widget$render;

            (_widget$render = widget.render).call.apply(_widget$render, [this].concat(args));
          }
        },
        dispose: function dispose() {
          render(null, containerNode);

          if (typeof widget.dispose === 'function') {
            var _widget$dispose;

            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            return (_widget$dispose = widget.dispose).call.apply(_widget$dispose, [this].concat(args));
          }

          return undefined;
        }
      });
    };
  };
};

export default panel;