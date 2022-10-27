<?php
/**
 * WP Search With Algolia autocomplete template file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @version 2.0.0
 * @package WebDevStudios\WPSWA
 */

?>

<script type="text/html" id="tmpl-autocomplete-header">
	<div class="autocomplete-header">
		<div class="autocomplete-header-title">{{{ data.label }}}</div>
		<div class="clear"></div>
	</div>
</script>

<script type="text/html" id="tmpl-autocomplete-post-suggestion">
	<a class="suggestion-link" href="{{ data.permalink }}" title="{{ data.post_title }}">
		<# if ( data.images.thumbnail ) { #>
			<img class="suggestion-post-thumbnail" src="{{ data.images.thumbnail.url }}" alt="{{ data.post_title }}">
		<# } #>
		<div class="suggestion-post-attributes">
			<span class="suggestion-post-title">{{{ data._highlightResult.post_title.value }}}</span>
			<# if ( data._snippetResult['content'] ) { #>
				<span class="suggestion-post-content">{{{ data._snippetResult['content'].value }}}</span>
			<# } #>
		</div>
	</a>
</script>

<script type="text/html" id="tmpl-autocomplete-term-suggestion">
	<a class="suggestion-link" href="{{ data.permalink }}" title="{{ data.name }}">
		<svg viewBox="0 0 21 21" width="21" height="21">
			<svg width="21" height="21" viewBox="0 0 21 21">
				<path
					d="M4.662 8.72l-1.23 1.23c-.682.682-.68 1.792.004 2.477l5.135 5.135c.7.693 1.8.688 2.48.005l1.23-1.23 5.35-5.346c.31-.31.54-.92.51-1.36l-.32-4.29c-.09-1.09-1.05-2.06-2.15-2.14l-4.3-.33c-.43-.03-1.05.2-1.36.51l-.79.8-2.27 2.28-2.28 2.27zm9.826-.98c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25z"
					fill-rule="evenodd"></path>
			</svg>
		</svg>
		<span class="suggestion-post-title">{{{ data._highlightResult.name.value }}}</span>
	</a>
</script>

<script type="text/html" id="tmpl-autocomplete-user-suggestion">
	<a class="suggestion-link user-suggestion-link" href="{{ data.posts_url }}" title="{{ data.display_name }}">
		<# if ( data.avatar_url ) { #>
			<img class="suggestion-user-thumbnail" src="{{ data.avatar_url }}" alt="{{ data.display_name }}">
		<# } #>
		<span class="suggestion-post-title">{{{ data._highlightResult.display_name.value }}}</span>
	</a>
</script>

