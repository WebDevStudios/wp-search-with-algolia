<?php
/**
 * Algolia_Plugin_Factory class file.
 *
 * @since   1.6.0
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Plugin_Factory
 *
 * Responsible for creating a shared instance of the main Algolia_Plugin object.
 *
 * @since 1.6.0
 */
class Algolia_Plugin_Factory {

	/**
	 * Create and return a shared instance of the Algolia_Plugin.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.6.0
	 *
	 * @return Algolia_Plugin The shared plugin instance.
	 */
	public static function create(): Algolia_Plugin {

		/**
		 * The static instance to share, else null.
		 *
		 * @since  1.6.0
		 *
		 * @var null|Algolia_Plugin $plugin
		 */
		static $plugin = null;

		if ( null !== $plugin ) {
			return $plugin;
		}

		$plugin = new Algolia_Plugin();

		return $plugin;
	}
}
