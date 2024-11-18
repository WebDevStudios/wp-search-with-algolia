'use strict';
((window) => {
	window.addEventListener('load', function () {
		const reindexButtons = document.querySelectorAll('.algolia-reindex-button');
		if (reindexButtons) {
			Array.from(reindexButtons).forEach((button) => {
				button.addEventListener('click', handleReindexButtonClick);
			});
		}

		let ongoing = 0;

		window.addEventListener('beforeunload', () => {
			if ( ongoing > 0 ) {
				return algoliaPushReindexButton.reindexAbort;
			}
		});

		function handleReindexButtonClick(e) {
			const clickedBtn = e.currentTarget;
			const index = clickedBtn.dataset.index;

			if (!index) {
				throw new Error(algoliaPushReindexButton.noDataindex);
			}

			ongoing++;

			clickedBtn.disabled = true;
			clickedBtn.dataset.originalText = clickedBtn.innerHTML.trim();
			updateIndexingPourcentage(clickedBtn,0);

			reIndex( clickedBtn, index )
		}

		function updateIndexingPourcentage(clickedBtn, amount) {
			// @todo Localize this string.
			clickedBtn.innerHTML = 'Processing, please be patient ... ' + amount + '%';
		}

		function resetButton(clickedBtn) {
			ongoing--;
			clickedBtn.innerHTML = clickedBtn.dataset.originalText;
			clickedBtn.disabled = false;
			clickedBtn.dataset.currentPage = 1;
		}

		function reIndex(clickedBtn, index, currentPage) {
			if (!currentPage) {
				currentPage = 1;
			}

			const data = new FormData();
			data.append('action', 'algolia_re_index');
			data.append('index_id', index);
			data.append('p', currentPage);

			fetch(window.ajaxurl, options = {
				method: 'POST',
				body  : data,
			})
				.then((response) => response.json())
				.then((response) => {
					if (typeof response.totalPagesCount === 'undefined') {
						alert('An error occurred');
						resetButton(clickedBtn);
						return;
					}

					if (response.totalPagesCount === 0) {
clickedBtn.parents('.error').fadeOut();
						resetButton(clickedBtn);
						return;
					}
					let progress = Math.round((currentPage / response.totalPagesCount) * 100);
					updateIndexingPourcentage(clickedBtn, progress);

					if (response.finished !== true) {
						reIndex(clickedBtn, index, ++currentPage);
					} else {
clickedBtn.parents('.error').fadeOut();
						resetButton(clickedBtn);
					}
				})
				.catch((error) => {
					// @todo test this out.
					alert('An error occurred: ' + error.responseText);
					resetButton($clickedButton);
				});
		}
	});
})(window);
