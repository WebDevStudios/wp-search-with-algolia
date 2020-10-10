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

		/*
		 * Algolia PHP Client uses either a Php53HttpClient Client,
		 * or a Guzzle6HttpClient Client,
		 * and prefers Guzzle when available.
		 */
		if ( class_exists( '\GuzzleHttp\Client' ) && 6 <= self::get_guzzle_version() ) {
			$http_client = self::create_guzzle_6_http_client();
		} else {
			$http_client = self::create_php53_http_client();
		}

		return $http_client;
	}

	/**
	 * Get the Guzzle version.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0-dev
	 *
	 * @return int|null
	 */
	public static function get_guzzle_version(): int {

		$guzzle_version = null;

		if ( ! interface_exists( '\GuzzleHttp\ClientInterface' ) ) {
			return $guzzle_version;
		}

		if ( defined( '\GuzzleHttp\ClientInterface::VERSION' ) ) {
			// Guzzle 6 - string.
			$guzzle_version = (int) substr( \GuzzleHttp\Client::VERSION, 0, 1 );
		} elseif ( defined( '\GuzzleHttp\ClientInterface::MAJOR_VERSION' ) ) {
			// Guzzle 7+ - int.
			$guzzle_version = \GuzzleHttp\ClientInterface::MAJOR_VERSION;
		}

		return $guzzle_version;
	}

	/**
	 * Create a Guzzle6HttpClient client.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0-dev
	 *
	 * @return Guzzle6HttpClient
	 */
	public static function create_guzzle_6_http_client(): Guzzle6HttpClient {

		/**
		 * Allow developers to override the GuzzleHttp\Client options.
		 *
		 * @link   http://docs.guzzlephp.org/en/stable/request-options.html
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  1.5.0-dev
		 *
		 * @param array $options Options for GuzzleHttp Client construction.
		 */
		$options = apply_filters(
			'algolia_guzzle_http_client_options',
			[
				'verify' => ALGOLIA_PATH . 'resources/cacert.pem',
			]
		);

		/**
		 * The Guzzle Client to use for the HttpClientInterface.
		 *
		 * @since 1.5.0-dev
		 *
		 * @var \GuzzleHttp\Client $guzzle_client
		 */
		$guzzle_client = new \GuzzleHttp\Client( $options );

		return new Guzzle6HttpClient( $guzzle_client );
	}

	/**
	 * Create a Php53HttpClient client.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0-dev
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
		 * @since  1.5.0-dev
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
