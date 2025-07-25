<?php
/**
 * Algolia_Search_Client_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config\SearchConfig;
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

		$integration_name = (string) apply_filters(
			'algolia_ua_integration_name',
			'WP Search with Algolia'
		);

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

		/**
		 * Allows for providing custom configuration arguments for Algolia Search Client.
		 *
		 * @see https://www.algolia.com/doc/api-reference/api-methods/configuring-timeouts/
		 * @since 2.8.0
		 *
		 * @param array $value Array of values for Algolia Config. Default empty array.
		 */
		$custom_config = apply_filters(
			'algolia_custom_search_config',
			[]
		);

		/**
		 * Allows for customizing an Algolia secured API key.
		 *
		 * @see https://www.algolia.com/doc/api-reference/api-methods/generate-secured-api-key/
		 *
		 * @param array $value Array of secured API key arguments. Default empty array.
		 */
		$custom_secured_key_config = apply_filters(
			'algolia_custom_secured_key',
			[]
		);

		if ( ! empty( $custom_secured_key_config ) && is_array( $custom_secured_key_config ) ) {
			$custom_secured_key_config = wp_parse_args(
				$custom_secured_key_config,
				[
					'filters'         => '',
					'validUntil'      => '',
					'restrictIndices' => [],
					'restrictSources' => '',
					'userToken'       => '',
				]
			);

			$api_key = SearchClient::generateSecuredApiKey( $api_key, $custom_secured_key_config );
		}

		if ( ! empty( $custom_config ) && is_array( $custom_config ) ) {
			$config = SearchConfig::create( $app_id, $api_key );

			if ( ! empty( $custom_config['connectTimeout'] ) ) {
				$config->setConnectTimeout( (int) $custom_config['connectTimeout'] );
			}
			if ( ! empty( $custom_config['readTimeout'] ) ) {
				$config->setReadTimeout( (int) $custom_config['readTimeout'] );
			}
			if ( ! empty( $custom_config['writeTimeout'] ) ) {
				$config->setWriteTimeout( (int) $custom_config['writeTimeout'] );
			}

			if ( is_array( $custom_config['DefaultHeaders'] ) && ! empty( $custom_config['DefaultHeaders'] ) ) {
				$config->setDefaultHeaders( $custom_config['DefaultHeaders'] );
			}

			return SearchClient::createWithConfig( $config );
		}

		return SearchClient::create(
			(string) $app_id,
			(string) $api_key
		);
	}
}
