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
	 * @since  2.0.0
	 *
	 * @var ContainerInterface
	 */
	public $container;

	/**
	 * DI container Builder.
	 *
	 * @since  2.0.0
	 *
	 * @var ContainerBuilder
	 */
	public $container_builder;

	/**
	 * Array of services.
	 *
	 * @since  2.0.0
	 *
	 * @var array
	 */
	protected $services = [];

	/**
	 * Array of CLI Commands.
	 *
	 * @since  2.0.0
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

	/**
	 * Set the services for this Plugin.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return void
	 */
	public function set_services() {
		if ( ! $this->container->has( 'services' ) ) {
			return;
		}
		$this->services = $this->container->get( 'services' );
	}

	/**
	 * Set the CLI commands for this Plugin.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return void
	 */
	public function set_cli_commands() {
		if ( ! $this->container->has( 'cli_commands' ) ) {
			return;
		}
		$this->cli_commands = $this->container->get( 'cli_commands' );
	}

	/**
	 * Get the container.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return ContainerInterface|null
	 */
	public function get_container(): ?ContainerInterface {
		return $this->container;
	}

	/**
	 * Is this running under WP-CLI?
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @return bool
	 */
	public function is_wpcli(): bool {
		return ( defined( 'WP_CLI' ) && WP_CLI );
	}

	/**
	 * Add WP-CLI commands.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
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
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 *
	 * @todo PHP-DI can be compiled for performance.
	 * @todo Probably need a way to manually flush old and recompile (CLI and UI).
	 * @todo Probably also need an upgrade routine to flush old and recompile.
	 * @todo Look into wp_get_upload_dir() and wp_mkdir_p() for compilaton path.
	 *
	 * @link http://php-di.org/doc/performances.html
	 */
	public function build_container(): void {
		$this->container_builder = new ContainerBuilder();
		$this->container_builder->addDefinitions(
			WPSWA_PLUGIN_DIR . '/config/php-di/config.php'
		);
		$this->container = $this->container_builder->build();
	}

	/**
	 * Plugin activation routines.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function activate(): void {
		\flush_rewrite_rules();
	}

	/**
	 * Plugin deactivation routines.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.0.0
	 */
	public function deactivate(): void {
		\flush_rewrite_rules();
	}
}
