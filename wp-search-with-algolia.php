<?php
/**
 * WP Search with Algolia plugin bootstrap file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 *
 * @wordpress-plugin
 * Plugin Name:       WP Search with Algolia
 * Plugin URI:        https://github.com/WebDevStudios/wp-search-with-algolia
 * Description:       Integrate the powerful Algolia search service with WordPress.
 * Version:           2.0.0
 * Requires at least: 5.0
 * Requires PHP:      7.2
 * Author:            WebDevStudios
 * Author URI:        https://webdevstudios.com
 * License:           GNU General Public License v3.0 / MIT License
 * Text Domain:       wp-search-with-algolia
 * Domain Path:       /languages
 */

namespace WebDevStudios\WPSWA;

use \WebDevStudios\WPSWA\Plugin;
use \WebDevStudios\WPSWA\Utility\PluginFactory;

// Exit if accessed directly.
if ( ! \defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin version.
\define( 'WPSWA_PLUGIN_VERSION', '2.0.0' );

// Plugin bootstrap file.
\define( 'WPSWA_PLUGIN_FILE', __FILE__ );

// Plugin directory path.
\define( 'WPSWA_PLUGIN_DIR', __DIR__ );

// Plugin directory URL.
\define( 'WPSWA_PLUGIN_URL', \plugins_url( '', WPSWA_PLUGIN_FILE ) );

// The minmum required PHP version.
\define( 'WPSWA_MIN_PHP_VERSION', '7.2' );

// The minimum required WordPress version.
\define( 'WPSWA_MIN_WP_VERSION', '5.0' );

/**
 * The full path to the PSR4 autoloader.
 *
 * @since 2.0.0
 *
 * @var string $wpswa_autoloader
 */
$wpswa_autoloader = __DIR__ . '/vendor/autoload.php';

/**
 * The full path to the "functions" file.
 *
 * @since 2.0.0
 *
 * @var string $wpswa_functions
 */
$wpswa_functions = __DIR__ . '/src/functions.php';

/*
 * If the autloader is not readable,
 * setup an admin notice, deactivate, and return early,
 * so the site will continue to function.
 */
if ( ! \is_readable( $wpswa_autoloader ) || ! \is_readable( $wpswa_functions ) ) {

	\add_action(
		'admin_notices',
		function () {
			$notice = \__(
				'WP Search with Algolia cannot be activated, the autoloader is not readable.',
				'wp-search-with-algolia'
			);
			echo '<div class="notice notice-error"><p>' . \esc_html( $notice ) . '</p></div>';
		}
	);

	\add_action(
		'admin_init',
		function () {
			\deactivate_plugins(
				\plugin_basename( WPSWA_PLUGIN_FILE )
			);
		}
	);

	return;
}

// Require the autoloader.
require $wpswa_autoloader;

// Require the functions.
require $wpswa_functions;

/**
 * Instantiate the plugin.
 *
 * @since 2.0.0
 *
 * @var Plugin $wpswa_plugin
 */
$wpswa_plugin = PluginFactory::create();

\register_activation_hook(
	__FILE__, function () use ( $wpswa_plugin ) {
	$wpswa_plugin->activate();
} );

\register_deactivation_hook(
	__FILE__, function () use ( $wpswa_plugin ) {
	$wpswa_plugin->deactivate();
} );

// Run the plugin.
$wpswa_plugin->run();
