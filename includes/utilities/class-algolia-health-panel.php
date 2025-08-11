<?php
/**
 * Algolia_Health_Panel class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.10.0
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Health_Panel
 *
 * @since 2.10.0
 */
class Algolia_Health_Panel {

	/**
	 * The Algolia Plugin.
	 *
	 * @since   2.10.0
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Constructor.
	 *
	 * @param Algolia_Plugin $plugin The Algolia Plugin instance.
	 */
	public function __construct( Algolia_Plugin $plugin ) {
		$this->plugin = $plugin;

		add_filter( 'debug_information', [ $this, 'health_panel' ], 1 );
	}

	/**
	 * Add a Site Health panel for our plugin.
	 *
	 * @since 2.10.0
	 * @param array $debug_info The debug information array to filter.
	 *
	 * @return array
	 */
	public function health_panel( array $debug_info ) {

		$set_constants = [];
		foreach ( $this->get_constants() as $constant ) {
			$set_constants[ $constant ] = defined( $constant ) ? 'constant' : 'db/default';
		}

		$debug_info['wp-search-with-algolia'] = [
			'label'       => esc_html__( 'WP Search with Algolia', 'wp-search-with-algolia' ),
			'description' => esc_html__( 'Debugging and troubleshooting information for support purposes', 'wp-search-with-algolia' ),
			'fields'      => [
				[
					'label' => esc_html__( 'Constants', 'wp-search-with-algolia' ),
					'value' => $set_constants,
				],
				[
					'label' => 'Reachable API',
					'value' => $this->plugin->get_settings()->get_api_is_reachable() ? 'true' : 'false',
				],
				[
					'label' => 'Searchable Posts Index Enabled',
					'value' => $this->plugin->get_index( 'searchable_posts' )->is_enabled() ? 'true' : 'false',
				],
				[
					'label' => 'Autocomplete Enabled',
					'value' => $this->plugin->get_settings()->get_autocomplete_enabled() ? 'true' : 'false',
				],
			],
		];

		return $debug_info;
	}

	/**
	 * Return an array of constants to check set status for.
	 *
	 * @since 2.10.0
	 *
	 * @return array
	 */
	protected function get_constants() : array {
		return [
			'ALGOLIA_HIDE_HELP_NOTICES',
			'ALGOLIA_SPLIT_POSTS',
			'ALGOLIA_CONTENT_MAX_SIZE',
			'ALGOLIA_APPLICATION_ID',
			'ALGOLIA_SEARCH_API_KEY',
			'ALGOLIA_API_KEY',
			'ALGOLIA_INDEX_NAME_PREFIX',
		];
	}
}
