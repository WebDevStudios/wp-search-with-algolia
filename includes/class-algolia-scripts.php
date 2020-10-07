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

		wp_register_script(
			'algolia-search',
			ALGOLIA_PLUGIN_URL . 'js/algoliasearch/dist/algoliasearch.jquery' . $suffix . '.js',
			[
				'jquery',
				'underscore',
				'wp-util',
			],
			ALGOLIA_VERSION,
			$in_footer
		);

		wp_register_script(
			'algolia-autocomplete',
			ALGOLIA_PLUGIN_URL . 'js/autocomplete.js/dist/autocomplete' . $suffix . '.js',
			[
				'jquery',
				'underscore',
				'wp-util',
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

		wp_register_script(
			'algolia-instantsearch',
			ALGOLIA_PLUGIN_URL . 'js/instantsearch.js/dist/instantsearch-preact' . $suffix . '.js',
			[
				'jquery',
				'underscore',
				'wp-util',
			],
			ALGOLIA_VERSION,
			$in_footer
		);
	}
}
