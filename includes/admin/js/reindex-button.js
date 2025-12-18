'use strict';
(function($) {

	$(
		function() {
			const reindexButtons = document.querySelectorAll('.algolia-reindex-button');
			if (reindexButtons) {
				Array.from(reindexButtons).forEach((button) => {
					button.addEventListener('click', handleReindexButtonClick);
				});
			}
		}
	);

	let ongoing = 0;

	$( window ).on(
		'beforeunload', function() {
			if (ongoing > 0) {
				return algoliaPushReindexButton.reindexAbort;
			}
		}
	);

	function handleReindexButtonClick(e) {

		let $clickedButton = $(e.currentTarget);
		let index = $clickedButton.data('index');
		if (!index) {
			throw new Error(algoliaPushReindexButton.noDataindex);
		}

		ongoing++;

		$clickedButton.attr('disabled', 'disabled');
		$clickedButton.data('originalText', $clickedButton.text());
		updateIndexingPourcentage($clickedButton, 0);

		reIndex($clickedButton, index);
	}

	function updateIndexingPourcentage($clickedButton, amount) {
		$clickedButton.text(algoliaPushReindexButton.processingPrefix + ' ' + amount + '%');
	}

	function reIndex($clickedButton, index, currentPage) {
		if ( ! currentPage) {
			currentPage = 1;
		}

		let data = {
			'action': 'algolia_re_index',
			'index_id': index,
			'p': currentPage
		};

		$.post(
			ajaxurl, data, function(response) {
				if (typeofresponse.success !== 'undefined' && response.success === false) {
					if (typeof response.data.message !== 'undefined') {
						alert(algoliaPushReindexButton.errorPrefix + ' ' + response.data.message);
						resetButton($clickedButton);
						return;
					}
				}
				if (typeof response.data.totalPagesCount === 'undefined') {
					alert(algoliaPushReindexButton.noPageCount );
					resetButton( $clickedButton );
					return;
				}

				if (response.data.totalPagesCount === 0) {
					$clickedButton.parents( '.error' ).fadeOut();
					resetButton( $clickedButton );
					return;
				}
				let progress = Math.round( (currentPage / response.data.totalPagesCount) * 100 );
				updateIndexingPourcentage( $clickedButton, progress );

				if (response.data.finished !== true) {
					reIndex( $clickedButton, index, ++currentPage );
				} else {
					$clickedButton.parents( '.error' ).fadeOut();
					resetButton( $clickedButton );
				}
			}
		).fail(
			function (response) {
				alert(algoliaPushReindexButton.exceptionErrorPrefix + ' ' + response.responseJSON.data.message);
				resetButton($clickedButton);
			}
		);
	}

	function resetButton($clickedButton) {
		ongoing--;
		$clickedButton.text( $clickedButton.data( 'originalText' ) );
		$clickedButton.removeAttr( 'disabled' );
		$clickedButton.data( 'currentPage', 1 );
	}

})( jQuery );
