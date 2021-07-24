<?php
/**
 * Algolia_Template_Loader class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Template_Loader
 *
 * @since 1.0.0
 */
class Algolia_Template_Loader {

	/**
	 * The Algolia Plugin.
	 *
	 * @since 1.0.0
	 *
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Algolia_Template_Loader constructor.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param Algolia_Plugin $plugin The Algolia Plugin.
	 */
	public function __construct( Algolia_Plugin $plugin ) {
		$this->plugin = $plugin;

		$in_footer = Algolia_Utils::get_scripts_in_footer_argument();

		// Inject Algolia configuration in a JavaScript variable.
		if ( true === $in_footer ) {
			add_filter(
				'wp_footer',
				[ $this, 'load_algolia_config' ]
			);
		} else {
			add_filter(
				'wp_head',
				[ $this, 'load_algolia_config' ]
			);
		}

		// Listen for native templates to override.
		add_filter( 'template_include', array( $this, 'template_loader' ) );

		// Load autocomplete.js search experience if its enabled.
		if ( $this->should_load_autocomplete() ) {
			add_filter( 'wp_enqueue_scripts', array( $this, 'enqueue_autocomplete_scripts' ) );

			if ( true === $in_footer ) {
				add_filter( 'wp_footer', array( $this, 'load_autocomplete_template' ) );
			} else {
				add_filter( 'wp_head', array( $this, 'load_autocomplete_template' ) );
			}
		}
	}

	/**
	 * Load config.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 */
	public function load_algolia_config() {
		$settings            = $this->plugin->get_settings();
		$autocomplete_config = $this->plugin->get_autocomplete_config();

		$config = array(
			'debug'              => defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG,
			'application_id'     => $settings->get_application_id(),
			'search_api_key'     => $settings->get_search_api_key(),
			'powered_by_enabled' => $settings->is_powered_by_enabled(),
			'query'              => get_search_query(),
			'autocomplete'       => array(
				'sources'        => $autocomplete_config->get_config(),
				'input_selector' => (string) apply_filters( 'algolia_autocomplete_input_selector', "input[name='s']:not('.no-autocomplete')" ),
			),
			'indices'            => array(),
		);

		// Inject all the indices into the config to ease instantsearch.js integrations.
		$indices = $this->plugin->get_indices(
			array(
				'enabled' => true,
			)
		);
		foreach ( $indices as $index ) {
			$config['indices'][ $index->get_id() ] = $index->to_array();
		}

		// Give developers a last chance to alter the configuration.
		$config = (array) apply_filters( 'algolia_config', $config );

		echo '<script type="text/javascript">var algolia = ' . wp_json_encode( $config ) . ';</script>';
	}

	/**
	 * Determines whether we should load autocomplete.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @return bool
	 */
	private function should_load_autocomplete() {
		$settings     = $this->plugin->get_settings();
		$autocomplete = $this->plugin->get_autocomplete_config();

		if ( null === $autocomplete ) {
			// The user has not provided his credentials yet.
			return false;
		}

		$config = $autocomplete->get_config();
		if ( 'yes' !== $settings->get_autocomplete_enabled() ) {
			return false;
		}

		return ! empty( $config );
	}

	/**
	 * Enqueue Algolia autocomplete.js scripts.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 */
	public function enqueue_autocomplete_scripts() {

		// Enqueue the autocomplete.js default styles.
		wp_enqueue_style( 'algolia-autocomplete' );

		// Javascript.
		wp_enqueue_script( 'algolia-search' );

		// Enqueue the autocomplete.js library.
		wp_enqueue_script( 'algolia-autocomplete' );
		wp_enqueue_script( 'algolia-autocomplete-noconflict' );

		// Allow users to easily enqueue custom styles and scripts.
		do_action( 'algolia_autocomplete_scripts' );
	}

	/**
	 * Load a template.
	 *
	 * Handles template usage so that we can use our own templates instead of the themes.
	 *
	 * Plugin templates are located in the 'templates' directory.
	 * Customized templates are in the theme's 'algolia' directory.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param mixed $template The template to load.
	 *
	 * @return string
	 */
	public function template_loader( $template ) {
		$settings = $this->plugin->get_settings();
		if ( is_search() && $settings->should_override_search_with_instantsearch() ) {

			return $this->load_instantsearch_template();
		}

		return $template;
	}

	/**
	 * Load the instantsearch template.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @return string
	 */
	public function load_instantsearch_template() {
		add_action(
			'wp_enqueue_scripts',
			function () {
				// Enqueue the instantsearch.js default styles.
				wp_enqueue_style( 'algolia-instantsearch' );

				// Enqueue the instantsearch.js library.
				wp_enqueue_script( 'algolia-instantsearch' );

				// Allow users to easily enqueue custom styles and scripts.
				do_action( 'algolia_instantsearch_scripts' );
			}
		);

		return Algolia_Template_Utils::locate_template( 'instantsearch.php' );
	}

	/**
	 * Load the autocomplete template.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 */
	public function load_autocomplete_template() {
		require Algolia_Template_Utils::locate_template( 'autocomplete.php' );
	}

	/**
	 * Locate a template.
	 *
	 * @author     WebDevStudios <contact@webdevstudios.com>
	 * @since      1.0.0
	 * @deprecated 1.8.0 Use Algolia_Template_Utils::locate_template()
	 * @see        Algolia_Template_Utils::locate_template()
	 *
	 * @param string $file The template file.
	 *
	 * @return string
	 */
	private function locate_template( $file ) {
		_deprecated_function(
			__METHOD__,
			'1.8.0',
			'Algolia_Template_Utils::locate_template()'
		);
		return Algolia_Template_Utils::locate_template( $file );
	}
}
