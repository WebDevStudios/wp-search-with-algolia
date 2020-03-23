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
use WebDevStudios\WPSWA\CLI\AlgoliaCLI;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;

/**
 * Reindex posts.
 *
 * ## EXAMPLE
 *
 *     # Reindex posts.
 *     $ wp algolia reindex_posts
 *     Success: Posts reindexed
 *
 * @since 2.0.0
 */
class ReindexPosts extends AlgoliaCLI {

	/**
	 * The Aglolia SearchClient.
	 *
	 * @since  2.0.0
	 *
	 * @Inject
	 * @var SearchClient
	 */
	protected $search_client;

	/**
	 * ReindexPosts constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param SearchClient $search_client The Algolia Search Client.
	 */
	public function __construct( SearchClient $search_client ) {
		$this->search_client = $search_client;
	}

	/**
	 * Reindex posts method.
	 *
	 * @todo This needs _a lot_ of work before it is usable.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 */
	public function reindex_posts( $args, $assoc_args ): void {

		global $table_prefix; // @todo -- Why is this here? What are we using this for?

		$type       = isset( $assoc_args['type'] ) ? $assoc_args['type'] : 'post';
		$index_name = $table_prefix . $type;
		$index      = $this->search_client->initIndex(
			apply_filters( 'algolia_index_name', $index_name, $type ) // phpcs:ignore
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
				$record = (array) apply_filters( $type . '_to_record', $post ); // phpcs:ignore

				if ( ! isset( $record['objectID'] ) ) {
					$record['objectID'] = implode( '#', [ $post->post_type, $post->ID ] );
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
