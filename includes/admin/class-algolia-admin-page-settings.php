<?php
/**
 * Algolia_Admin_Page_Settings class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Page_Settings
 *
 * @since 1.0.0
 */
class Algolia_Admin_Page_Settings {

	/**
	 * Admin page slug.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $slug = 'algolia-account-settings';

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
	 * Credentials settings section ID.
	 *
	 * @since 2.11.0
	 *
	 * @var string
	 */
	private $section_credentials = 'algolia_section_credentials';

	/**
	 * Display & analytics settings section ID.
	 *
	 * @since 2.11.0
	 *
	 * @var string
	 */
	private $section_display = 'algolia_section_display';

	/**
	 * Admin page option group.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $option_group = 'algolia_settings';

	/**
	 * The Algolia_Plugin instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Algolia_Admin_Page_Settings constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param Algolia_Plugin $plugin The Algolia_Plugin instance.
	 */
	public function __construct( Algolia_Plugin $plugin ) {
		$this->plugin = $plugin;

		add_action( 'admin_menu', array( $this, 'add_page' ) );
		add_action( 'admin_init', array( $this, 'add_settings' ) );
		add_action( 'admin_notices', array( $this, 'display_errors' ) );

		// Display a link to this page from the plugins page.
		add_filter( 'plugin_action_links_' . ALGOLIA_PLUGIN_BASENAME, array( $this, 'add_action_links' ) );
	}

	/**
	 * Add action links.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param array $links Array of action links.
	 *
	 * @return array
	 */
	public function add_action_links( array $links ) {
		return array_merge(
			$links,
			array(
				'<a href="' . esc_url( admin_url( 'admin.php?page=' . $this->slug ) ) . '">' . esc_html__( 'Settings', 'wp-search-with-algolia' ) . '</a>',
			)
		);
	}

	/**
	 * Add admin menu page.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string|void The resulting page's hook_suffix.
	 */
	public function add_page() {
		$api = $this->plugin->get_api();
		if ( ! $api->is_reachable() ) {
			// Means this is the only reachable admin page, so make it the default one!
			return add_menu_page(
				'WP Search with Algolia',
				esc_html__( 'Algolia Search', 'wp-search-with-algolia' ),
				'manage_options',
				$this->slug,
				array( $this, 'display_page' ),
				'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwLjM0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzAwM2RmZjt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUwLDBDMTEzLjM4LDAsMiwxMTAuMTYsLjAzLDI0Ni4zMmMtMiwxMzguMjksMTEwLjE5LDI1Mi44NywyNDguNDksMjUzLjY3LDQyLjcxLC4yNSw4My44NS0xMC4yLDEyMC4zOC0zMC4wNSwzLjU2LTEuOTMsNC4xMS02LjgzLDEuMDgtOS41MmwtMjMuMzktMjAuNzRjLTQuNzUtNC4yMi0xMS41Mi01LjQxLTE3LjM3LTIuOTItMjUuNSwxMC44NS01My4yMSwxNi4zOS04MS43NiwxNi4wNC0xMTEuNzUtMS4zNy0yMDIuMDQtOTQuMzUtMjAwLjI2LTIwNi4xLDEuNzYtMTEwLjMzLDkyLjA2LTE5OS41NSwyMDIuOC0xOTkuNTVoMjAyLjgzVjQwNy42OGwtMTE1LjA4LTEwMi4yNWMtMy43Mi0zLjMxLTkuNDMtMi42Ni0xMi40MywxLjMxLTE4LjQ3LDI0LjQ2LTQ4LjU2LDM5LjY3LTgxLjk4LDM3LjM2LTQ2LjM2LTMuMi04My45Mi00MC41Mi04Ny40LTg2Ljg2LTQuMTUtNTUuMjgsMzkuNjUtMTAxLjU4LDk0LjA3LTEwMS41OCw0OS4yMSwwLDg5Ljc0LDM3Ljg4LDkzLjk3LDg2LjAxLC4zOCw0LjI4LDIuMzEsOC4yOCw1LjUzLDExLjEzbDI5Ljk3LDI2LjU3YzMuNCwzLjAxLDguOCwxLjE3LDkuNjMtMy4zLDIuMTYtMTEuNTUsMi45Mi0yMy42LDIuMDctMzUuOTUtNC44My03MC4zOS02MS44NC0xMjcuMDEtMTMyLjI2LTEzMS4zNS04MC43My00Ljk4LTE0OC4yMyw1OC4xOC0xNTAuMzcsMTM3LjM1LTIuMDksNzcuMTUsNjEuMTIsMTQzLjY2LDEzOC4yOCwxNDUuMzYsMzIuMjEsLjcxLDYyLjA3LTkuNDIsODYuMi0yNi45N2wxNTAuMzYsMTMzLjI5YzYuNDUsNS43MSwxNi42MiwxLjE0LDE2LjYyLTcuNDhWOS40OUM1MDAsNC4yNSw0OTUuNzUsMCw0OTAuNTEsMEgyNTBaIi8+PC9zdmc+'
			);
		}

		add_submenu_page(
			'algolia',
			esc_html__( 'WP Search with Algolia Settings', 'wp-search-with-algolia' ),
			esc_html__( 'Settings', 'wp-search-with-algolia' ),
			$this->capability,
			$this->slug,
			array( $this, 'display_page' ),
			0
		);
	}

