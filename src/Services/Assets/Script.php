<?php
/**
 * Abstract class for a Script.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.0.0
 *
 * @package WebDevStudios\WPSWA\Services\Assets
 */

namespace WebDevStudios\WPSWA\Services\Assets;

use WDS_WPSWA_Vendor\WebDevStudios\OopsWP\Structure\Service;

/**
 * Class Asset
 *
 * @since 2.0.0
 */
abstract class Script extends Service {

	/**
	 * Name of the script.
	 * Should be unique.
	 *
	 * @since 2.0.0
	 *
	 * @var string
	 */
	public $handle = '';

	/**
	 * Full URL of the script,
	 * or path of the script relative to the WordPress root directory.
	 * If source is set to false,
	 * script is an alias of other scripts it depends on.
	 *
	 * @since 2.0.0
	 *
	 * @var string|false
	 */
	public $src = '';

	/**
	 * Optional.
	 * An array of registered script handles this script depends on.
	 * Default empty array.
	 *
	 * @since 2.0.0
	 *
	 * @var array
	 */
	public $deps = [];

	/**
	 * Optional.
	 * String specifying script version number, if it has one,
	 * which is added to the URL as a query string for cache busting purposes.
	 * If version is set to false,
	 * a version number is automatically added equal to current installed WordPress version.
	 * If set to null, no version is added.
	 *
	 * @since 2.0.0
	 *
	 * @var string|bool|null
	 */
	public $ver = null;

	/**
	 * Optional.
	 * Whether to enqueue the script before </body> instead of in the <head>.
	 * Default 'false'.
	 *
	 * @since 2.0.0
	 *
	 * @var bool
	 */
	public $in_footer = false;
}
