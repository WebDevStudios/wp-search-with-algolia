<?php
/**
 * Algolia_Term_Post_Sync_Watcher class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   3.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions\AlgoliaException;

/**
 * Class Algolia_Term_Post_Sync_Watcher
 *
 * Watches for term edits and re-syncs posts assigned to that term. This is
 * intentionally independent of any single taxonomy's terms-index, since
 * re-syncing posts on term edits is a post-indexing concern, not related to
 * whether that taxonomy has its own dedicated terms-index for autocomplete.
 *
 * @since 3.0.0
 */
class Algolia_Term_Post_Sync_Watcher implements Algolia_Changes_Watcher {

	/**
	 * Active Algolia Indices
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.6.0
	 * @var post_indices
	 */
	private $post_indices;

	/**
	 * Watch WordPress events.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   3.0.0
	 */
	public function watch() {
		// Fires immediately after the given terms are edited.
		add_action( 'edited_term', [ $this, 'sync_term_posts' ], 10, 3 );

		add_action( 'admin_notices', [ $this, 'large_count_notice' ] );
	}

	/**
	 * Check if the current term has post assigned to it, if it does, then sync them.
	 *
	 * @since 2.6.0
	 *
	 * @param int    $term_id  The current term to be updated.
	 * @param int    $tt_id    The Term Taxonomy ID.
	 * @param string $taxonomy The taxonomy slug.
	 *
	 * @return void
	 */
	public function sync_term_posts( $term_id, $tt_id, $taxonomy ) {
		$term = get_term( (int) $term_id );
		if ( ! $term || is_wp_error( $term ) ) {
			return;
		}

		/**
		 * Filters whether or not to update posts with the edited term.
		 *
		 * @since 2.11.3
		 *
		 * @param bool   $value    Whether or not to sync posts with this term.
		 * @param int    $term_id  The current term to be updated.
		 * @param int    $tt_id    The term taxonomy ID.
		 * @param string $taxonomy The taxonomy slug.
		 */
		$should_sync_term_posts = apply_filters( 'algolia_should_sync_term_posts', true, $term_id, $tt_id, $taxonomy );
		if ( ! $should_sync_term_posts ) {
			return;
		}

		/**
		 * This filters a cap of how many posts to fetch for the updated term, to update their algolia records.
		 *
		 * @since 2.11.3
		 *
		 * @param int $value Amount of posts to update.
		 */
		$limit = apply_filters( 'algolia_term_update_post_limit', 50 );

		$args = [
			'posts_per_page' => $limit,
			'post_type'      => get_taxonomy( $taxonomy )->object_type,
			'tax_query'      => [
				[
					'taxonomy' => $taxonomy,
					'field'    => 'term_id',
					'terms'    => $term_id,
				],
			],
		];

		$posts      = get_posts( $args );
		$post_types = wp_list_pluck( $posts, 'post_type' );
		$post_types = array_unique( $post_types );

		// Get configured autocomplete indices.
		$algolia_plugin = \Algolia_Plugin_Factory::create();
		$config         = $algolia_plugin->get_settings()->get_autocomplete_config();
		$config_indices = wp_list_pluck( $config, 'index_id' );

		foreach ( $post_types as $key => $post_type ) {
			if ( ! in_array( 'posts_' . $post_type, $config_indices, true ) ) {
				unset( $post_types[ $key ] );
			}
		}

		$this->post_indices = $this->get_searchable_indexes( $post_types );
		$this->sync_posts( $posts );
	}

	/**
	 * Returns an array of indexes based on selected post types.
	 *
	 * @since 2.6.0
	 *
	 * @param array $post_types An array of searchable post_types.
	 */
	private function get_searchable_indexes( $post_types ) {

		$post_indices          = [];
		$algolia_plugin        = \Algolia_Plugin_Factory::create();
		$synced_indices_ids    = $algolia_plugin->get_settings()->get_synced_indices_ids();
		$index_name_prefix     = $algolia_plugin->get_settings()->get_index_name_prefix();
		$client                = $algolia_plugin->get_api()->get_client();
		$searchable_post_types = get_post_types(
			[
				'exclude_from_search' => false,
			]
		);

		$searchable_index = new \Algolia_Searchable_Posts_Index( $searchable_post_types );
		$searchable_index->set_name_prefix( $index_name_prefix );
		$searchable_index->set_client( $client );
		$searchable_index->set_enabled( true );
		$post_indices[] = $searchable_index;

		foreach ( $post_types as $post_type ) {
			$post_index = new \Algolia_Posts_Index( $post_type );
			$post_index->set_name_prefix( $index_name_prefix );
			$post_index->set_client( $client );
			$post_index->set_enabled( true );
			$post_indices[] = $post_index;
		}
		return $post_indices;
	}

	/**
	 * Looks for a valid index base on the post type and triggers an Algolia sync.
	 *
	 * @since 2.6.0
	 *
	 * @param array $posts The post type to look for an index.
	 *
	 * @return void
	 */
	public function sync_posts( $posts ) {
		try {
			foreach ( $this->post_indices as $index ) {
				foreach ( $posts as $post ) {
					$index->sync( $post );
				}
			}
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
		}
	}

	/**
	 * Conditionally set an admin notice about maybe bulk re-indexing to update
	 * Algolia post records that have this term.
	 *
	 * @since 2.11.3
	 */
	public function large_count_notice() {
		global $current_screen;

		if ( ! $current_screen || 'term' !== $current_screen->base ) {
			return;
		}
		if ( ! empty( $_GET['tag_ID'] ) && is_numeric( $_GET['tag_ID'] ) ) {
			$termID = absint( $_GET['tag_ID'] );
		}

		$term = get_term( $termID );
		if ( ! $term ) {
			return;
		}

		// This filter is documented in includes/watchers/class-algolia-term-post-sync-watcher.php
		$limit = apply_filters( 'algolia_term_update_post_limit', 50 );
		if ( $term->count > absint( $limit ) ) {
			wp_admin_notice(
				sprintf(
					esc_html__( 'Only the first %1$s posts with this term have been sync\'d to your Algolia indexes. Please run a bulk re-index to get the rest.', 'wp-search-with-algolia' ),
					$limit
				),
				[
					'id'                 => 'message',
					'additional_classes' => array( 'updated' ),
					'dismissible'        => true,
				]
			);
		}
	}
}
