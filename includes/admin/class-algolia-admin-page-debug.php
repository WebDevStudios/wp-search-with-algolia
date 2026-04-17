<?php
/**
 * Algolia_Admin_Page_Debug class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.8.3
 * @package WebDevStudios\WPSWA
 */

class Algolia_Admin_Page_Debug {

	private $slug = 'algolia-debug';
	private $capability = 'manage_options';
	private $section = 'algolia_section_debug';
	private $option_group = 'algolia_settings';
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
	 * Add the page to the admin menu (site admin).
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
	 * Add the page to the network admin menu (as a submenu under Algolia Search).
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
