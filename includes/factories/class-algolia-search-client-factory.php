<?php
/**
 * Algolia_Search_Client_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Configuration\SearchConfig;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Algolia;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Api\SearchClient;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Support\AlgoliaAgent;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Model\Search\SecuredApiKeyRestrictions;

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

		global $wp_version;

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
		 * @param  string $value Default: Current Algolia plugin version.
		 * @return string $value Custom UA integration version.
		 */
		$integration_version = (string) apply_filters(
			'algolia_ua_integration_version',
			ALGOLIA_VERSION
		);

		/**
		 * Allows for providing custom configuration arguments for Algolia Search Client.
		 * @see   https://www.algolia.com/doc/api-reference/api-methods/configuring-timeouts/
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
		 * @see   https://www.algolia.com/doc/api-reference/api-methods/generate-secured-api-key/
		 * @since 2.9.0
		 *
		 * @param array $value Array of secured API key arguments. Default empty array.
		 */
		$custom_secured_key_config = apply_filters(
			'algolia_custom_secured_key',
			[]
		);

		$http_client = Algolia_Http_Client_Interface_Factory::create();

		Algolia::setHttpClient( $http_client );

		// Potentially create a secured $api_key first before any other calls.
		if ( ! empty( $custom_secured_key_config ) && is_array( $custom_secured_key_config ) ) {
			$client                    = SearchClient::create( $app_id, $api_key );
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

			$api_key = $client->generateSecuredApiKey(
				$api_key,
				$custom_secured_key_config,
			);
		}

		if ( ! empty( $custom_config ) && is_array( $custom_config ) ) {
			$customconfigobj = SearchConfig::create( $app_id, $api_key );

			// Set these again for the custom config
			AlgoliaAgent::addAlgoliaAgent(
				$customconfigobj->getClientName(),
				$integration_name,
				$integration_version
			);
			AlgoliaAgent::addAlgoliaAgent(
				$customconfigobj->getClientName(),
				'WordPress',
				$wp_version
			);

			if ( ! empty( $custom_config['connectTimeout'] ) ) {
				$customconfigobj->setConnectTimeout( (int) $custom_config['connectTimeout'] );
			}
			if ( ! empty( $custom_config['readTimeout'] ) ) {
				$customconfigobj->setReadTimeout( (int) $custom_config['readTimeout'] );
			}
			if ( ! empty( $custom_config['writeTimeout'] ) ) {
				$customconfigobj->setWriteTimeout( (int) $custom_config['writeTimeout'] );
			}

			if ( is_array( $custom_config['DefaultHeaders'] ) && ! empty( $custom_config['DefaultHeaders'] ) ) {
				$customconfigobj->setDefaultHeaders( $custom_config['DefaultHeaders'] );
			}

			return SearchClient::createWithConfig( $customconfigobj );
		}

		// Default config, with maybe secure $api_key
		$configobj = SearchConfig::create( $app_id, $api_key );
		AlgoliaAgent::addAlgoliaAgent(
			$configobj->getClientName(),
			$integration_name,
			$integration_version
		);


		AlgoliaAgent::addAlgoliaAgent(
			$configobj->getClientName(),
			'WordPress',
			$wp_version
		);

		return SearchClient::createWithConfig( $configobj );
	}
}