	/**
	 * Add settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function add_settings() {
		add_settings_section(
			$this->section_credentials,
			esc_html__( 'Algolia account credentials', 'wp-search-with-algolia' ),
			array( $this, 'print_section_credentials' ),
			$this->slug
		);

		add_settings_section(
			$this->section_display,
			esc_html__( 'Display & analytics', 'wp-search-with-algolia' ),
			array( $this, 'print_section_display' ),
			$this->slug
		);

		add_settings_field(
			'algolia_application_id',
			esc_html__( 'Application ID', 'wp-search-with-algolia' ),
			array( $this, 'application_id_callback' ),
			$this->slug,
			$this->section_credentials
		);

		add_settings_field(
			'algolia_search_api_key',
			esc_html__( 'Search API Key', 'wp-search-with-algolia' ),
			array( $this, 'search_api_key_callback' ),
			$this->slug,
			$this->section_credentials
		);

		add_settings_field(
			'algolia_api_key',
			esc_html__( 'Admin API Key', 'wp-search-with-algolia' ),
			array( $this, 'api_key_callback' ),
			$this->slug,
			$this->section_credentials
		);

		add_settings_field(
			'algolia_index_name_prefix',
			esc_html__( 'Index Name Prefix', 'wp-search-with-algolia' ),
			array( $this, 'index_name_prefix_callback' ),
			$this->slug,
			$this->section_credentials
		);

		add_settings_field(
			'algolia_powered_by_enabled',
			esc_html__( 'Algolia "Powered by" Logo', 'wp-search-with-algolia' ),
			array( $this, 'powered_by_enabled_callback' ),
			$this->slug,
			$this->section_display
		);

		add_settings_field(
			'algolia_insights_enabled',
			esc_html__( 'Send Click & Conversion Events to Algolia', 'wp-search-with-algolia' ),
			array( $this, 'insights_enabled_callback' ),
			$this->slug,
			$this->section_display
		);

		register_setting( $this->option_group, 'algolia_application_id', array( $this, 'sanitize_application_id' ) );
		register_setting( $this->option_group, 'algolia_search_api_key', array( $this, 'sanitize_search_api_key' ) );
		register_setting( $this->option_group, 'algolia_api_key', array( $this, 'sanitize_api_key' ) );
		register_setting( $this->option_group, 'algolia_index_name_prefix', array( $this, 'sanitize_index_name_prefix' ) );
		register_setting( $this->option_group, 'algolia_powered_by_enabled', array( $this, 'sanitize_powered_by_enabled' ) );
		register_setting( $this->option_group, 'algolia_insights_enabled', array( $this, 'sanitize_insights_enabled' ) );
	}

	/**
	 * Application ID callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function application_id_callback() {

		$settings      = $this->plugin->get_settings();
		$setting       = $settings->get_application_id();
		$is_locked     = $settings->is_application_id_in_config();
		$disabled_html = $is_locked ? ' disabled' : '';
		?>
		<input type="text" name="algolia_application_id" class="regular-text" value="<?php echo esc_attr( $setting ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<?php
		if ( $is_locked ) {
			Algolia_Admin_Field_Helpers::render_constant_locked_notice( 'ALGOLIA_APPLICATION_ID' );
		}
		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Your unique Algolia Application ID.', 'wp-search-with-algolia' ),
			array(
				__( 'Find this in your Algolia dashboard under <strong>Settings &rarr; API Keys</strong>. It is a short string of letters and numbers (for example <code>LATENCY</code>) that identifies your Algolia application.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://dashboard.algolia.com/account/api-keys/all',
				'label' => __( 'Open the API Keys page in your Algolia dashboard', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Search API key callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function search_api_key_callback() {
		$settings      = $this->plugin->get_settings();
		$setting       = $settings->get_search_api_key();
		$is_locked     = $settings->is_search_api_key_in_config();
		$disabled_html = $is_locked ? ' disabled' : '';
		?>
		<input type="text" name="algolia_search_api_key" class="regular-text" value="<?php echo esc_attr( $setting ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<?php
		if ( $is_locked ) {
			Algolia_Admin_Field_Helpers::render_constant_locked_notice( 'ALGOLIA_SEARCH_API_KEY' );
		}
		Algolia_Admin_Field_Helpers::render_field_help(
			esc_html__( 'Public, search key safe to expose to your visitors.', 'wp-search-with-algolia' ),
			[
				__( 'Find this on the <strong>API Keys</strong> page in your Algolia dashboard. The Search key is included in the JavaScript that runs on your site, so it must be the search key, never the Admin key.', 'wp-search-with-algolia' ),
			],
			[
				esc_html__( 'Has search permission only. It cannot modify or delete data.', 'wp-search-with-algolia' ),
				esc_html__( 'Should not have a time-limited validity, or your front-end search will stop working when it expires.', 'wp-search-with-algolia' ),
			],
			[
				'url'   => 'https://dashboard.algolia.com/account/api-keys/all',
				'label' => esc_html__( 'Open the API Keys page in your Algolia dashboard', 'wp-search-with-algolia' ),
			]
		);
	}

	/**
	 * Admin API key callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function api_key_callback() {
		$settings      = $this->plugin->get_settings();
		$setting       = $settings->get_api_key();
		$is_locked     = $settings->is_api_key_in_config();
		$disabled_html = $is_locked ? ' disabled' : '';
		?>
		<input type="password" name="algolia_api_key" class="regular-text" value="<?php echo esc_attr( $setting ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<?php
		if ( $is_locked ) {
			Algolia_Admin_Field_Helpers::render_constant_locked_notice( 'ALGOLIA_API_KEY' );
		}
		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Private key used by WordPress to push and update your indices. Never share it.', 'wp-search-with-algolia' ),
			array(
				__( 'Find this on the <strong>API Keys</strong> page in your Algolia dashboard. WordPress uses this key on the server side to create indices, push records, and update settings. It is <strong>never</strong> sent to the browser.', 'wp-search-with-algolia' ),
			),
			array(
				__( 'Treat this like a password. Anyone with it can modify or delete your Algolia data.', 'wp-search-with-algolia' ),
				__( 'Tip: store it in <code>wp-config.php</code> as <code>ALGOLIA_API_KEY</code> if you would rather keep it out of the database.', 'wp-search-with-algolia' ),
			),
			array(
				'url'   => 'https://www.algolia.com/doc/guides/security/api-keys/',
				'label' => __( 'Read the Algolia API keys guide', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Index name prefix callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function index_name_prefix_callback() {
		$settings          = $this->plugin->get_settings();
		$index_name_prefix = $settings->get_index_name_prefix();
		$is_locked         = $settings->is_index_name_prefix_in_config();
		$disabled_html     = $is_locked ? ' disabled' : '';
		?>
		<input type="text" name="algolia_index_name_prefix" value="<?php echo esc_attr( $index_name_prefix ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<?php
		if ( $is_locked ) {
			Algolia_Admin_Field_Helpers::render_constant_locked_notice( 'ALGOLIA_INDEX_NAME_PREFIX' );
		}
		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Prepended to every index this site creates in Algolia.', 'wp-search-with-algolia' ),
			array(
				__( 'Use a unique prefix for each WordPress environment that shares the same Algolia application: for example <code>prod_</code>, <code>staging_</code>, or <code>dev_</code>. This prevents environments from overwriting each other&rsquo;s indices.', 'wp-search-with-algolia' ),
			),
			array(
				__( 'Allowed characters: letters, numbers, and underscores.', 'wp-search-with-algolia' ),
				__( 'Default: <code>wp_</code>. Changing this after indexing will require a re-index of your content.', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Powered by enabled callback.
	 *
	 * @author Richard Aber <richard.aber@webdevstudios.com>
	 * @since  2020-07-24
	 */
	public function powered_by_enabled_callback() {
		$powered_by_enabled = $this->plugin->get_settings()->is_powered_by_enabled();
		$checked            = '';
		if ( ! $powered_by_enabled ) {
			$checked = ' checked';
		}
		echo '<label><input type="checkbox" name="algolia_powered_by_enabled" value="no"' . esc_html( $checked ) . ' /> ';
		echo esc_html__( 'Hide the Algolia logo on the autocomplete dropdown and search results page.', 'wp-search-with-algolia' );
		echo '</label>';

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Controls whether the &ldquo;Powered by Algolia&rdquo; logo appears alongside your search results.', 'wp-search-with-algolia' ),
			array(
				__( '<strong>Algolia&rsquo;s Terms of Service require the logo to remain visible on the free Community plan.</strong> Only enable this option if you are on a paid Algolia plan that permits removing the logo.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://www.algolia.com/pricing/',
				'label' => __( 'Compare Algolia plans', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Insights enabled callback.
	 *
	 * @since 2.10.2
	 */
	public function insights_enabled_callback() {
		$insights_enabled = $this->plugin->get_settings()->is_insights_enabled();
		$checked          = '';
		if ( $insights_enabled ) {
			$checked = ' checked';
		}
		echo '<label><input type="checkbox" name="algolia_insights_enabled" value="yes"' . esc_html( $checked ) . ' /> ';
		echo esc_html__( 'Send anonymous click and conversion events from your search to Algolia.', 'wp-search-with-algolia' );
		echo '</label>';

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Powers your Algolia analytics dashboard and helps Algolia rank the most useful results higher.', 'wp-search-with-algolia' ),
			array(
				__( '<strong>What it does.</strong> When enabled, the plugin sends anonymous events to Algolia each time a visitor interacts with your search results. Specifically, it tracks:', 'wp-search-with-algolia' ),
				array(
					__( '<strong>Clicks:</strong> which result a visitor clicked, and where it appeared in the list.', 'wp-search-with-algolia' ),
					__( '<strong>Conversions:</strong> when a clicked result is treated as a successful outcome.', 'wp-search-with-algolia' ),
					__( '<strong>Queries:</strong> the search term tied to each click or conversion.', 'wp-search-with-algolia' ),
				),
				__( '<strong>Why turn it on.</strong> These events feed two things in your Algolia dashboard:', 'wp-search-with-algolia' ),
				array(
					__( '<strong>Analytics:</strong> see top searches, click-through rates, and no-result queries under the <strong>Analytics</strong> section of your Algolia dashboard.', 'wp-search-with-algolia' ),
					__( '<strong>Better relevance:</strong> Algolia&rsquo;s Dynamic Re-Ranking and Personalization features use these events to surface the results your visitors actually find useful.', 'wp-search-with-algolia' ),
				),
				__( '<strong>Privacy.</strong> Events are sent with an <em>anonymous user token</em> generated per browser session. No WordPress user IDs, IP addresses, email addresses, or other personally identifiable information are sent. The token only has meaning inside Algolia&rsquo;s analytics.', 'wp-search-with-algolia' ),
				__( '<strong>How to verify it&rsquo;s working.</strong> After enabling, perform a search on your site and click a result. Within a few minutes the event should appear in your Algolia dashboard under <strong>Data Sources &rarr; Events</strong>. Use the <strong>Events Debugger</strong> tab for live inspection.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://www.algolia.com/doc/guides/building-search-ui/events/js/',
				'label' => __( 'Read the Algolia Insights & events documentation', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Sanitize application ID.
	 *
	 * @author Richard Aber <richard.aber@webdevstudios.com>
	 * @since  2020-07-24
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return string
	 */
	public function sanitize_application_id( $value ) {
		if ( $this->plugin->get_settings()->is_application_id_in_config() ) {
			$value = $this->plugin->get_settings()->get_application_id();
		}
		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_settings_error(
				$this->option_group,
				'empty',
				esc_html__( 'Application ID should not be empty.', 'wp-search-with-algolia' )
			);

		}

		return $value;
	}

	/**
	 * Sanitize search API key.
	 *
	 * @author Richard Aber <richard.aber@webdevstudios.com>
	 * @since  2020-07-24
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return string
	 */
	public function sanitize_search_api_key( $value ) {
		if ( $this->plugin->get_settings()->is_search_api_key_in_config() ) {
			$value = $this->plugin->get_settings()->get_search_api_key();
		}
		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_settings_error(
				$this->option_group,
				'empty',
				esc_html__( 'Search API key should not be empty.', 'wp-search-with-algolia' )
			);
		}

		return $value;
	}

	/**
	 * Sanitize Admin API key.
	 *
	 * @author Richard Aber <richard.aber@webdevstudios.com>
	 * @since  2020-07-24
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return string
	 */
	public function sanitize_api_key( $value ) {
		if ( $this->plugin->get_settings()->is_api_key_in_config() ) {
			$value = $this->plugin->get_settings()->get_api_key();
		}
		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_settings_error(
				$this->option_group,
				'empty',
				esc_html__( 'API key should not be empty', 'wp-search-with-algolia' )
			);
		}

		$errors = get_settings_errors( $this->option_group );

		// @todo Not 100% clear why this is returning here.
		if ( ! empty( $errors ) ) {
			return $value;
		}

		$settings = $this->plugin->get_settings();

		$valid_credentials = true;
		try {
			Algolia_API::assert_valid_credentials( $settings->get_application_id(), $value );
		} catch ( Exception $exception ) {
			$valid_credentials = false;
			add_settings_error(
				$this->option_group,
				'login_exception',
				$exception->getMessage()
			);
		}

		if ( ! $valid_credentials ) {
			add_settings_error(
				$this->option_group,
				'no_connection',
				esc_html__(
					'We were unable to authenticate you against the Algolia servers with the provided information. Please ensure that you used a valid Application ID and Admin API key.',
					'wp-search-with-algolia'
				)
			);
			$settings->set_api_is_reachable( false );
		} else {
			if ( ! Algolia_API::is_valid_search_api_key( $settings->get_application_id(), $settings->get_search_api_key() ) ) {
				add_settings_error(
					$this->option_group,
					'wrong_search_API_key',
					esc_html__(
						'It looks like your search API key is wrong. Ensure that the key you entered has only the search capability and nothing else. Also ensure that the key has no limited time validity.',
						'wp-search-with-algolia'
					)
				);
				$settings->set_api_is_reachable( false );
			} else {
				add_settings_error(
					$this->option_group,
					'connection_success',
					esc_html__( 'Connection to the Algolia servers was succesful! Configure your Search Page to start using Algolia!', 'wp-search-with-algolia' ),
					'updated'
				);
				$settings->set_api_is_reachable( true );
			}
		}

		return $value;
	}

	/**
	 * Determine if the index name prefix is valid.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $index_name_prefix The index name prefix.
	 *
	 * @return bool
	 */
	public function is_valid_index_name_prefix( $index_name_prefix ) {
		$to_validate = str_replace( '_', '', $index_name_prefix );

		return ctype_alnum( $to_validate );
	}

	/**
	 * Sanitize the index name prefix.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return bool|mixed|string|void
	 */
	public function sanitize_index_name_prefix( $value ) {
		if ( $this->plugin->get_settings()->is_index_name_prefix_in_config() ) {
			$value = $this->plugin->get_settings()->get_index_name_prefix();
		}

		if ( $this->is_valid_index_name_prefix( $value ) ) {
			return $value;
		}

		add_settings_error(
			$this->option_group,
			'wrong_prefix',
			esc_html__( 'Indices prefix can only contain alphanumeric characters and underscores.', 'wp-search-with-algolia' )
		);

		$value = get_option( 'algolia_index_name_prefix' );

		return $this->is_valid_index_name_prefix( $value ) ? $value : 'wp_';
	}

	/**
	 * Sanitize the powered by enabled setting.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return string
	 */
	public function sanitize_powered_by_enabled( $value ) {
		return 'no' === $value ? 'no' : 'yes';
	}

	/**
	 * Sanitize the insights enabled setting.
	 *
	 * @since 2.10.2
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return string
	 */
	public function sanitize_insights_enabled( $value ) {
		return 'yes' === $value ? 'yes' : 'no';
	}

	/**
	 * Display the page.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function display_page() {
		require_once dirname( __FILE__ ) . '/partials/form-options.php';
	}

	/**
	 * Display errors.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function display_errors() {
		settings_errors( $this->option_group );
	}

	/**
	 * Print the credentials section intro.
	 *
	 * @since 2.11.0
	 */
	public function print_section_credentials() {
		$allowed = array(
			'a' => array(
				'href'   => array(),
				'target' => array(),
				'rel'    => array(),
			),
		);

		echo '<p>' . wp_kses(
			sprintf(
				/* translators: %s: URL to API keys section in Algolia dashboard. */
				__( 'Connect WordPress to your Algolia account. You can find these credentials in the <a href="%s" target="_blank" rel="noopener noreferrer">API Keys</a> section of your Algolia dashboard.', 'wp-search-with-algolia' ),
				'https://dashboard.algolia.com/account/api-keys/all'
			),
			$allowed
		) . '</p>';

		echo '<p>' . wp_kses(
			sprintf(
				/* translators: %s: URL to Algolia signup page. */
				__( 'No Algolia account yet? <a href="%s" target="_blank" rel="noopener noreferrer">Create one for free</a> in a couple of minutes.', 'wp-search-with-algolia' ),
				'https://dashboard.algolia.com/users/sign_up'
			),
			$allowed
		) . '</p>';

		echo '<p class="description">' . esc_html__( 'When you save this page, the plugin will test your credentials against the Algolia servers.', 'wp-search-with-algolia' ) . '</p>';
	}

	/**
	 * Print the display & analytics section intro.
	 *
	 * @since 2.11.0
	 */
	public function print_section_display() {
		echo '<p>' . esc_html__( 'Control how the Algolia logo appears on your site and choose whether to send anonymous click and conversion events back to Algolia.', 'wp-search-with-algolia' ) . '</p>';
	}
}
