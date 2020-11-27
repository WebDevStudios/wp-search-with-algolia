import { createDocumentationMessageGenerator, noop } from '../../lib/utils';
import connectQueryRules from '../../connectors/query-rules/connectQueryRules';
var withUsage = createDocumentationMessageGenerator({
  name: 'query-rule-context'
});

var queryRuleContext = function queryRuleContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      trackedFilters = _ref.trackedFilters,
      transformRuleContexts = _ref.transformRuleContexts;

  if (!trackedFilters) {
    throw new Error(withUsage('The `trackedFilters` option is required.'));
  }

  return connectQueryRules(noop)({
    trackedFilters: trackedFilters,
    transformRuleContexts: transformRuleContexts
  });
};

export default queryRuleContext;