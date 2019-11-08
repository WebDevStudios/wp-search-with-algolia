import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import "instantsearch.css/themes/reset.css";
import "instantsearch.css/themes/algolia.css";

const searchClient = algoliasearch(
	"8ZQ19EMET8",
	"ec494cc188e94f2f89e8aa7354d69979"
);

const search = instantsearch({
	indexName: "wp_wp_post",
	searchClient,
	searchFunction(helper) {
		if (helper.state.query) {
			helper.search();
		}
	}
});

search.addWidgets([
	instantsearch.widgets.searchBox({
		container: ".search-form",
		limit: 5,
		showMore: true
	}),

	// This requires `tags` to be set in the `attributesForFacetings`
	// in your Algolia index settings
	// instantsearch.widgets.refinementList({
	// 	container: "#tags-list",
	// 	attribute: "tags"
	// }),

	instantsearch.widgets.hits({
		container: "#content",
		templates: {
			item: `
      <article>
        <a href="{{ url }}">
          <strong>
            {{#helpers.highlight}}
              { "attribute": "title", "highlightedTagName": "mark" }
            {{/helpers.highlight}}
          </strong>
        </a>
        {{#content}}
          <p>{{#helpers.snippet}}{ "attribute": "content", "highlightedTagName": "mark" }{{/helpers.snippet}}</p>
        {{/content}}
      </article>
    `
		}
	})
]);

search.start();
