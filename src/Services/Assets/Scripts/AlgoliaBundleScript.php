<?php
/**
 * AlgoliaBundleScript Asset class file.
 *
 * @package WebDevStudios\WPSWA\Services\Assets\Scripts
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services\Assets\Scripts;

use \WebDevStudios\WPSWA\Services\Assets\Script;
use \WebDevStudios\WPSWA\Contracts\RegisterableAsset;
use \WebDevStudios\WPSWA\Contracts\EnqueueableAsset;

/**
 * Class AlgoliaBundleScript
 *
 * @since 2.0.0
 */
class AlgoliaBundleScript extends Script implements RegisterableAsset, EnqueueableAsset {

	/**
	 * Name of the script.
	 * Should be unique.
	 *
	 * @since 2.0.0
	 *
	 * @var string
	 */
	public $handle = 'algolia-bundle';

	/**
	 * Full URL of the script,
	 * or path of the script relative to the WordPress root directory.
	 * If source is set to false,
	 * script is an alias of other scripts it depends on.
	 *
	 * @since 2.0.0
	 *
	 * @var string|false
	 */
	public $src = WPSWA_PLUGIN_URL . '/dist/algolia.bundle.js';

	/**
	 * Optional.
	 * An array of registered script handles this script depends on.
	 * Default empty array.
	 *
	 * @since 2.0.0
	 *
	 * @var array
	 */
	public $deps = [];

	/**
	 * Optional.
	 * String specifying script version number, if it has one,
	 * which is added to the URL as a query string for cache busting purposes.
	 * If version is set to false,
	 * a version number is automatically added equal to current installed WordPress version.
	 * If set to null, no version is added.
	 *
	 * @since 2.0.0
	 *
	 * @var string|bool|null
	 */
	public $ver = '2.0.0';

	/**
	 * Optional.
	 * Whether to enqueue the script before </body> instead of in the <head>.
	 * Default 'false'.
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $in_footer = true;

	/**
	 * Register hooks.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function register_hooks() {
		/**
		 * Filters the `$in_footer` argument to `wp_register_script()` for Algolia Scripts.
		 *
		 * @since  1.3.0
		 *
		 * @param bool $in_footer Whether to enqueue the script before </body> instead of in the <head>. Default 'false'.
		 */
		$this->in_footer = (bool) apply_filters( 'algolia_load_scripts_in_footer', $this->in_footer );

		\add_action( 'wp_enqueue_scripts', [ $this, 'register_asset' ] );
		\add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_asset' ] );
	}

	/**
	 * Register the Registerable Asset.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function register_asset() {
		wp_register_script(
			$this->handle,
			$this->src,
			$this->deps,
			$this->ver,
			$this->in_footer
		);
	}

	/**
	 * Enqueue the Enqueueable Asset.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function enqueue_asset() {
		wp_enqueue_script(
			$this->handle
		);
	}
}
