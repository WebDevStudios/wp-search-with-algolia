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

		$record = (array) apply_filters( 'algolia_term_record', $record, $item );
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
			'attributesToIndex' => array(
				'unordered(name)',
				'unordered(description)',
			),
			'customRanking'     => array(
				'desc(posts_count)',
			),
		);

		$settings = (array) apply_filters( 'algolia_terms_index_settings', $settings, $this->taxonomy );
		$settings = (array) apply_filters( 'algolia_terms_' . $this->taxonomy . '_index_settings', $settings );

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
	 * @param int $page       The page.
	 * @param int $batch_size The batch size.
	 *
	 * @return array
	 */
	protected function get_items( $page, $batch_size ) {
		$offset = $batch_size * ( $page - 1 );

		$args = array(
			'order'      => 'ASC',
			'orderby'    => 'id',
			'offset'     => $offset,
			'number'     => $batch_size,
			'hide_empty' => false, // Let users choose what to index.
		);

		// We use prior to 4.5 syntax for BC purposes.
		return get_terms( $this->taxonomy, $args );
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
	 * @return array
	 */
	public function get_default_autocomplete_config() {
		$config = array(
			'position'        => 20,
			'max_suggestions' => 3,
			'tmpl_suggestion' => 'autocomplete-term-suggestion',
		);

		return array_merge( parent::get_default_autocomplete_config(), $config );
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
