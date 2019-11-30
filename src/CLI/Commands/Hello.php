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
use WebDevStudios\WPSWA\{
	Utility\Requirements
};

/**
 * Verify that the Algolia CLI commands have loaded.
 *
 * @since 2.0.0
 */
class Hello extends WP_CLI_Command {

	/**
	 * Requirements utlity.
	 *
	 * @since   2.0.0
	 *
	 * @var null|Requirements
	 */
	protected $requirements_utility = null;

	/**
	 * Verify that the Algolia CLI commands have loaded.
	 *
	 * ## EXAMPLES
	 *
	 *     # Verify that the Algolia CLI commands have loaded.
	 *     $ wp algolia hello
	 *     Success: Algolia CLI Command is correctly loaded
	 *
	 *     # If there is a problem with the requirements check.
	 *     $  wp algolia hello
	 *     Missing Algolia Application ID.
	 *     Missing Algolia Admin API key.
	 *     WP Search with Algolia requires at least PHP 7.2.
	 *     WP Search with Algolia requires at least WP 5.0.
	 *     WP Search with Algolia requires the cURL PHP extension.
	 *     WP Search with Algolia requires the JSON PHP extension.
	 *     WP Search with Algolia requires the mbstring PHP extension.
	 *     Error: One ore more errors were found with WP Search with Algolia settings or environment.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	public function hello(): void {
		$this->requirements_utility = new Requirements();
		$this->requirements_utility->set_app_id( \get_option( 'algolia_application_id', '' ) );
		$this->requirements_utility->set_admin_api_key( \get_option( 'algolia_api_key', '' ) );
		$this->requirements_utility->check_requirements();
		$this->output_status();
	}

	/**
	 * Output the status of our Requirements check.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @return void
	 */
	public function output_status() {
		if ( true === $this->requirements_utility->meets_requirements() ) {
			WP_CLI::success( 'Algolia CLI Command is correctly loaded 🎉' );
			return;
		}

		$errors = [];

		if ( false === $this->requirements_utility->has_app_id ) {
			$errors[] = 'Algolia Application ID not configured in plugin settings.';
		}

		if ( false === $this->requirements_utility->has_admin_api_key ) {
			$errors[] = 'Algolia Admin API key not configured in plugin settings.';
		}

		if ( false === $this->requirements_utility->meets_php_version ) {
			$errors[] = 'WP Search with Algolia requires at least PHP ' . WPSWA_MIN_PHP_VERSION . '.';
		}

		if ( false === $this->requirements_utility->meets_wp_version ) {
			$errors[] = 'WP Search with Algolia requires at least WP ' . WPSWA_MIN_WP_VERSION . '.';
		}

		if ( false === $this->requirements_utility->has_curl ) {
			$errors[] = 'WP Search with Algolia requires the cURL PHP extension.';
		}

		if ( false === $this->requirements_utility->has_json ) {
			$errors[] = 'WP Search with Algolia requires the JSON PHP extension.';
		}

		if ( false === $this->requirements_utility->has_mbstring ) {
			$errors[] = 'WP Search with Algolia requires the mbstring PHP extension.';
		}

		// Does not exit script.
		WP_CLI::error_multi_line( $errors );

		WP_CLI::error( 'One ore more errors were found with WP Search with Algolia settings or environment.' );
	}
}
