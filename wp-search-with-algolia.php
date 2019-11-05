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

// Define constants.
define( 'WPSWA_PLUGIN_VERSION', '2.0.0' );
define( 'WPSWA_PLUGIN_DIR_PATH', plugins_url( '', __FILE__ ) );
define( 'WPSWA_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Require dependencies.
require_once __DIR__ . '/vendor/autoload.php';

// Initialize the plugin.
Core\WPSWA::run();

// Maybe register WP-CLI commands.
if ( defined( 'WP_CLI' ) && WP_CLI ) {
	require_once 'cli/class-wp-cli.php';
}
