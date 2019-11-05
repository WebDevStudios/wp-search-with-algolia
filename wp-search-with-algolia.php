<?php
/**
 * @wordpress-plugin
 * Plugin Name:       WP Search with Algolia
 * Plugin URI:        https://github.com/WebDevStudios/wp-search-with-algolia
 * Description:       Integrate the powerful Algolia search service with WordPress.
 * Version:           2.0.0
 * Author:            WebDevStudios
 * Author URI:        https://webdevstudios.com
 * License:           GNU General Public License v3.0 / MIT License
 * Text Domain:       wp-search-with-algolia
 * Domain Path:       /languages/
 */

namespace WebDevStudios\WPSWA;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The core plugin class.
 *
 * @since      2.0.0
 */
final class WPSearchWithAlgolia {

	/**
	 * Stores the instance of the WPSearchWithAlgolia class.
	 *
	 * @var      WPSearchWithAlgolia The one true WPSearchWithAlgolia
	 * @since    2.0.0
	 * @access   private
	 */
	private static $instance;

	/**
	 * Create an object, only if the class has no instance.
	 *
	 * @since    2.0.0
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof WPSearchWithAlgolia ) ) {
			self::$instance = new WPSearchWithAlgolia();
			self::$instance->setup_constants();
			self::$instance->includes();
			self::$instance->admin_hooks();
			self::$instance->public_hooks();
		}

		return self::$instance;
	}

	/**
	 * Define and set up constants.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function setup_constants() {

		// Plugin version.
		define( 'WPSWA_PLUGIN_VERSION', '2.0.0' );

		// Plugin folder path.
		define( 'WPSWA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

		// Plugin folder URL.
		define( 'WPSWA_PLUGIN_URL', plugins_url( '', __FILE__ ) );

		// Plugin root file.
		define( 'WPSWA_PLUGIN_FILE', __FILE__ );

		// Disable DEBUG mode.
		define( 'WPSWA_DEBUG', false );
	}

	/**
	 * Use Composer to autoload our dependencies.
	 *
	 * @since    2.0.0
	 * @access   private
	 */
	private function includes() {
		require_once __DIR__ . '/vendor/autoload.php';
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    2.0.0
	 */
	public function admin_hooks() {
		add_action( 'admin_menu', array( $this, 'options_page' ) );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    2.0.0
	 */
	public function public_hooks() {
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
		add_action( 'plugins_loaded', array( $this, 'textdomain' ) );
	}

	/**
	 * Register scripts so that they can be used in other plugins outside
	 * of the context of the core features.
	 *
	 * @since    2.0.0
	 */
	public function scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_register_style( 'algolia-styles', WPSWA_PLUGIN_URL . '/src/assets/css/lib/algolia' . $suffix . '.css', array(), '2.0.0', 'all' );

		wp_register_script( 'algolia-client', WPSWA_PLUGIN_URL . '/src/assets/js/lib/algoliasearchLite' . $suffix . '.js', array(), '3.35.1', true );
		wp_register_script( 'algolia-instant-search', WPSWA_PLUGIN_URL . '/src/assets/js/lib/instantsearch.production' . $suffix . '.js', array( 'algolia-client' ), '4.0.0', true );
		wp_register_script( 'algolia-search', WPSWA_PLUGIN_URL . '/src/assets/js/algolia-search.js', array( 'algolia-instant-search' ), '2.0.0', true );

		wp_enqueue_style( 'algolia-styles' );
		wp_enqueue_script( 'algolia-search' );
	}

	/**
	 * Register and load translation file(s).
	 *
	 * @since    2.0.0
	 */
	public function textdomain() {
		load_plugin_textdomain( 'wp-search-with-algolia', false, WPSWA_PLUGIN_URL . '/src/languages' );
	}

	/**
	 * Register options page.
	 *
	 * @since    2.0.0
	 */
	public function options_page() {
		add_options_page( esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ), esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ), 'manage_options', 'wpswa', 'wpswa_option_page' );
	}
}

/**
 * Initialize our plugin.
 *
 * @since    2.0.0
 */
function init() {
	return WPSearchWithAlgolia::instance();
}
init();

// Maybe register WP-CLI commands.
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	require_once 'cli/class-wp-cli.php';
}
