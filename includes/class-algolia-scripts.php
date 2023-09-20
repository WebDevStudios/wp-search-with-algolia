<?php
/**
 * Algolia_Scripts class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.5.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Scripts
 *
 * @since 1.5.0
 */
class Algolia_Scripts {

	/**
	 * Algolia_Scripts constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ] );
	}

	/**
	 * Register scripts.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 */
	public function register_scripts() {

		$in_footer = Algolia_Utils::get_scripts_in_footer_argument();

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		$ais_suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG
			? '.development'
			: '.production';

		wp_register_script(
			'algolia-search',
			ALGOLIA_PLUGIN_URL . 'assets/algoliasearch/dist/algoliasearch-lite.umd.js',
			[
				'underscore',
				'wp-util',
			],
			ALGOLIA_VERSION,
			$in_footer
		);

		$autocomplete_is_modern = Algolia_Utils::should_use_autocomplete_modern();
		if ( $autocomplete_is_modern ) {
			wp_register_script(
				'algolia-autocomplete',
				ALGOLIA_PLUGIN_URL . 'assets/autocomplete.js/dist/umd/index' . $ais_suffix . '.js',
				[
					'algolia-search',
				],
				ALGOLIA_VERSION,
				$in_footer
			);
		} else {
			wp_register_script(
				'algolia-autocomplete',
				ALGOLIA_PLUGIN_URL . 'js/autocomplete.js/dist/autocomplete' . $suffix . '.js',
				[
					'underscore',
					'wp-util',
					'algolia-search',
				],
				ALGOLIA_VERSION,
				$in_footer
			);

			wp_register_script(
				'algolia-autocomplete-noconflict',
				ALGOLIA_PLUGIN_URL . 'js/autocomplete-noconflict.js',
				[
					'algolia-autocomplete',
				],
				ALGOLIA_VERSION,
				$in_footer
			);
		}



		wp_register_script(
			'algolia-instantsearch',
			ALGOLIA_PLUGIN_URL . 'assets/instantsearch.js/dist/instantsearch' . $ais_suffix . $suffix . '.js',
			[
				'underscore',
				'wp-util',
				'algolia-search',
			],
			ALGOLIA_VERSION,
			$in_footer
		);
	}
}
