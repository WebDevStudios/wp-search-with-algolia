import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import autocomplete from './autocomplete';
import {widgets} from './autocomplete';

window.algoliasearch = algoliasearch;
window.instantsearch = instantsearch;
window.algoliaAutocomplete = autocomplete;
window.algoliaWidgets = widgets;

