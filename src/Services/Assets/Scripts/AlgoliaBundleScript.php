<?php
/**
 * AlgoliaBundleScript Asset class file.
 *
 * @package WebDevStudios\WPSWA\Services\Assets\Scripts
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services\Assets\Scripts;

use WebDevStudios\WPSWA\Services\Assets\Script;
use WebDevStudios\WPSWA\Contracts\RegisterableAsset;
use WebDevStudios\WPSWA\Contracts\EnqueueableAsset;
use WebDevStudios\WPSWA\Utility\AlgoliaSettings;
use WebDevStudios\WPSWA\Utility\Requirements;

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
	public $ver = WPSWA_PLUGIN_VERSION;

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
	 * The Algolia Settings.
	 *
	 * @since 2.0.0
	 *
	 * @Inject
	 * @var AlgoliaSettings
	 */
	protected $settings = null;

	/**
	 * AlgoliaBundleScript constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @param AlgoliaSettings $algolia_settings     The Algolia Settings.
	 */
	public function __construct( AlgoliaSettings $algolia_settings ) {
		$this->settings = $algolia_settings;

		/**
		 * Filters the `$in_footer` argument to `wp_register_script()` for Algolia Scripts.
		 *
		 * @since  1.3.0
		 *
		 * @param bool $in_footer Whether to enqueue the script before </body> instead of in the <head>. Default 'false'.
		 */
		$this->in_footer = (bool) apply_filters( 'algolia_load_scripts_in_footer', $this->in_footer );
	}

	/**
	 * Register hooks.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function register_hooks() {
		add_action( 'wp_enqueue_scripts', [ $this, 'register_asset' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_asset' ] );
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
		$this->add_inline_script();
	}

	/**
	 * Add inline script.
	 *
	 * @todo This needs a lot of work.
	 *       The searchable indices need to be available to the JS.
	 *       Currently the bundled JS is not configurable nor customizable.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function add_inline_script() {

		/**
		 * Filters the array of configuration parameters exposed for Algolia JS.
		 *
		 * @author WebDevStudios <contact@webdevstudios.com>
		 * @since  2.0.0
		 *
		 * @param array $config {
		 *     Algolia JS configuration.
		 *
		 *     @type bool   $debug         Debug mode enabled or not.
		 *     @type string $applicationID The Algolia Application ID.
		 *     @type string $apiKey        The Search-only API key.
		 *     @type array  $indices       Array of available Algolia Indices.
		 *     @type array  $searchBox     Array of searchBox widget options.
		 *     @type array  $hits          Array of hits widget options.
		 * }
		 */
		$config = (array) apply_filters(
			'wpswa_js_config',
			[
				'debug'         => defined( 'WP_DEBUG' ) ? WP_DEBUG : false,
				'applicationID' => $this->settings->get_app_id(),
				'apiKey'        => $this->settings->get_search_key(),
				'indices'       => [
					'searchablePosts' => $this->settings->get_index_prefix() . 'searchable_posts',
				],
				'searchBox'     => [
					'container' => '.searchform',
					'limit'     => 5,
					'showMore'  => true,
				],
				'hits'          => [
					'container' => '#content',
				],
			]
		);

		wp_add_inline_script(
			$this->handle,
			'wpswaBundleConfig = ' . wp_json_encode( $config ),
			'before'
		);
	}
}
