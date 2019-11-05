<?php
/**
 * The file that deals with WP-CLI.
 *
 * @author     WebDevStudios <contact@webdevstudios.com>
 * @link       https://github.com/WebDevStudios/wp-search-with-algolia/
 * @package    WebDevStudios\WPSWA\FrontEnd
 * @since      2.0.0
 */

if ( ! ( defined( 'WP_CLI' ) && WP_CLI ) ) {
	return;
}

/**
 * Create new WP-CLI commands.
 *
 * @since      2.0.0
 */
class Algolia_CLI_Command extends WP_CLI_Command {

	/**
	 * Verify that Algolia has loaded.
	 *
	 * @param [type] $args
	 * @param [type] $assoc_args
	 * @since      2.0.0
	 */
	public function hello( $args, $assoc_args ) {
		WP_CLI::success( 'Algolia is correctly loaded 🎉' );
	}

	/**
	 * Reindex posts method.
	 *
	 * @param [type] $args
	 * @param [type] $assoc_args
	 * @since      2.0.0
	 */
	public function reindex_post( $args, $assoc_args ) {
		global $algolia;
		global $table_prefix;

		$type       = isset( $assoc_args['type'] ) ? $assoc_args['type'] : 'post';
		$index_name = $table_prefix . $type;
		$index      = $algolia->initIndex(
			apply_filters( 'algolia_index_name', $index_name, $type )
		);

		$index->clearObjects()->wait();

		$paged = 1;
		$count = 0;
		do {
			$posts = new WP_Query([
				'posts_per_page' => 100,
				'paged'          => $paged,
				'post_type'      => $type,
				'post_status'    => 'publish',
			]);

			if ( ! $posts->have_posts() ) {
				break;
			}

			$records = [];
			foreach ( $posts->posts as $post ) {
				if ( $assoc_args['verbose'] ) {
					WP_CLI::line( 'Indexing [' . $post->post_title . ']' );
				}
				$record = (array) apply_filters( $type . '_to_record', $post );

				if ( ! isset( $record['objectID'] ) ) {
					$record['objectID'] = implode( '#', [ $post->post_type, $post->ID ] );
				}

				$records[] = $record;
				$count++;
			}

			$index->saveObjects( $records );

			$paged++;

		} while ( true );

		WP_CLI::success( "$count $type entries indexed in Algolia" );
	}

	/**
	 * Copy config method.
	 *
	 * @param [type] $args
	 * @param [type] $assoc_args
	 * @since      2.0.0
	 */
	public function copy_config( $args, $assoc_args ) {
		global $algolia;

		$src_index_name  = $assoc_args['from'];
		$dest_index_name = $assoc_args['to'];

		if ( ! $src_index_name || ! $dest_index_name ) {
			throw new InvalidArgumentException( '--from and --to arguments are required' );
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
			WP_CLI::success( 'Copied ' . implode( ', ', $scope ) . " from $src_index_name to $dest_index_name" );
		} else {
			WP_CLI::warning( 'Nothing to copy, use --settings, --synonyms or --rules.' );
		}
	}

	/**
	 * Set config method.
	 *
	 * @param [type] $args
	 * @param [type] $assoc_args
	 * @since      2.0.0
	 */
	public function set_config( $args, $assoc_args ) {
		global $algolia;

		$canonical_index_name = $assoc_args['index'];
		if ( ! $canonical_index_name ) {
			throw new InvalidArgumentException( '--index argument is required' );
		}

		$index = $algolia->initIndex(
			apply_filters( 'algolia_index_name', $canonical_index_name )
		);

		if ( $assoc_args['settings'] ) {
			$settings = (array) apply_filters( 'get_' . $canonical_index_name . '_settings', [] );
			if ( $settings ) {
				$index->setSettings( $settings );
				WP_CLI::success( 'Push settings to ' . $index->getIndexName() );
			}
}

		if ( $assoc_args['synonyms'] ) {
			$synonyms = (array) apply_filters( 'get_' . $canonical_index_name . '_synonyms', [] );
			if ( $synonyms ) {
				$index->replaceAllSynonyms( $synonyms );
				WP_CLI::success( 'Push synonyms to ' . $index->getIndexName() );
			}
}

		if ( $assoc_args['rules'] ) {
			$rules = (array) apply_filters( 'get_' . $canonical_index_name . '$rules', [] );
			if ( $rules ) {
				$index->replaceAllRules( $rules );
				WP_CLI::success( 'Push query rules to ' . $index->getIndexName() );
			}
}
	}
}

// Register commands with WP-CLI.
WP_CLI::add_command( 'algolia', 'Algolia_CLI_Command' );
