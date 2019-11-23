<?php
/**
 * CopyIndex subcommand class file.
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
use WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\SearchClient;

/**
 * Copy Index.
 *
 * ## EXAMPLE
 *
 *     # Copy index.
 *     $ wp algolia copy_index indexNameSrc --to=indexNameDest
 *     Success: Copied indexNameSrc to indexNameDest.
 *     +------------+--------------------------+
 *     | taskID     | updatedAt                |
 *     +------------+--------------------------+
 *     | 4438941992 | 2019-11-23T04:06:28.945Z |
 *     +------------+--------------------------+
 *
 * @since 2.0.0
 */
class CopyIndex extends WP_CLI_Command {

	/**
	 * Make a copy of an index.
	 *
	 * This method enables you to copy the entire index (objects, settings, synonyms, and rules)
	 * OR
	 * one or more of the following index elements:
	 * settings
	 * synonyms
	 * rules (query rules)
	 * You can control which of these are copied by using the scope parameter.
	 * If you omit the scope parameter, then all objects and all scope items are copied.
	 * The copy command will overwrite the destination index, if it already exists.
	 *
	 * ## OPTIONS
	 *
	 * [<srcIndexName>]
	 * : Name of the source index to copy.
	 *
	 * [--to=<destIndexName>]
	 * : Name of the destination index.
	 *
	 * [--scope=<scope>]
	 * : Optional. The "scope" parameter is a comma separated string of the following allowed values:
	 *   - settings
	 *   - synonyms
	 *   - rules
	 *
	 * [--format=<format>]
	 * : Optional. Render API response output in a particular format.
	 * default: table
	 * options:
	 *   - table
	 *   - json
	 *   - csv
	 *   - yaml
	 *   - count
	 *
	 * [--fields=<fields>]
	 * : Optional. Limit the API response output to specific object fields.
	 * The "fields" parameter is a comma separated string of the following allowed values:
	 *   - taskID
	 *   - updatedAt
	 *
	 * ---
	 *
	 * ## EXAMPLES
	 *
	 *     # Copy an existing index and it's objects to a new index.
	 *     $ wp algolia copy_index indexNameSrc --to=indexNameDest
	 *     Success: Copied indexNameSrc to indexNameDest.
	 *     +------------+--------------------------+
	 *     | taskID     | updatedAt                |
	 *     +------------+--------------------------+
	 *     | 4438941992 | 2019-11-23T04:06:28.945Z |
	 *     +------------+--------------------------+
	 *
	 *     # Copy settings and synonyms (but not rules, nor records) from an existing index to a new index.
	 *     $ wp algolia copy_index indexNameSrc --to=indexNameDest --scope=settings,synonyms
	 *     Success: Copied indexNameSrc to indexNameDest.
	 *     +------------+--------------------------+
	 *     | taskID     | updatedAt                |
	 *     +------------+--------------------------+
	 *     | 4438941992 | 2019-11-23T04:06:28.945Z |
	 *     +------------+--------------------------+
	 *
	 * @subcommand copy_index
	 *
	 * @synopsis [<srcIndexName>] [--to=<destIndexName>] [--scope=<scope>] [--format=<format>] [--fields=<fields>]
	 *
	 * @link https://www.algolia.com/doc/api-reference/api-methods/copy-index/#about-this-method
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 *
	 * @return void
	 */
	public function copy_index( $args, $assoc_args ): void {

		$app_id  = \get_option( 'algolia_application_id', '' );
		$api_key = \get_option( 'algolia_api_key', '' );

		if ( empty( $app_id ) || empty( $api_key ) ) {
			WP_CLI::error( 'Missing App ID or API key' );

			return;
		}

		$this->algolia_search_client = SearchClient::create( $app_id, $api_key );

		if ( empty( $args[0] ) ) {
			WP_CLI::error( 'The source index is a required argument.' );

			return;
		}

		if ( empty( $assoc_args['to'] ) ) {
			WP_CLI::error( 'The destination index is a required argument.' );

			return;
		}

		$src_index_name = $args[0];

		$src_index = $this->algolia_search_client->initIndex( $src_index_name );

		if ( ! $src_index->exists() ) {
			WP_CLI::error( "The source index {$src_index_name} does not yet exist." );
		}

		$dest_index_name = $assoc_args['to'];

		$dest_index = $this->algolia_search_client->initIndex( $dest_index_name );

		if ( $dest_index->exists() ) {
			WP_CLI::warning( "The destination index {$dest_index_name} exists and will be overwritten." );
			WP_CLI::confirm( 'Overwrite destination index?', $assoc_args = array() );
		}

		/**
		 * The allowed scope values.
		 *
		 * @since 2.0.0
		 *
		 * @var array $allowed_scope_values
		 */
		$allowed_scope_values = [
			'settings',
			'synonyms',
			'rules',
		];

		if ( ! empty( $assoc_args['scope'] ) ) {
			$scope = \explode( ',', $assoc_args['scope'] );
			$scope = \array_intersect( $scope, $allowed_scope_values );
		}

		if ( empty( $scope ) ) {
			$response = $this->algolia_search_client->copyIndex( $src_index_name, $dest_index_name );
		} else {
			$response = $this->algolia_search_client->copyIndex( $src_index_name, $dest_index_name, [ 'scope' => $scope ] );
		}

		WP_CLI::success( "Copied $src_index_name to $dest_index_name." );

		/**
		 * The fields available for a response object.
		 *
		 * @link  https://www.algolia.com/doc/api-reference/api-methods/copy-index/#response
		 *
		 * @since 2.0.0
		 *
		 * @var array $response_fields
		 */
		$response_fields = [
			'taskID',
			'updatedAt',
		];

		$fields = [];

		if ( ! empty( $assoc_args['fields'] ) ) {
			$fields = \explode( ',', $assoc_args['fields'] );
			$fields = \array_intersect( $fields, $response_fields );
		}

		if ( empty( $fields ) ) {
			$fields = $response_fields;
		}

		/**
		 * The allowed output formats.
		 *
		 * @since 2.0.0
		 *
		 * @var array $allowed_formats
		 */
		$allowed_formats = [
			'table',
			'csv',
			'json',
			'count',
			'yaml',
		];

		$format = 'table';

		if ( ! empty( $assoc_args['format'] ) && \in_array( $assoc_args['format'], $allowed_formats, true ) ) {
			$format = $assoc_args['format'];
		}

		format_items(
			$format,
			[ $response->getBody() ],
			$fields
		);
	}
}
