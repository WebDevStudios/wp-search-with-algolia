<?php
/**
 * Options service class file.
 *
 * @package WebDevStudios\WPSWA\Services\Admin
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services\Admin;

use WebDevStudios\WPSWA\Structure\Service;

/**
 * Class Options
 *
 * @since 2.0.0
 */
class Options extends Service {

	/**
	 * Register hooks.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register_hooks(): void {
		\add_action( 'admin_menu', [ $this, 'add_menu_page' ] );
	}

	/**
	 * Add menu page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function add_menu_page() {
		add_menu_page(
			'Custom Menu Page Title',
			'Custom Menu Page',
			'manage_options',
			'custom.php',
			'',
			'dashicons-welcome-widgets-menus',
			90
		);
	}
}
