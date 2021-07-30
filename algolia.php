<?php
/**
 * Plugin Name:       WP Search with Algolia
 * Plugin URI:        https://github.com/WebDevStudios/wp-search-with-algolia
 * Description:       Integrate the powerful Algolia search service with WordPress
 * Version:           3.0.0-dev
 * Requires at least: 5.0
 * Requires PHP:      7.2
 * Author:            WebDevStudios
 * Author URI:        https://webdevstudios.com
 * License:           GNU General Public License v2.0 / MIT License
 * Text Domain:       wp-search-with-algolia
 * Domain Path:       /languages
 *
 * The following code is a derivative work of the code from the
 * Algolia Search plugin for WordPress, which is licensed GPLv2.
 * This code therefore is also licensed under the terms of the GNU Public License v2.0.
 *
 * @since   1.0.0
 * @package WebDevStudios\WPSWA
 */

use WebDevStudios\WPSWA\Commands\Cli;
use WebDevStudios\WPSWA\Factories\PluginFactory;

defined( 'ABSPATH' ) || exit;

// The Algolia Search plugin version.
define( 'ALGOLIA_VERSION', '3.0.0-dev' );

// The minmum required PHP version.
define( 'ALGOLIA_MIN_PHP_VERSION', '7.2' );

// The minimum required WordPress version.
define( 'ALGOLIA_MIN_WP_VERSION', '5.0' );

define( 'ALGOLIA_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

define( 'ALGOLIA_PLUGIN_URL', plugins_url( '/', __FILE__ ) );

define( 'ALGOLIA_PATH', __DIR__ . '/' );

/**
 * Check for required PHP version.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.1.0
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
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.1.0
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
 * Check for required autoloader.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   3.0.0-dev
 *
 * @return bool
 */
function algolia_autoload_check() {
	return is_readable( ALGOLIA_PATH . 'vendor/autoload.php' );
}

/**
 * Admin notices if requirements aren't met.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.1.0
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

	if ( ! algolia_autoload_check() ) {
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
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 */
function algolia_load_textdomain() {

	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals -- This is a legitimate use of a global filter.
	$locale = apply_filters( 'plugin_locale', get_locale(), 'wp-search-with-algolia' );

	load_textdomain( 'wp-search-with-algolia', WP_LANG_DIR . '/wp-search-with-algolia/wp-search-with-algolia-' . $locale . '.mo' );

	load_plugin_textdomain( 'wp-search-with-algolia', false, plugin_basename( dirname( __FILE__ ) ) . '/languages/' );
}

add_action( 'init', 'algolia_load_textdomain' );

if ( algolia_php_version_check() && algolia_wp_version_check() && algolia_autoload_check() ) {

	require_once ALGOLIA_PATH . 'vendor/autoload.php';

	$algolia = PluginFactory::create();

	if ( defined( 'WP_CLI' ) && WP_CLI ) {
		WP_CLI::add_command( 'algolia', new Cli() );
	}
} else {
	add_action( 'admin_notices', 'algolia_requirements_error_notice' );
}
