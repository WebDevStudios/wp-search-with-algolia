<?php
/**
 * Algolia command class file.
 *
 * This isn't really a command so much as a faux command for subcommands to fall under.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI;

use \WP_CLI;
use \WP_CLI_Command;
use \WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;

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
class AlgoliaCLI extends WP_CLI_Command {

	/**
	 * The Aglolia SearchClient.
	 *
	 * @Inject
	 * @var SearchClient
	 */
	protected $search_client;

	/**
	 * Algolia_CLI constructor.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param SearchClient $search_client
	 */
	public function __construct( SearchClient $search_client ) {
		$this->search_client = $search_client;
	}
}
