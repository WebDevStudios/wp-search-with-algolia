<?php
/**
 * Algolia_Search class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use Algolia\AlgoliaSearch\Exceptions\AlgoliaException;

/**
 * Class Algolia_Search
 *
 * @since 1.0.0
 */
class Algolia_Search {

	/**
	 * Current page hits.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var array
	 */
	private $current_page_hits = [];

	/**
	 * Total hits.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var int
	 */
	private $total_hits;

	/**
	 * Instance of Algolia_Index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Algolia_Index
	 */
	private $index;

	/**
	 * Algolia_Search constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param Algolia_Index $index Instance of Algolia_Index.
	 */
	public function __construct( Algolia_Index $index ) {
		$this->index = $index;

		add_action( 'loop_start', [ $this, 'begin_highlighting' ] );
		add_action( 'pre_get_posts', array( $this, 'pre_get_posts' ) );
		add_action( 'wp_head', [ $this, 'output_highlighting_bundled_styles' ] );
	}

	/**
	 * Determines if we should filter the query passed as argument.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Query $query The WP_Query to check.
	 *
	 * @return bool
	 */
	private function should_filter_query( WP_Query $query ) {
		$should_filter = ! $query->is_admin && $query->is_search() && $query->is_main_query();

		/**
		 * Allow developers to override the return value of `should_filter_query()`.
		 *
		 * @since  1.3.0
		 *
		 * @param bool     $should_filter Whether Algolia should filter the search query.
		 * @param WP_Query $query         The WP_Query that was tested for Algolia Search filtering.
		 */
		return (bool) apply_filters(
			'algolia_should_filter_query',
			$should_filter,
			$query
		);
	}

	/**
	 * We force the WP_Query to only return records according to Algolia's ranking.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Query $query The WP_Query being filtered.
	 *
	 * @return void
	 */
	public function pre_get_posts( WP_Query $query ) {
		if ( ! $this->should_filter_query( $query ) ) {
			return;
		}

		$current_page = 1;
		if ( get_query_var( 'paged' ) ) {
			$current_page = get_query_var( 'paged' );
		} elseif ( get_query_var( 'page' ) ) {
			$current_page = get_query_var( 'page' );
		}

		/**
		 * Filters the array of parameters used in the Algolia Index search.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.0.0
		 * @since  1.2.0 Introduced 'highlightPreTag' and 'highlightPostTag` parameters.
		 *
		 * @param array $params {
		 *     Search parameters for the Algolia Index search.
		 *
		 *     @type string $attributesToRetrieve Which attributes to retrieve.
		 *     @type int    $hitsPerPage          Pagination parameter. The number of hits per page to retrieve.
		 *     @type int    $page                 Pagination parameter. The page of results to retrieve.
		 *     @type string $highlightPreTag      HTML string to insert before highlights in result snippets.
		 *     @type string $highlightPostTag     HTML string to insert after highlights in result snippets.
		 * }
		 */
		$params = apply_filters(
			'algolia_search_params',
			array(
				'attributesToRetrieve' => 'post_id',
				'hitsPerPage'          => (int) get_option( 'posts_per_page' ),
				'page'                 => $current_page - 1, // Algolia pages are zero indexed.
				'highlightPreTag'      => '<em class="algolia-search-highlight">',
				'highlightPostTag'     => '</em>',
			)
		);

		$order_by = apply_filters( 'algolia_search_order_by', null );
		$order    = apply_filters( 'algolia_search_order', 'desc' );

		try {
			$results = $this->index->search( $query->query['s'], $params, $order_by, $order );
		} catch ( AlgoliaException $exception ) {
			error_log( $exception->getMessage() ); // phpcs:ignore -- Legacy.

			return;
		}

		add_filter( 'found_posts', array( $this, 'found_posts' ), 10, 2 );
		add_filter( 'posts_search', array( $this, 'posts_search' ), 10, 2 );

		// Store the current page hits, so that we can use them for highlighting later on.
		foreach ( $results['hits'] as $hit ) {
			$this->current_page_hits[ $hit['post_id'] ] = $hit;
		}

		// Store the total number of its, so that we can hook into the `found_posts`.
		// This is useful for pagination.
		$this->total_hits = $results['nbHits'];

		$post_ids = array();
		foreach ( $results['hits'] as $result ) {
			$post_ids[] = $result['post_id'];
		}

		// Make sure there are not results by tricking WordPress in trying to find
		// a non existing post ID.
		// Otherwise, the query returns all the results.
		if ( empty( $post_ids ) ) {
			$post_ids = array( 0 );
		}

		$query->set( 'posts_per_page', $params['hitsPerPage'] );
		$query->set( 'offset', 0 );

		$post_types = 'any';

		$maybe_post_type = filter_input( INPUT_GET, 'post_type', FILTER_SANITIZE_STRING );

		if ( ! empty( $maybe_post_type ) ) {
			$post_type = get_post_type_object( $maybe_post_type );
			if ( null !== $post_type ) {
				$post_types = $post_type->name;
			}
		}

		$query->set( 'post_type', $post_types );
		$query->set( 'post__in', $post_ids );
		$query->set( 'orderby', 'post__in' );

		// @todo: This actually still excludes trash and auto-drafts.
		$query->set( 'post_status', 'any' );
	}

