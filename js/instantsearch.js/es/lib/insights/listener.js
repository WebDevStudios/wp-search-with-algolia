/** @jsx h */
import { h } from 'preact';
import { deserializePayload } from '../utils';
import { readDataAttributes, hasDataAttributes } from '../../helpers/insights';

var findInsightsTarget = function findInsightsTarget(startElement, endElement, validator) {
  var element = startElement;

  while (element && !validator(element)) {
    if (element === endElement) {
      return null;
    }

    element = element.parentElement;
  }

  return element;
};

var parseInsightsEvent = function parseInsightsEvent(element) {
  var serializedPayload = element.getAttribute('data-insights-event');

  if (typeof serializedPayload !== 'string') {
    throw new Error('The insights middleware expects `data-insights-event` to be a base64-encoded JSON string.');
  }

  try {
    return deserializePayload(serializedPayload);
  } catch (error) {
    throw new Error('The insights middleware was unable to parse `data-insights-event`.');
  }
};

var insightsListener = function insightsListener(BaseComponent) {
  function WithInsightsListener(props) {
    var handleClick = function handleClick(event) {
      if (props.sendEvent) {
        // new way with insights middleware
        var targetWithEvent = findInsightsTarget(event.target, event.currentTarget, function (element) {
          return element.hasAttribute('data-insights-event');
        });

        if (targetWithEvent) {
          var payload = parseInsightsEvent(targetWithEvent);
          props.sendEvent(payload);
        }
      } // old way, e.g. instantsearch.insights("clickedObjectIDsAfterSearch", { .. })


      var insightsTarget = findInsightsTarget(event.target, event.currentTarget, function (element) {
        return hasDataAttributes(element);
      });

      if (insightsTarget) {
        var _readDataAttributes = readDataAttributes(insightsTarget),
            method = _readDataAttributes.method,
            _payload = _readDataAttributes.payload;

        props.insights(method, _payload);
      }
    };

    return h("div", {
      onClick: handleClick
    }, h(BaseComponent, props));
  }

  return WithInsightsListener;
};

export default insightsListener;