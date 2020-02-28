<?php
/**
 * HttpClientFactory class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA\Factories
 */

namespace WebDevStudios\WPSWA\Factories;

use \WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Algolia;
use \WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\Guzzle6HttpClient;
use \WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\Http\HttpClientInterface;

use \WDS_WPSWA_Vendor\GuzzleHttp\Client as GuzzleClient;

/**
 * Class HttpClientFactory
 *
 * Responsible for creating a shared instance of the HttpClient.
 *
 * @since 2.0.0
 */
class HttpClientFactory {

	/**
	 * Create and return an instance of the HttpClientInterface.
	 *
	 * Algolia PHP Client uses either it's own HTTP Client,
	 * or a Guzzle Client, but prefers Guzzle when available.
	 * We've added Guzzle as a vendor lib, and will use that.
	 *
	 * Algolia PHP Client docs says that it's Guzzle6HttpClient
	 * accepts an array of Guzzle options.
	 * It would appear that the docs are incorrect (for v 2.5.0 2019-11-05),
	 * and that you can pass it a configured Guzzle Client.
	 *
	 * @link   https://github.com/algolia/algoliasearch-client-php/blob/2.5.0/src/Http/Guzzle6HttpClient.php#L16
	 * @link   https://www.algolia.com/doc/api-client/advanced/pass-options-to-the-http-client/php/?language=php#using-the-default-guzzle6httpclient-recommended
	 * @link   http://docs.guzzlephp.org/en/stable/request-options.html
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param array $options Array of Guzzle options for the http client.
	 *
	 * @return HttpClientInterface The http client instance.
	 */
	public static function create( array $options = [] ): HttpClientInterface {

		/**
		 * The static HttpClientInterface instance to share, else null.
		 *
		 * @since 2.0.0
		 *
		 * @var null|HttpClientInterface $http_client
		 */
		static $http_client = null;

		if ( null !== $http_client ) {
			return $http_client;
		}

		/**
		 * Filters the request options for the Guzzle Client passed to the Guzzle6HttpClient constructor.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  2.0.0
		 *
		 * @param array $options Array of Guzzle options.
		 */
		$options = \apply_filters( 'algolia_http_client_options', $options );

		/**
		 * The GuzzleClient to use for the HttpClientInterface.
		 *
		 * @since 2.0.0
		 *
		 * @var GuzzleClient $guzzle_client
		 */
		$guzzle_client = new GuzzleClient( $options );

		$http_client = new Guzzle6HttpClient( $guzzle_client );

		return $http_client;
	}
}
