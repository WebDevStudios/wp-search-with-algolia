<?php
/**
 * Algolia_Index class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use Algolia\AlgoliaSearch\Exceptions\AlgoliaException;
use Algolia\AlgoliaSearch\SearchClient;
use Algolia\AlgoliaSearch\SearchIndex;

/**
 * Class Algolia_Index
 *
 * @since 1.0.0
 */
abstract class Algolia_Index {

	/**
	 * The SearchClient instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var SearchClient
	 */
	private $client;

	/**
	 * Whether this index is enabled or not.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var bool
	 */
	private $enabled = false;

	/**
	 * Index name prefix.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $name_prefix = '';

	/**
	 * What this index contains.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string|null Should be one of posts, terms or users or left null.
	 */
	protected $contains_only;

	/**
	 * Get the admin name for this index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string The name displayed in the admin UI.
	 */
	abstract public function get_admin_name();

	/**
	 * Check if this index contains the given type.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $type The type to check against.
	 *
	 * @return bool
	 */
	final public function contains_only( $type ) {
		if ( null === $this->contains_only ) {
			return false;
		}

		return $this->contains_only === $type;
	}

	/**
	 * Check if this index supports the given item.
	 *
	 * A performing function that return true if the item can potentially
	 * be subject for indexation or not. This will be used to determine if an item is part of the index
	 * As this function will be called synchronously during other operations,
	 * it has to be as lightweight as possible. No db calls or huge loops.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to check against.
	 *
	 * @return bool
	 */
	abstract public function supports( $item );

	/**
	 * Assert if the given item is supported.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to check against.
	 *
	 * @throws RuntimeException If the given item is not supported.
	 */
	public function assert_is_supported( $item ) {
		if ( ! $this->supports( $item ) ) {
			throw new RuntimeException( 'Item is no supported on this index.' );
		}
	}

	/**
	 * Set the SearchClient.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param SearchClient $client The SearchClient instance.
	 */
	final public function set_client( SearchClient $client ) {
		$this->client = $client;
	}

	/**
	 * Get the SearchClient.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return SearchClient The SearchClient instance.
	 *
	 * @throws LogicException If the SearchClient has not been set.
	 */
	final protected function get_client() {
		if ( null === $this->client ) {
			throw new LogicException( 'SearchClient has not been set.' );
		}

		return $this->client;
	}

	/**
	 * Search.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string     $query    The query.
	 * @param array|null $args     The args.
	 * @param string     $order_by The order by.
	 * @param string     $order    The order.
	 *
	 * @return array
	 */
	final public function search( $query, $args = null, $order_by = null, $order = 'desc' ) {

		if ( null !== $order_by ) {
			return $this->search_in_replica( $query, $args, $order_by, $order );
		}

		return $this->get_index()->search( $query, $args );
	}

	/**
	 * Search in replica.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $query    The query.
	 * @param array  $args     The args.
	 * @param string $order_by The order by.
	 * @param string $order    The order.
	 *
	 * @return array
	 */
	private function search_in_replica( $query, $args, $order_by, $order = 'desc' ) {
		$replica      = $this->get_replica( $order_by, $order );
		$replica_name = $replica->get_replica_index_name( $this );

		$index = $this->client->initIndex( $replica_name );

		return $index->search( $query, $args );
	}

	/**
	 * Get replica.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $attribute_name The attribute name.
	 * @param string $order          The order.
	 *
	 * @return Algolia_Index_Replica
	 *
	 * @throws RuntimeException If the replica can't be found.
	 */
	private function get_replica( $attribute_name, $order ) {
		$replicas = $this->get_replicas();
		/**
		 * Loop over the replicas.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.0.0
		 *
		 * @var Algolia_Index_Replica $replica
		 */
		foreach ( $replicas as $replica ) {
			if ( $replica->get_attribute_name() === $attribute_name && $replica->get_order() === $order ) {
				return $replica;
			}
		}

		throw new RuntimeException( sprintf( 'Unable to find replica for attribute "%s" with order "%s".', $attribute_name, $order ) );
	}

	/**
	 * Set enabled.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param bool $flag Enabled or not.
	 */
	final public function set_enabled( $flag ) {
		$this->enabled = (bool) $flag;
	}

	/**
	 * Check if this index is enabled.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return bool
	 */
	final public function is_enabled() {
		return $this->enabled;
	}

	/**
	 * Set the index name prefix.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $prefix The prefix to set.
	 */
	final public function set_name_prefix( $prefix ) {
		$this->name_prefix = (string) $prefix;
	}

	/**
	 * Sync item.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to sync.
	 *
	 * @return void
	 */
	public function sync( $item ) {
		$this->assert_is_supported( $item );
		if ( $this->should_index( $item ) ) {
			do_action( 'algolia_before_get_records', $item );
			$records = $this->get_records( $item );
			do_action( 'algolia_after_get_records', $item );

			$this->update_records( $item, $records );
			return;
		}

		$this->delete_item( $item );
	}

