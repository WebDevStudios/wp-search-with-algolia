(function( $ ) {
	'use strict';

	$(
		function() {

			function updateAutocompletePositions () {
				$( '.algolia-autocomplete-list .position-input, .table-autocomplete .position-input' ).each(
					function(index, value) {
						$( value ).val( index );
					}
				);
			}
			$( '.algolia-autocomplete-list' ).sortable(
				{
					handle: '.algolia-autocomplete-row__handle',
					placeholder: 'algolia-autocomplete-row__placeholder',
					forcePlaceholderSize: true,
					tolerance: 'pointer',
					update: function() {
						updateAutocompletePositions();
					}
				}
			);
			// Backwards compatibility for any custom code still rendering the legacy table.
			$( '.table-autocomplete tbody' ).sortable(
				{
					update: function() {
						updateAutocompletePositions();
					}
				}
			);

			function submenuHighlight () {
				let menu = document.querySelector('#toplevel_page_algolia')
				if (!menu) {
					return
				}

				let children = menu.querySelectorAll('.wp-submenu li')
				children.forEach(child => {
					let link = child.querySelector('a')
					if (!link) {
						return
					}

					let linkChild = link.querySelector('.algolia-menu-highlight')
					if (linkChild) {
						// Highlight only. This used to also force target="_blank",
						// which made sense when "Upgrade to Pro" was an offsite
						// redirect. It now opens an in-admin page, so sending it
						// to a new tab would be wrong.
						child.classList.add('algolia-submenu-highlight')
					}
				})
			}

			submenuHighlight();
		}
	);
})( jQuery );
