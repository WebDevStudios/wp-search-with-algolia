<?php
/**
 * Algolia_Http_Client_Interface_Factory class file.
 *
 * @since   1.6.0-dev
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
 * @since 1.6.0-dev
 */
class Algolia_Http_Client_Interface_Factory {

	/**
	 * Create and return an instance of the HttpClientInterface.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.6.0-dev
	 *
	 * @return HttpClientInterface The shared HttpClientInterface instance.
	 */
	public static function create(): HttpClientInterface {
		/**
		 * The static instance to share, else null.
		 *
		 * @since 1.6.0-dev
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
	 * @since  1.6.0-dev
	 *
	 * @return Php53HttpClient
	 */
	public static function create_php53_http_client(): Php53HttpClient {

		/**
		 * Allow developers to override the Php53HttpClient cURL options.
		 *
		 * @link   https://curl.haxx.se/libcurl/c/curl_easy_setopt.html
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.6.0-dev
		 *
		 * @param array $options Curl options for Php53HttpClient construction.
		 */
		$options = apply_filters(
			'algolia_php_http_client_options',
			[
				'CURLOPT_CAINFO' => ALGOLIA_PATH . 'resources/cacert.pem',
			]
		);

		return new Php53HttpClient( $options );
	}
}
