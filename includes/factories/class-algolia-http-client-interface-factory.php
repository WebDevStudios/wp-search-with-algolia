<?php
/**
 * Algolia_Http_Client_Interface_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\Guzzle6HttpClient;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\HttpClientInterface;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\CurlHttpClient;

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

		$http_client = self::create_http_client();

		return $http_client;
	}

	/**
	 * Create HttpClientInterface.
	 *
	 * @author     WebDevStudios <contact@webdevstudios.com>
	 * @since      1.6.0
	 *
	 * @deprecated 2.0.0 Use Algolia_Http_Client_Interface_Factory::create_http_client()
	 * @see        Algolia_Http_Client_Interface_Factory::create_http_client()
	 *
	 * @return HttpClientInterface
	 */
	public static function create_php53_http_client(): HttpClientInterface {
		_deprecated_function(
			__METHOD__,
			'2.0.0',
			'Algolia_Http_Client_Interface_Factory::create_http_client();'
		);
		return self::create_http_client();
	}

	/**
	 * Create HttpClientInterface.
	 *
	 * Note: Algolia PHP Client 2.x used the `Php53HttpClient` class
	 * when Guzzle was not available.
	 * Algolia PHP Client v 3.x changed that class to `CurlHttpClient`.
	 * Ideally we would implement Guzzle support at some point,
	 * but we need to explore PHP Scoper or Mozart before doing so.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return HttpClientInterface
	 */
	public static function create_http_client(): HttpClientInterface {

		$options = [];

		/**
		 * Allow developers to override the HttpClientInterface options.
		 *
		 * @author     WebDevStudios <contact@webdevstudios.com>
		 * @since      1.6.0
		 * @deprecated 2.0.0 Use {@see 'algolia_http_client_options'} instead.
		 *
		 * @param array $options Options for HttpClientInterface construction.
		 */
		$options = (array) apply_filters_deprecated(
			'algolia_php_53_http_client_options',
			[ $options ],
			'2.0.0',
			'algolia_http_client_options'
		);

		/**
		 * Allow developers to override the HttpClientInterface options.
		 *
		 * @link   https://www.algolia.com/doc/api-client/advanced/pass-options-to-the-http-client/php/?language=php#using-the-default-php53httpclient
		 * @link   https://www.algolia.com/doc/api-client/getting-started/upgrade-guides/php/#curl-options
		 * @link   https://curl.haxx.se/libcurl/c/curl_easy_setopt.html
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  2.0.0
		 *
		 * @param array $options Options for HttpClientInterface construction.
		 */
		$options = (array) apply_filters( 'algolia_http_client_options', $options );

		return new CurlHttpClient( $options );
	}
}
