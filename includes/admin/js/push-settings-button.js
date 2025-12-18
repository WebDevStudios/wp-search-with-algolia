'use strict';
(function($) {

	/* global algoliaPushSettingsButton */

	$(
		function() {
			let $buttons = $( '.algolia-push-settings-button' );
			$buttons.on( 'click', handleButtonClick );
		}
	);

	function handleButtonClick(e) {
		let $clickedButton = $(e.currentTarget);
		let index = $clickedButton.data('index');
		if (!index) {
			throw new Error(algoliaPushSettingsButton.noDataIndex);
		}

		if (!window.confirm(algoliaPushSettingsButton.pushBtnAlert)) {
			return;
		}

		disableButton($clickedButton);

		pushSettings($clickedButton, index);
	}

	function disableButton($button) {
		$button.prop( 'disabled', true );
	}

	function enableButton($button) {
		$button.prop( 'disabled', false );
	}

	function pushSettings($clickedButton, index) {

		let data = {
			'action': 'algolia_push_settings',
			'index_id': index
		};

		$.post(
			ajaxurl, data, function(response) {
				if (typeof response.success !== 'undefined' && response.success === false) {
					if (typeof response.data.message !== 'undefined') {
						alert(algoliaPushReindexButton.errorPrefix + ' ' + response.data.message);
						enableButton($clickedButton);
						return;
					}
				}

				alert(algoliaPushSettingsButton.correctlyPushed + ' ' + index );
				enableButton( $clickedButton );
			}
		).fail(
			function(response) {
				alert(algoliaPushReindexButton.exceptionErrorPrefix + ' ' + response.responseJSON.data.message );
				enableButton( $clickedButton );
			}
		);
	}

})( jQuery );
