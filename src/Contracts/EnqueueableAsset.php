<?php
/**
 * Enqueueable Asset Interface.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.0.0
 *
 * @package WebDevStudios\WPSWA\Contracts
 */

namespace WebDevStudios\WPSWA\Contracts;

/**
 * Asset is enqueueable.
 *
 * @since  2.0.0
 */
interface EnqueueableAsset {

	/**
	 * Enqueue the Enqueueable Asset.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   2.0.0
	 */
	public function enqueue_asset();
}
