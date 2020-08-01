<?php
/**
 * Algolia_Post_Changes_Watcher class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use Algolia\AlgoliaSearch\Exceptions\AlgoliaException;

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
	 * @var Array
	 */
	private $posts_deleted = array();

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

		try {
			$this->index->sync( $post );
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.
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
	 * @param string|array $meta_id   The meta ID.
	 * @param int          $object_id The post ID.
	 * @param string       $meta_key  The meta key.
	 *
	 * @return void
	 */
	public function on_meta_change( $meta_id, $object_id, $meta_key ) {
		$keys = array( '_thumbnail_id' );
		$keys = (array) apply_filters( 'algolia_watch_post_meta_keys', $keys, $object_id );

		if ( ! in_array( $meta_key, $keys, true ) ) {
			return;
		}

		$this->sync_item( $object_id );
	}
}
