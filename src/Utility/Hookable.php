<?php
/**
 * Interface for objects that need to register hooks with WordPress.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Utility
 * @since   1.0.0
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Interface Hookable
 *
 * @package WebDevStudios\WPSWA\Utility
 * @since   1.0.0
 */
interface Hookable {
	/**
	 * Register actions and filters with WordPress.
	 *
	 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
	 *
	 * @since 0.1.0
	 */
	public function register_hooks();
}
