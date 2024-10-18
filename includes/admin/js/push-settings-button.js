'use strict';

((window) => {
	let buttons = document.querySelectorAll('.algolia-push-settings-button');
	if (buttons) {
		Array.from(buttons).forEach((button) => {
			button.addEventListener('click', handleButtonClick);
		});
	}

	function handleButtonClick(e) {
		let clickedButton = e.currentTarget;
		let algoliaIndex = clickedButton.dataset.index;
		if (!algoliaIndex) {
			throw new Error('Clicked button has no "data-index" set.');
		}

		if (!window.confirm(algoliaPushSettingsButton.pushBtnAlert)) {
			return;
		}

		disableButton(clickedButton);

		pushSettings(clickedButton, algoliaIndex);
	}

	function disableButton(button) {
		button.disabled = true;
	}

	function enableButton(button) {
		button.disabled = false;
	}

	function pushSettings(clickedButton, index) {

		const data = new FormData();
		data.append('action', 'algolia_push_settings');
		data.append('index_id', index);

		fetch(window.ajaxurl, options = {
			method: 'POST',
			body  : data,
		})
			.then((response) => response.json())
			.then((response) => {
				if (typeof response.success === 'undefined') {
					alert('An error occurred');
					enableButton(clickedButton);
					return;
				}

				alert('Settings correctly pushed for index: ' + index);
				enableButton(clickedButton);
			})
			.catch((error) => {
				alert('An error occurred: ' + error.responseText);
				enableButton(clickedButton);
			});

		$.post(
			ajaxurl, data, function (response) {
				if (typeof response.success === 'undefined') {
					alert('An error occurred');
					enableButton(clickedButton);
					return;
				}

				alert('Settings correctly pushed for index: ' + index);
				enableButton(clickedButton);
			}
		).fail(
			function (response) {
				alert('An error occurred: ' + response.responseText);
				enableButton(clickedButton);
			}
		);
	}
})(window);

(function($) {

	$(
		function() {
			var $buttons = $( '.algolia-push-settings-button' );
			$buttons.on( 'click', handleButtonClick );
		}
	);

	function handleButtonClick(e) {
		$clickedButton = $( e.currentTarget );
		var index      = $clickedButton.data( 'index' );
		if ( ! index) {
			throw new Error( 'Clicked button has no "data-index" set.' );
		}

		if ( ! window.confirm( algoliaPushSettingsButton.pushBtnAlert ) ) {
			return;
		}

		disableButton( $clickedButton );

		pushSettings( $clickedButton, index );
	}

	function disableButton($button) {
		$button.prop( 'disabled', true );
	}

	function enableButton($button) {
		$button.prop( 'disabled', false );
	}

	function pushSettings($clickedButton, index) {

		var data = {
			'action': 'algolia_push_settings',
			'index_id': index
		};

		$.post(
			ajaxurl, data, function(response) {
				if (typeof response.success === 'undefined') {
					alert( 'An error occurred' );
					enableButton( $clickedButton );
					return;
				}

				alert( 'Settings correctly pushed for index: ' + index );
				enableButton( $clickedButton );
			}
		).fail(
			function(response) {
				alert( 'An error occurred: ' + response.responseText );
				enableButton( $clickedButton );
			}
		);
	}

})( jQuery );
