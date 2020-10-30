<?php
/**
 * Algolia_Http_Client_Interface_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

use Algolia\AlgoliaSearch\Http\Guzzle6HttpClient;
use Algolia\AlgoliaSearch\Http\HttpClientInterface;
use Algolia\AlgoliaSearch\Http\Php53HttpClient;

/**
 * Class Algolia_Http_Client_Interface_Factory
 *
 * Responsible for creating a shared instance of the HttpClientInterface object.
 *
 * @since 1.6.0
 */
class Algolia_Http_Client_Interface_Factory {

	/**
	 * Create and return a shared instance of the HttpClientInterface.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.6.0
	 *
	 * @return HttpClientInterface The shared HttpClientInterface instance.
	 */
	public static function create(): HttpClientInterface {
		/**
		 * The static instance to share, else null.
		 *
		 * @since 1.6.0
		 *
		 * @var null|HttpClientInterface $http_client
		 */
		static $http_client = null;

		if ( null !== $http_client ) {
			return $http_client;
		}

		$http_client = self::create_php53_http_client();

		return $http_client;
	}

	/**
	 * Create a Php53HttpClient client.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.6.0
	 *
	 * @return Php53HttpClient
	 */
	public static function create_php53_http_client(): Php53HttpClient {

		/**
		 * Allow developers to override the Php53HttpClient cURL options.
		 *
		 * @link   https://www.algolia.com/doc/api-client/advanced/pass-options-to-the-http-client/php/?language=php#using-the-default-php53httpclient
		 * @link   https://www.algolia.com/doc/api-client/getting-started/upgrade-guides/php/#curl-options
		 * @link   https://curl.haxx.se/libcurl/c/curl_easy_setopt.html
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.6.0
		 *
		 * @param array $options Curl options for Php53HttpClient construction.
		 */
		$options = apply_filters(
			'algolia_php_53_http_client_options',
			[]
		);

		return new Php53HttpClient( $options );
	}
}
