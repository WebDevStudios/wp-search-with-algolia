import connectConfigure from '../../connectors/configure/connectConfigure';
import { noop } from '../../lib/utils';
/**
 * A list of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)
 * to enable when the widget mounts.
 */

var configure = function configure(widgetParams) {
  // This is a renderless widget that falls back to the connector's
  // noop render and unmount functions.
  var makeWidget = connectConfigure(noop);
  return makeWidget({
    searchParameters: widgetParams
  });
};

export default configure;