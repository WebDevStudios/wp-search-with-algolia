<?php
/**
 * WP Search With Algolia instantsearch template file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @version 2.10.2
 * @package WebDevStudios\WPSWA
 */

get_header();

?>

	<div id="ais-wrapper">
		<main id="ais-main">
			<div class="algolia-search-box-wrapper">
				<div id="algolia-search-box"></div>
				<svg class="search-icon" width="25" height="25" viewBox="0 0 40 40" xmlns="https://www.w3.org/2000/svg"><path d="M24.828 31.657a16.76 16.76 0 0 1-7.992 2.015C7.538 33.672 0 26.134 0 16.836 0 7.538 7.538 0 16.836 0c9.298 0 16.836 7.538 16.836 16.836 0 3.22-.905 6.23-2.475 8.79.288.18.56.395.81.645l5.985 5.986A4.54 4.54 0 0 1 38 38.673a4.535 4.535 0 0 1-6.417-.007l-5.986-5.986a4.545 4.545 0 0 1-.77-1.023zm-7.992-4.046c5.95 0 10.775-4.823 10.775-10.774 0-5.95-4.823-10.775-10.774-10.775-5.95 0-10.775 4.825-10.775 10.776 0 5.95 4.825 10.775 10.776 10.775z" fill-rule="evenodd"></path></svg>
				<div id="algolia-stats"></div>
				<div id="algolia-powered-by"></div>
			</div>
			<div id="algolia-hits"></div>
			<div id="algolia-pagination"></div>
		</main>
		<aside id="ais-facets">
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Post Types', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-post-types"></section>
			</div>
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Categories', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-categories"></section>
			</div>
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Tags', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-tags"></section>
			</div>
			<div>
				<h3 class="widgettitle"><?php esc_html_e( 'Users', 'wp-search-with-algolia' ); ?></h3>
				<section class="ais-facets" id="facet-users"></section>
			</div>
		</aside>
	</div>

	<script type="text/javascript">
		window.addEventListener('load', function() {
			// Set a custom user token if you enable insights and don't want the anonymous token.
			// window.aa('setUserToken', 'some-user-id');
			if ( document.getElementById("algolia-search-box") ) {
				if ( algolia.indices.searchable_posts === undefined && document.getElementsByClassName("admin-bar").length > 0 ) {
					alert('<?php esc_html_e( 'It looks like you have not indexed the searchable posts index. Please head to the Indexing page of the Algolia Search plugin and index it.', 'wp-search-with-algolia' ); ?>');
				}

				/* Instantiate instantsearch.js */
				const search = instantsearch({
					indexName: algolia.indices.searchable_posts.name,
					searchClient: algoliasearch( algolia.application_id, algolia.search_api_key ),
					routing: {
						router: instantsearch.routers.history({ writeDelay: 1000 }),
						stateMapping: {
							stateToRoute( indexUiState ) {
								return {
									s: indexUiState[ algolia.indices.searchable_posts.name ].query,
									page: indexUiState[ algolia.indices.searchable_posts.name ].page
								}
							},
							routeToState( routeState ) {
								const indexUiState = {};
								indexUiState[ algolia.indices.searchable_posts.name ] = {
									query: routeState.s,
									page: routeState.page
								};
								return indexUiState;
							}
						}
					},
					// https://www.algolia.com/doc/guides/building-search-ui/events/js/
					insights: algolia.insights_enabled,
					/*
					insights: {
						insightsInitParams: {
							useCookie: true
						}
					},
					 */
				});

				search.addWidgets([

					// Search box widget
					// https://www.algolia.com/doc/api-reference/widgets/search-box/js/
					instantsearch.widgets.searchBox({
						container: '#algolia-search-box',
						placeholder: 'Search for...',
						showReset: false,
						showSubmit: false,
						showLoadingIndicator: false,
					}),

					// Stats widget
					// https://www.algolia.com/doc/api-reference/widgets/stats/js/
					instantsearch.widgets.stats({
						container: '#algolia-stats'
					}),

					// Configure widget
					// https://www.algolia.com/doc/api-reference/widgets/configure/js/
					instantsearch.widgets.configure({
						hitsPerPage: algolia.search_hits_per_page,
					}),

					// Hits widget
					// https://www.algolia.com/doc/api-reference/widgets/hits/js/
					instantsearch.widgets.hits({
						container: '#algolia-hits',
						templates: {
							empty(results, {html} ) {
								return html `No results were found for "<strong>${results.query}</strong>".`;
							},
							item(hit, { html, components }) {
								let thumbnail = '';
								if ( hit.images.thumbnail ) {
									thumbnail = html`
									<div class="ais-hits--thumbnail">
										<a href="${hit.permalink}" title="${hit.post_title }" class="ais-hits--thumbnail-link">
											<img src="${hit.images.thumbnail.url }" alt="${hit.post_title }" title="${hit.post_title }" itemprop="image" />
										</a>
									</div>`;
								}

								let content_snippet = '';
								if (hit._snippetResult['content']) {
									content_snippet = html`<span class="suggestion-post-content ais-hits--content-snippet">${components.Snippet({hit, attribute: 'content'})}</span>`;
								}

								return html`
									<article itemtype="https://schema.org/Article">
										${thumbnail}
										<div class="ais-hits--content">
											<h2 itemprop="name headline"><a href="${hit.permalink}" title="${hit.post_title}" class="ais-hits--title-link" itemprop="url">${components.Highlight({hit, attribute: 'post_title'})}</a></h2>
											<div class="excerpt">
												<p>${content_snippet}</p>
											</div>
										</div>
										<div class="ais-clearfix"></div>
									</article>`;
							}
						},
						transformData: {
							item: function (hit) {

								function replace_highlights_recursive (item) {
									if (item instanceof Object && item.hasOwnProperty('value')) {
										item.value = _.escape(item.value);
										item.value = item.value.replace(/__ais-highlight__/g, '<em>').replace(/__\/ais-highlight__/g, '</em>');
									} else {
										for (let key in item) {
											item[key] = replace_highlights_recursive(item[key]);
										}
									}
									return item;
								}

								hit._highlightResult = replace_highlights_recursive(hit._highlightResult);
								hit._snippetResult = replace_highlights_recursive(hit._snippetResult);

								return hit;
							}
						}
					}),

					// Pagination widget
					// https://www.algolia.com/doc/api-reference/widgets/pagination/js/
					instantsearch.widgets.pagination({
						container: '#algolia-pagination'
					}),

					// Post types refinement widget
					// https://www.algolia.com/doc/api-reference/widgets/menu/js/
					instantsearch.widgets.menu({
						container: '#facet-post-types',
						attribute: 'post_type_label',
						sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
						limit: 10,
					}),

					// Categories refinement widget
					// https://www.algolia.com/doc/api-reference/widgets/hierarchical-menu/js/
					instantsearch.widgets.hierarchicalMenu({
						container: '#facet-categories',
						separator: ' > ',
						sortBy: ['count'],
						attributes: ['taxonomies_hierarchical.category.lvl0', 'taxonomies_hierarchical.category.lvl1', 'taxonomies_hierarchical.category.lvl2'],
					}),

					// Tags refinement widget
					// https://www.algolia.com/doc/api-reference/widgets/refinement-list/js/
					instantsearch.widgets.refinementList({
						container: '#facet-tags',
						attribute: 'taxonomies.post_tag',
						operator: 'and',
						limit: 15,
						sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
					}),

					// Users refinement widget
					// https://www.algolia.com/doc/api-reference/widgets/menu/js/
					instantsearch.widgets.menu({
						container: '#facet-users',
						attribute: 'post_author.display_name',
						sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
						limit: 10,
					})
				]);

				if ( algolia.powered_by_enabled ) {
					// Search powered-by widget
					// https://www.algolia.com/doc/api-reference/widgets/powered-by/js/
					search.addWidgets([
						/* Search powered-by widget */
						instantsearch.widgets.poweredBy({
							container: '#algolia-powered-by'
						}),
					])
				}

				/* Start */
				search.start();

				// This needs work
				document.querySelector("#algolia-search-box input[type='search']").select()
			}
		});
	</script>

<?php

get_footer();
