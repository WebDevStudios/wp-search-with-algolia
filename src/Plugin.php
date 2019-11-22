<?php
/**
 * Plugin class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA;

use WebDevStudios\WPSWA\{
	Structure\Plugin\Plugin as OopsPlugin,
	Services\LoadTextDomain,
	Services\EnqueueScripts
};

/**
 * Class Plugin
 *
 * The core plugin class.
 *
 * @since 2.0.0
 */
final class Plugin extends OopsPlugin {

	/**
	 * Array of services.
	 *
	 * @todo Really would prefer a container.
	 *
	 * @since  2.0.0
	 * @var mixed
	 */
	protected $services = [
		LoadTextDomain::class,
		EnqueueScripts::class,
	];

	/**
	 * Plugin constructor.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function __construct() {
		$this->admin_hooks(); // @todo This doesn't belong here. #25 -- figure out what we're doing with options page.
	}

	/**
	 * Register all of the hooks related to the admin area functionality of the plugin.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function admin_hooks(): void {
		\add_action( 'admin_menu', [ $this, 'options_page' ] );
	}

	/**
	 * Register options page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function options_page(): void {
		\add_options_page(
			\esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ),
			\esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ),
			'manage_options',
			'wpswa',
			'wpswa_option_page'
		);
	}
}
