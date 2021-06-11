import algoliasearchHelper from 'algoliasearch-helper';
import mergeSearchParameters from './mergeSearchParameters';

function enhanceConfiguration(configuration, widget) {
  if (!widget.getConfiguration) {
    return configuration;
  } // Get the relevant partial configuration asked by the widget


  var partialConfiguration = widget.getConfiguration(configuration);
  return mergeSearchParameters(configuration, // @TODO: remove this after IFW-874 is completed (all widgets return SP)
  new algoliasearchHelper.SearchParameters(partialConfiguration));
}

export default enhanceConfiguration;