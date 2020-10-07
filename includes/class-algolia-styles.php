<?php
/**
 * Algolia_Styles class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.5.0-dev
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Styles
 *
 * @since 1.5.0-dev
 */
class Algolia_Styles {

	/**
	 * Algolia_Styles constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0-dev
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register_styles' ] );
	}

	/**
	 * Register styles.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0-dev
	 */
	public function register_styles() {

		wp_register_style(
			'algolia-autocomplete',
			ALGOLIA_PLUGIN_URL . 'css/algolia-autocomplete.css',
			[],
			ALGOLIA_VERSION,
			'screen'
		);

		wp_register_style(
			'algolia-instantsearch',
			ALGOLIA_PLUGIN_URL . 'css/algolia-instantsearch.css',
			[],
			ALGOLIA_VERSION,
			'screen'
		);
	}
}
