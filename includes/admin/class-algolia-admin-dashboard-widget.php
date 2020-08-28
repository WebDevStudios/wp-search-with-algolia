<?php
/**
 * Algolia admin dashboard widget.
 *
 * @author WebDevStudios <contact@webdevstudios.com>
 * @since  1.5.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Algolia admin dashboard widget class.
 *
 * @since 1.5.0
 */
class Algolia_Admin_Dashboard_Widget {

	/**
	 * The Algolia_Plugin instance.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @var Algolia_Plugin
	 */
	private $plugin;

	/**
	 * Algolia_Admin_Page_Settings constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @param Algolia_Plugin $plugin The Algolia_Plugin instance.
	 */
	public function __construct( Algolia_Plugin $plugin ) {
		$this->plugin = $plugin;

		add_action( 'wp_dashboard_setup', [ $this, 'register_widget' ] );
	}

	/**
	 * Register dashboard widget.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 */
	public function register_widget() {
		wp_add_dashboard_widget(
			'wpswa_stats_widget',
			esc_html__( 'Algolia Stats Widget', 'wp-search-with-algolia' ),
			[ $this, 'display_stats_widget' ]
		);
	}

	/**
	 * Display stats in the widget.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 */
	public function display_stats_widget() {
		$api          = $this->plugin->get_api();
		$is_reachable = $api->is_reachable();
		$indices      = [];

		if ( $is_reachable ) {
			$indices = $api->get_client()->listIndices();
		}

		require_once dirname( __FILE__ ) . '/partials/dashboard-stats-widget.php';
	}
}
