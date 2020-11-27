"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectConfigure;

var _utils = require("../../lib/utils");

var _InstantSearch = require("../../lib/InstantSearch");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'configure',
  connector: true
});
/**
 * @typedef {Object} CustomConfigureWidgetOptions
 * @property {Object} searchParameters The Configure widget options are search parameters
 */

/**
 * @typedef {Object} ConfigureRenderingOptions
 * @property {function(searchParameters: Object)} refine Sets new `searchParameters` and trigger a search.
 * @property {Object} widgetParams All original `CustomConfigureWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * The **Configure** connector provides the logic to build a custom widget
 * that will give you ability to override or force some search parameters sent to Algolia API.
 *
 * @type {Connector}
 * @param {function(ConfigureRenderingOptions)} renderFn Rendering function for the custom **Configure** Widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomConfigureWidgetOptions)} Re-usable widget factory for a custom **Configure** widget.
 */

function connectConfigure() {
  var renderFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _utils.noop;
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!(0, _utils.isPlainObject)(widgetParams.searchParameters)) {
      throw new Error(withUsage('The `searchParameters` option expects an object.'));
    }

    return {
      getConfiguration: function getConfiguration() {
        return widgetParams.searchParameters;
      },
      init: function init(_ref) {
        var helper = _ref.helper;
        this._refine = this.refine(helper);
        renderFn({
          refine: this._refine,
          widgetParams: widgetParams
        }, true);
      },
      refine: function refine(helper) {
        var _this = this;

        return function (searchParameters) {
          // merge new `searchParameters` with the ones set from other widgets
          var actualState = _this.removeSearchParameters(helper.state);

          var nextSearchParameters = (0, _InstantSearch.enhanceConfiguration)(_objectSpread({}, actualState), {
            getConfiguration: function getConfiguration() {
              return searchParameters;
            }
          }); // trigger a search with the new merged searchParameters

          helper.setState(nextSearchParameters).search(); // update original `widgetParams.searchParameters` to the new refined one

          widgetParams.searchParameters = searchParameters;
        };
      },
      render: function render() {
        renderFn({
          refine: this._refine,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose(_ref2) {
        var state = _ref2.state;
        unmountFn();
        return this.removeSearchParameters(state);
      },
      removeSearchParameters: function removeSearchParameters(state) {
        // widgetParams are assumed 'controlled',
        // so they override whatever other widgets give the state
        return state.mutateMe(function (mutableState) {
          Object.keys(widgetParams.searchParameters).forEach(function (key) {
            delete mutableState[key];
          });
        });
      }
    };
  };
}