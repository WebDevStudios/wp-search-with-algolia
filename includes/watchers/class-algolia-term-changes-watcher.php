<?php
/**
 * Algolia_Term_Changes_Watcher class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions\AlgoliaException;
/**
 * Class Algolia_Term_Changes_Watcher
 *
 * @since 1.0.0
 */
class Algolia_Term_Changes_Watcher implements Algolia_Changes_Watcher {

	/**
	 * Algolia_Index instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Algolia_Index
	 */
	private $index;

	/**
	 * Active Algolia Indices
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.6.0
	 * @var post_indices
	 */
	private $post_indices;

	/**
	 * Algolia_Term_Changes_Watcher constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param Algolia_Index $index Algolia_Index instance.
	 */
	public function __construct( Algolia_Index $index ) {
		$this->index = $index;
	}

	/**
	 * Watch WordPress events.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 */
	public function watch() {
		// Fires immediately after the given terms are edited.
		add_action( 'edited_term', array( $this, 'sync_item' ) );
		add_action( 'edited_term', [ $this, 'sync_term_posts' ], 10, 3 );

		// Fires after an object's terms have been set.
		add_action( 'set_object_terms', array( $this, 'handle_changes' ), 10, 6 );

		// Handle meta changes after the change occurred.
		add_action( 'added_term_meta', [ $this, 'on_meta_change' ], 10, 4 );
		add_action( 'updated_term_meta', [ $this, 'on_meta_change' ], 10, 4 );
		add_action( 'deleted_term_meta', [ $this, 'on_meta_change' ], 10, 4 );

		// Fires after a term is deleted from the database and the cache is cleaned.
		add_action( 'delete_term', array( $this, 'on_delete_term' ), 10, 4 );
	}

	/**
	 * Check if the current term has post assigned to it, if it does and it supports posts, then sync them.
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
		if ( ! $term || ! $this->index->supports( $term ) ) {
			return;
		}
		$args = [
			'posts_per_page' => -1,
			'tax_query'      => [
				[
					'taxonomy' => $taxonomy,
					'field'    => 'term_id',
					'terms'    => $term_id,
				],
			],
		];

		$posts              = get_posts( $args );
		$post_types         = wp_list_pluck( $posts, 'post_type' );
		$post_types         = array_unique( $post_types );
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
		$searchable_index      = new \Algolia_Searchable_Posts_Index( $searchable_post_types );
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
	 * Sync item.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int $term_id The term ID to sync.
	 *
	 * @return void
	 */
	public function sync_item( $term_id ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		$term = get_term( (int) $term_id );

		if ( ! $term || ! $this->index->supports( $term ) ) {
			return;
		}

		try {
			$this->index->sync( $term );
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
		}
	}

	/**
	 * Handle term changes.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int    $object_id  Object ID.
	 * @param array  $terms      An array of object terms.
	 * @param array  $tt_ids     An array of term taxonomy IDs.
	 * @param string $taxonomy   Taxonomy slug.
	 * @param bool   $append     Whether to append new terms to the old terms.
	 * @param array  $old_tt_ids Old array of term taxonomy IDs.
	 */
	public function handle_changes( $object_id, $terms, $tt_ids, $taxonomy, $append, $old_tt_ids ) {
		$terms_to_sync = array_unique( array_merge( $terms, $old_tt_ids ) );

		foreach ( $terms_to_sync as $term_id ) {
			$this->sync_item( $term_id );
		}
	}

	/**
	 * Delete item.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int    $term         Term ID.
	 * @param int    $tt_id        Term taxonomy ID.
	 * @param string $taxonomy     Taxonomy slug.
	 * @param mixed  $deleted_term Copy of the already-deleted term, in the form specified
	 *                             by the parent function. WP_Error otherwise.
	 *
	 * @return void
	 */
	public function on_delete_term( $term, $tt_id, $taxonomy, $deleted_term ) {
		if ( ! $this->index->supports( $deleted_term ) ) {
			return;
		}

		try {
			$this->index->delete_item( $deleted_term );
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
		}
	}

	/**
	 * Watch meta changes for item.
	 *
	 * @param string|array $meta_id    The meta ID.
	 * @param int          $object_id  The post ID.
	 * @param string       $meta_key   The meta key.
	 * @param mixed        $meta_value The meta value.
	 *
	 * @return void
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 */
	public function on_meta_change( $meta_id, $object_id, $meta_key, $meta_value ) {

		// We will not listen for any specific key by default.
		$keys = [];
		$keys = (array) apply_filters( 'algolia_watch_term_meta_keys', $keys, $object_id );

		if ( empty( $keys ) || ! in_array( $meta_key, $keys, true ) ) {
			return;
		}

		$this->sync_item( $object_id );
	}
}
