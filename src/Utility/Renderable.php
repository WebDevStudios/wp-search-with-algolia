<?php
/**
 * Define a contract for an object that can be rendered.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Utility
 * @since 2019-04-01
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Interface Renderable
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Utility
 * @since   2019-04-01
 */
interface Renderable {
	/**
	 * Render a value from the object.
	 *
	 * @since  2019-04-01
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 */
	public function render();
}
