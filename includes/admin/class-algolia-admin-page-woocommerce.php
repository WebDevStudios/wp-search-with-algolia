<?php
/**
 * Algolia_Admin_Page_WooCommerce class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Page_WooCommerce
 *
 * @since 2.5.0
 */
class Algolia_Admin_Page_WooCommerce {

	/**
	 * Admin page slug.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 * @var string
	 */
	private $slug = 'algolia-account-woocommerce';

	/**
	 * Admin page capabilities.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 * @var string
	 */
	private $capability = 'manage_options';

	/**
	 * Admin page section.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 * @var string
	 */
	private $section = 'algolia_section_woocommerce';

	/**
	 * Admin page option group.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 * @var string
	 */
	private $option_group = 'algolia_settings';

	/**
	 * The Algolia_Plugin instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Algolia_Admin_Page_WooCommerce constructor.
	 *
	 * @param Algolia_Plugin $plugin The Algolia_Plugin instance.
	 *
	 * @since  2.5.0
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
	 * @return string|void The resulting page's hook_suffix.
	 * @since  2.5.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function add_page() {
		$api = $this->plugin->get_api();
		if ( ! $api->is_reachable() ) {
			return;
		}

		add_submenu_page(
			'algolia',
			esc_html__( 'WooCommerce', 'wp-search-with-algolia' ),
			sprintf(
				// translators: Placeholders are just for HTML markup that doesn't need translated.
				esc_html__( 'WooCommerce %s', 'wp-search-with-algolia' ),
				sprintf(
					'<span class="algolia-pro-indicator">%s</span>',
					esc_html__( 'Pro', 'wp-search-with-algolia' )
				)
			),
			$this->capability,
			$this->slug,
			[ $this, 'display_page' ]
		);
	}

	/**
	 * Add settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
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
	 * @since  2.5.0
	 */
	public function display_page() {
		require_once dirname( __FILE__ ) . '/partials/form-options-woocommerce.php';
	}

	/**
	 * Print the settings section.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.5.0
	 */
	public function print_section_settings() {

	}
}
