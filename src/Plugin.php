<?php
/**
 * Plugin class file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA;

use \WebDevStudios\WPSWA\Structure\Plugin\Plugin as OopsPlugin;
use \WDS_WPSWA_Vendor\Psr\Container\ContainerInterface;
use \WDS_WPSWA_Vendor\DI\ContainerBuilder;

/**
 * Class Plugin
 *
 * The core plugin class.
 *
 * @since 2.0.0
 */
final class Plugin extends OopsPlugin {

	/**
	 * DI container.
	 *
	 * @var ContainerInterface
	 */
	public $container;

	/**
	 * Array of services.
	 *
	 * @var array
	 */
	protected $services = [];

	/**
	 * Array of CLI Commands.
	 *
	 * @var array
	 */
	protected $cli_commands = [];

	/**
	 * Plugin constructor.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function __construct() {
		$this->build_container();
		$this->set_services();
		$this->set_cli_commands();
		$this->register_cli_commands();
	}

	public function set_services() {
		if ( ! $this->container->has( 'services' ) ) {
			return;
		}
		$this->services = $this->container->get( 'services' );
	}

	public function set_cli_commands(){
		if ( ! $this->container->has( 'cli_commands' ) ) {
			return;
		}
		$this->cli_commands = $this->container->get( 'cli_commands' );
	}

	/**
	 * Get the container.
	 *
	 * @return ContainerInterface|null
	 */
	public function get_container(): ?ContainerInterface {
		return $this->container;
	}

	/**
	 * Is this running under WP-CLI?
	 *
	 * @return bool
	 */
	public function is_wpcli(): bool {
		return ( defined( 'WP_CLI' ) && WP_CLI );
	}

	/**
	 * Add WP-CLI commands.
	 *
	 * @return void
	 */
	public function register_cli_commands(): void {
		if ( ! $this->is_wpcli() || empty( $this->cli_commands ) ) {
			return;
		}
		foreach ( $this->cli_commands as $command ) {
			if ( ! $this->container->has( $command ) ) {
				continue;
			}
			\WP_CLI::add_command( 'algolia', $this->container->get( $command ) );
		}
	}

	/**
	 * Build container.
	 *
	 * @todo PHP-DI can be compiled for performance.
	 * @todo Probably need a way to manually flush old and recompile (CLI and UI).
	 * @todo Probably also need an upgrade routine to flush old and recompile.
	 * @todo Look into wp_get_upload_dir() and wp_mkdir_p() for compilaton path.
	 *
	 * @link http://php-di.org/doc/performances.html
	 *
	 * @return void
	 */
	public function build_container(): void {
		$this->containerBuilder = new ContainerBuilder();
		$this->containerBuilder->addDefinitions(
			WPSWA_PLUGIN_DIR . '/config/php-di/config.php'
		);
		$this->container = $this->containerBuilder->build();
	}

	/**
	 * Plugin activation routines.
	 *
	 * @return void
	 */
	public function activate(): void {
		\flush_rewrite_rules();
	}

	/**
	 * Plugin deactivation routines.
	 *
	 * @return void
	 */
	public function deactivate(): void {
		\flush_rewrite_rules();
	}
}
