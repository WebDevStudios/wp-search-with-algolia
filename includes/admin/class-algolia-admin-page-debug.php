<?php
/**
 * Algolia_Admin_Page_Debug class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.10.1
 * @package WebDevStudios\WPSWA
 */

/**
 * Algolia_Admin_Page_Debug class.
 *
 * @since 2.10.1
 */
class Algolia_Admin_Page_Debug {

	/**
	 * Admin page slug.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.10.1
	 *
	 * @var string
	 */
	private $slug = 'algolia-debug';

	/**
	 * Admin page capabilities.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.10.1
	 *
	 * @var string
	 */
	private $capability = 'manage_options';

	/**
	 * Admin page section.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.10.1
	 *
	 * @var string
	 */
	private $section = 'algolia_section_debug';

	/**
	 * Admin page option group.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.10.1
	 *
	 * @var string
	 */
	private $option_group = 'algolia_settings';

	/**
	 * Plugin instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.10.1
	 *
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Constructor.
	 *
	 * @param Algolia_Plugin $plugin The plugin instance.
	 */
	public function __construct( Algolia_Plugin $plugin ) {
		$this->plugin = $plugin;

		add_action( 'admin_menu', [ $this, 'add_page' ] );
		add_action( 'network_admin_menu', [ $this, 'add_network_page' ] );
		add_action( 'admin_init', [ $this, 'add_settings' ] );
	}

	/**
	 * Add the page to the admin menu (single site).
	 */
	public function add_page() {
		add_submenu_page(
			'algolia',
			esc_html__( 'Debug', 'wp-search-with-algolia' ),
			esc_html__( 'Debug', 'wp-search-with-algolia' ),
			$this->capability,
			$this->slug,
			[ $this, 'display_page' ]
		);
	}

	/**
	 * Add the page to the network admin menu (multisite).
	 */
	public function add_network_page() {
		add_submenu_page(
			'wpswa_pro_network',
			esc_html__( 'Debug', 'wp-search-with-algolia' ),
			esc_html__( 'Debug', 'wp-search-with-algolia' ),
			'manage_network_options',
			$this->slug,
			[ $this, 'display_page' ]
		);
	}

	/**
	 * Add the settings section.
	 */
	public function add_settings() {
		add_settings_section(
			$this->section,
			null,
			[ $this, 'print_section_settings' ],
			$this->slug
		);
	}

	/**
	 * Display the page.
	 */
	public function display_page() {
		require_once dirname( __FILE__ ) . '/partials/form-options-debug.php';
	}

	/**
	 * Print the section settings.
	 */
	public function print_section_settings() {
	}
}
