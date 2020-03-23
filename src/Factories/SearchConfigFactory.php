<?php
/**
 * SearchConfigFactory class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA\Factories
 */

namespace WebDevStudios\WPSWA\Factories;

use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Algolia;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Config\SearchConfig;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\Guzzle6HttpClient;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\HttpClientInterface;
use WDS_WPSWA_Vendor\GuzzleHttp\Client as GuzzleClient;

use WebDevStudios\WPSWA\Utility\AlgoliaSettings;

/**
 * Class SearchConfigFactory
 *
 * @since  2.0.0
 */
class SearchConfigFactory {

	/**
	 * Create and return an instance of the Algolia SearchConfig.
	 *
	 * @link   https://www.algolia.com/doc/api-reference/api-methods/configuring-timeouts/#examples
	 * @link   https://www.algolia.com/doc/api-reference/api-methods/set-extra-header/ Not yet implemented here.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param AlgoliaSettings $algoila_settings The AlgoliaSettings instance.
	 *
	 * @return SearchConfig The SearchConfig instance.
	 */
	public static function create( AlgoliaSettings $algoila_settings ): SearchConfig {

		/**
		 * The static instance to share, else null.
		 *
		 * @since  2.0.0
		 *
		 * @var null|SearchConfig $search_config
		 */
		static $search_config = null;

		if ( null !== $search_config ) {
			return $search_config;
		}

		/**
		 * Filters the Aglolia SearchConfig arguments.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  2.0.0
		 *
		 * @param array $args {
		 *     Algolia SearchConfig Args.
		 *
		 *     @type string $app_id          The Algolia Application ID.
		 *     @type string $api_key         The Algolia Admin API Key.
		 *     @type int    $connect_timeout Timeout for the tcp session to connect.
		 *     @type int    $read_timeout    Timeout for the read on the tcp socket.
		 *     @type int    $write_timeout   Timeout for write operations.
		 * }
		 */
		$args = apply_filters(
			'wpswa_filter_search_config_args',
			[
				'app_id'          => $algoila_settings->get_app_id(),
				'api_key'         => $algoila_settings->get_api_key(),
				'connect_timeout' => 2,
				'read_timeout'    => 5,
				'write_timeout'   => 30,
			]
		);

		$search_config = SearchConfig::create( $args['app_id'], $args['api_key'] );
		$search_config->setConnectTimeout( (int) $args['connect_timeout'] );
		$search_config->setReadTimeout( (int) $args['read_timeout'] );
		$search_config->setWriteTimeout( (int) $args['write_timeout'] );

		return $search_config;
	}
}
