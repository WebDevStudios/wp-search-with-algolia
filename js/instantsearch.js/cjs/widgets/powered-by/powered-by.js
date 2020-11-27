"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = poweredBy;

var _preactCompat = _interopRequireWildcard(require("preact-compat"));

var _classnames = _interopRequireDefault(require("classnames"));

var _PoweredBy = _interopRequireDefault(require("../../components/PoweredBy/PoweredBy"));

var _connectPoweredBy = _interopRequireDefault(require("../../connectors/powered-by/connectPoweredBy"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var suit = (0, _suit.component)('PoweredBy');
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'powered-by'
});

var renderer = function renderer(_ref) {
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses;
  return function (_ref2, isFirstRendering) {
    var url = _ref2.url,
        widgetParams = _ref2.widgetParams;

    if (isFirstRendering) {
      var theme = widgetParams.theme;
      (0, _preactCompat.render)(_preactCompat.default.createElement(_PoweredBy.default, {
        cssClasses: cssClasses,
        url: url,
        theme: theme
      }), containerNode);
      return;
    }
  };
};
/**
 * @typedef {Object} PoweredByWidgetCssClasses
 * @property  {string|string[]} [root] CSS classes added to the root element of the widget.
 * @property  {string|string[]} [link] CSS class to add to the link.
 * @property  {string|string[]} [logo] CSS class to add to the SVG logo.
 */

/**
 * @typedef {Object} PoweredByWidgetOptions
 * @property {string|HTMLElement} container Place where to insert the widget in your webpage.
 * @property {string} [theme] The theme of the logo ("light" or "dark").
 * @property {PoweredByWidgetCssClasses} [cssClasses] CSS classes to add.
 */

/**
 * The `poweredBy` widget is used to display the logo to redirect to Algolia.
 * @type {WidgetFactory}
 * @devNovel PoweredBy
 * @category metadata
 * @param {PoweredByWidgetOptions} $0 PoweredBy widget options. Some keys are mandatory: `container`,
 * @return {Widget} A new poweredBy widget instance
 * @example
 * search.addWidget(
 *   instantsearch.widgets.poweredBy({
 *     container: '#poweredBy-container',
 *     theme: 'dark',
 *   })
 * );
 */


function poweredBy() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$theme = _ref3.theme,
      theme = _ref3$theme === void 0 ? 'light' : _ref3$theme;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), suit({
      modifierName: theme === 'dark' ? 'dark' : 'light'
    }), userCssClasses.root),
    link: (0, _classnames.default)(suit({
      descendantName: 'link'
    }), userCssClasses.link),
    logo: (0, _classnames.default)(suit({
      descendantName: 'logo'
    }), userCssClasses.logo)
  };
  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses
  });
  var makeWidget = (0, _connectPoweredBy.default)(specializedRenderer, function () {
    return (0, _preactCompat.unmountComponentAtNode)(containerNode);
  });
  return makeWidget({
    theme: theme
  });
}