<?php
/**
 * Registerable Asset Interface.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.0.0
 *
 * @package WebDevStudios\WPSWA\Contracts
 */

namespace WebDevStudios\WPSWA\Contracts;

/**
 * Asset is registerable.
 *
 * @since  2.0.0
 */
interface RegisterableAsset {

	/**
	 * Register the Registerable Asset.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	public function register_asset();
}
