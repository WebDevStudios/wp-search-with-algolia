<?php
/**
 * EnqueueScripts service class file.
 *
 * @package WebDevStudios\WPSWA\Services
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services;

use \WDS_WPSWA_Vendor\WebDevStudios\OopsWP\Structure\Service;

/**
 * Class EnqueueScripts
 *
 * @since 2.0.0
 */
class EnqueueScripts extends Service {

	/**
	 * Array of scripts to enqueue.
	 *
	 * @todo Consider if "scripts" should be objects?
	 *
	 * @since 2.0.0
	 *
	 * @var array
	 */
	protected $scripts = [
		[
			'handle'    => 'algolia-search',
			'src'       => WPSWA_PLUGIN_URL . '/dist/algolia.bundle.js',
			'ver'       => '2.0.0',
			'in_footer' => true,
		],
	];

	/**
	 * Register hooks.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register_hooks(): void {
		\add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueue scripts.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @return void
	 */
	public function enqueue_scripts(): void {
		if ( empty( $this->scripts ) ) {
			return;
		}

		foreach ( $this->scripts as $script ) {
			$this->enqueue_script( $script );
		}
	}

	/**
	 * Enqueue a script.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @param array $script {
	 *     The script to enqueue.
	 *
	 *     @type string           $handle    Name of the script. Should be unique.
	 *     @type string           $src       Full URL of the script, or path of the script relative to the WordPress
	 *                                       root directory. Default empty.
	 *     @type array            $deps      Optional. An array of registered script handles this script depends on.
	 *                                       Default empty array.
	 *     @type string|bool|null $ver       Optional. String specifying script version number, if it has one,
	 *                                       which is added to the URL as a query string for cache busting purposes.
	 *                                       If version is set to false, a version number is automatically added equal
	 *                                       to current installed WordPress version. If set to null, no version is
	 *                                       added.
	 *     @type bool             $in_footer Optional. Whether to enqueue the script before closing body tag instead of
	 *                                       in the head. Default 'false'.
	 * }
	 *
	 * @return void
	 */
	protected function enqueue_script( array $script ): void {
		if ( empty( $script['handle'] ) || \wp_script_is( $script['handle'], 'enqueued' ) ) {
			return;
		}

		\wp_enqueue_script(
			$script['handle'],
			( isset( $script['src'] ) ) ? $script['src'] : '',
			( isset( $script['deps'] ) ) ? $script['deps'] : [],
			( isset( $script['ver'] ) ) ? $script['ver'] : false,
			( isset( $script['in_footer'] ) ) ? $script['in_footer'] : false
		);
	}
}
