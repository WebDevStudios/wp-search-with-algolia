import { noop } from '../../lib/utils';
import connectConfigureRelatedItems from '../../connectors/configure-related-items/connectConfigureRelatedItems';

var configureRelatedItems = function configureRelatedItems(widgetParams) {
  var makeWidget = connectConfigureRelatedItems(noop);
  return makeWidget(widgetParams);
};

export default configureRelatedItems;