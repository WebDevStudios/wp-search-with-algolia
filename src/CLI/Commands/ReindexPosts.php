<?php
/**
 * ReindexPosts subcommand class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI\Commands
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI\Commands;

use \WP_Query;
use \WP_CLI;
use \WP_CLI_Command;
use \InvalidArgumentException;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;

/**
 * Reindex posts.
 *
 * ## EXAMPLE
 *
 *     # Reindex posts.
 *     $ wp algolia reindex_posts
 *     Success: Algolia CLI Command is correctly loaded
 *
 * @since 2.0.0
 */
class ReindexPosts extends WP_CLI_Command {

	/**
	 * Reindex posts method.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 *
	 * @return void
	 */
	public function reindex_posts( $args, $assoc_args ): void {

		$app_id  = \get_option( 'algolia_application_id', '' );
		$api_key = \get_option( 'algolia_api_key', '' );

		if ( empty( $app_id ) || empty( $api_key ) ) {
			WP_CLI::error( 'Missing App ID or API key' );

			return;
		}

		$this->algolia_search_client = SearchClient::create( $app_id, $api_key );

		global $table_prefix; // @todo -- Why is this here? What are we using this for?

		$type       = isset( $assoc_args['type'] ) ? $assoc_args['type'] : 'post';
		$index_name = $table_prefix . $type;
		$index      = $this->algolia_search_client->initIndex(
			\apply_filters( 'algolia_index_name', $index_name, $type ) // phpcs:ignore
		);

		$index->clearObjects()->wait();

		$paged = 1;
		$count = 0;
		do {
			$posts = new WP_Query( [
				'posts_per_page' => 100,
				'paged'          => $paged,
				'post_type'      => $type,
				'post_status'    => 'publish',
			] );

			if ( ! $posts->have_posts() ) {
				break;
			}

			$records = [];
			foreach ( $posts->posts as $post ) {
				if ( $assoc_args['verbose'] ) {
					WP_CLI::line( 'Indexing [' . $post->post_title . ']' );
				}
				$record = (array) \apply_filters( $type . '_to_record', $post ); // phpcs:ignore

				if ( ! isset( $record['objectID'] ) ) {
					$record['objectID'] = \implode( '#', [ $post->post_type, $post->ID ] );
				}

				$records[] = $record;
				$count ++;
			}

			$index->saveObjects( $records );

			$paged ++;

		} while ( true );

		WP_CLI::success( "{$count} {$type} entries indexed in Algolia" );
	}
}
