"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../lib/utils");

var _connectQueryRules = _interopRequireDefault(require("../../connectors/query-rules/connectQueryRules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'query-rule-context'
});

var queryRuleContext = function queryRuleContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      trackedFilters = _ref.trackedFilters,
      transformRuleContexts = _ref.transformRuleContexts;

  if (!trackedFilters) {
    throw new Error(withUsage('The `trackedFilters` option is required.'));
  }

  return (0, _connectQueryRules.default)(_utils.noop)({
    trackedFilters: trackedFilters,
    transformRuleContexts: transformRuleContexts
  });
};

var _default = queryRuleContext;
exports.default = _default;