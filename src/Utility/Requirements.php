<?php
/**
 * Requirements utility class file.
 *
 * @package WebDevStudios\WPSWA\Utility
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Utility;

use \WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;
use \WebDevStudios\WPSWA\Utility\AlgoliaSettings;

/**
 * Class Requirements
 *
 * @since 2.0.0
 */
class Requirements {

	/**
	 * The Aglolia Settings.
	 *
	 * @since 2.0.0
	 *
	 * @Inject
	 * @var AlgoliaSettings
	 */
	public $algoila_settings;

	/**
	 * Requirements constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param AlgoliaSettings $algoila_settings The AlgoliaSettings instance.
	 */
	public function __construct( AlgoliaSettings $algoila_settings ) {
		$this->algolia_settings = $algoila_settings;
	}

	/**
	 * Check if we have the Application ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function has_app_id(): bool {
		if ( ! empty( $this->algolia_settings ) && ! empty( $this->algolia_settings->get_app_id() ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Check if we have the Admin API Key.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function has_admin_api_key(): bool {
		if ( ! empty( $this->algolia_settings ) && ! empty( $this->algolia_settings->get_api_key() ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Check if installed PHP version meets our minimum requirements.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function meets_php_version(): bool {
		if ( \version_compare( PHP_VERSION, WPSWA_MIN_PHP_VERSION, '<' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Check if installed WP version meets our minimum requirements.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function meets_wp_version(): bool {
		if ( \version_compare( $GLOBALS['wp_version'], WPSWA_MIN_WP_VERSION, '<' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Check if cURL PHP extension is available, as required by Algolia PHP API Client.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function has_curl(): bool {
		if ( ! \function_exists( 'curl_init' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Check if JSON PHP extension is available, as required by Algolia PHP API Client.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function has_json(): bool {
		if ( ! \function_exists( 'json_decode' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Check if mbstring PHP extension is available, as required by Algolia PHP API Client.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function has_mbstring(): bool {
		if ( ! \function_exists( 'mb_strtolower' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Do we meet the requirements?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function meets_requirements(): bool {
		return $this->has_app_id()
			&& $this->has_admin_api_key()
			&& $this->meets_php_version()
			&& $this->meets_wp_version()
			&& $this->has_curl()
			&& $this->has_json()
			&& $this->has_mbstring();
	}
}
