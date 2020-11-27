import React from 'preact-compat';
import { readDataAttributes, hasDataAttributes } from '../../helpers/insights';
export default (function (BaseComponent) {
  function WithInsightsListener(props) {
    var handleClick = function handleClick(event) {
      if (!hasDataAttributes(event.target)) {
        return;
      }

      if (!props.insights) {
        throw new Error('The `insightsClient` option has not been provided to `instantsearch`.');
      }

      var _readDataAttributes = readDataAttributes(event.target),
          method = _readDataAttributes.method,
          payload = _readDataAttributes.payload;

      props.insights(method, payload);
    };

    return React.createElement("div", {
      onClick: handleClick
    }, React.createElement(BaseComponent, props));
  }

  return WithInsightsListener;
});