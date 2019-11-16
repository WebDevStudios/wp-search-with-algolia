<?php
/**
 * Plugin class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA;

/**
 * Class Plugin
 *
 * The core plugin class.
 *
 * @todo Services and DI.
 *
 * @since 2.0.0
 */
final class Plugin {

	/**
	 * Register the plugin with WordPress.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register() {
		$this->admin_hooks();
		$this->public_hooks();
	}

	/**
	 * Register all of the hooks related to the admin area functionality of the plugin.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function admin_hooks() {
		add_action( 'admin_menu', [ $this, 'options_page' ] );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality of the plugin.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function public_hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'scripts' ] );
		add_action( 'plugins_loaded', [ $this, 'textdomain' ] );
	}

	/**
	 * Register scripts so that they can be used in other plugins outside of the context of the core features.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function scripts() {
		wp_enqueue_script(
			'algolia-search',
			WPSWA_PLUGIN_URL . '/dist/algolia.bundle.js',
			[],
			'2.0.0',
			true
		);
	}

	/**
	 * Register and load translation file(s).
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function textdomain() {

		// phpcs:disable -- This is a legitimate use of a global filter.
		$locale = apply_filters(
			'plugin_locale',
			get_locale(),
			'wp-search-with-algolia'
		);
		// phpcs:enable

		load_textdomain(
			'wp-search-with-algolia',
			WP_LANG_DIR . '/wp-search-with-algolia/wp-search-with-algolia-' . $locale . '.mo'
		);

		load_plugin_textdomain(
			'wp-search-with-algolia',
			false,
			plugin_basename( dirname( WPSWA_PLUGIN_FILE ) ) . '/languages/'
		);
	}

	/**
	 * Register options page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function options_page() {
		add_options_page(
			esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ),
			esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ),
			'manage_options',
			'wpswa',
			'wpswa_option_page'
		);
	}
}