	/**
	 * Check if the item should be indexed.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to check.
	 *
	 * @return bool
	 */
	abstract protected function should_index( $item );

	/**
	 * Get records for the item.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to get records for.
	 *
	 * @return array
	 */
	abstract protected function get_records( $item );

	/**
	 * Update records.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item    The item to update records for.
	 * @param array $records The records.
	 *
	 * @return void
	 */
	protected function update_records( $item, array $records ) {
		if ( empty( $records ) ) {
			$this->delete_item( $item );
			return;
		}

		$index   = $this->get_index();
		$records = $this->sanitize_json_data( $records );
		$index->saveObjects( $records );
	}

	/**
	 * Get index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return SearchIndex
	 */
	public function get_index() {
		return $this->client->initIndex( (string) $this->get_name() );
	}

	/**
	 * Get name.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string|null $prefix The prefix.
	 *
	 * @return string
	 */
	public function get_name( $prefix = null ) {
		if ( null === $prefix ) {
			$prefix = $this->name_prefix;
		}

		return $prefix . $this->get_id();
	}

	/**
	 * Re index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int $page Page of the index.
	 *
	 * @throws InvalidArgumentException If the page is less than 1.
	 */
	public function re_index( $page ) {
		$page = (int) $page;

		if ( $page < 1 ) {
			throw new InvalidArgumentException( 'Page should be superior to 0.' );
		}

		if ( 1 === $page ) {
			$this->create_index_if_not_existing();
		}

		$batch_size = (int) $this->get_re_index_batch_size();
		if ( $batch_size < 1 ) {
			throw new InvalidArgumentException( 'Re-index batch size can not be lower than 1.' );
		}

		$items_count = $this->get_re_index_items_count();

		$max_num_pages = (int) max( ceil( $items_count / $batch_size ), 1 );

		$items = $this->get_items( $page, $batch_size );

		$records = array();
		foreach ( $items as $item ) {
			if ( ! $this->should_index( $item ) ) {
				$this->delete_item( $item );
				continue;
			}

			do_action( 'algolia_before_get_records', $item );
			$item_records = $this->get_records( $item );
			$records      = array_merge( $records, $item_records );
			do_action( 'algolia_after_get_records', $item );

			$this->update_records( $item, $item_records );
		}

		if ( ! empty( $records ) ) {
			$index = $this->get_index();

			$records = $this->sanitize_json_data( $records );

			$index->saveObjects( $records );
		}

		if ( $page === $max_num_pages ) {
			do_action( 'algolia_re_indexed_items', $this->get_id() );
		}
	}

	/**
	 * Create index if it doesn't exist.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param bool $clear_if_existing Whether to clear an existing index or not.
	 */
	public function create_index_if_not_existing( $clear_if_existing = true ) {
		$index = $this->get_index();

		try {
			$index->getSettings();
			$index_exists = true;
		} catch ( AlgoliaException $exception ) {
			$index_exists = false;
		}

		if ( true === $index_exists ) {

			/**
			 * Allow developers to skip clearing the index.
			 *
			 * @since 1.3.0
			 *
			 * @param bool   $clear_if_existing Whether to clear the existing index or not.
			 * @param string $index_id          The index ID without prefix.
			 */
			$clear_if_existing = (bool) apply_filters(
				'algolia_clear_index_if_existing',
				$clear_if_existing,
				$this->get_id()
			);

			if ( true === $clear_if_existing ) {
				$index->clearObjects();
			}

			$force_settings_update = (bool) apply_filters( 'algolia_should_force_settings_update', false, $this->get_id() );

			/*
			 * No need to go further in this case.
			 * We don't change anything when the index already exists.
			 * This means that to override, or go back to default settings you have to
			 * clear the index and re-index again or use the
			 * 'algolia_force_settings_update' filter to force a settings update.
			 */
			if ( false === $force_settings_update ) {
				return;
			}
		}

		$this->push_settings();
	}

	/**
	 * Push settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function push_settings() {
		$index = $this->get_index();

		// This will create the index if it does not exist.
		$settings = $this->get_settings();
		$index->setSettings( $settings );

		// Push synonyms.
		$synonyms = $this->get_synonyms();
		if ( ! empty( $synonyms ) ) {
			$index->saveSynonyms( $synonyms );
		}

		$this->sync_replicas();
	}

	/**
	 * Sanitize JSON data.
	 *
	 * Sanitize data to allow non UTF-8 content to pass.
	 * Here we use a private function introduced in WP 4.1.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $data Variable (usually an array or object) to encode as JSON.
	 *
	 * @return mixed The sanitized data that shall be encoded to JSON.
	 *
	 * @throws Exception If depth is less than zero.
	 */
	protected function sanitize_json_data( $data ) {
		if ( function_exists( '_wp_json_sanity_check' ) ) {
			return _wp_json_sanity_check( $data, 512 );
		}

		return $data;
	}