<script type="text/html" id="tmpl-autocomplete-footer">
	<div class="autocomplete-footer">
		<div class="autocomplete-footer-branding">
			<a href="#" class="algolia-powered-by-link" title="Algolia">
				<svg width="130" height="30" viewBox="0 0 130 29.597" xmlns="http://www.w3.org/2000/svg">
				<defs>
				<style>.cls-1,.cls-2{fill:#003dff;}.cls-2{fill-rule:evenodd;}</style>
				</defs>
				<path class="cls-2" d="m63.265 16.269v-15.922c0-0.21454-0.19149-0.37766-0.40308-0.34457l-2.9823 0.46927c-0.16962 0.026596-0.29492 0.17317-0.29492 0.34516l0.01002 16.148c0 0.7636 0 5.4788 5.672 5.6437 0.19681 0.0059 0.35993-0.15248 0.35993-0.3493v-2.4102c0-0.17494-0.12943-0.32565-0.3026-0.34516-2.0597-0.237-2.0597-2.8115-2.0597-3.2341z" stroke-width=".059102"/>
				<rect class="cls-1" x="109.1" y="6.1877" width="3.6986" height="16.425" rx=".39725" ry=".39725" stroke-width=".059102"/>
				<path class="cls-2" d="m109.45 4.2167h3.0006c0.19268 0 0.34871-0.15603 0.34871-0.3487v-3.5213c0-0.21395-0.1915-0.37766-0.40309-0.34457l-3.0006 0.46986c-0.16962 0.026596-0.29492 0.17258-0.29492 0.34457v3.0509c0 0.19267 0.15603 0.3487 0.34871 0.3487z" stroke-width=".059102"/>
				<path class="cls-2" d="m104.26 16.269v-15.922c0-0.21454-0.19149-0.37766-0.40308-0.34457l-2.9823 0.46927c-0.16962 0.026596-0.29492 0.17317-0.29492 0.34516l0.01 16.148c0 0.7636 0 5.4788 5.672 5.6437 0.19681 0.0059 0.35994-0.15248 0.35994-0.3493v-2.4102c0-0.17494-0.12944-0.32565-0.30261-0.34516-2.0597-0.237-2.0597-2.8115-2.0597-3.2341z" stroke-width=".059102"/>
				<path class="cls-2" d="m96.455 8.433c-0.6584-0.724-1.4675-1.2796-2.4102-1.6732-0.94091-0.38594-1.9657-0.58216-3.0775-0.58216-1.1099 0-2.1365 0.18735-3.0686 0.58216-0.9214 0.39362-1.7311 0.94859-2.409 1.6732-0.6779 0.72282-1.2045 1.5881-1.5816 2.6023-0.37707 1.0148-0.54611 2.2087-0.54611 3.4492 0 1.2406 0.18854 2.1791 0.56443 3.2039 0.37707 1.0237 0.89481 1.8978 1.5633 2.6218 0.66726 0.72282 1.4675 1.2778 2.3996 1.6821 0.93204 0.40367 2.3712 0.61053 3.097 0.61939 0.724 0 2.1738-0.22577 3.1147-0.61939 0.94091-0.3948 1.7412-0.95923 2.4102-1.6821 0.66726-0.724 1.185-1.5981 1.5514-2.6218 0.36762-1.0248 0.54611-1.9634 0.54611-3.2039 0-1.2406-0.1974-2.4344-0.5928-3.4492-0.37707-1.0148-0.89481-1.8795-1.5621-2.6023zm-2.6259 9.678c-0.6779 0.93086-1.6289 1.4007-2.8422 1.4007-1.2146 0-2.1649-0.461-2.8428-1.4007-0.6779-0.93086-1.0172-2.0101-1.0172-3.6171 0-1.5893 0.33038-2.9043 1.0083-3.834 0.67672-0.93086 1.6277-1.3901 2.841-1.3901 1.2146 0 2.1649 0.45982 2.8422 1.3901 0.6779 0.92022 1.026 2.2447 1.026 3.834 0 1.607-0.33807 2.6773-1.016 3.6171z" stroke-width=".059102"/>
				<path class="cls-2" d="m52.866 6.1877h-2.9155c-2.8582 0-5.373 1.5059-6.8411 3.7885-0.85817 1.3345-1.3588 2.9332-1.3588 4.6531 0 2.6531 1.1897 5.019 3.0491 6.5663 0.17317 0.15367 0.35757 0.29433 0.55024 0.42199 0.76006 0.50178 1.6614 0.79611 2.6312 0.79611 0.0727 0 0.14539-0.0018 0.2175-0.0054 0.02128-0.0012 0.04196-0.0029 0.06324-0.0042 0.05142-0.0029 0.10343-0.0065 0.15485-0.01183 0.0201-0.0018 0.04019-0.0048 0.06029-0.0071 0.05379-0.0059 0.10757-0.01241 0.16135-0.0201 0.01241-0.0018 0.02482-0.0042 0.03724-0.0059 1.9439-0.29965 3.6383-1.8215 4.1904-3.7122v3.4179c0 0.19267 0.15603 0.3487 0.3487 0.3487h2.9799c0.19267 0 0.3487-0.15603 0.3487-0.3487v-15.528c0-0.19267-0.15603-0.3487-0.3487-0.3487zm0 12.229c-0.72105 0.60048-1.6531 0.82625-2.6501 0.89363-0.0094 5.92e-4 -0.0195 0.0018-0.02896 0.0023-0.06619 0.0042-0.13239 0.0059-0.19858 0.0059-2.4965 0-4.558-2.1212-4.558-4.691 0-0.6058 0.11584-1.1826 0.32034-1.7128 0.66313-1.7211 2.2914-2.9397 4.1998-2.9397h2.9155z" stroke-width=".059102"/>
				<path class="cls-2" d="m126.13 6.1877h-2.9155c-2.8582 0-5.373 1.5059-6.8411 3.7885-0.85817 1.3345-1.3588 2.9332-1.3588 4.6531 0 2.6531 1.1897 5.019 3.0491 6.5663 0.17316 0.15367 0.35757 0.29433 0.55024 0.42199 0.76005 0.50178 1.6614 0.79611 2.6312 0.79611 0.0727 0 0.14539-0.0018 0.21749-0.0054 0.0213-0.0012 0.0419-0.0029 0.0633-0.0042 0.0514-0.0029 0.10344-0.0065 0.15486-0.01183 0.02-0.0018 0.0402-0.0048 0.0602-0.0071 0.0537-0.0059 0.10756-0.01241 0.16135-0.0201 0.0125-0.0018 0.0248-0.0042 0.0373-0.0059 1.9439-0.29965 3.6383-1.8215 4.1904-3.7122v3.4179c0 0.19267 0.15603 0.3487 0.3487 0.3487h2.9799c0.19267 0 0.3487-0.15603 0.3487-0.3487v-15.528c0-0.19267-0.15603-0.3487-0.3487-0.3487zm0 12.229c-0.72105 0.60048-1.6531 0.82625-2.6502 0.89363-9e-3 5.92e-4 -0.0195 0.0018-0.0289 0.0023-0.0662 0.0042-0.13239 0.0059-0.19858 0.0059-2.4965 0-4.558-2.1212-4.558-4.691 0-0.6058 0.11584-1.1826 0.32033-1.7128 0.66313-1.7211 2.2914-2.9397 4.1998-2.9397h2.9155z" stroke-width=".059102"/>
				<path class="cls-2" d="m77.667 6.1877h-2.9155c-2.8582 0-5.373 1.5059-6.8411 3.7885-0.69682 1.0839-1.1584 2.3428-1.3068 3.6992-0.03428 0.31324-0.05201 0.63121-0.05201 0.95391 0 0.3227 0.01832 0.65899 0.05496 0.98051 0.25296 2.2512 1.3676 4.2323 2.9941 5.5864 0.17317 0.15367 0.35757 0.29433 0.55024 0.42199 0.76006 0.50178 1.6614 0.79611 2.6312 0.79611 1.0632 0 2.0455-0.35048 2.8464-0.94386 0.96278-0.6844 1.7069-1.6868 2.0378-2.8221v2.9705h-0.0065v0.65485c0 1.2908-0.33747 2.2618-1.0248 2.9173-0.68618 0.65485-1.8345 0.98287-3.4427 0.98287-0.65722 0-1.7016-0.03487-2.7542-0.14244-0.16726-0.01713-0.3227 0.08866-0.37057 0.24941l-0.75533 2.5479c-0.06029 0.2045 0.07506 0.4149 0.28546 0.44504 1.2719 0.18204 2.513 0.2766 3.2299 0.2766 2.8907 0 5.0332-0.63535 6.4357-1.9037 1.2695-1.1472 1.9592-2.8895 2.0804-5.2317v-15.878c0-0.19267-0.15603-0.3487-0.3487-0.3487h-3.3286zm0 3.7885s0.03842 8.2229 0 8.4729c-0.71396 0.57743-1.6023 0.8032-2.5704 0.8688-0.0094 5.93e-4 -0.0195 0.0018-0.02896 0.0023-0.06619 0.0042-0.13239 0.0059-0.19858 0.0059-0.07801 0-0.15544-0.0018-0.23286-0.0059-2.3883-0.1247-4.4043-2.2022-4.4043-4.6915 0-0.6058 0.11584-1.1826 0.32033-1.7128 0.66313-1.7211 2.2914-2.9397 4.1998-2.9397h2.9155z" stroke-width=".059102"/>
				<path class="cls-1" d="m14.769-0.0020501c-8.0692 0-14.647 6.5066-14.764 14.549-0.1182 8.1673 6.5083 14.935 14.677 14.982 2.5225 0.01478 4.9522-0.60225 7.11-1.7748 0.2104-0.11407 0.24291-0.40367 0.06383-0.56206l-1.3818-1.2246c-0.28074-0.24882-0.68027-0.31915-1.026-0.17258-1.5059 0.64067-3.1425 0.9681-4.8292 0.94741-6.6005-0.08097-11.933-5.5728-11.828-12.173 0.10402-6.5166 5.4374-11.786 11.978-11.786h11.979v21.293l-6.7968-6.0391c-0.21986-0.19563-0.55674-0.15721-0.73405 0.07742-1.091 1.4445-2.8682 2.3428-4.8423 2.2069-2.7382-0.18912-4.9569-2.3936-5.162-5.1307-0.24527-3.2648 2.3422-6.0001 5.5556-6.0001 2.9067 0 5.3003 2.237 5.5503 5.0798 0.02245 0.25296 0.13653 0.48878 0.32624 0.65722l1.7701 1.5692c0.20095 0.1779 0.51951 0.06915 0.56915-0.19504 0.12766-0.68263 0.17258-1.3936 0.12234-2.123-0.28487-4.1573-3.6525-7.5019-7.8116-7.7578-4.7684-0.29374-8.7548 3.4362-8.8813 8.1118-0.12352 4.5568 3.61 8.4847 8.1673 8.5852 1.9025 0.04196 3.6661-0.55615 5.0911-1.5928l8.8807 7.8724c0.38062 0.33748 0.98169 0.06738 0.98169-0.44149v-28.399c-6.84e-4 -0.30911-0.25118-0.56029-0.56088-0.56029z" stroke-width=".059102"/>
				</svg>

			</a>
		</div>
	</div>
</script>

<script type="text/html" id="tmpl-autocomplete-empty">
	<div class="autocomplete-empty">
		<?php esc_html_e( 'No results matched your query ', 'wp-search-with-algolia' ); ?>
		<span class="empty-query">"{{ data.query }}"</span>
	</div>
</script>

<script type="text/javascript">
	jQuery( function () {
		/* Initialize Algolia client */
		var client = algoliasearch( algolia.application_id, algolia.search_api_key );

		/**
		 * Algolia hits source method.
		 *
		 * This method defines a custom source to use with autocomplete.js.
		 *
		 * @param object $index Algolia index object.
		 * @param object $params Options object to use in search.
		 */
		var algoliaHitsSource = function( index, params ) {
			return function( query, callback ) {
				index
					.search( query, params )
					.then( function( response ) {
						callback( response.hits, response );
					})
					.catch( function( error ) {
						callback( [] );
					});
			}
		}

		/* Setup autocomplete.js sources */
		var sources = [];
		jQuery.each( algolia.autocomplete.sources, function ( i, config ) {
			var suggestion_template = wp.template( config[ 'tmpl_suggestion' ] );
			sources.push( {
				source: algoliaHitsSource( client.initIndex( config[ 'index_name' ] ), {
					hitsPerPage: config[ 'max_suggestions' ],
					attributesToSnippet: [
						'content:10'
					],
					highlightPreTag: '__ais-highlight__',
					highlightPostTag: '__/ais-highlight__'
				} ),
				templates: {
					header: function () {
						return wp.template( 'autocomplete-header' )( {
							label: _.escape( config[ 'label' ] )
						} );
					},
					suggestion: function ( hit ) {
						if ( hit.escaped === true ) {
							return suggestion_template( hit );
						}
						hit.escaped = true;

						for ( var key in hit._highlightResult ) {
							/* We do not deal with arrays. */
							if ( typeof hit._highlightResult[ key ].value !== 'string' ) {
								continue;
							}
							hit._highlightResult[ key ].value = _.escape( hit._highlightResult[ key ].value );
							hit._highlightResult[ key ].value = hit._highlightResult[ key ].value.replace( /__ais-highlight__/g, '<em>' ).replace( /__\/ais-highlight__/g, '</em>' );
						}

						for ( var key in hit._snippetResult ) {
							/* We do not deal with arrays. */
							if ( typeof hit._snippetResult[ key ].value !== 'string' ) {
								continue;
							}

							hit._snippetResult[ key ].value = _.escape( hit._snippetResult[ key ].value );
							hit._snippetResult[ key ].value = hit._snippetResult[ key ].value.replace( /__ais-highlight__/g, '<em>' ).replace( /__\/ais-highlight__/g, '</em>' );
						}

						return suggestion_template( hit );
					}
				}
			} );

		} );

		/* Setup dropdown menus */
		jQuery( algolia.autocomplete.input_selector ).each( function ( i ) {
			var $searchInput = jQuery( this );

			var config = {
				debug: algolia.debug,
				hint: false,
				openOnFocus: true,
				appendTo: 'body',
				templates: {
					empty: wp.template( 'autocomplete-empty' )
				}
			};

			if ( algolia.powered_by_enabled ) {
				config.templates.footer = wp.template( 'autocomplete-footer' );
			}

			/* Instantiate autocomplete.js */
			var autocomplete = algoliaAutocomplete( $searchInput[ 0 ], config, sources )
				.on( 'autocomplete:selected', function ( e, suggestion ) {
					/* Redirect the user when we detect a suggestion selection. */
					window.location.href = suggestion.permalink;
				} );

			/* Force the dropdown to be re-drawn on scroll to handle fixed containers. */
			jQuery( window ).on( 'scroll', function() {
				if ( autocomplete.autocomplete.getWrapper().style.display === "block" ) {
					autocomplete.autocomplete.close();
					autocomplete.autocomplete.open();
				}
			} );
		} );

		jQuery( document ).on( "click", ".algolia-powered-by-link", function ( e ) {
			e.preventDefault();
			window.location = "https://www.algolia.com/?utm_source=WordPress&utm_medium=extension&utm_content=" + window.location.hostname + "&utm_campaign=poweredby";
		} );
	} );
</script>
