<?php
/**
 * Algolia_Admin_Page_Autocomplete class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Page_Autocomplete
 *
 * @since 1.0.0
 */
class Algolia_Admin_Page_Autocomplete {

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
	 * @var Algolia_Settings
	 */
	private $settings;

	/**
	 * The Algolia_Autocomplete_Config object.
	 *
	 * @since 1.0.0
	 *
	 * @var Algolia_Autocomplete_Config
	 */
	private $autocomplete_config;

	/**
	 * Algolia_Admin_Page_Autocomplete constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param Algolia_Settings            $settings            The Algolia_Settings object.
	 * @param Algolia_Autocomplete_Config $autocomplete_config The Algolia_Autocomplete_Config object.
	 */
	public function __construct( Algolia_Settings $settings, Algolia_Autocomplete_Config $autocomplete_config ) {
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
			esc_html__( 'Algolia Search', 'wp-search-with-algolia' ),
			esc_html__( 'Algolia Search', 'wp-search-with-algolia' ),
			'manage_options',
			'algolia',
			array( $this, 'display_page' ),
			'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwLjM0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAwM2RmZjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUwLDBDMTEzLjM4LDAsMiwxMTAuMTYsLjAzLDI0Ni4zMmMtMiwxMzguMjksMTEwLjE5LDI1Mi44NywyNDguNDksMjUzLjY3LDQyLjcxLC4yNSw4My44NS0xMC4yLDEyMC4zOC0zMC4wNSwzLjU2LTEuOTMsNC4xMS02LjgzLDEuMDgtOS41MmwtMjMuMzktMjAuNzRjLTQuNzUtNC4yMi0xMS41Mi01LjQxLTE3LjM3LTIuOTItMjUuNSwxMC44NS01My4yMSwxNi4zOS04MS43NiwxNi4wNC0xMTEuNzUtMS4zNy0yMDIuMDQtOTQuMzUtMjAwLjI2LTIwNi4xLDEuNzYtMTEwLjMzLDkyLjA2LTE5OS41NSwyMDIuOC0xOTkuNTVoMjAyLjgzVjQwNy42OGwtMTE1LjA4LTEwMi4yNWMtMy43Mi0zLjMxLTkuNDMtMi42Ni0xMi40MywxLjMxLTE4LjQ3LDI0LjQ2LTQ4LjU2LDM5LjY3LTgxLjk4LDM3LjM2LTQ2LjM2LTMuMi04My45Mi00MC41Mi04Ny40LTg2Ljg2LTQuMTUtNTUuMjgsMzkuNjUtMTAxLjU4LDk0LjA3LTEwMS41OCw0OS4yMSwwLDg5Ljc0LDM3Ljg4LDkzLjk3LDg2LjAxLC4zOCw0LjI4LDIuMzEsOC4yOCw1LjUzLDExLjEzbDI5Ljk3LDI2LjU3YzMuNCwzLjAxLDguOCwxLjE3LDkuNjMtMy4zLDIuMTYtMTEuNTUsMi45Mi0yMy42LDIuMDctMzUuOTUtNC44My03MC4zOS02MS44NC0xMjcuMDEtMTMyLjI2LTEzMS4zNS04MC43My00Ljk4LTE0OC4yMyw1OC4xOC0xNTAuMzcsMTM3LjM1LTIuMDksNzcuMTUsNjEuMTIsMTQzLjY2LDEzOC4yOCwxNDUuMzYsMzIuMjEsLjcxLDYyLjA3LTkuNDIsODYuMi0yNi45N2wxNTAuMzYsMTMzLjI5YzYuNDUsNS43MSwxNi42MiwxLjE0LDE2LjYyLTcuNDhWOS40OUM1MDAsNC4yNSw0OTUuNzUsMCw0OTAuNTEsMEgyNTBaIi8+PC9zdmc+'
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
			esc_html__( 'Enable Autocomplete', 'wp-search-with-algolia' ),
			array( $this, 'autocomplete_enabled_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_autocomplete_config',
			esc_html__( 'Autocomplete Config', 'wp-search-with-algolia' ),
			array( $this, 'autocomplete_config_callback' ),
			$this->slug,
			$this->section
		);

		register_setting( $this->option_group, 'algolia_autocomplete_enabled', array( $this, 'sanitize_autocomplete_enabled' ) );
		register_setting( $this->option_group, 'algolia_autocomplete_config', array( $this, 'sanitize_autocomplete_config' ) );
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

		require_once dirname( __FILE__ ) . '/partials/page-autocomplete-config.php';
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
		require_once dirname( __FILE__ ) . '/partials/page-autocomplete.php';
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
			// translators: placeholder contains the URL to the autocomplete configuration page.
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
		echo '<p>' . esc_html__( 'Autocomplete adds a find-as-you-type dropdown to your search field(s).', 'wp-search-with-algolia' ) . '</p>';

		echo '<p>' . esc_html__( 'Enabling Autocomplete adds the functionality to your site\'s frontend search. Indexing and settings pushes can be done regardless of enabled status.', 'wp-search-with-algolia' ) . '</p>';
	}
}
