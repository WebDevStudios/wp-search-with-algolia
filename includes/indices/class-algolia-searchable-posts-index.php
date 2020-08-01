<?php
/**
 * Algolia_Searchable_Posts_Index class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Searchable_Posts_Index
 *
 * @since 1.0.0
 */
final class Algolia_Searchable_Posts_Index extends Algolia_Index {

	/**
	 * What this index contains.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	protected $contains_only = 'posts';

	/**
	 * Array of post types for the searchable posts index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var array
	 */
	private $post_types;

	/**
	 * Algolia_Searchable_Posts_Index constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param array $post_types The post types.
	 */
	public function __construct( array $post_types ) {
		$this->post_types = $post_types;
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
	public function supports( $item ) {
		return $item instanceof WP_Post && in_array( $item->post_type, $this->post_types, true );
	}

	/**
	 * Get the admin name for this index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string The name displayed in the admin UI.
	 */
	public function get_admin_name() {
		return __( 'All posts', 'wp-search-with-algolia' );
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
	protected function should_index( $item ) {
		return $this->should_index_post( $item );
	}

	/**
	 * Check if the post should be indexed.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Post $post The post to check.
	 *
	 * @return bool
	 */
	private function should_index_post( WP_Post $post ) {
		$should_index = 'publish' === $post->post_status && empty( $post->post_password );

		return (bool) apply_filters( 'algolia_should_index_searchable_post', $should_index, $post );
	}

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
	protected function get_records( $item ) {
		return $this->get_post_records( $item );
	}

	/**
	 * Get records for the post.
	 *
	 * Turns a WP_Post in a collection of records to be pushed to Algolia.
	 * Given every single post is splitted into several Algolia records,
	 * we also attribute an objectID that follows a naming convention for
	 * every record.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Post $post The post to get records for.
	 *
	 * @return array
	 */
	private function get_post_records( WP_Post $post ) {
		$shared_attributes = $this->get_post_shared_attributes( $post );

		$removed = remove_filter( 'the_content', 'wptexturize', 10 );

		$post_content = apply_filters( 'algolia_searchable_post_content', $post->post_content, $post );
		$post_content = apply_filters( 'the_content', $post_content ); // phpcs:ignore -- Legitimate use of Core hook.

		if ( true === $removed ) {
			add_filter( 'the_content', 'wptexturize', 10 );
		}

		$post_content = Algolia_Utils::prepare_content( $post_content );
		$parts        = Algolia_Utils::explode_content( $post_content );

		if ( defined( 'ALGOLIA_SPLIT_POSTS' ) && false === ALGOLIA_SPLIT_POSTS ) {
			$parts = array( array_shift( $parts ) );
		}

		$records = array();
		foreach ( $parts as $i => $part ) {
			$record                 = $shared_attributes;
			$record['objectID']     = $this->get_post_object_id( $post->ID, $i );
			$record['content']      = $part;
			$record['record_index'] = $i;
			$records[]              = $record;
		}

		$records = (array) apply_filters( 'algolia_searchable_post_records', $records, $post );
		$records = (array) apply_filters( 'algolia_searchable_post_' . $post->post_type . '_records', $records, $post );

		return $records;
	}

	/**
	 * Get post shared attributes.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Post $post The post to get shared attributes for.
	 *
	 * @return array
	 *
	 * @throws RuntimeException If post type information unknown.
	 */
	private function get_post_shared_attributes( WP_Post $post ) {
		$shared_attributes              = array();
		$shared_attributes['post_id']   = $post->ID;
		$shared_attributes['post_type'] = $post->post_type;

		$post_type = get_post_type_object( $post->post_type );
		if ( null === $post_type ) {
			throw new RuntimeException( 'Unable to fetch the post type information.' );
		}
		$shared_attributes['post_type_label']     = $post_type->labels->name;
		$shared_attributes['post_title']          = $post->post_title;
		$shared_attributes['post_excerpt']        = apply_filters( 'the_excerpt', $post->post_excerpt ); // phpcs:ignore -- Legitimate use of Core hook.
		$shared_attributes['post_date']           = get_post_time( 'U', false, $post );
		$shared_attributes['post_date_formatted'] = get_the_date( '', $post );
		$shared_attributes['post_modified']       = get_post_modified_time( 'U', false, $post );
		$shared_attributes['comment_count']       = (int) $post->comment_count;
		$shared_attributes['menu_order']          = (int) $post->menu_order;

		$author = get_userdata( $post->post_author );
		if ( $author ) {
			$shared_attributes['post_author'] = array(
				'user_id'      => (int) $post->post_author,
				'display_name' => $author->display_name,
				'user_url'     => $author->user_url,
				'user_login'   => $author->user_login,
			);
		}

		$shared_attributes['images'] = Algolia_Utils::get_post_images( $post->ID );

		$shared_attributes['permalink']      = get_permalink( $post );
		$shared_attributes['post_mime_type'] = $post->post_mime_type;

		// Push all taxonomies by default, including custom ones.
		$taxonomy_objects = get_object_taxonomies( $post->post_type, 'objects' );

		$shared_attributes['taxonomies']              = array();
		$shared_attributes['taxonomies_hierarchical'] = array();
		foreach ( $taxonomy_objects as $taxonomy ) {
			$terms = wp_get_object_terms( $post->ID, $taxonomy->name );
			$terms = is_array( $terms ) ? $terms : array();

			if ( $taxonomy->hierarchical ) {
				$hierarchical_taxonomy_values = Algolia_Utils::get_taxonomy_tree( $terms, $taxonomy->name );
				if ( ! empty( $hierarchical_taxonomy_values ) ) {
					$shared_attributes['taxonomies_hierarchical'][ $taxonomy->name ] = $hierarchical_taxonomy_values;
				}
			}

			$taxonomy_values = wp_list_pluck( $terms, 'name' );
			if ( ! empty( $taxonomy_values ) ) {
				$shared_attributes['taxonomies'][ $taxonomy->name ] = $taxonomy_values;
			}
		}

		$shared_attributes['is_sticky'] = is_sticky( $post->ID ) ? 1 : 0;

		$shared_attributes = (array) apply_filters( 'algolia_searchable_post_shared_attributes', $shared_attributes, $post );
		$shared_attributes = (array) apply_filters( 'algolia_searchable_post_' . $post->post_type . '_shared_attributes', $shared_attributes, $post );

		return $shared_attributes;
	}

	/**
	 * Get settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	protected function get_settings() {
		$settings = array(
			'attributesToIndex'     => array(
				'unordered(post_title)',
				'unordered(taxonomies)',
				'unordered(content)',
			),
			'customRanking'         => array(
				'desc(is_sticky)',
				'desc(post_date)',
				'asc(record_index)',
			),
			'attributeForDistinct'  => 'post_id',
			'distinct'              => true,
			'attributesForFaceting' => array(
				'taxonomies',
				'taxonomies_hierarchical',
				'post_author.display_name',
				'post_type_label',
			),
			'attributesToSnippet'   => array(
				'post_title:30',
				'content:' . intval( apply_filters( 'excerpt_length', 55 ) ), // phpcs:ignore -- Legitimate use of Core hook.
			),
			'snippetEllipsisText'   => '…',
		);

		$settings = (array) apply_filters( 'algolia_searchable_posts_index_settings', $settings );

		return $settings;
	}

	/**
	 * Get synonyms.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array
	 */
	protected function get_synonyms() {
		$synonyms = (array) apply_filters( 'algolia_searchable_posts_index_synonyms', array() );

		return $synonyms;
	}

	/**
	 * Get post object ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int $post_id      The WP_Post ID.
	 * @param int $record_index The split record index.
	 *
	 * @return string
	 */
	private function get_post_object_id( $post_id, $record_index ) {
		/**
		 * This filter is documented in includes/indices/class-algolia-posts-index.php
		 *
		 * @since 1.3.0
		 *
		 * @see Algolia_Posts_Index::get_post_object_id()
		 */
		return apply_filters(
			'algolia_get_post_object_id',
			$post_id . '-' . $record_index,
			$post_id,
			$record_index
		);
	}

	/**
	 * Update records.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item    The item to update records for.
	 * @param array $records The records.
	 */
	protected function update_records( $item, array $records ) {
		$this->update_post_records( $item, $records );
	}

	/**
	 * Update post records.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Post $post    The post to update records for.
	 * @param array   $records The records.
	 */
	private function update_post_records( WP_Post $post, array $records ) {
		// If there are no records, parent `update_records` will take care of the deletion.
		// In case of posts, we ALWAYS need to delete existing records.
		if ( ! empty( $records ) ) {
			$this->delete_item( $post );
		}

		parent::update_records( $post, $records );

		// Keep track of the new record count for future updates relying on the objectID's naming convention .
		$new_records_count = count( $records );
		$this->set_post_records_count( $post, $new_records_count );

		do_action( 'algolia_searchable_posts_index_post_updated', $post, $records );
		do_action( 'algolia_searchable_posts_index_post_' . $post->post_type . '_updated', $post, $records );
	}

	/**
	 * Get ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string
	 */
	public function get_id() {
		return 'searchable_posts';
	}

	/**
	 * Get re-index items count.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return int
	 */
	protected function get_re_index_items_count() {
		$query = new WP_Query(
			array(
				'post_type'              => $this->post_types,
				'post_status'            => 'any', // Let the `should_index` take care of the filtering.
				'suppress_filters'       => true,
				'cache_results'          => false,
				'lazy_load_term_meta'    => false,
				'update_post_term_cache' => false,
			)
		);

		return (int) $query->found_posts;
	}

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
	protected function get_items( $page, $batch_size ) {
		$query = new WP_Query(
			array(
				'post_type'              => $this->post_types,
				'posts_per_page'         => $batch_size,
				'post_status'            => 'any',
				'order'                  => 'ASC',
				'orderby'                => 'ID',
				'paged'                  => $page,
				'suppress_filters'       => true,
				'cache_results'          => false,
				'lazy_load_term_meta'    => false,
				'update_post_term_cache' => false,
			)
		);

		return $query->posts;
	}

	/**
	 * Delete item.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param mixed $item The item to delete.
	 */
	public function delete_item( $item ) {
		$this->assert_is_supported( $item );

		$records_count = $this->get_post_records_count( $item->ID );
		$object_ids    = array();
		for ( $i = 0; $i < $records_count; $i++ ) {
			$object_ids[] = $this->get_post_object_id( $item->ID, $i );
		}

		if ( ! empty( $object_ids ) ) {
			$this->get_index()->deleteObjects( $object_ids );
		}
	}

	/**
	 * Get post records count.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int $post_id The post ID.
	 *
	 * @return int
	 */
	private function get_post_records_count( $post_id ) {
		return (int) get_post_meta( (int) $post_id, 'algolia_' . $this->get_id() . '_records_count', true );
	}
	/**
	 * Get post records count.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Post $post  The post.
	 * @param int     $count The count of records.
	 */
	private function set_post_records_count( WP_Post $post, $count ) {
		update_post_meta( (int) $post->ID, 'algolia_' . $this->get_id() . '_records_count', (int) $count );
	}
}
