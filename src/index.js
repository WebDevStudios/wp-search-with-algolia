import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import { searchBox, hits } from 'instantsearch.js/es/widgets';
import "instantsearch.css/themes/reset.css";
import "instantsearch.css/themes/algolia.css";

const searchClient = algoliasearch(
	wpswaBundleConfig.applicationID,
	wpswaBundleConfig.apiKey
);

const search = instantsearch({
	indexName: wpswaBundleConfig.indices.searchablePosts,
	searchClient,
	searchFunction(helper) {
		if (helper.state.query) {
			helper.search();
		}
	}
});

search.addWidgets([
	searchBox({
		container: wpswaBundleConfig.searchBox.container,
		limit: wpswaBundleConfig.searchBox.limit,
		showMore: wpswaBundleConfig.searchBox.showMore
	}),

	// This requires `tags` to be set in the `attributesForFacetings`
	// in your Algolia index settings
	// instantsearch.widgets.refinementList({
	// 	container: "#tags-list",
	// 	attribute: "tags"
	// }),

	hits({
		container: wpswaBundleConfig.hits.container,
		templates: {
			item: `
      <article>
        <a href="{{ permalink }}">
        	{{#helpers.snippet}}{ "attribute": "post_title" }{{/helpers.snippet}}
        </a>
        {{#content}}
          <p>{{#helpers.snippet}}{ "attribute": "content" }{{/helpers.snippet}}</p>
        {{/content}}
      </article>
    `
		}
	})
]);

search.start();
