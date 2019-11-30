<?php
/**
 * Plugin class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA;

use WebDevStudios\WPSWA\{
	Structure\Plugin\Plugin as OopsPlugin,
	Services\LoadTextDomain,
	Services\EnqueueScripts,
	Services\Admin\Options
};

/**
 * Class Plugin
 *
 * The core plugin class.
 *
 * @since 2.0.0
 */
final class Plugin extends OopsPlugin {

	/**
	 * Array of services.
	 *
	 * @since 2.0.0
	 *
	 * @var mixed
	 */
	protected $services = [
		LoadTextDomain::class,
		EnqueueScripts::class,
		Options::class,
	];

	/**
	 * Plugin constructor.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function __construct() {
	}
}
