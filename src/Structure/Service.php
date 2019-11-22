<?php
/**
 * Class structure that defines a registered service to run within a plugin or theme.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Structure
 * @since   1.0.0
 */

namespace WebDevStudios\WPSWA\Structure;

use WebDevStudios\WPSWA\Utility\Runnable;
use WebDevStudios\WPSWA\Utility\Hookable;

/**
 * Class Service
 *
 * @package WebDevStudios\WPSWA\Structure
 * @since   1.0.0
 */
abstract class Service implements Runnable, Hookable {
	/**
	 * Run the initialization process.
	 *
	 * @since 0.1.0
	 */
	public function run() {
		$this->register_hooks();
	}
}
