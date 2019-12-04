<?php
/**
 * @wordpress-plugin
 * Plugin Name:       WP Search with Algolia
 * Plugin URI:        https://github.com/alangf/wp-search-with-algolia
 * Description:       Integrate the powerful Algolia search service with WordPress
 * Version:           1.2.0
 * Requires at least: 5.0
 * Requires PHP:      7.2
 * Author:            Alan Gomes
 * Author URI:        https://alangf.com
 * License:           GNU General Public License v2.0 / MIT License
 * Text Domain:       wp-search-with-algolia
 * Domain Path:       /languages
 */

// Fork of the fork that WebDevStudios made of the original Algolia plugin, now discontinued.
// Original: https://github.com/WebDevStudios/wp-search-with-algolia

// Nothing to see here if not loaded in WP context.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// The Algolia Search plugin version.
define( 'ALGOLIA_VERSION', '1.1.0' );

// The minmum required PHP version.
define( 'ALGOLIA_MIN_PHP_VERSION', '7.2' );

// The minimum required WordPress version.
define( 'ALGOLIA_MIN_WP_VERSION', '5.0' );

define( 'ALGOLIA_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

define( 'ALGOLIA_PLUGIN_URL', plugins_url( '/', __FILE__ ) );

if ( ! defined( 'ALGOLIA_PATH' ) ) {
	define( 'ALGOLIA_PATH', plugin_dir_path( __FILE__ ) );
}

/**
 * Check for required PHP version.
 *
 * @return bool
 */
function algolia_php_version_check() {
	if ( version_compare( PHP_VERSION, ALGOLIA_MIN_PHP_VERSION, '<' ) ) {
		return false;
	}
	return true;
}

/**
 * Check for required WordPress version.
 *
 * @return bool
 */
function algolia_wp_version_check() {
	if ( version_compare( $GLOBALS['wp_version'], ALGOLIA_MIN_WP_VERSION, '<' ) ) {
		return false;
	}
	return true;
}

/**
 * Admin notices if requirements aren't met.
 */
function algolia_requirements_error_notice() {

	$notices = [];

	if ( ! algolia_php_version_check() ) {
		$notices[] = sprintf(
			/* translators: placeholder 1 is minimum required PHP version, placeholder 2 is installed PHP version. */
			esc_html__( 'Algolia plugin requires PHP %1$s or higher. You’re still on %2$s.', 'wp-search-with-algolia' ),
			esc_html( ALGOLIA_MIN_PHP_VERSION ),
			esc_html( PHP_VERSION )
		);
	}

	if ( ! algolia_wp_version_check() ) {
		$notices[] = sprintf(
			/* translators: placeholder 1 is minimum required WordPress version, placeholder 2 is installed WordPress version. */
			esc_html__( 'Algolia plugin requires at least WordPress in version %1$s, You are on %2$s.', 'wp-search-with-algolia' ),
			esc_html( ALGOLIA_MIN_WP_VERSION ),
			esc_html( $GLOBALS['wp_version'] )
		);
	}

	foreach ( $notices as $notice ) {
		echo '<div class="notice notice-error"><p>' . esc_html( $notice ) . '</p></div>';
	}
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

if ( algolia_php_version_check() && algolia_wp_version_check() ) {
	require_once ALGOLIA_PATH . 'classmap.php';

	$algolia = Algolia_Plugin::get_instance();

	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		include ALGOLIA_PATH . '/includes/class-algolia-cli.php';
		WP_CLI::add_command( 'algolia', new Algolia_CLI() );
	}
} else {
	add_action( 'admin_notices', 'algolia_requirements_error_notice' );
}
