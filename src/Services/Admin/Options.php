<?php
/**
 * Options service class file.
 *
 * @package WebDevStudios\WPSWA\Services\Admin
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services\Admin;

use \WebDevStudios\WPSWA\Structure\Service;
use \WebDevStudios\WPSWA\Utility\AlgoliaSettings;

/**
 * Class Options
 *
 * @since 2.0.0
 */
class Options extends Service {

	/**
	 * Menu slug for the settings page.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $slug = 'wpswa';

	/**
	 * Section name.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $section = 'algolia_section_settings';

	/**
	 * Required capability.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $capability = 'manage_options';

	/**
	 * Option group.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $option_group = 'algolia_settings';

	/**
	 * The AlgoliaSettings object.
	 *
	 * @since  2.0.0
	 *
	 * @Inject
	 * @var AlgoliaSettings
	 */
	protected $algolia_settings;

	/**
	 * Options constructor.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @param AlgoliaSettings $algolia_settings The AlgoliaSettings object.
	 */
	public function __construct( AlgoliaSettings $algolia_settings ) {
		$this->algolia_settings = $algolia_settings;
	}

	/**
	 * Register hooks.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register_hooks(): void {
		\add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		\add_action( 'admin_init', [ $this, 'admin_init' ] );
		\add_filter(
			'plugin_action_links_' . \plugin_basename( WPSWA_PLUGIN_FILE ),
			[ $this, 'add_plugin_settings_action_link' ]
		);
	}

	/**
	 * Add link to plugin settings from plugin links.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @param array $actions An array of plugin action links.
	 *
	 * @return array
	 */
	public function add_plugin_settings_action_link( array $actions ) {
		return \array_merge(
			$actions,
			[
				'<a href="' . \esc_url( \admin_url( 'admin.php?page=' . $this->slug ) ) . '">' . \esc_html__( 'Settings', 'wp-search-with-algolia' ) . '</a>',
			]
		);
	}