	/**
	 * This hook returns the actual real number of results available in Algolia.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param int      $found_posts The number of posts found.
	 * @param WP_Query $query       The WP_Query instance (passed by reference).
	 *
	 * @return int
	 */
	public function found_posts( $found_posts, WP_Query $query ) {
		return $this->should_filter_query( $query ) ? $this->total_hits : $found_posts;
	}

	/**
	 * Filter the search SQL that is used in the WHERE clause of WP_Query.
	 * Removes the where Like part of the queries as we consider Algolia as being the source of truth.
	 * We don't want to filter by anything but the actual list of post_ids resulting
	 * from the Algolia search.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string   $search Search SQL for WHERE clause.
	 * @param WP_Query $query  The current WP_Query object.
	 *
	 * @return string
	 */
	public function posts_search( $search, WP_Query $query ) {
		return $this->should_filter_query( $query ) ? '' : $search;
	}

	/**
	 * Output the bundled styles for highlighting search result matches, if enabled.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return void
	 */
	public function output_highlighting_bundled_styles() {
		if ( ! $this->highlighting_enabled() ) {
			return;
		}

		if ( ! apply_filters( 'algolia_search_highlighting_enable_bundled_styles', true ) ) {
			return;
		}

		?>
		<style>
			.algolia-search-highlight {
				background-color: #fffbcc;
				border-radius: 2px;
				font-style: normal;
			}
		</style>
		<?php
	}

	/**
	 * Begin highlighting search result matches, if enabled.
	 *
	 * This method is called on the loop_start action, where we want to begin highlighting search result matches.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Query $query The WP_Query.
	 *
	 * @return void
	 */
	public function begin_highlighting( $query ) {
		if ( ! $this->should_filter_query( $query ) ) {
			return;
		}

		if ( ! $this->highlighting_enabled() ) {
			return;
		}

		add_filter( 'the_title', [ $this, 'highlight_the_title' ], 10, 2 );
		add_filter( 'get_the_excerpt', [ $this, 'highlight_get_the_excerpt' ], 10, 2 );

		add_action( 'loop_end', [ $this, 'end_highlighting' ] );
	}

	/**
	 * Stop highlighting search result matches.
	 *
	 * This method is called on the loop_end action, where we want to stop highlighting search result matches.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param WP_Query $query The WP_Query.
	 */
	public function end_highlighting( $query ) {
		remove_filter( 'the_title', [ $this, 'highlight_the_title' ], 10 );
		remove_filter( 'get_the_excerpt', [ $this, 'highlight_get_the_excerpt' ], 10 );

		remove_action( 'loop_end', [ $this, 'end_highlighting' ] );
	}

	/**
	 * Filter the_title, replacing it with the highlighted title from the Algolia index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $title   The title string.
	 * @param int    $post_id The post ID.
	 *
	 * @return string
	 */
	public function highlight_the_title( $title, $post_id ) {
		$highlighted_title = $this->current_page_hits[ $post_id ]['_highlightResult']['post_title']['value'] ?? null;

		if ( ! empty( $highlighted_title ) ) {
			$title = $highlighted_title;
		}

		return $title;
	}

	/**
	 * Filter get_the_excerpt, replacing it with the highlighted excerpt from the Algolia index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string  $excerpt The excerpt string.
	 * @param WP_Post $post    The post object.
	 *
	 * @return string
	 */
	public function highlight_get_the_excerpt( $excerpt, $post ) {
		$highlighted_excerpt = $this->current_page_hits[ $post->ID ]['_snippetResult']['content']['value'] ?? null;

		if ( ! empty( $highlighted_excerpt ) ) {
			$excerpt = $highlighted_excerpt;
		}

		return $excerpt;
	}

	/**
	 * Determine whether highlighting is enabled.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return bool
	 */
	private function highlighting_enabled() : bool {
		return apply_filters( 'algolia_search_highlighting_enabled', true );
	}
}
