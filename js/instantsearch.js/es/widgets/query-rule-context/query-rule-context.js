function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createDocumentationMessageGenerator, noop } from '../../lib/utils';
import connectQueryRules from '../../connectors/query-rules/connectQueryRules';
var withUsage = createDocumentationMessageGenerator({
  name: 'query-rule-context'
});

var queryRuleContext = function queryRuleContext() {
  var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!widgetParams.trackedFilters) {
    throw new Error(withUsage('The `trackedFilters` option is required.'));
  }

  return _objectSpread(_objectSpread({}, connectQueryRules(noop)(widgetParams)), {}, {
    $$widgetType: 'ais.queryRuleContext'
  });
};

export default queryRuleContext;