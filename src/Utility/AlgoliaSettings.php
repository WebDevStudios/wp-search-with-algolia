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
	public $app_id = '';

	/**
	 * The Algolia Admin API Key.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	public $api_key = '';

	/**
	 * The Algolia Search API Key.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	public $search_key = '';

	/**
	 * The Algolia Index Name Prefix.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	public $index_prefix = '';

	/**
	 * AlgoliaSettings constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function __construct() {

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
		$this->app_id = \defined( 'ALGOLIA_APP_ID' ) ?
			ALGOLIA_APP_ID :
			\get_option( 'algolia_application_id', '' );

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
		$this->api_key = \defined( 'ALGOLIA_API_KEY' ) ?
			ALGOLIA_API_KEY :
			\get_option( 'algolia_api_key', '' );

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
		$this->search_key = \defined( 'ALGOLIA_SEARCH_API_KEY' ) ?
			ALGOLIA_SEARCH_API_KEY :
			\get_option( 'algolia_search_api_key', '' );

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
		$this->index_prefix = \defined( 'ALGOLIA_INDEX_NAME_PREFIX' ) ?
			ALGOLIA_INDEX_NAME_PREFIX :
			\get_option( 'algolia_index_name_prefix', '' );
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
}
