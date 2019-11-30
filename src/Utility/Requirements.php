<?php
/**
 * Requirements utility class file.
 *
 * @package WebDevStudios\WPSWA\Utility
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Class Requirements
 *
 * @since 2.0.0
 */
class Requirements {

	/**
	 * The Algolia "Application ID".
	 *
	 * @since 2.0.0
	 *
	 * @var string
	 */
	private $app_id = '';

	/**
	 * The Algolia "Admin API Key".
	 *
	 * @since 2.0.0
	 *
	 * @var string
	 */
	private $admin_api_key = '';

	/**
	 * Do we have the Application ID?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $has_app_id = false;

	/**
	 * Do we have the Admin API key?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $has_admin_api_key = false;

	/**
	 * Does the installed PHP version meet our minimum PHP version?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $meets_php_version = false;

	/**
	 * Does the installed WP version meet our minimum WP version?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $meets_wp_version = false;

	/**
	 * Does PHP have the cURL extension, as required by the Algolia PHP API Client?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $has_curl = false;

	/**
	 * Does PHP have the JSON extension, as required by the Algolia PHP API Client?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $has_json = false;

	/**
	 * Does PHP have the mbstring extension, as required by the Algolia PHP API Client?
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $has_mbstring = false;

	/**
	 * Set the Application ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param string $app_id The Application ID to set.
	 */
	public function set_app_id( $app_id = '' ) {
		$this->app_id = $app_id;
	}

	/**
	 * Check if we have the Application ID.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	protected function check_app_id(): bool {
		if ( ! empty( $this->app_id ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Set the Admin API Key.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param string $admin_api_key The Admin API Key to set.
	 */
	public function set_admin_api_key( $admin_api_key = '' ) {
		$this->admin_api_key = $admin_api_key;
	}

	/**
	 * Check if we have the Admin API Key.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	protected function check_admin_api_key(): bool {
		if ( ! empty( $this->admin_api_key ) ) {
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
	protected function check_php_version(): bool {
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
	protected function check_wp_version(): bool {
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
	protected function check_curl(): bool {
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
	protected function check_json(): bool {
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
	protected function check_mbstring(): bool {
		if ( ! \function_exists( 'mb_strtolower' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Run all the requirements checks.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function check_requirements() {
		$this->has_app_id        = $this->check_app_id();
		$this->has_admin_api_key = $this->check_admin_api_key();
		$this->meets_php_version = $this->check_php_version();
		$this->meets_wp_version  = $this->check_wp_version();
		$this->has_curl          = $this->check_curl();
		$this->has_json          = $this->check_json();
		$this->has_mbstring      = $this->check_mbstring();
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
		return $this->has_app_id
			&& $this->has_admin_api_key
			&& $this->meets_php_version
			&& $this->meets_wp_version
			&& $this->has_curl
			&& $this->has_json
			&& $this->has_mbstring;
	}
}
