<?php
/**
 * SetConfig subcommand class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI\Commands
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI\Commands;

use \WP_CLI;
use \WP_CLI_Command;
use \InvalidArgumentException;
use WDS_WPSWA_Vendor\Algolia\AlgoliaSearch\SearchClient;

/**
 * Set config.
 *
 * ## EXAMPLE
 *
 *     # Set config.
 *     $ wp algolia set_config
 *     Success: Algolia CLI Command is correctly loaded
 *
 * @since 2.0.0
 */
class SetConfig extends WP_CLI_Command {

	/**
	 * Set config method.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 *
	 * @throws InvalidArgumentException If --index argument is not supplied.
	 *
	 * @return void
	 */
	public function set_config( $args, $assoc_args ): void {

		$app_id  = \get_option( 'algolia_application_id', '' );
		$api_key = \get_option( 'algolia_api_key', '' );

		if ( empty( $app_id ) || empty( $api_key ) ) {
			WP_CLI::error( 'Missing App ID or API key' );

			return;
		}

		$this->algolia_search_client = SearchClient::create( $app_id, $api_key );

		$canonical_index_name = $assoc_args['index'];

		if ( ! $canonical_index_name ) {
			throw new InvalidArgumentException( '--index argument is required' );
		}

		$index = $this->algolia_search_client->initIndex(
			\apply_filters( 'algolia_index_name', $canonical_index_name ) // phpcs:ignore
		);

		if ( $assoc_args['settings'] ) {
			$settings = (array) \apply_filters( 'get_' . $canonical_index_name . '_settings', [] ); // phpcs:ignore
			if ( $settings ) {
				$index->setSettings( $settings );
				WP_CLI::success( 'Push settings to ' . $index->getIndexName() );
			}
		}

		if ( $assoc_args['synonyms'] ) {
			$synonyms = (array) \apply_filters( 'get_' . $canonical_index_name . '_synonyms', [] ); // phpcs:ignore
			if ( $synonyms ) {
				$index->replaceAllSynonyms( $synonyms );
				WP_CLI::success( 'Push synonyms to ' . $index->getIndexName() );
			}
		}

		if ( $assoc_args['rules'] ) {
			$rules = (array) \apply_filters( 'get_' . $canonical_index_name . '$rules', [] ); // phpcs:ignore
			if ( $rules ) {
				$index->replaceAllRules( $rules );
				WP_CLI::success( 'Push query rules to ' . $index->getIndexName() );
			}
		}
	}
}
