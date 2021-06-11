"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _algoliasearchHelper = _interopRequireDefault(require("algoliasearch-helper"));

var _mergeSearchParameters = _interopRequireDefault(require("./mergeSearchParameters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function enhanceConfiguration(configuration, widget) {
  if (!widget.getConfiguration) {
    return configuration;
  } // Get the relevant partial configuration asked by the widget


  var partialConfiguration = widget.getConfiguration(configuration);
  return (0, _mergeSearchParameters.default)(configuration, // @TODO: remove this after IFW-874 is completed (all widgets return SP)
  new _algoliasearchHelper.default.SearchParameters(partialConfiguration));
}

var _default = enhanceConfiguration;
exports.default = _default;