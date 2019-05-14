<?php

/**
 * @wordpress-plugin
 * Plugin Name:       WDS Search with Algolia
 * Plugin URI:        https://github.com/WebDevStudios/wds-search-with-algolia
 * Description:       Integrate the powerful Algolia search service with WordPress
 * Version:           1.0.0
 * Author:            WebDevStudios
 * Author URI:        https://webdevstudios.com
 * License:           GNU General Public License v2.0 / MIT License
 * Text Domain:       algolia
 * Domain Path:       /languages/
 */

// The following code is a derivative work of the code from the 
// Algolia Search plugin for WordPress, which is licensed GPLv2. 
// This code therefore is also licensed under the terms of the GNU Public License v2.0.

// Nothing to see here if not loaded in WP context.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Check for required PHP version.
if ( version_compare( PHP_VERSION, '5.6', '<' ) ) {
	/* translators: the placeholder always contains the plugin version. */
	exit( sprintf( esc_html__( 'Algolia plugin requires PHP 5.6 or higher. You’re still on %s.', 'algolia' ), esc_html( PHP_VERSION ) ) );
}

// Check for required WordPress version.
global $wp_version;
if ( version_compare( $wp_version, '4.4', '<' ) ) {
	/* translators: the placeholder always contains the plugin version. */
	exit( sprintf( esc_html__( 'Algolia plugin requires at least WordPress in version 4.4., You are on %s', 'algolia' ), esc_html( $wp_version ) ) );
}

// The Algolia Search plugin version.
define( 'ALGOLIA_VERSION', '1.0.0' );
define( 'ALGOLIA_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

if ( ! defined( 'ALGOLIA_PATH' ) ) {
	define( 'ALGOLIA_PATH', plugin_dir_path( __FILE__ ) );
}

/**
 * I18n.
 */
function algolia_load_textdomain() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'algolia' );

	load_textdomain( 'algolia', WP_LANG_DIR . '/algolia/algolia-' . $locale . '.mo' );
	load_plugin_textdomain( 'algolia', false, plugin_basename( dirname( __FILE__ ) ) . '/languages/' );
}

add_action( 'init', 'algolia_load_textdomain' );

require_once ALGOLIA_PATH . 'classmap.php';

$algolia = Algolia_Plugin::get_instance();

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	include ALGOLIA_PATH . '/includes/class-algolia-cli.php';
	WP_CLI::add_command( 'algolia', new Algolia_CLI() );
}
