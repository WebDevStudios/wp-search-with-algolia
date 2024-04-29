<?php
/**
 * Algolia_Styles class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.5.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Styles
 *
 * @since 1.5.0
 */
class Algolia_Styles {

	/**
	 * Algolia_Styles constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register_styles' ] );
	}

	/**
	 * Register styles.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 */
	public function register_styles() {

		$suffix                 = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
		$algolia = Algolia_Plugin_Factory::create();
		$autocomplete_is_modern = $algolia->get_settings()->should_use_autocomplete_modern();

		if ( $autocomplete_is_modern ) {
			wp_register_style(
				'algolia-autocomplete-theme-classic',
				ALGOLIA_PLUGIN_URL . 'assets/autocomplete-theme-classic/dist/theme' . $suffix . '.css',
				[],
				ALGOLIA_VERSION
			);
			wp_register_style(
				'algolia-autocomplete',
				ALGOLIA_PLUGIN_URL . 'css/algolia-autocomplete-modern.css',
				['algolia-autocomplete-theme-classic'],
				ALGOLIA_VERSION
			);
		} else {
			wp_register_style(
				'algolia-autocomplete',
				ALGOLIA_PLUGIN_URL . 'css/algolia-autocomplete.css',
				[],
				ALGOLIA_VERSION
			);
		}

		wp_register_style(
			'algolia-instantsearch',
			ALGOLIA_PLUGIN_URL . 'css/algolia-instantsearch.css',
			[],
			ALGOLIA_VERSION
		);
	}
}
