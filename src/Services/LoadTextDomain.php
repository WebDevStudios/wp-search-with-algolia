<?php
/**
 * LoadTextDomain service class file.
 *
 * @package WebDevStudios\WPSWA\Services
 * @since   0.1.0
 */

namespace WebDevStudios\WPSWA\Services;

use WDS_WPSWA_Vendor\WebDevStudios\OopsWP\Structure\Service;

/**
 * Class LoadTextDomain
 *
 * @since 0.1.0
 */
class LoadTextDomain extends Service {

	/**
	 * Register hooks.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register_hooks(): void {
		add_action( 'plugins_loaded', [ $this, 'load_textdomain' ] );
	}

	/**
	 * Load text domain.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function load_textdomain(): void {
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
}
