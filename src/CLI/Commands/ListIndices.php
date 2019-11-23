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

use WebDevStudios\WPSWA\{
	Utility\Options,
	Vendor\Algolia\AlgoliaSearch\SearchClient
};

/**
 * List indices.
 *
 * @since 2.0.0
 */
class ListIndices extends WP_CLI_Command {

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
	 *
	 * @return void
	 */
	public function list_indices( $args, $assoc_args ): void {

		$app_id = \get_option( 'algolia_application_id', '' );

		$api_key = \get_option( 'algolia_api_key', '' );

		if ( empty( $app_id ) || empty( $api_key ) ) {
			WP_CLI::error( 'Missing App ID or API key' );

			return;
		}

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
			$fields = \explode( ',', $assoc_args['fields'] );
			$fields = \array_intersect( $fields, $index_fields );
		}

		if ( empty( $fields ) ) {
			$fields = $index_fields;
		}

		$items = [];

		$this->algolia_search_client = SearchClient::create( $app_id, $api_key );

		$indices = $this->algolia_search_client->listIndices();

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

		if ( ! \in_array( $format, $allowed_formats, true ) ) {
			$format = 'table';
		}

		format_items(
			$format,
			$items,
			$fields
		);
	}
}
