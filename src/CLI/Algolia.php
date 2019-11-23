<?php
/**
 * Algolia command class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI;

use \WP_CLI;
use \WP_CLI_Command;

use WebDevStudios\WPSWA\CLI\Commands\{
	CopyIndex,
	Hello,
	ListIndices,
	ReindexPosts,
	SetConfig
};

/**
 * Interact with the WP Search with Algolia plugin.
 *
 * ## EXAMPLE
 *
 *     # Verify that the Algolia CLI commands have loaded.
 *     $ wp algolia hello
 *     Success: Algolia CLI Command is correctly loaded
 *
 * @since 2.0.0
 */
class Algolia extends WP_CLI_Command {

	/**
	 * Array of command classes to register.
	 *
	 * @since 2.0.0
	 *
	 * @var array
	 */
	protected $commands = [
		CopyIndex::class,
		Hello::class,
		ReindexPosts::class,
		SetConfig::class,
		ListIndices::class,
	];

	/**
	 * Algolia constructor.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	public function __construct() {
		$this->register();
	}

	/**
	 * Register subcommands with WP-CLI.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	protected function register() {
		foreach ( $this->commands as $command_class ) {
			WP_CLI::add_command( 'algolia', new $command_class() );
		}
	}
}
