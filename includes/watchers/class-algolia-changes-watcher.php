<?php
/**
 * Algolia_Changes_Watcher interface file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Interface Algolia_Changes_Watcher
 *
 * @since 1.0.0
 */
interface Algolia_Changes_Watcher {

	/**
	 * Watch WordPress events.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 */
	public function watch();
}
