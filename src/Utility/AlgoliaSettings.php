<?php
/**
 * AlgoliaSettings class file.
 *
 * @author WebDevStudios <contact@webdevstudios.com>
 * @since  2.0.0
 *
 * @package WebDevStudios\WPSWA\Utility
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Class AlgoliaSettings
 *
 * @since  2.0.0
 */
class AlgoliaSettings {

	/**
	 * The Algolia Application ID.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $app_id = '';

	/**
	 * The Algolia Admin API Key.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $api_key = '';

	/**
	 * The Algolia Search API Key.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $search_key = '';

	/**
	 * The Algolia Index Name Prefix.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $index_prefix = '';

	/**
	 * The Powered By Algolia setting.
	 *
	 * @since 2.0.0
	 *
	 * @var string
	 */
	protected $powered_by_enabled = '';

	/**
	 * AlgoliaSettings constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function __construct() {
		$this->initialize_options();
		$this->set_options();
	}

	/**
	 * Initialize options.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	protected function initialize_options() {
		add_option( 'algolia_application_id', '', '', 'no' );
		add_option( 'algolia_search_api_key', '', '', 'no' );
		add_option( 'algolia_api_key', '', '', 'no' );
		add_option( 'algolia_synced_indices_ids', [], '', 'no' );
		add_option( 'algolia_autocomplete_enabled', 'no', '', 'no' );
		add_option( 'algolia_autocomplete_config', [], '', 'no' );
		add_option( 'algolia_override_native_search', 'native', '', 'no' );
		add_option( 'algolia_index_name_prefix', 'wp_', '', 'no' );
		add_option( 'algolia_api_is_reachable', 'no', '', 'no' );
		add_option( 'algolia_powered_by_enabled', 'yes', '', 'no' );
	}

	/**
	 * Set the options.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	protected function set_options() {
		/**
		 * The Algolia Application ID.
		 *
		 * The Algolia PHP Search Client v 2
		 * allows setting an ALGOLIA_APP_ID constant.
		 *
		 * Be aware that the 1.x version of the client did not have this constant,
		 * and the 1.x of the plugin used ALGOLIA_APPLICATION_ID instead.
		 *
		 * @since  2.0.0
		 *
		 * @var string app_id
		 */
		if ( defined( 'ALGOLIA_APP_ID' ) && ! empty( ALGOLIA_APP_ID ) ) {
			$this->app_id = ALGOLIA_APP_ID;
		} elseif ( defined( 'ALGOLIA_APPLICATION_ID' ) && ! empty( ALGOLIA_APPLICATION_ID ) ) {
			$this->app_id = ALGOLIA_APPLICATION_ID;
		} else {
			$this->app_id = get_option( 'algolia_application_id', '' );
		}

		/**
		 * The Algolia Admin API Key.
		 *
		 * The Algolia PHP Search Client v 2
		 * allows setting an ALGOLIA_API_KEY constant.
		 *
		 * Be aware that the 1.x version of the client did not have this constant,
		 * and the 1.x version of the plugin did use ALGOLIA_API_KEY.
		 *
		 * @since  2.0.0
		 *
		 * @var string api_key
		 */
		$this->api_key = ( defined( 'ALGOLIA_API_KEY' ) && ! empty( ALGOLIA_API_KEY ) )
			? ALGOLIA_API_KEY
			: get_option( 'algolia_api_key', '' );

		/**
		 * The Algolia Search API Key.
		 *
		 * Overridable via the ALGOLIA_SEARCH_API_KEY constant.
		 * This constant is not specific to the Algolia PHP Search Client.
		 *
		 * Be aware that neither the 1.x nor 2.x client use this constant,
		 * but the 1.x version of the plugin did use ALGOLIA_SEARCH_API_KEY.
		 *
		 * @since  2.0.0
		 *
		 * @var string search_key
		 */
		$this->search_key = defined( 'ALGOLIA_SEARCH_API_KEY' ) && ! empty( ALGOLIA_SEARCH_API_KEY )
			? ALGOLIA_SEARCH_API_KEY
			: get_option( 'algolia_search_api_key', '' );

		/**
		 * The Algolia Index Name Prefix.
		 *
		 * Overridable via the ALGOLIA_INDEX_NAME_PREFIX constant.
		 * This constant is not specific to the Algolia PHP Search Client.
		 *
		 * Be aware that neither the 1.x nor 2.x client use this constant,
		 * but the 1.x version of the plugin did use ALGOLIA_INDEX_NAME_PREFIX.
		 *
		 * @since  2.0.0
		 *
		 * @var string index_prefix
		 */
		$this->index_prefix = defined( 'ALGOLIA_INDEX_NAME_PREFIX' ) && ! empty( ALGOLIA_INDEX_NAME_PREFIX )
			? ALGOLIA_INDEX_NAME_PREFIX
			: get_option( 'algolia_index_name_prefix', '' );

		$this->powered_by_enabled = get_option( 'algolia_powered_by_enabled', 'yes' );
	}

	/**
	 * Get the Algolia Application ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return string
	 */
	public function get_app_id(): string {
		return $this->app_id;
	}

	/**
	 * Is the Algolia Application ID defined in WP-Config?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function is_app_id_in_config(): bool {
		return defined( 'ALGOLIA_APP_ID' )
			&& ! empty( ALGOLIA_APP_ID )
			|| defined( 'ALGOLIA_APPLICATION_ID' )
			&& ! empty( ALGOLIA_APPLICATION_ID );
	}

	/**
	 * Get the Algolia Admin API Key.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return string
	 */
	public function get_api_key(): string {
		return $this->api_key;
	}

	/**
	 * Is the Algolia Admin API Key defined in WP-Config?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function is_api_key_in_config(): bool {
		return defined( 'ALGOLIA_API_KEY' );
	}

	/**
	 * Get the Algolia Search API Key.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return string
	 */
	public function get_search_key(): string {
		return $this->search_key;
	}

	/**
	 * Is the Algolia Search API Key defined in WP-Config?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function is_search_key_in_config(): bool {
		return defined( 'ALGOLIA_SEARCH_API_KEY' );
	}

	/**
	 * Get the Algolia Index Name Prefix.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return string
	 */
	public function get_index_prefix(): string {
		return $this->index_prefix;
	}

	/**
	 * Is the Index Prefix defined in WP-Config?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function is_index_prefix_in_config(): bool {
		return defined( 'ALGOLIA_INDEX_NAME_PREFIX' );
	}

	/**
	 * Get the Powered By Algolia Enabled setting.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return string
	 */
	public function powered_by_enabled() {
		return $this->powered_by_enabled;
	}
}
