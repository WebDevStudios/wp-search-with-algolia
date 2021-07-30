<?php
/**
 * Algolia_Admin_Page_Autocomplete class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA\Admin;

use WebDevStudios\WPSWA\AutocompleteConfig;
use WebDevStudios\WPSWA\Settings;

/**
 * Class Algolia_Admin_Page_Autocomplete
 *
 * @since 1.0.0
 */
class AdminAutocomplete {

	/**
	 * Admin page slug.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $slug = 'algolia';

	/**
	 * Admin page capabilities.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $capability = 'manage_options';

	/**
	 * Admin page section.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $section = 'algolia_section_autocomplete';

	/**
	 * Admin page option group.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $option_group = 'algolia_autocomplete';

	/**
	 * The Algolia_Settings object.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Settings
	 */
	private $settings;

	/**
	 * The Algolia_Autocomplete_Config object.
	 *
	 * @since 1.0.0
	 *
	 * @var AutocompleteConfig
	 */
	private $autocomplete_config;

	/**
	 * Algolia_Admin_Page_Autocomplete constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param Settings           $settings            The Algolia_Settings object.
	 * @param AutocompleteConfig $autocomplete_config The Algolia_Autocomplete_Config object.
	 */
	public function __construct( Settings $settings, AutocompleteConfig $autocomplete_config ) {
		$this->settings            = $settings;
		$this->autocomplete_config = $autocomplete_config;

		add_action( 'admin_menu', array( $this, 'add_page' ) );
		add_action( 'admin_init', array( $this, 'add_settings' ) );
		add_action( 'admin_notices', array( $this, 'display_errors' ) );

		// @todo: Listen for de-index to remove from autocomplete.
	}

	/**
	 * Add menu pages.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function add_page() {
		add_menu_page(
			'Algolia Search',
			esc_html__( 'Algolia Search', 'wp-search-with-algolia' ),
			'manage_options',
			'algolia',
			array( $this, 'display_page' ),
			''
		);
		add_submenu_page(
			'algolia',
			esc_html__( 'Autocomplete', 'wp-search-with-algolia' ),
			esc_html__( 'Autocomplete', 'wp-search-with-algolia' ),
			$this->capability,
			$this->slug,
			array( $this, 'display_page' )
		);
	}

	/**
	 * Add and register settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function add_settings() {
		add_settings_section(
			$this->section,
			null,
			array( $this, 'print_section_settings' ),
			$this->slug
		);

		add_settings_field(
			'algolia_autocomplete_enabled',
			esc_html__( 'Enable autocomplete', 'wp-search-with-algolia' ),
			array( $this, 'autocomplete_enabled_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'AutocompleteConfig',
			esc_html__( 'Configuration', 'wp-search-with-algolia' ),
			array( $this, 'autocomplete_config_callback' ),
			$this->slug,
			$this->section
		);

		register_setting( $this->option_group, 'algolia_autocomplete_enabled', array( $this, 'sanitize_autocomplete_enabled' ) );
		register_setting( $this->option_group, 'AutocompleteConfig', array( $this, 'sanitize_autocomplete_config' ) );
	}

	/**
	 * Callback to print the autocomplete enabled checkbox.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function autocomplete_enabled_callback() {
		$value    = $this->settings->get_autocomplete_enabled();
		$indices  = $this->autocomplete_config->get_form_data();
		$checked  = 'yes' === $value ? 'checked ' : '';
		$disabled = empty( $indices ) ? 'disabled ' : '';
		?>
		<input type='checkbox' name='algolia_autocomplete_enabled' value='yes' <?php echo esc_html( $checked . ' ' . $disabled ); ?>/>
		<?php
	}

	/**
	 * Sanitize the Autocomplete enabled setting.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $value The original value.
	 *
	 * @return string
	 */
	public function sanitize_autocomplete_enabled( $value ) {

		add_settings_error(
			$this->option_group,
			'autocomplete_enabled',
			esc_html__( 'Autocomplete configuration has been saved. Make sure to hit the "re-index" buttons of the different indices that are not indexed yet.', 'wp-search-with-algolia' ),
			'updated'
		);

		return 'yes' === $value ? 'yes' : 'no';
	}

	/**
	 * Autocomplete Config Callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function autocomplete_config_callback() {
		$indices = $this->autocomplete_config->get_form_data();

		require_once ALGOLIA_PATH . 'partials/page-autocomplete-config.php';
	}

	/**
	 * Sanitize Autocomplete Config.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param array $values Array of autocomplete config values.
	 *
	 * @return array|mixed
	 */
	public function sanitize_autocomplete_config( $values ) {
		return $this->autocomplete_config->sanitize_form_data( $values );
	}

	/**
	 * Display the page.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function display_page() {
		require_once ALGOLIA_PATH . 'partials/page-autocomplete.php';
	}

	/**
	 * Display the errors.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return void
	 */
	public function display_errors() {
		settings_errors( $this->option_group );

		if ( defined( 'ALGOLIA_HIDE_HELP_NOTICES' ) && ALGOLIA_HIDE_HELP_NOTICES ) {
			return;
		}

		$is_enabled = 'yes' === $this->settings->get_autocomplete_enabled();
		$indices    = $this->autocomplete_config->get_config();

		if ( true === $is_enabled && empty( $indices ) ) {
			/* translators: placeholder contains the URL to the autocomplete configuration page. */
			$message = sprintf( __( 'Please select one or multiple indices on the <a href="%s">Algolia: Autocomplete configuration page</a>.', 'wp-search-with-algolia' ), esc_url( admin_url( 'admin.php?page=' . $this->slug ) ) );
			echo '<div class="error notice">
					  <p>' . esc_html__( 'You have enabled the Algolia Autocomplete feature but did not choose any index to search in.', 'wp-search-with-algolia' ) . '</p>
					  <p>' . wp_kses_post( $message ) . '</p>
				  </div>';
		}
	}

	/**
	 * Prints the section text.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function print_section_settings() {
		echo '<p>' . esc_html__( 'The autocomplete feature adds a find-as-you-type dropdown menu to your search bar(s).', 'wp-search-with-algolia' ) . '</p>';
	}
}
