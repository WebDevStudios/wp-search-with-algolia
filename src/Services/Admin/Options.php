<?php

namespace WebDevStudios\WPSWA\Services\Admin;

use WebDevStudios\WPSWA\Structure\Service;

class Options extends Service {

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'register_menu_page' ) );
	}

	public function register_menu_page() {
		add_menu_page( 'Custom Menu Page Title', 'Custom Menu Page', 'manage_options', 'custom.php', '', 'dashicons-welcome-widgets-menus', 90 );
	}

	public static function run() {
		$init = new Options();
	}
}
