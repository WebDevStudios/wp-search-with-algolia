(function($) {

	$(
		function() {
			var $reindexButtons = $( '.algolia-reindex-button' );
			$reindexButtons.on( 'click', handleReindexButtonClick );
		}
	);

	var ongoing = 0;

	$( window ).on(
		'beforeunload', function() {
			if (ongoing > 0) {
				return 'If you leave now, re-indexing tasks in progress will be aborted';
			}
		}
	);

	function handleReindexButtonClick(e) {

		$clickedButton = $( e.currentTarget );
		var index      = $clickedButton.data( 'index' );
		if ( ! index) {
			throw new Error( 'Clicked button has no "data-index" set.' );
		}

		ongoing++;

		$clickedButton.attr( 'disabled', 'disabled' );
		$clickedButton.data( 'originalText', $clickedButton.text() );
		updateIndexingPourcentage( $clickedButton, 0 );

		reIndex( $clickedButton, index );
	}

	function updateIndexingPourcentage($clickedButton, amount) {
		$clickedButton.text( 'Processing, please be patient ... ' + amount + '%' );
	}

	function reIndex($clickedButton, index, currentPage) {
		if ( ! currentPage) {
			currentPage = 1;
		}

		var data = {
			'action': 'algolia_re_index',
			'index_id': index,
			'p': currentPage
		};

		$.post(
			ajaxurl, data, function(response) {
				if (typeof response.totalPagesCount === 'undefined' || response.success === false) {
					let errorMessage = response.data && response.data.message
						? 'Error: ' + response.data.message
						: 'An error occurred during reindexing. Please check your Algolia credentials and try again.';
					showError($clickedButton, errorMessage);
					resetButton($clickedButton, false);
					return;
				}

				if (response.totalPagesCount === 0) {
					$clickedButton.parents( '.error' ).fadeOut();
					resetButton($clickedButton, true);
					return;
				}
				progress = Math.round( (currentPage / response.totalPagesCount) * 100 );
				updateIndexingPourcentage( $clickedButton, progress );

				if (response.finished !== true) {
					reIndex( $clickedButton, index, ++currentPage );
				} else {
					$clickedButton.parents( '.error' ).fadeOut();
					resetButton($clickedButton, true);
				}
			}
		).fail(
			function(response) {
				let errorMessage;
				try {
					let errorData = JSON.parse(response.responseText);
					errorMessage = errorData.data && errorData.data.message
						? errorData.data.message
						: 'An error occurred while communicating with the server. Please try again.';
				} catch(e) {
					errorMessage = response.responseText || 'An unknown error occurred while reindexing.';
				}
				showError($clickedButton, errorMessage);
				resetButton($clickedButton, false);
			}
		);
	}

	function showError($button, message) {
		const $container = $button.closest('td, .error');

		$container.find('.algolia-reindex-error').remove();

		const $errorDiv = $('<div class="algolia-reindex-error notice notice-error is-dismissible" style="margin: 5px 0;"><p></p></div>');

		if ($container.is('td')) {
			$errorDiv.css({
				'display': 'block',
				'clear': 'both',
				'margin-top': '10px'
			});
		}

		$errorDiv.find('p').text(message);

		const $dismissButton = $('<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>');
		$errorDiv.append($dismissButton);

		$dismissButton.on('click', function() {
			$errorDiv.fadeOut(100, function() {
				$errorDiv.remove();
			});
		});

		$button.after($errorDiv);
		$errorDiv.show();
	}

	function resetButton($clickedButton, clearError) {
		ongoing--;
		$clickedButton.text('Reindex');  // Always show 'Reindex' after successful indexing
		$clickedButton.removeAttr( 'disabled' );
		$clickedButton.data( 'currentPage', 1 );

		if (clearError === true) {
			const $errorDiv = $clickedButton.siblings('.algolia-reindex-error');
			if ($errorDiv.length) {
				$errorDiv.remove();
			}
			// Also update the "Exists in Algolia" column to "Yes"
			$clickedButton.closest('tr').find('td:nth-child(3)').text('Yes');
		} else {
			$clickedButton.text($clickedButton.data('originalText')); // Keep original text on error
		}
	}

})( jQuery );
