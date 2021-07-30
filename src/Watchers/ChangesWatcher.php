<?php
/**
 * Algolia_Changes_Watcher interface file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA\Watchers;

/**
 * Interface Algolia_Changes_Watcher
 *
 * @since 1.0.0
 */
interface ChangesWatcher {

	/**
	 * Watch WordPress events.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 */
	public function watch();
}
