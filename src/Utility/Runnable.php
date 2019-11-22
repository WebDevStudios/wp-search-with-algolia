<?php
/**
 * Interface for a controller class to initialize a process following class instantiation.
 *
 * One example might be a service object that bootstraps the registration process for a custom post type.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Utility
 * @since   1.0.0
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Interface Runnable
 *
 * @package WebDevStudios\WPSWA\Utility
 * @since   1.0.0
 */
interface Runnable {
	/**
	 * Run the initialization process.
	 *
	 * @since 0.1.0
	 */
	public function run();
}
