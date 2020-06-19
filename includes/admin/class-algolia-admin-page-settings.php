<?php

class Algolia_Admin_Page_Settings {

	/**
	 * @var string
	 */
	private $slug = 'algolia-account-settings';

	/**
	 * @var string
	 */
	private $capability = 'manage_options';

	/**
	 * @var string
	 */
	private $section = 'algolia_section_settings';

	/**
	 * @var string
	 */
	private $option_group = 'algolia_settings';

	/**
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * @param Algolia_Plugin $plugin
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
	 * @param array $links
	 *
	 * @return array
	 */
	public function add_action_links( array $links ) {
		return array_merge(
			$links, array(
				'<a href="' . esc_url( admin_url( 'admin.php?page=' . $this->slug ) ) . '">' . esc_html__( 'Settings', 'wp-search-with-algolia' ) . '</a>',
			)
		);
	}

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
				''
			);
		}

		add_submenu_page(
			'algolia',
			esc_html__( 'Settings', 'wp-search-with-algolia' ),
			esc_html__( 'Settings', 'wp-search-with-algolia' ),
			$this->capability,
			$this->slug,
			array( $this, 'display_page' )
		);
	}

	public function add_settings() {
		add_settings_section(
			$this->section,
			null,
			array( $this, 'print_section_settings' ),
			$this->slug
		);

		add_settings_field(
			'algolia_application_id',
			esc_html__( 'Application ID', 'wp-search-with-algolia' ),
			array( $this, 'application_id_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_search_api_key',
			esc_html__( 'Search-only API key', 'wp-search-with-algolia' ),
			array( $this, 'search_api_key_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_api_key',
			esc_html__( 'Admin API key', 'wp-search-with-algolia' ),
			array( $this, 'api_key_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_index_name_prefix',
			esc_html__( 'Index name prefix', 'wp-search-with-algolia' ),
			array( $this, 'index_name_prefix_callback' ),
			$this->slug,
			$this->section
		);

		register_setting( $this->option_group, 'algolia_application_id', array( $this, 'sanitize_application_id' ) );
		register_setting( $this->option_group, 'algolia_search_api_key', array( $this, 'sanitize_search_api_key' ) );
		register_setting( $this->option_group, 'algolia_api_key', array( $this, 'sanitize_api_key' ) );
		register_setting( $this->option_group, 'algolia_index_name_prefix', array( $this, 'sanitize_index_name_prefix' ) );
	}

	public function application_id_callback() {

		$settings      = $this->plugin->get_settings();
		$setting       = $settings->get_application_id();
		$disabled_html = $settings->is_application_id_in_config() ? ' disabled' : '';
?>
		<input type="text" name="algolia_application_id" class="regular-text" value="<?php echo esc_attr( $setting ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description"><?php esc_html_e( 'Your Algolia Application ID.', 'wp-search-with-algolia' ); ?></p>
<?php
	}

	public function search_api_key_callback() {
		$settings      = $this->plugin->get_settings();
		$setting       = $settings->get_search_api_key();
		$disabled_html = $settings->is_search_api_key_in_config() ? ' disabled' : '';

?>
		<input type="text" name="algolia_search_api_key" class="regular-text" value="<?php echo esc_attr( $setting ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description"><?php esc_html_e( 'Your Algolia Search-only API key (public).', 'wp-search-with-algolia' ); ?></p>
<?php
	}

	public function api_key_callback() {
		$settings      = $this->plugin->get_settings();
		$setting       = $settings->get_api_key();
		$disabled_html = $settings->is_api_key_in_config() ? ' disabled' : '';
?>
		<input type="password" name="algolia_api_key" class="regular-text" value="<?php echo esc_attr( $setting ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description"><?php esc_html_e( 'Your Algolia ADMIN API key (kept private).', 'wp-search-with-algolia' ); ?></p>
<?php
	}

	public function index_name_prefix_callback() {
		$settings          = $this->plugin->get_settings();
		$index_name_prefix = $settings->get_index_name_prefix();
		$disabled_html     = $settings->is_index_name_prefix_in_config() ? ' disabled' : '';
?>
		<input type="text" name="algolia_index_name_prefix" value="<?php echo esc_attr( $index_name_prefix ); ?>" <?php echo esc_html( $disabled_html ); ?>/>
		<p class="description" id="home-description"><?php esc_html_e( 'This prefix will be prepended to your index names.', 'wp-search-with-algolia' ); ?></p>
<?php
	}

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

	public function sanitize_search_api_key( $value ) {
		if ( $this->plugin->get_settings()->is_search_api_key_in_config() ) {
			$value = $this->plugin->get_settings()->get_search_api_key();
		}
		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_settings_error(
				$this->option_group,
				'empty',
				esc_html__( 'Search-only API key should not be empty.', 'wp-search-with-algolia' )
			);
		}

		return $value;
	}

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
					'We were unable to authenticate you against the Algolia servers with the provided information. Please ensure that you used an the Admin API key and a valid Application ID.',
					'algolia'
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
						'algolia'
					)
				);
				$settings->set_api_is_reachable( false );
			} else {
				add_settings_error(
					$this->option_group,
					'connection_success',
					esc_html__( 'We succesfully managed to connect to the Algolia servers with the provided information. Your search API key has also been checked and is OK.', 'wp-search-with-algolia' ),
					'updated'
				);
				$settings->set_api_is_reachable( true );
			}
		}

		return $value;
	}

	/**
	 * @param $index_name_prefix
	 *
	 * @return string
	 */
	public function is_valid_index_name_prefix( $index_name_prefix ) {
		$to_validate = str_replace( '_', '', $index_name_prefix );

		return ctype_alnum( $to_validate );
	}

	/**
	 * @param $value
	 *
	 * @return array
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
	 * Display the page.
	 */
	public function display_page() {
		require_once dirname( __FILE__ ) . '/partials/form-options.php';
	}

	public function display_errors() {
		settings_errors( $this->option_group );
	}

	public function print_section_settings() {
		echo '<p>' . esc_html__( 'Configure your Algolia account credentials. You can find them in the "API Keys" section of your Algolia dashboard.', 'wp-search-with-algolia' ) . '</p>';
		echo '<p>' . esc_html__( 'Once you provide your Algolia Application ID and API key, this plugin will be able to securely communicate with Algolia servers.', 'wp-search-with-algolia' ) . ' ' . esc_html__( 'We ensure your information is correct by testing them against the Algolia servers upon save.', 'wp-search-with-algolia' ) . '</p>';
		/* translators: the placeholder contains the URL to Algolia's website. */
		echo '<p>' . wp_kses_post( sprintf( __( 'No Algolia account yet? <a href="%s">Follow this link</a> to create one for free in a couple of minutes!', 'wp-search-with-algolia' ), 'https://www.algolia.com/users/sign_up' ) ) . '</p>';
	}
}
