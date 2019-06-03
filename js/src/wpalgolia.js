import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js/dist/instantsearch.production.min';
import autocomplete from './autocomplete';

window.algoliasearch = algoliasearch;
window.instantsearch = instantsearch;
window.algoliaAutocomplete = autocomplete;