	/**
	 * Add menu page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function admin_menu() {
		\add_menu_page(
			\esc_html__( 'WP Search with Algolia', 'wp-search-with-algolia' ),
			\esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ),
			'manage_options',
			$this->slug,
			[ $this, 'display_options_page' ],
			'dashicons-welcome-widgets-menus',
			90
		);
	}

	/**
	 * Register and add settings.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function admin_init() {
		$this->register_settings();
		$this->add_settings();
	}

	/**
	 * Register settings.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register_settings() {
		\register_setting(
			$this->option_group,
			'algolia_application_id',
			[
				'type'              => 'string',
				'description'       => \esc_html__( 'Algolia Application ID', 'wp-search-with-algolia' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => false,
				'default'           => '',
			]
		);
		\register_setting(
			$this->option_group,
			'algolia_api_key',
			[
				'type'              => 'string',
				'description'       => \esc_html__( 'Algolia Admin API Key', 'wp-search-with-algolia' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => false,
				'default'           => '',
			]
		);
		\register_setting(
			$this->option_group,
			'algolia_search_api_key',
			[
				'type'              => 'string',
				'description'       => \esc_html__( 'Algolia Search API Key', 'wp-search-with-algolia' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => false,
				'default'           => '',
			]
		);
		\register_setting(
			$this->option_group,
			'algolia_index_name_prefix',
			[
				'type'              => 'string',
				'description'       => \esc_html__( 'Prefix to use for Indexes', 'wp-search-with-algolia' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => false,
				'default'           => '',
			]
		);
		\register_setting(
			$this->option_group,
			'algolia_powered_by_enabled',
			[
				'type'              => 'string',
				'description'       => \esc_html__( 'Displays or Removes Powered By Algolia logo', 'wp-search-with-algolia' ),
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => false,
				'default'           => '',
			]
		);
	}

	/**
	 * Add settings.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function add_settings() {
		\add_settings_section(
			$this->section,
			null,
			[ $this, 'display_settings_section' ],
			$this->slug
		);

		\add_settings_field(
			'algolia_application_id',
			\esc_html__( 'Application ID', 'wp-search-with-algolia' ),
			[ $this, 'application_id_field' ],
			$this->slug,
			$this->section
		);

		\add_settings_field(
			'algolia_search_api_key',
			\esc_html__( 'Search-only API key', 'wp-search-with-algolia' ),
			[ $this, 'search_key_field' ],
			$this->slug,
			$this->section
		);

		\add_settings_field(
			'algolia_api_key',
			\esc_html__( 'Admin API key', 'wp-search-with-algolia' ),
			[ $this, 'api_key_field' ],
			$this->slug,
			$this->section
		);

		\add_settings_field(
			'algolia_index_name_prefix',
			\esc_html__( 'Index name prefix', 'wp-search-with-algolia' ),
			[ $this, 'index_prefix_field' ],
			$this->slug,
			$this->section
		);

		\add_settings_field(
			'algolia_powered_by_enabled',
			\esc_html__( 'Remove Algolia powered by logo', 'wp-search-with-algolia' ),
			[ $this, 'powered_by_field' ],
			$this->slug,
			$this->section
		);
	}

	/**
	 * Callback for add_options_page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function display_options_page() {
		include_once WPSWA_PLUGIN_DIR . '/src/Views/Admin/Options.php';
	}

	/**
	 * Display the settings section.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function display_settings_section() {
		?>
		<p>
			<?php \esc_html_e( 'Configure your Algolia account credentials. You can find them in the "API Keys" section of your Algolia dashboard.', 'wp-search-with-algolia' ); ?>
		</p>
		<p>
			<?php \esc_html_e( 'Once you provide your Algolia Application ID and API key, this plugin will be able to securely communicate with Algolia servers. We ensure your information is correct by testing them against the Algolia servers upon save.', 'wp-search-with-algolia' ); ?>
		</p>
		<p>
			<?php
			echo \wp_kses_post(
				\sprintf(
					/* translators: the placeholder contains the URL to Algolia's website. */
					\__( 'No Algolia account yet? <a href="%s">Follow this link</a> to create one for free in a couple of minutes!', 'wp-search-with-algolia' ),
					'https://www.algolia.com/users/sign_up'
				)
			);
			?>
		</p>

		<?php

	}

	/**
	 * Callback to display the App ID field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function application_id_field() {
		$setting       = $this->algolia_settings->get_app_id();
		$disabled_html = $this->algolia_settings->is_app_id_in_config() ? ' disabled' : '';
		?>
		<input type="text" name="algolia_application_id" class="regular-text" value="<?php echo \esc_attr( $setting ); ?>" <?php echo \esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description">
			<?php \esc_html_e( 'Your Algolia Application ID.', 'wp-search-with-algolia' ); ?>
		</p>
		<?php
	}

	/**
	 * Callback to display the Search Key field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function search_key_field() {
		$setting       = $this->algolia_settings->get_search_key();
		$disabled_html = $this->algolia_settings->is_search_key_in_config() ? ' disabled' : '';
		?>
		<input type="text" name="algolia_search_api_key" class="regular-text" value="<?php echo \esc_attr( $setting ); ?>" <?php echo \esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description">
			<?php \esc_html_e( 'Your Algolia Search-only API key (public).', 'wp-search-with-algolia' ); ?>
		</p>
		<?php
	}

	/**
	 * Callback to display the API Key field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function api_key_field() {
		$setting       = $this->algolia_settings->get_api_key();
		$disabled_html = $this->algolia_settings->is_api_key_in_config() ? ' disabled' : '';
		?>
		<input type="password" name="algolia_api_key" class="regular-text" value="<?php echo \esc_attr( $setting ); ?>" <?php echo \esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description">
			<?php \esc_html_e( 'Your Algolia ADMIN API key (kept private).', 'wp-search-with-algolia' ); ?>
		</p>
		<?php
	}

	/**
	 * Callback to display the Index Prefix field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function index_prefix_field() {
		$setting       = $this->algolia_settings->get_index_prefix();
		$disabled_html = $this->algolia_settings->is_index_refix_in_config() ? ' disabled' : '';
		?>
		<input type="text" name="algolia_index_name_prefix" value="<?php echo \esc_attr( $setting ); ?>" <?php echo \esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description">
			<?php \esc_html_e( 'This prefix will be prepended to your index names.', 'wp-search-with-algolia' ); ?>
		</p>
		<?php
	}

	/**
	 * Callback to display the Powered By field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function powered_by_field() {
		?>
		<input type="checkbox" name="algolia_powered_by_enabled" value="no" <?php checked( 'no', $this->algolia_settings->powered_by_enabled() ); ?> />
		<p class="description" id="home-description">
			<?php \esc_html_e( 'This will remove the Algolia logo from the autocomplete and the search page. We require that you keep the Algolia logo if you are using a free plan.', 'wp-search-with-algolia' ); ?>
		</p>
		<?php
	}
}
