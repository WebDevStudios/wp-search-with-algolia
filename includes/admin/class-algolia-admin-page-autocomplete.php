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
			[ $this, 'print_section_settings' ],
			$this->slug
		);

		add_settings_field(
			'algolia_autocomplete_enabled',
			esc_html__( 'Enable Autocomplete', 'wp-search-with-algolia' ),
			[ $this, 'autocomplete_enabled_callback' ],
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_autocomplete_debounce',
			esc_html__( 'Autocomplete Debounce', 'wp-search-with-algolia' ),
			array( $this, 'autocomplete_debounce_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_autocomplete_template_version',
			esc_html__( 'Autocomplete Version', 'wp-search-with-algolia' ),
			[ $this, 'autocomplete_version_callback' ],
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_autocomplete_config',
			esc_html__( 'Autocomplete Config', 'wp-search-with-algolia' ),
			[ $this, 'autocomplete_config_callback' ],
			$this->slug,
			$this->section
		);

		register_setting( $this->option_group, 'algolia_autocomplete_enabled', [ $this, 'sanitize_autocomplete_enabled' ] );
		register_setting( $this->option_group, 'algolia_autocomplete_debounce', [ $this, 'sanitize_autocomplete_debounce' ] );
		register_setting( $this->option_group, 'algolia_autocomplete_template_version', [ $this, 'sanitize_autocomplete_version' ] );
		register_setting( $this->option_group, 'algolia_autocomplete_config', [ $this, 'sanitize_autocomplete_config' ] );
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
		$checked  = 'yes' === $value ? ' checked' : '';
		$disabled = empty( $indices ) ? ' disabled' : '';
		?>
		<label>
			<input type="checkbox" name="algolia_autocomplete_enabled" value="yes"<?php echo esc_html( $checked . $disabled ); ?> />
			<?php esc_html_e( 'Show an Algolia-powered dropdown of suggestions while visitors type in the site search.', 'wp-search-with-algolia' ); ?>
		</label>
		<?php

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Adds search-as-you-type results to your site\'s existing search input(s).', 'wp-search-with-algolia' ),
			array(
				__( '<strong>What gets enhanced.</strong> The plugin attaches to inputs matching <code>input[name="s"]</code> by default, the standard WordPress search input. The dropdown appears as the visitor types and disappears when they click away or submit the form.', 'wp-search-with-algolia' ),
				__( '<strong>Independent of the search results page.</strong> Autocomplete and the InstantSearch search results page (Search Page settings) are separate features. You can run autocomplete on its own, search results on their own, or both together.', 'wp-search-with-algolia' ),
				__( '<strong>Targeting a different input.</strong> Use the <code>algolia_autocomplete_input_selector</code> filter to override the default selector if your theme uses a custom search field.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/',
				'label' => __( 'Read the Algolia Autocomplete documentation', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Callback to print the autocomplete debounce value.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since 2.10.0
	 */
	public function autocomplete_debounce_callback() {
		$value   = $this->settings->get_autocomplete_debounce();
		$indices = $this->autocomplete_config->get_form_data();
		?>
		<input type="number" name="algolia_autocomplete_debounce" class="small-text" min="0" step="50" value="<?php echo esc_attr( $value ); ?>" <?php disabled( empty( $indices ) ); ?>/>
		<span class="algolia-input-suffix">ms</span>
		<?php

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Wait this many milliseconds after the visitor stops typing before sending a request to Algolia. Set to 0 to disable.', 'wp-search-with-algolia' ),
			array(
				__( '<strong>Why debounce.</strong> Without debouncing, every keystroke triggers a search request. On fast typists, that means many requests per second, most of them wasted, because only the final query matters to the visitor.', 'wp-search-with-algolia' ),
				__( '<strong>Recommended starting point.</strong> <code>200</code> ms is a good default for most sites. Lower values feel snappier but increase request volume; higher values feel laggier but reduce load.', 'wp-search-with-algolia' ),
				__( '<strong>Per-index override.</strong> A specific index can override this global value via the <code>debounce</code> property on its config; when set, that value is shown on the index card below.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://www.algolia.com/doc/ui-libraries/autocomplete/guides/debouncing-sources/',
				'label' => __( 'Read the debouncing sources guide', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Callback to print the autocomplete version radio button.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.13.0
	 */
	public function autocomplete_version_callback() {
		$value   = $this->settings->get_autocomplete_template_version();
		$indices = $this->autocomplete_config->get_form_data();
		?>
		<input type="radio" id="legacy" name="algolia_autocomplete_template_version" value="legacy"
			<?php
			checked( 'legacy', $value );
			disabled( empty( $indices ), true );
			?>
		/>
		<label for="legacy"><?php esc_html_e( 'Legacy', 'wp-search-with-algolia' ); ?></label>

		<input type="radio" id="modern" name="algolia_autocomplete_template_version" value="modern"
			<?php
			checked( 'modern', $value );
			disabled( empty( $indices ), true );
			?>
		/>
		<label for="modern"><?php esc_html_e( 'Modern', 'wp-search-with-algolia' ); ?></label>
		<?php

		Algolia_Admin_Field_Helpers::render_field_help(
			esc_html__( 'Pick which version of the Autocomplete library and template file to load.', 'wp-search-with-algolia' ),
			[
				__( '<strong>What this controls.</strong> Two reference templates ship with the plugin in <code>templates/autocomplete.php</code> and <code>templates/autocomplete-modern.php</code>. This setting decides which one the plugin loads on your search results page.', 'wp-search-with-algolia' ),
				__( '<strong>Important notes</strong> The "Legacy" option will automatically attach to your active theme\'s search field. The "Modern" option needs to have a custom DOM element added to where you want search to appear. Modern will not automatically attach. Development work needed. Reach out to support with any questions.', 'wp-search-with-algolia' ),
				__( '<strong>When to pick Legacy.</strong> Existing sites that already customized the older template, or have integrations relying on the WP Utils JavaScript helpers.', 'wp-search-with-algolia' ),
				__( '<strong>When to pick Modern.</strong> Installs where you have more control over template files and can replace original search fields. Available Autocomplete documentation will match the Modern template file. Enhanced features like "Recent Searches", "Trending Searches", "Search Suggestions", Event tracking, and more are available with "Modern" Autocomplete.', 'wp-search-with-algolia' ),
				__( '<strong>Customizing the template.</strong> Copy the file you chose into <code>your-theme/algolia/</code> and the plugin will load your copy instead. Switching this setting does <strong>not</strong> overwrite a customized template in your theme.', 'wp-search-with-algolia' ),
			],
			[],
			[
				'url'   => 'https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete',
				'label' => esc_html__( 'Learn more about Autocomplete', 'wp-search-with-algolia' ),
			]
		);
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
			esc_html__( 'Autocomplete settings saved. Run "Re-index" on any index that has not been indexed yet so its suggestions can appear in the dropdown.', 'wp-search-with-algolia' ),
			'updated'
		);

		return 'yes' === $value ? 'yes' : 'no';
	}

	/**
	 * Sanitize the Autocomplete debounce setting.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.10.0
	 *
	 * @param int $value The original value.
	 *
	 * @return int The sanitized value.
	 */
	public function sanitize_autocomplete_debounce( $value ) {
		return intval( $value );
	}

	/**
	 * Sanitize the Autocomplete version setting.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since 2.13.0
	 *
	 * @param string $values The original value.
	 *
	 * @return string
	 */
	public function sanitize_autocomplete_version( $values ) {
		return sanitize_text_field( $values );
	}

	/**
	 * Autocomplete Config Callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function autocomplete_config_callback() {
		$indices = $this->autocomplete_config->get_form_data();

		require dirname( __FILE__ ) . '/partials/page-autocomplete-config.php';

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Each card below is one source the autocomplete dropdown can pull suggestions from. Toggle, reorder, and tune them to match how you want the dropdown to look.', 'wp-search-with-algolia' ),
			array(
				__( '<strong>Enable / disable.</strong> Use the toggle on each card to include that index in the dropdown. Disabled indices are still visible here so you can keep their settings without showing them to visitors.', 'wp-search-with-algolia' ),
				__( '<strong>Reorder.</strong> Drag the handle on the left of each card to change the order sections appear in the dropdown.', 'wp-search-with-algolia' ),
				__( '<strong>Section label.</strong> Shown as the heading above this group of suggestions in the dropdown (for example: <em>Articles</em>, <em>Products</em>, <em>Authors</em>).', 'wp-search-with-algolia' ),
				__( '<strong>Max. suggestions.</strong> Controls how many results from this index appear in the dropdown. Keep totals modest. A dropdown that scrolls is harder to scan than 3 to 5 well-chosen sections.', 'wp-search-with-algolia' ),
				__( '<strong>Re-index / Push settings.</strong> "Re-index" resends the records for that index. "Push settings" syncs ranking and searchable attributes up to Algolia. <strong>This overwrites changes you may have made directly in the Algolia dashboard.</strong>', 'wp-search-with-algolia' ),
			)
		);
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
		echo '<p>' . esc_html__( 'Show a dropdown of typo-tolerant suggestions while visitors type in your search field. Toggle the feature on, tune the timing, and choose which indices feed the dropdown.', 'wp-search-with-algolia' ) . '</p>';

		$indices = $this->autocomplete_config->get_form_data();
		if ( empty( $indices ) ) {
			echo '<div class="notice notice-warning inline algolia-inline-notice"><p>' .
				esc_html__( 'No indices are available yet. Configure at least one index on the Indexing page, then return here to choose which ones power the autocomplete dropdown.', 'wp-search-with-algolia' ) .
				'</p></div>';
		}
	}
}
