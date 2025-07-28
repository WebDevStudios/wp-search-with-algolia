<?php
/**
 * Algolia_Admin_Page_Premiun_Support class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.8.2
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Page_Premium_Support
 *
 * @since 2.8.2
 */
class Algolia_Admin_Page_Premium_Support {

	/**
	 * Admin page slug.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 * @var string
	 */
	private $slug = 'algolia-account-premium-support';

	/**
	 * Admin page capabilities.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 * @var string
	 */
	private $capability = 'manage_options';

	/**
	 * Admin page section.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 * @var string
	 */
	private $section = 'algolia_section_premium_support';

	/**
	 * Admin page option group.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 * @var string
	 */
	private $option_group = 'algolia_settings';

	/**
	 * The Algolia_Plugin instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Algolia_Admin_Page_Premium_Support constructor.
	 *
	 * @param Algolia_Plugin $plugin The Algolia_Plugin instance.
	 *
	 * @since  2.8.2
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function __construct( Algolia_Plugin $plugin ) {
		$this->plugin = $plugin;

		add_action( 'admin_menu', [ $this, 'add_page' ] );
		add_action( 'admin_init', [ $this, 'add_settings' ] );
	}

	/**
	 * Add admin menu page.
	 *
	 * @since  2.8.2
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @return string|void The resulting page's hook_suffix.
	 */
	public function add_page() {
		$api         = $this->plugin->get_api();
		$parent_slug = ! $api->is_reachable() ? 'algolia-account-settings' : 'algolia';
		add_submenu_page(
			$parent_slug,
			esc_html__( 'Premium Support from WebDevStudios', 'wp-search-with-algolia' ),
			esc_html__( 'Premium Support', 'wp-search-with-algolia' ),
			$this->capability,
			$this->slug,
			[ $this, 'display_page' ]
		);
	}

	/**
	 * Add settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
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
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 */
	public function display_page() {
		require_once dirname( __FILE__ ) . '/partials/form-options-premium-support.php';
	}

	/**
	 * Print the settings section.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.8.2
	 */
	public function print_section_settings() {

	}
}