	/**
	 * Get re-index items count.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return int
	 */
	abstract protected function get_re_index_items_count();

	/**
	 * Check if this is the last page to re-index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int $page The page to check.
	 *
	 * @return bool
	 */
	protected function is_last_page_to_re_index( $page ) {
		return (int) $page >= $this->get_re_index_max_num_pages();
	}

	/**
	 * Get the max number of pages for re-indexing.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return int
	 */
	public function get_re_index_max_num_pages() {
		$items_count = $this->get_re_index_items_count();

		return (int) ceil( $items_count / $this->get_re_index_batch_size() );
	}

	/**
	 * De-index items.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function de_index_items() {
		$index_name = $this->get_name();
		$this->client->deleteIndex( $index_name );

		do_action( 'algolia_de_indexed_items', $this->get_id() );
	}

	/**
	 * Get re-index batch size.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return int
	 */
	protected function get_re_index_batch_size() {
		$batch_size = (int) apply_filters( 'algolia_indexing_batch_size', 100 );
		$batch_size = (int) apply_filters( 'algolia_' . $this->get_id() . '_indexing_batch_size', $batch_size );

		return $batch_size;
	}

	/**
	 * Get settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	abstract protected function get_settings();

	/**
	 * Get synonyms.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	abstract protected function get_synonyms();

	/**
	 * Get ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string
	 */
	abstract public function get_id();

	/**
	 * Get items.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int $page       The page.
	 * @param int $batch_size The batch size.
	 *
	 * @return array
	 */
	abstract protected function get_items( $page, $batch_size );

	/**
	 * Get default autocomplete config.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	public function get_default_autocomplete_config() {
		return array(
			'index_id'        => $this->get_id(),
			'index_name'      => $this->get_name(),
			'label'           => $this->get_admin_name(),
			'admin_name'      => $this->get_admin_name(),
			'position'        => 10,
			'max_suggestions' => 5,
			'tmpl_suggestion' => 'autocomplete-post-suggestion',
		);
	}

	/**
	 * To array method.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	public function to_array() {
		$replicas = $this->get_replicas();

		$items = array();
		foreach ( $replicas as $replica ) {
			$items[] = array(
				'name' => $replica->get_replica_index_name( $this ),
			);
		}

		return array(
			'name'     => $this->get_name(),
			'id'       => $this->get_id(),
			'enabled'  => $this->enabled,
			'replicas' => $items,
		);
	}

	/**
	 * Get replicas.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	public function get_replicas() {
		$replicas = (array) apply_filters( 'algolia_index_replicas', array(), $this );
		$replicas = (array) apply_filters( 'algolia_' . $this->get_id() . '_index_replicas', $replicas, $this );

		$filtered = array();
		// Filter out invalid inputs.
		foreach ( $replicas as $replica ) {
			if ( ! $replica instanceof Algolia_Index_Replica ) {
				continue;
			}
			$filtered[] = $replica;
		}

		return $filtered;
	}

	/**
	 * Sync replicas.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	private function sync_replicas() {
		$replicas = $this->get_replicas();
		if ( empty( $replicas ) ) {
			// No need to go further if there are no replicas!
			return;
		}

		$replica_index_names = array();

		/**
		 * Loop over the replicas.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.0.0
		 *
		 * @var Algolia_Index_Replica $replica
		 */
		foreach ( $replicas as $replica ) {
			$replica_index_names[] = $replica->get_replica_index_name( $this );
		}

		$this->get_index()->setSettings(
			array(
				'replicas' => $replica_index_names,
			)
		);

		$client = $this->get_client();

		// Ensure we re-push the master index settings each time.
		$settings = $this->get_settings();

		/**
		 * Loop over the replicas.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.0.0
		 *
		 * @var Algolia_Index_Replica $replica
		 */
		foreach ( $replicas as $replica ) {
			$settings['ranking'] = $replica->get_ranking();
			$replica_index_name  = $replica->get_replica_index_name( $this );
			$index               = $client->initIndex( $replica_index_name );
			$index->setSettings( $settings );
		}
	}

	/**
	 * Delete item.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to delete.
	 */
	abstract public function delete_item( $item );

	/**
	 * Check if the index exists in Algolia.
	 *
	 * Returns true if the index exists in Algolia.
	 * false otherwise.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return bool
	 *
	 * @throws AlgoliaException If the index does not exist in Algolia.
	 */
	public function exists() {
		try {
			$this->get_index()->getSettings();
		} catch ( AlgoliaException $exception ) {
			if ( $exception->getMessage() === 'Index does not exist' ) {
				return false;
			}

			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.

			return false;
		}

		return true;
	}

	/**
	 * Clear the index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function clear() {
		$this->get_index()->clearObjects();
	}
}
