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
class Hello extends \WP_CLI_Command {

	/**
	 * Verify that the Algolia CLI commands have loaded.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	public function hello() {
		\WP_CLI::success( 'Algolia CLI Command is correctly loaded 🎉' );
	}
}
