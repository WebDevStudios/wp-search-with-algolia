'use strict';

((window, $) => {

	window.addEventListener('load', function () {

		function updateAutocompletePositions() {
			/*
			const autocompleteInputs = document.querySelectorAll('.table-autocomplete .position-input');
			if (autocompleteInputs) {
				Array.from(autocompleteInputs).forEach((input, index) => {
					console.log(input.value);
				});
			}*/
			$('.table-autocomplete .position-input').each(
				function (index, value) {
					$(value).val(index);
				}
			);
		}

		$('.table-autocomplete tbody').sortable(
			{
				update: function () {
					updateAutocompletePositions();
				}
			}
		);

		function submenuHighlight() {
			let linksHighlight = document.querySelectorAll('#toplevel_page_algolia .wp-submenu li');
			if (linksHighlight) {
				Array.from(linksHighlight).forEach((link) => {
					let linkChild = link.querySelector('.algolia-menu-highlight');
					if (linkChild) {
						link.classList.add('algolia-submenu-highlight');
						let theLink = link.querySelector('a');
						if (theLink) {
							theLink.setAttribute('target', '_blank');
						}
					}
				});
			}
		}
		submenuHighlight();
	});
})(window, jQuery);
