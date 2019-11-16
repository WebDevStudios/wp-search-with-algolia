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
class SetConfig extends \WP_CLI_Command {

	/**
	 * Set config method.
	 *
	 * @todo Determine why there's a global $algolia in here.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 *
	 * @throws \InvalidArgumentException If --index argument is not supplied.
	 */
	public function set_config( $args, $assoc_args ) {
		global $algolia; // Where is this coming from?

		$canonical_index_name = $assoc_args['index'];
		if ( ! $canonical_index_name ) {
			throw new \InvalidArgumentException( '--index argument is required' );
		}

		$index = $algolia->initIndex(
			\apply_filters( 'algolia_index_name', $canonical_index_name ) // phpcs:ignore
		);

		if ( $assoc_args['settings'] ) {
			$settings = (array) \apply_filters( 'get_' . $canonical_index_name . '_settings', [] ); // phpcs:ignore
			if ( $settings ) {
				$index->setSettings( $settings );
				\WP_CLI::success( 'Push settings to ' . $index->getIndexName() );
			}
		}

		if ( $assoc_args['synonyms'] ) {
			$synonyms = (array) \apply_filters( 'get_' . $canonical_index_name . '_synonyms', [] ); // phpcs:ignore
			if ( $synonyms ) {
				$index->replaceAllSynonyms( $synonyms );
				\WP_CLI::success( 'Push synonyms to ' . $index->getIndexName() );
			}
		}

		if ( $assoc_args['rules'] ) {
			$rules = (array) \apply_filters( 'get_' . $canonical_index_name . '$rules', [] ); // phpcs:ignore
			if ( $rules ) {
				$index->replaceAllRules( $rules );
				\WP_CLI::success( 'Push query rules to ' . $index->getIndexName() );
			}
		}
	}
}
