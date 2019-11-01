<?php
/**
 * @wordpress-plugin
 * Plugin Name:       WP Search with Algolia
 * Plugin URI:        https://github.com/WebDevStudios/wp-search-with-algolia
 * Description:       Integrate the powerful Algolia search service with WordPress
 * Version:           1.0.0
 * Requires at least: 5.3
 * Requires PHP:      7.2
 * Author:            WebDevStudios
 * Author URI:        https://webdevstudios.com
 * License:           GNU General Public License v2.0 / MIT License
 * Text Domain:       wp-search-with-algolia
 * Domain Path:       /languages/
 */

// The following code is a derivative work of the code from the
// Algolia Search plugin for WordPress, which is licensed GPLv2.
// This code therefore is also licensed under the terms of the GNU Public License v2.0.

// Nothing to see here if not loaded in WP context.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// The Algolia Search plugin version.
define( 'ALGOLIA_VERSION', '1.0.0' );

// The minmum required PHP version.
define( 'ALGOLIA_MIN_PHP_VERSION', '7.2' );

// The minimum required WordPress version.
define( 'ALGOLIA_MIN_WP_VERSION', '5.3' );

define( 'ALGOLIA_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

define( 'ALGOLIA_PLUGIN_URL', plugins_url( '/', __FILE__ ) );

if ( ! defined( 'ALGOLIA_PATH' ) ) {
	define( 'ALGOLIA_PATH', plugin_dir_path( __FILE__ ) );
}

// Check for required PHP version.
if ( version_compare( PHP_VERSION, ALGOLIA_MIN_PHP_VERSION, '<' ) ) {
	exit(
		sprintf(
			/* translators: placeholder 1 is minimum required PHP version, placeholder 2 is installed PHP version. */
			esc_html__( 'Algolia plugin requires PHP %1$s or higher. You’re still on %2$s.', 'wp-search-with-algolia' ),
			esc_html( ALGOLIA_MIN_PHP_VERSION ),
			esc_html( PHP_VERSION )
		)
	);
}

// Check for required WordPress version.
global $wp_version;

if ( version_compare( $wp_version, ALGOLIA_MIN_WP_VERSION, '<' ) ) {
	exit(
		sprintf(
			/* translators: placeholder 1 is minimum required WordPress version, placeholder 2 is installed WordPress version. */
			esc_html__( 'Algolia plugin requires at least WordPress in version %1$s, You are on %2$s', 'wp-search-with-algolia' ),
			esc_html( ALGOLIA_MIN_WP_VERSION ),
			esc_html( $wp_version )
		)
	);
}

/**
 * I18n.
 */
function algolia_load_textdomain() {

	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals -- This is a legitimate use of a global filter.
	$locale = apply_filters( 'plugin_locale', get_locale(), 'wp-search-with-algolia' );

	load_textdomain( 'wp-search-with-algolia', WP_LANG_DIR . '/wp-search-with-algolia/wp-search-with-algolia-' . $locale . '.mo' );

	load_plugin_textdomain( 'wp-search-with-algolia', false, plugin_basename( dirname( __FILE__ ) ) . '/languages/' );
}

add_action( 'init', 'algolia_load_textdomain' );

require_once ALGOLIA_PATH . 'classmap.php';

$algolia = Algolia_Plugin::get_instance();

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	include ALGOLIA_PATH . '/includes/class-algolia-cli.php';
	WP_CLI::add_command( 'algolia', new Algolia_CLI() );
}
