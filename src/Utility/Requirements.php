<?php
/**
 * Requirements utility class file.
 *
 * @package WebDevStudios\WPSWA\Utility
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Utility;

use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Config\SearchConfig;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Exceptions\BadRequestException;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Exceptions\UnreachableException;

use WebDevStudios\WPSWA\Utility\AlgoliaSettings;

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
	protected $settings;

	/**
	 * The Aglolia SearchClient.
	 *
	 * @since 2.0.0
	 *
	 * @Inject
	 * @var SearchClient
	 */
	protected $search_client;

	/**
	 * List of requirements errors.
	 *
	 * @since 2.0.0
	 *
	 * @var array
	 */
	public $errors = [];

	/**
	 * Requirements constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param AlgoliaSettings $algolia_settings The AlgoliaSettings object.
	 * @param SearchClient    $search_client    Algolia SearchClient object.
	 */
	public function __construct( AlgoliaSettings $algolia_settings, SearchClient $search_client ) {
		$this->settings      = $algolia_settings;
		$this->search_client = $search_client;
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
		if ( ! empty( $this->settings ) && ! empty( $this->settings->get_app_id() ) ) {
			return true;
		}

		$this->errors[] = 'Algolia Application ID not configured.';

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
		if ( ! empty( $this->settings ) && ! empty( $this->settings->get_api_key() ) ) {
			return true;
		}

		$this->errors[] = 'Algolia Admin API key not configured.';

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
		if ( version_compare( PHP_VERSION, WPSWA_MIN_PHP_VERSION, '<' ) ) {
			$this->errors[] = 'WP Search with Algolia requires at least PHP ' . WPSWA_MIN_PHP_VERSION . '.';

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
		if ( version_compare( $GLOBALS['wp_version'], WPSWA_MIN_WP_VERSION, '<' ) ) {
			$this->errors[] = 'WP Search with Algolia requires at least WP ' . WPSWA_MIN_WP_VERSION . '.';

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
		if ( ! function_exists( 'curl_init' ) ) {
			$this->errors[] = 'WP Search with Algolia requires the cURL PHP extension.';

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
		if ( ! function_exists( 'json_decode' ) ) {
			$this->errors[] = 'WP Search with Algolia requires the JSON PHP extension.';

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
		if ( ! function_exists( 'mb_strtolower' ) ) {
			$this->errors[] = 'WP Search with Algolia requires the mbstring PHP extension.';

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

		$meets_php_version         = $this->meets_php_version();
		$has_curl                  = $this->has_curl();
		$has_json                  = $this->has_json();
		$has_mbstring              = $this->has_mbstring();
		$meets_wp_version          = $this->meets_wp_version();
		$has_app_id                = $this->has_app_id();
		$has_admin_api_key         = $this->has_admin_api_key();
		$search_client_can_connect = $this->search_client_can_connect();

		return $meets_php_version
			&& $has_curl
			&& $has_json
			&& $has_mbstring
			&& $meets_wp_version
			&& $has_app_id
			&& $has_admin_api_key
			&& $search_client_can_connect;
	}

	/**
	 * Can the search client connect?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function search_client_can_connect(): bool {

		$unreachable_error = 'WP Search with Algolia is unable to reach Algolia API.';

		// If we have no keys, we cannot connect.
		if ( ! $this->has_app_id() || ! $this->has_admin_api_key() ) {
			$this->errors[] = $unreachable_error;

			update_option( 'algolia_api_is_reachable', 'no', 'no' );
			return false;
		}

		// If we have a previously established connection, assume we're good to go.
		if ( 'yes' === get_option( 'algolia_api_is_reachable' ) ) {
			return true;
		}

		/*
		 * If we receive an exception from SearchClient::isAlive, set an error and return false.
		 * Otherwise proceed to check isAlive message.
		 */
		try {
			$is_alive = $this->search_client->isAlive();
		} catch ( UnreachableException $e ) {
			$this->errors[] = $e->getMessage();

			return false;
		} catch ( BadRequestException $e ) {
			$this->errors[] = $e->getMessage();

			return false;
		}

		/*
		 * If we get a 'server is alive' message, we succesfully connected.
		 * Update the 'algolia_api_is_reachable' option to 'yes' to reduce API key usage.
		 */
		if ( ! empty( $is_alive ) && 'server is alive' === ( $is_alive['message'] ?? '' ) ) {
			update_option( 'algolia_api_is_reachable', 'yes', 'no' );
			return true;
		}

		$this->errors[] = $unreachable_error;

		return false;
	}

	/**
	 * Do we have blocking Requirements errors preventing use?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function has_errors(): bool {
		if ( ! empty( $this->errors ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Get errors.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return array
	 */
	public function get_errors() {
		return array_unique( $this->errors );
	}
}
