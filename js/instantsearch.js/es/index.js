import InstantSearch from './lib/InstantSearch';
import version from './lib/version';
import { snippet, highlight } from './helpers';

var instantsearch = function instantsearch(options) {
  return new InstantSearch(options);
};

instantsearch.version = version;
instantsearch.snippet = snippet;
instantsearch.highlight = highlight;
Object.defineProperty(instantsearch, 'widgets', {
  get: function get() {
    throw new ReferenceError("\"instantsearch.widgets\" are not available from the ES build.\n\nTo import the widgets:\n\nimport { searchBox } from 'instantsearch.js/es/widgets'");
  }
});
Object.defineProperty(instantsearch, 'connectors', {
  get: function get() {
    throw new ReferenceError("\"instantsearch.connectors\" are not available from the ES build.\n\nTo import the connectors:\n\nimport { connectSearchBox } from 'instantsearch.js/es/connectors'");
  }
});
export default instantsearch;
