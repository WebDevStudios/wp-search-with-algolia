<?php
/**
 * Defines a structure for a main WordPress plugin class file.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Structure\Plugin
 * @since   2019-04-01
 */

namespace WebDevStudios\WPSWA\Structure\Plugin;

use WebDevStudios\WPSWA\Structure\ServiceRegistrar;

/**
 * Class Plugin
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Structure\Plugin
 * @since   2019-04-01
 */
abstract class Plugin extends ServiceRegistrar implements PluginInterface {

}
