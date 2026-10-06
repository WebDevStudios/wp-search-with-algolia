<?php
/**
 * Algolia_Index_Legacy_Client_Adapter class file.
 *
 * Temporary backward-compatibility shim for code (for example, third-party
 * add-ons) still written against the Algolia PHP SDK v3 "index object"
 * pattern, where index-level methods were called directly on an index
 * instance returned by `Algolia_Index::get_index()`.
 *
 * In SDK v4 there is no index object: every method moved to the client,
 * with the index name passed as the first argument. This adapter preserves
 * the old calling convention by forwarding any method call to the real
 * `SearchClient`, automatically passing the index name as the first
 * argument, so legacy `$index->get_index()->someMethod( ... )` calls keep
 * working instead of fatally erroring with "Call to a member function ...
 * on false".
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   3.0.1
 *
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Api\SearchClient;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Algolia_Index_Legacy_Client_Adapter
 *
 * @since 3.0.1
 */
final class Algolia_Index_Legacy_Client_Adapter {

	/**
	 * The real SearchClient instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  3.0.1
	 *
	 * @var SearchClient
	 */
	private $client;

	/**
	 * The index name to prepend to every forwarded call.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  3.0.1
	 *
	 * @var string
	 */
	private $index_name;

	/**
	 * Constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  3.0.1
	 *
	 * @param SearchClient $client     The real SearchClient instance.
	 * @param string       $index_name The index name to prepend to every forwarded call.
	 */
	public function __construct( SearchClient $client, string $index_name ) {
		$this->client     = $client;
		$this->index_name = $index_name;
	}

	/**
	 * Forward any method call to the SearchClient, prepending the index name.
	 *
	 * Covers the SDK v4 methods that kept the same name as their v3 index
	 * counterpart (for example, `getObject`, `getObjects`, `saveObject`,
	 * `saveObjects`, `deleteObject`, `deleteObjects`, `setSettings`,
	 * `getSettings`, `clearObjects`). Methods that were renamed in v4 (for
	 * example, `search` -> `searchSingleIndex`, `exists` -> `indexExists`)
	 * are not covered here, since `Algolia_Index` already exposes working,
	 * non-deprecated public methods for those use cases.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  3.0.1
	 *
	 * @param string $method The method being called.
	 * @param array  $args   The arguments passed to the method.
	 *
	 * @return mixed
	 *
	 * @throws \BadMethodCallException If the SearchClient does not support the given method.
	 */
	public function __call( $method, $args ) {
		if ( ! method_exists( $this->client, $method ) ) {
			// phpcs:ignore WordPress.Security.EscapeOutput.ExceptionNotEscaped -- Exception message, never output directly.
			throw new \BadMethodCallException( sprintf( 'SearchClient has no method "%s".', $method ) );
		}

		array_unshift( $args, $this->index_name );

		return call_user_func_array( [ $this->client, $method ], $args );
	}
}
