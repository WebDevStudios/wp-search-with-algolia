<?php
/**
 * Interface for locating assets relative to a file.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA
 * @since 2019-02-17
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Interface AssetsLocator
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA
 * @since   2019-02-17
 */
interface AssetsLocator {
	/**
	 * Get the root URL to an assets directory.
	 *
	 * @param string $asset The asset to retrieve.
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since  2019-02-17
	 */
	public function get_asset_url( string $asset );
}
