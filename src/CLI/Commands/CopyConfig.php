<?php
/**
 * CopyConfig subcommand class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @link    https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package WebDevStudios\WPSWA\CLI\Commands
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\CLI\Commands;

/**
 * Copy config.
 *
 * ## EXAMPLE
 *
 *     # Copy config.
 *     $ wp algolia copy_config
 *     Success: Copied x from x to x.
 *
 * @since 2.0.0
 */
class CopyConfig extends \WP_CLI_Command {

	/**
	 * Copy config method.
	 *
	 * @todo Determine why there's a global $algolia in here.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 *
	 * @param array $args       Positional arguments.
	 * @param array $assoc_args Associative arguments.
	 *
	 * @throws \InvalidArgumentException If --from and --to arguments are not supplied.
	 */
	public function copy_config( $args, $assoc_args ) {
		global $algolia; // Where is this coming from?

		$src_index_name  = $assoc_args['from'];
		$dest_index_name = $assoc_args['to'];

		if ( ! $src_index_name || ! $dest_index_name ) {
			throw new \InvalidArgumentException( '--from and --to arguments are required' );
		}

		$scope = [];
		if ( isset( $assoc_args['settings'] ) && $assoc_args['settings'] ) {
			$scope[] = 'settings';
		}
		if ( isset( $assoc_args['synonyms'] ) && $assoc_args['synonyms'] ) {
			$scope[] = 'synonyms';
		}
		if ( isset( $assoc_args['rules'] ) && $assoc_args['rules'] ) {
			$scope[] = 'rules';
		}

		if ( ! empty( $scope ) ) {
			$algolia->copyIndex( $src_index_name, $dest_index_name, [ 'scope' => $scope ] );
			\WP_CLI::success( 'Copied ' . \implode( ', ', $scope ) . " from $src_index_name to $dest_index_name" );
		} else {
			\WP_CLI::warning( 'Nothing to copy, use --settings, --synonyms or --rules.' );
		}
	}
}
