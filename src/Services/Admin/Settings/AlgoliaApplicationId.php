<?php
/**
 * AlgoliaApplicationId Setting class file.
 *
 * @package WebDevStudios\WPSWA\Services\Admin\Settings
 * @since   2.0.0
 */

namespace WebDevStudios\WPSWA\Services\Admin\Settings;

use \WebDevStudios\WPSWA\Utility\AlgoliaSettings;
use \WebDevStudios\WPSWA\Structure\Service;

/**
 * Class AlgoliaApplicationId
 *
 * @since 2.0.0
 */
class AlgoliaApplicationId extends Service {

	/**
	 * The name of this option setting.
	 *
	 * Used for option_name in register_setting,
	 * and id in add_settings_field.
	 *
	 * @since  2.0.0
	 *
	 * @var string
	 */
	protected $option_name = 'algolia_application_id';

	/**
	 * The option group this option setting belongs to.
	 *
	 * Used for option_group in register_setting
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
		\add_action( 'admin_init', [ $this, 'register_setting' ] );
		\add_action( 'admin_init', [ $this, 'add_settings_field' ] );
	}

	/**
	 * Get the option name.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @return string
	 */
	public function get_option_name(): string {
		return $this->option_name;
	}

	/**
	 * Get the option group.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @return string
	 */
	public function get_option_group(): string {
		return $this->option_group;
	}

	/**
	 * Register this setting.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function register_setting(): void {
		\register_setting(
			$this->get_option_group(),
			$this->get_option_name(),
			[
				'type'              => 'text',
				'description'       => \esc_html__( 'Algolia Application ID', 'wp-search-with-algolia' ),
				'sanitize_callback' => [ $this, 'sanitize_callback' ],
				'show_in_rest'      => false,
				'default'           => '',
			]
		);
	}

	/**
	 * Add this setting field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function add_settings_field(): void {
		\add_settings_field(
			$this->get_option_name(),
			\esc_html__( 'Application ID', 'wp-search-with-algolia' ),
			[ $this, 'render_field' ],
			'wpswa',
			'algolia_section_settings'
		);
	}

	/**
	 * Sanitize callback for the field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 *
	 * @param string|null $value The value to sanitize.
	 *
	 * @return string|null
	 */
	public function sanitize_callback( ?string $value = '' ): ?string {

		if ( $this->algolia_settings->is_app_id_in_config() ) {
			$value = $this->algolia_settings->get_app_id();
		}

		$value = sanitize_text_field( $value );

		if ( empty( $value ) ) {
			add_settings_error(
				$this->get_option_group(),
				'empty',
				esc_html__( 'Application ID should not be empty.', 'wp-search-with-algolia' )
			);
		}

		return $value;
	}

	/**
	 * Render callback for the field.
	 *
	 * @since  2.0.0
	 * @author WebDevStudios <contact@webdevstudios.com>
	 */
	public function render_field(): void {
		include_once WPSWA_PLUGIN_DIR . '/src/Views/Admin/Settings/AlgoliaApplicationId.php';
	}
}
