<?php
/**
 * The ServiceRegistrar class can be extended to define an object that provides some kind of "service" to WordPress.
 *
 * Example: a developer wants to initialize a service within the plugin that is responsible for registering custom post
 * types and taxonomies, and maybe another to register some custom WP REST API endpoints. They create a class that
 * extends this ServiceRegistrar class
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Structure
 * @since   1.0.0
 */

namespace WebDevStudios\WPSWA\Structure;

use WebDevStudios\WPSWA\Utility\FilePathDependent;
use WebDevStudios\WPSWA\Utility\Runnable;

/**
 * Class ServiceRegistrar
 *
 * @since 0.1.0
 */
abstract class ServiceRegistrar implements Runnable {
	use FilePathDependent;

	/**
	 * Array of fully-qualified namespaces of services to instantiate.
	 *
	 * @var array
	 * @since 0.1.0
	 */
	protected $services = [];

	/**
	 * Run the initialization process.
	 *
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since 0.1.0
	 */
	public function run() {
		$this->register_services();
	}

	/**
	 * Register this object's services.
	 *
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since 0.1.0
	 */
	protected function register_services() {
		$this->services = $this->init_services();
		$this->set_file_path_on_services();

		foreach ( $this->services as $service ) {
			$service->run();
		}
	}

	/**
	 * Initialize our service objects.
	 *
	 * This method converts our indexed $services array into an associative key => value array,
	 * where the index is the Service's class name and the value is the instantiated object.
	 *
	 * @return array
	 * @since  2019-04-01
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 */
	protected function init_services() {
		$objects = array_map( function ( $service_class ) {
			return [
				'namespace' => $service_class,
				'object'    => new $service_class(),
			];
		}, $this->services );

		return array_column( $objects, 'object', 'namespace' );
	}

	/**
	 * Pass this ServiceRegistrar's $file_path value to the Service objects that require it.
	 *
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since  2019-01-04
	 */
	private function set_file_path_on_services() {
		foreach ( array_filter( $this->services, [ $this, 'service_uses_file_path' ] ) as $service ) {
			/* @var $service FilePathDependent FilePathDependent service. */
			$service->set_file_path( $this->file_path );
		}
	}

	/**
	 * Determine whether a Service relies on the ServiceRegistrar's file path value.
	 *
	 * @param Service $service Service instance.
	 *
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since  2019-04-01
	 * @return bool
	 */
	private function service_uses_file_path( Service $service ) {
		return in_array( FilePathDependent::class, class_uses( $service ), true );
	}
}
