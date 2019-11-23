<?php
/**
 * Hello subcommand class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI\Commands
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI\Commands;

use \WP_CLI;
use \WP_CLI_Command;

/**
 * Verify that the Algolia CLI commands have loaded.
 *
 * ## EXAMPLE
 *
 *     # Verify that the Algolia CLI commands have loaded.
 *     $ wp algolia hello
 *     Success: Algolia CLI Command is correctly loaded
 *
 * @since 2.0.0
 */
class Hello extends WP_CLI_Command {

	/**
	 * Verify that the Algolia CLI commands have loaded.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	public function hello() {

		$has_errors = false;
		$app_id     = \get_option( 'algolia_application_id', '' );
		$api_key    = \get_option( 'algolia_api_key', '' );

		if ( empty( $app_id ) ) {
			$has_errors = true;
			WP_CLI::error( 'Missing App ID.' );
		}

		if ( empty( $api_key ) ) {
			$has_errors = true;
			WP_CLI::error( 'Missing API key.' );
		}

		if ( ! $has_errors ) {
			WP_CLI::success( 'Algolia CLI Command is correctly loaded 🎉' );
		}
	}
}
