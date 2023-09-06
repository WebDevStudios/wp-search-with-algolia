<?php
/**
 * Algolia_Post_Changes_Watcher class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions\AlgoliaException;

/**
 * Class Algolia_Post_Changes_Watcher
 *
 * @since 1.0.0
 */
class Algolia_Post_Changes_Watcher implements Algolia_Changes_Watcher {

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
	 * Deleted posts array.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var array
	 */
	private $posts_deleted = array();

	/**
	 * Updated posts array.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.6.0
	 *
	 * @var array
	 */
	private $posts_updated = [];

	/**
	 * Whether or not we have detected fast mode for a given import.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since 2.6.1
	 *
	 * @var bool
	 */
	public static $pmxi_is_fast_mode;

	/**
	 * Algolia_Post_Changes_Watcher constructor.
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
		// Fires once a post has been saved.
		add_action( 'save_post', array( $this, 'sync_item' ) );

		// Fires before a post is deleted, at the start of wp_delete_post().
		// At this stage the post metas are still available, and we need them.
		add_action( 'before_delete_post', array( $this, 'delete_item' ) );

		// Handle meta changes after the change occurred.
		add_action( 'added_post_meta', array( $this, 'on_meta_change' ), 10, 4 );
		add_action( 'updated_post_meta', array( $this, 'on_meta_change' ), 10, 4 );
		add_action( 'deleted_post_meta', array( $this, 'on_meta_change' ), 10, 4 );

		// Handle attachment changes. These are required because the other post hooks are not triggered.
		add_action( 'add_attachment', array( $this, 'sync_item' ) );
		add_action( 'attachment_updated', array( $this, 'sync_item' ) );
		add_action( 'delete_attachment', array( $this, 'delete_item' ) );
		add_action( 'pre_post_update', [ $this, 'check_slug_update' ], 10, 2 );

		// Support for WP All Import "fast mode".
		add_action( 'pmxi_saved_post', [ $this, 'track_updated_posts' ] );
		add_action( 'pmxi_after_post_import', [ $this, 'sync_item_for_pmxi' ] );
	}

	/**
	 * Sync item.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int $post_id The post ID to sync.
	 *
	 * @return void
	 */
	public function sync_item( $post_id ) {

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( in_array( $post_id, $this->posts_deleted, true ) ) {
			return;
		}

		$post = get_post( (int) $post_id );
		if ( ! $post || ! $this->index->supports( $post ) ) {
			return;
		}

		$child_posts = get_transient( 'wp_algolia_child_posts_' . $post_id );

		if ( false !== $child_posts ) {
			foreach ( $child_posts as $child_post ) {
				$this->index->sync( $child_post );
			}
			delete_transient( 'wp_algolia_child_posts_' . $post_id );
		}
		try {
			$this->index->sync( $post );
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
		}
	}

	/**
	 * Check if a slug has been changed and add the childrens into a transient ( if it has children ).
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @since 2.6.0
	 *
	 * @param int   $post_id The parent ID.
	 * @param array $post_data An array containing the new post data.
	 * @return void
	 */
	public function check_slug_update( $post_id, $post_data ) {
		$post = get_post( (int) $post_id );
		if ( isset( $post_data['post_name'] ) && $post_data['post_name'] !== $post->post_name ) {

			$child_posts = get_children(
				[
					'post_parent' => $post_id,
				]
			);

			$pending_childs = [];
			foreach ( $child_posts as $child_post ) {
				if ( 'inherit' !== $child_post->post_status ) {
					$pending_childs[] = $child_post;
				}
			}
			set_transient( 'wp_algolia_child_posts_' . $post_id, $pending_childs, 60 );
		}

	}

	/**
	 * Delete item.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int $post_id The post ID to delete.
	 *
	 * @return void
	 */
	public function delete_item( $post_id ) {

		$post = get_post( (int) $post_id );
		if ( ! $post || ! $this->index->supports( $post ) ) {
			return;
		}

		try {
			$this->index->delete_item( $post );
			$this->posts_deleted[] = $post->ID;
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
		}
	}

	/**
	 * Watch meta changes for item.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string|array $meta_id    The meta ID.
	 * @param int          $object_id  The post ID.
	 * @param string       $meta_key   The meta key.
	 * @param mixed        $meta_value The meta value.
	 *
	 * @return void
	 */
	public function on_meta_change( $meta_id, $object_id, $meta_key, $meta_value ) {
		$keys = array( '_thumbnail_id' );
		$keys = (array) apply_filters( 'algolia_watch_post_meta_keys', $keys, $object_id );

		if ( ! in_array( $meta_key, $keys, true ) ) {
			return;
		}

		$this->sync_item( $object_id );
	}

	/**
	 * Track updated post ids.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.6.0
	 *
	 * @param int $post_id Post id.
	 * @return void
	 */
	public function track_updated_posts( $post_id ) {

		// If `save_post` has not been executed, it means "fast mode" of WP All Import is enabled.
		if ( in_array( $post_id, $this->posts_updated, true ) ) {
			return;
		}

		$this->posts_updated[] = $post_id;
	}

	/**
	 * Sync item to Algolia if "Fast Mode" option is enabled for WP All Import.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.6.0
	 *
	 * @param int $import_id Import id.
	 * @return void
	 */
	public function sync_item_for_pmxi( $import_id ) {

		if ( null === self::$pmxi_is_fast_mode ) {
			try {
				$import = new PMXI_Import_Record();
				$import->getBy( 'id', $import_id );

				self::$pmxi_is_fast_mode = ( ! empty( $import->options['is_fast_mode'] ) );
			} catch ( Exception $exception ) {
				error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
				return;
			}
		}

		if ( ! self::$pmxi_is_fast_mode ) {
			return;
		}

		$post_id = end( $this->posts_updated );

		if ( $post_id ) {
			$this->sync_item( $post_id );
		}
	}
}
