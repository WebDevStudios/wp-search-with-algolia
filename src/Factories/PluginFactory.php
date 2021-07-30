<?php
/**
 * Algolia_Plugin_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA\Factories;

use WebDevStudios\WPSWA\Plugin;

/**
 * Class Algolia_Plugin_Factory
 *
 * Responsible for creating a shared instance of the main Algolia_Plugin object.
 *
 * @since 1.6.0
 */
class PluginFactory {

	/**
	 * Create and return a shared instance of the Algolia_Plugin.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.6.0
	 *
	 * @return Plugin The shared plugin instance.
	 */
	public static function create(): Plugin {

		/**
		 * The static instance to share, else null.
		 *
		 * @since  1.6.0
		 *
		 * @var null|Plugin $plugin
		 */
		static $plugin = null;

		if ( null !== $plugin ) {
			return $plugin;
		}

		$plugin = new Plugin();

		return $plugin;
	}
}
