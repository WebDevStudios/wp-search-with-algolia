<?php
/**
 * ListIndices subcommand class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI\Commands
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI\Commands;

use \WP_CLI;
use \WP_CLI_Command;
use function \WP_CLI\Utils\format_items;
use WebDevStudios\WPSWA\CLI\AlgoliaCLI;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Exceptions\BadRequestException;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Exceptions\UnreachableException;

/**
 * List indices.
 *
 * @since 2.0.0
 */
class ListIndices extends AlgoliaCLI {

	/**
	 * The Aglolia SearchClient.
	 *
	 * @since 2.0.0
	 *
	 * @Inject
	 * @var SearchClient
	 */
	protected $search_client;

	/**
	 * ListIndices constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param SearchClient $search_client Algolia SearchClient object.
	 */
	public function __construct( SearchClient $search_client ) {
		$this->search_client = $search_client;
	}

	/**
	 * List indices.
	 *
	 * ## OPTIONS
	 *
	 * [<format>]
	 * : Render output in a particular format.
	 * default: table
	 * options:
	 *   - table
	 *   - json
	 *   - csv
	 *   - yaml
	 *   - count
	 *
	 * [--fields=<fields>]
	 * : Optional. Limit the output to specific object fields.
	 * The "fields" parameter is a comma separated string of the following allowed values:
	 *   - name
	 *   - createdAt
	 *   - updatedAt
	 *   - entries
	 *   - dataSize
	 *   - fileSize
	 *   - lastBuildTimeS
	 *   - numberOfPendingTasks
	 *   - pendingTask
	 *
	 * ---
	 *
	 * ## EXAMPLES
	 *
	 *     # Show the available indices as a table.
	 *     $ wp algolia list_indices
	 *
	 *     # Show the available indices as csv.
	 *     $ wp algolia list_indices csv
	 *
	 *     # Show the available indices as a table limited to specific fields.
	 *     $ wp algolia list_indices table --fields=name,entries
	 *
	 * @subcommand list_indices
	 *
	 * @synopsis [<format>] [--fields=<fields>]
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 */
	public function list_indices( $args, $assoc_args ): void {

		/**
		 * The fields available for an index object.
		 *
		 * @link  https://www.algolia.com/doc/api-reference/api-methods/list-indices/#method-response-index-object
		 *
		 * @since 2.0.0
		 *
		 * @var array $index_fields
		 */
		$index_fields = [
			'name',
			'createdAt',
			'updatedAt',
			'entries',
			'dataSize',
			'fileSize',
			'lastBuildTimeS',
			'numberOfPendingTasks',
			'pendingTask',
		];

		$fields = [];

		if ( ! empty( $assoc_args['fields'] ) ) {
			$fields = explode( ',', $assoc_args['fields'] );
			$fields = array_intersect( $fields, $index_fields );
		}

		if ( empty( $fields ) ) {
			$fields = $index_fields;
		}

		$items = [];

		try {
			$indices = $this->search_client->listIndices();
		} catch ( UnreachableException $e ) {
			WP_CLI::error(
				$e->getMessage()
			);
		} catch ( BadRequestException $e ) {
			WP_CLI::error(
				$e->getMessage()
			);
		}

		if ( ! empty( $indices['items'] ) ) {
			$items = $indices['items'];
		}

		if ( empty( $args ) ) {
			$args = [ 'table' ];
		}

		list( $format ) = $args;

		$allowed_formats = [
			'table',
			'csv',
			'json',
			'count',
			'yaml',
		];

		if ( ! in_array( $format, $allowed_formats, true ) ) {
			$format = 'table';
		}

		format_items(
			$format,
			$items,
			$fields
		);
	}
}
