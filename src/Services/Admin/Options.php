<?php
/**
 * Options service class file.
 *
 * @package WebDevStudios\WPSWA\Services\Admin
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services\Admin;

use \WebDevStudios\WPSWA\Services\Admin\Settings\AlgoliaApplicationId;
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
		\add_action( 'admin_init', [ $this, 'add_settings_section' ] );
		\add_action( 'admin_notices', array( $this, 'settings_errors' ) );
		\add_filter(
			'plugin_action_links_' . \plugin_basename( WPSWA_PLUGIN_FILE ),
			[ $this, 'add_plugin_settings_action_link' ]
		);
	}

	/**
	 * Display settings errors.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function settings_errors(): void {
		\settings_errors( $this->option_group );
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
	public function add_plugin_settings_action_link( array $actions ): array {

		$settings_url = \add_query_arg(
			[
				'page' => $this->slug,
			],
			\admin_url( 'admin.php' )
		);

		return \array_merge(
			$actions,
			[
				'<a href="' . \esc_url( $settings_url ) . '">'
				. \esc_html__( 'Settings', 'wp-search-with-algolia' )
				. '</a>',
			]
		);
	}

	/**
	 * Add menu page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function admin_menu(): void {
		\add_menu_page(
			\esc_html__( 'WP Search with Algolia', 'wp-search-with-algolia' ),
			\esc_html__( 'Algolia Settings', 'wp-search-with-algolia' ),
			'manage_options',
			$this->slug,
			[ $this, 'render_page' ],
			'dashicons-welcome-widgets-menus',
			90
		);
	}

	/**
	 * Add settings.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function add_settings_section(): void {
		\add_settings_section(
			$this->section,
			null,
			[ $this, 'render_settings_section' ],
			$this->slug
		);
	}

	/**
	 * Callback for add_options_page.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function render_page(): void {
		include_once WPSWA_PLUGIN_DIR . '/src/Views/Admin/Options.php';
	}

	/**
	 * Display the settings section.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function render_settings_section(): void {
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
}
