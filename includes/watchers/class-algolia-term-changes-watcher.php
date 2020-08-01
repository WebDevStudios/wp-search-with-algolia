<?php
/**
 * Algolia_Term_Changes_Watcher class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use Algolia\AlgoliaSearch\Exceptions\AlgoliaException;

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

		// Fires after an object's terms have been set.
		add_action( 'set_object_terms', array( $this, 'handle_changes' ), 10, 6 );

		// Fires after a term is deleted from the database and the cache is cleaned.
		add_action( 'delete_term', array( $this, 'on_delete_term' ), 10, 4 );
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
}
