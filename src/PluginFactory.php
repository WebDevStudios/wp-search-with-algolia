<?php
/**
 * PluginFactory class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA;

use WebDevStudios\WPSWA\Plugin;

/**
 * Class PluginFactory
 *
 * Responsible for creating a shared instance of the main plugin object.
 *
 * @since 2.0.0
 */
final class PluginFactory {

	/**
	 * Create and return an instance of the plugin.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return Plugin The shared plugin instance.
	 */
	public static function create(): Plugin {
		static $plugin = null;

		if ( null === $plugin ) {
			$plugin = new Plugin();
		}

		return $plugin;
	}
}
