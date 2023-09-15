<?php
/**
 * Algolia_Search_Client_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Algolia;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Support\UserAgent;

/**
 * Class Algolia_Search_Client_Factory
 *
 * @since 1.6.0
 */
class Algolia_Search_Client_Factory {

	/**
	 * Create an Algolia SearchClient.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.6.0
	 *
	 * @param string $app_id  The Algolia Application ID.
	 * @param string $api_key The Algolia API Key.
	 *
	 * @return SearchClient
	 */
	public static function create( string $app_id, string $api_key ): SearchClient {

		/**
		 * Filters the UA Integration name value.
		 *
		 * @since 1.0.0
		 *
		 * @param  string $value Default: "WP Search with Algolia"
		 * @return string $value New UA integration name.
		 */
		$integration_name = (string) apply_filters(
			'algolia_ua_integration_name',
			'WP Search with Algolia'
		);

		/**
		 * Filters the UA Integration version value.
		 *
		 * @since 1.0.0
		 *
		 * @oaram  string $value Default: Current Algolia plugin version.
		 * @return string $value Custom UA integration version.
		 */
		$integration_version = (string) apply_filters(
			'algolia_ua_integration_version',
			ALGOLIA_VERSION
		);

		UserAgent::addCustomUserAgent(
			$integration_name,
			$integration_version
		);

		global $wp_version;

		UserAgent::addCustomUserAgent(
			'WordPress',
			$wp_version
		);

		$http_client = Algolia_Http_Client_Interface_Factory::create();

		Algolia::setHttpClient( $http_client );

		return SearchClient::create(
			(string) $app_id,
			(string) $api_key
		);
	}
}
