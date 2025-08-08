<?php
/**
 * Algolia_Terms_Index class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Terms_Index
 *
 * @since 1.0.0
 */
final class Algolia_Terms_Index extends Algolia_Index {

	/**
	 * What this index contains.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	protected $contains_only = 'terms';

	/**
	 * The taxonomy for this index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $taxonomy;

	/**
	 * Algolia_Terms_Index constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $taxonomy The taxonomy for this index.
	 */
	public function __construct( $taxonomy ) {
		$this->taxonomy = (string) $taxonomy;
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
		$taxonomy = get_taxonomy( $this->taxonomy );

		return $taxonomy->labels->name;
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
		// For now we index the term if it is in use somewhere.
		$should_index = $item->count > 0;

		/**
		 * Filters whether or not to index a term.
		 *
		 * This filter is based on if it is used on at least one post.
		 *
		 * @since 1.0.0
		 *
		 * @param  bool  $should_index Whether or not the term should be indexed.
		 * @param  mixed $item         The term object.
		 * @return bool  $value        Filtered should index status.
		 */
		return (bool) apply_filters( 'algolia_should_index_term', $should_index, $item );
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
		$record                = array();
		$record['objectID']    = $item->term_id;
		$record['term_id']     = $item->term_id;
		$record['taxonomy']    = $item->taxonomy;
		$record['name']        = html_entity_decode( $item->name );
		$record['description'] = $item->description;
		$record['slug']        = $item->slug;
		$record['posts_count'] = (int) $item->count;
		if ( function_exists( 'wpcom_vip_get_term_link' ) ) {
			$record['permalink'] = wpcom_vip_get_term_link( $item );
		} else {
			$record['permalink'] = get_term_link( $item );
		}

		/**
		 * Filters the term information that will go into the Algolia object.
		 *
		 * @since 1.0.0
		 *
		 * @param  array $record Array of term information.
		 * @param  mixed $item   The term object.
		 * @return array $value  Filtered term information.
		 */
		$record = (array) apply_filters( 'algolia_term_record', $record, $item );

		/**
		 * Filters the term information that will go into the Algolia object.
		 *
		 * This is a dynamic filter with the `$item->taxonomy` portion allowing to filter for just specific taxonomies.
		 *
		 * @since 1.0.0
		 *
		 * @param  array $record Array of term information.
		 * @param  mixed $item   The term object.
		 * @return array $value  Filtered term information.
		 */
		$record = (array) apply_filters( 'algolia_term_' . $item->taxonomy . '_record', $record, $item );

		return array( $record );
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
		return (int) wp_count_terms( $this->taxonomy );
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
			'searchableAttributes' => array(
				'unordered(name)',
				'unordered(description)',
			),
			'customRanking'        => array(
				'desc(posts_count)',
			),
		);

		/**
		 * Filters the settings for the terms index settings.
		 *
		 * @since 1.0.0
		 *
		 * @param  array  $settings Array of settings to use for the index.
		 * @param  string $taxonomy Taxonomy slug for the current term.
		 * @return array  $value    Filtered index settings.
		 */
		$settings = (array) apply_filters( 'algolia_terms_index_settings', $settings, $this->taxonomy );

		/**
		 * Filters the settings for the terms index settings.
		 *
		 * This is a dynamic filter with the `$item->taxonomy` portion allowing to filter for just specific taxonomies.
		 *
		 * @since 1.0.0
		 *
		 * @param  array $settings Array of settings to use for the index
		 * @return array $value    Filtered index settings.
		 */
		$settings = (array) apply_filters( 'algolia_terms_' . $this->taxonomy . '_index_settings', $settings );

		/**
		 * Replacing `attributesToIndex` with `searchableAttributes` as
		 * it has been replaced by Algolia.
		 *
		 * @link  https://www.algolia.com/doc/api-reference/api-parameters/searchableAttributes/
		 * @since 2.2.0
		 */
		if (
			array_key_exists( 'attributesToIndex', $settings )
			&& is_array( $settings['attributesToIndex'] )
		) {
			$settings['searchableAttributes'] = array_merge(
				$settings['searchableAttributes'],
				$settings['attributesToIndex']
			);
			unset( $settings['attributesToIndex'] );
		}

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

		/**
		 * Filters the terms index synonyms to use.
		 *
		 * @since 1.0.0
		 *
		 * @param  array $value Array of synonyms to use. Default empty array.
		 * @return array $value Filtered array of synonyms.
		 */
		return (array) apply_filters( 'algolia_terms_index_synonyms', array() );
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
		return 'terms_' . $this->taxonomy;
	}


	/**
	 * Get items.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int   $page         The page.
	 * @param int   $batch_size   The batch size.
	 * @param array $specific_ids Array of terms to retrieve and index.
	 *
	 * @return array
	 */
	protected function get_items( $page, $batch_size, $specific_ids = [] ) {
		$offset = $batch_size * ( $page - 1 );

		$args = [
			'taxonomy'   => $this->taxonomy,
			'order'      => 'ASC',
			'orderby'    => 'id',
			'offset'     => $offset,
			'number'     => $batch_size,
			'hide_empty' => false, // Let users choose what to index.
		];

		if ( ! empty( $specific_ids ) && is_array( $specific_ids ) ) {
			$args['include'] = $specific_ids;
		}

		return get_terms( $args );
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
		return isset( $item->term_id )
			&& is_int( $item->term_id )
			&& isset( $item->taxonomy )
			&& $item->taxonomy === $this->taxonomy;
	}

	/**
	 * Get default autocomplete config.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return array Autocomplete config.
	 */
	public function get_default_autocomplete_config() {
		$default_config = parent::get_default_autocomplete_config();
		$index_name     = $this->get_name();

		/**
		 * Filters the autocomplete debounce option for this index.
		 *
		 * @since 2.10.0
		 *
		 * @param int Debounce value in milliseconds.
		 */
		$debounce = apply_filters(
			"algolia_autocomplete_debounce_{$index_name}",
			$default_config['debounce']
		);

		$config = array(
			'position'        => 20,
			'max_suggestions' => 3,
			'debounce'        => $debounce,
			'tmpl_suggestion' => 'autocomplete-term-suggestion',
		);

		return array_merge( $default_config, $config );
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
		$this->get_index()->deleteObject( $item->term_id );
	}
}
