<?php
/**
 * SearchClientFactory class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA\Factories
 */

namespace WebDevStudios\WPSWA\Factories;

use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Algolia;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\HttpClientInterface;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Config\SearchConfig;

/**
 * Class SearchClientFactory
 *
 * Responsible for creating a shared instance of the Algolia SearchClient object.
 *
 * @since 2.0.0
 */
final class SearchClientFactory {

	/**
	 * Create and return an instance of the SearchClient.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param SearchConfig        $search_config The Algolia Search Config instance.
	 * @param HttpClientInterface $http_client   An HttpClientInterface object.
	 *
	 * @return SearchClient The shared SearchClient instance.
	 */
	public static function create( SearchConfig $search_config, HttpClientInterface $http_client ): SearchClient {

		/**
		 * The static instance to share, else null.
		 *
		 * @since  2.0.0
		 *
		 * @var null|SearchClient $search_client
		 */
		static $search_client = null;

		if ( null !== $search_client ) {
			return $search_client;
		}

		/**
		 * > The PHP client allows you to override what http layer
		 * > will be used by the SearchClient (and the other clients).
		 * > You need to set it in the Algolia class before instantiating your client.
		 *
		 * @since  2.0.0
		 *
		 * @link   https://www.algolia.com/doc/api-client/advanced/pass-options-to-the-http-client/php/?language=php
		 */
		Algolia::setHttpClient( $http_client );

		$search_client = SearchClient::createWithConfig( $search_config );

		return $search_client;
	}
}
