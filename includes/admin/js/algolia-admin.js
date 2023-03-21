(function( $ ) {
	'use strict';

	$(
		function() {

			function updateAutocompletePositions () {
				$( '.table-autocomplete .position-input' ).each(
					function(index, value) {
						$( value ).val( index );
					}
				);
			}
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
						child.classList.add('algolia-submenu-highlight')

						let link = child.querySelector('a')
						if (link) {
							link.setAttribute('target', '_blank')
						}
					}
				})
			}

			submenuHighlight();
		}
	);
})( jQuery );
