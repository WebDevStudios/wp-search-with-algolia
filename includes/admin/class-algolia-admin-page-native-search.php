<?php
/**
 * Algolia_Admin_Page_Native_Search class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Page_Native_Search
 *
 * @since 1.0.0
 */
class Algolia_Admin_Page_Native_Search {

	/**
	 * Admin page slug.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $slug = 'algolia-search-page';

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
	private $section = 'algolia_section_native_search';

	/**
	 * Admin page option group.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string
	 */
	private $option_group = 'algolia_native_search';

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
	 * Algolia_Admin_Page_Native_Search constructor.
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
	}

	/**
	 * Add submenu page.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function add_page() {
		add_submenu_page(
			'algolia',
			esc_html__( 'Search Page', 'wp-search-with-algolia' ),
			esc_html__( 'Search Page', 'wp-search-with-algolia' ),
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
			$this->section,
			null,
			array( $this, 'print_section_settings' ),
			$this->slug
		);

		add_settings_field(
			'algolia_override_native_search',
			esc_html__( 'Search results source', 'wp-search-with-algolia' ),
			array( $this, 'override_native_search_callback' ),
			$this->slug,
			$this->section
		);

		add_settings_field(
			'algolia_instantsearch_template_version',
			esc_html__( 'InstantSearch template', 'wp-search-with-algolia' ),
			array( $this, 'instantsearch_template_version' ),
			$this->slug,
			$this->section
		);

		register_setting( $this->option_group, 'algolia_override_native_search', array( $this, 'sanitize_override_native_search' ) );

		register_setting(
			$this->option_group,
			'algolia_instantsearch_template_version',
			[
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_text_field',
				'default'           => 'legacy',
			]
		);
	}

	/**
	 * Override native search callback.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function override_native_search_callback() {
		$value = $this->plugin->get_settings()->get_override_native_search();

		require dirname( __FILE__ ) . '/partials/form-override-search-option.php';

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Choose how WordPress search queries are answered. You can change this at any time.', 'wp-search-with-algolia' ),
			array(
				__( '<strong>Why use Algolia for search?</strong> Algolia returns ranked, typo-tolerant results in milliseconds, even on large sites. The standard WordPress search runs SQL <code>LIKE</code> queries, which slow down with content volume and miss close matches.', 'wp-search-with-algolia' ),
				__( '<strong>Switching is non-destructive.</strong> Your WordPress content is never modified. The plugin only changes how the search query is run and how the results page is rendered. Switch back to the standard WordPress search at any time.', 'wp-search-with-algolia' ),
				__( '<strong>Block (FSE) themes &amp; InstantSearch.</strong> If your active theme is a block theme (such as Twenty Twenty-Four or Twenty Twenty-Five), the plugin enqueues the InstantSearch assets but lets your block template render the page. You will need to add the InstantSearch markup yourself in the theme&rsquo;s search template, or copy <code>templates/instantsearch.php</code> into <code>your-theme/algolia/</code> and force the classic template by returning <code>false</code> from the <code>algolia_is_block_theme</code> filter.', 'wp-search-with-algolia' ),
				__( '<strong>Indexing is required.</strong> Algolia can only return what has been indexed. Use the <strong>Re-index All Content</strong> button at the top of this page after your first switch.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/',
				'label' => __( 'Read the InstantSearch.js overview', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Get Instantsearch template version
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.9.0
	 */
	public function instantsearch_template_version() {
		$value = $this->plugin->get_settings()->get_instantsearch_template_version();

		require dirname( __FILE__ ) . '/partials/form-override-search-version-option.php';

		Algolia_Admin_Field_Helpers::render_field_help(
			__( 'Only applies when "Use Algolia with InstantSearch.js" is selected above. Pick the template style your front-end search will use.', 'wp-search-with-algolia' ),
			array(
				__( '<strong>What this controls.</strong> Two reference templates ship with the plugin in <code>templates/instantsearch.php</code> and <code>templates/instantsearch-modern.php</code>. This setting decides which one the plugin loads on your search results page.', 'wp-search-with-algolia' ),
				__( '<strong>When to pick Legacy.</strong> Existing sites that already customized the older template, or have integrations relying on the WP Utils JavaScript helpers.', 'wp-search-with-algolia' ),
				__( '<strong>When to pick Modern.</strong> New installs and any site that wants to follow the patterns shown in current Algolia documentation.', 'wp-search-with-algolia' ),
				__( '<strong>Customizing the template.</strong> Copy the file you chose into <code>your-theme/algolia/</code> and the plugin will load your copy instead. Switching this setting does <strong>not</strong> overwrite a customized template in your theme.', 'wp-search-with-algolia' ),
			),
			array(),
			array(
				'url'   => 'https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/js/',
				'label' => __( 'Browse InstantSearch widget examples', 'wp-search-with-algolia' ),
			)
		);
	}

	/**
	 * Sanitize override native search.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $value The value to sanitize.
	 *
	 * @return array
	 */
	public function sanitize_override_native_search( $value ) {

		if ( 'backend' === $value ) {
			add_settings_error(
				$this->option_group,
				'native_search_enabled',
				esc_html__( 'WordPress search is now based on Algolia!', 'wp-search-with-algolia' ),
				'updated'
			);
		} elseif ( 'instantsearch' === $value ) {
			add_settings_error(
				$this->option_group,
				'native_search_enabled',
				esc_html__( 'WordPress search is now based on Algolia instantsearch.js!', 'wp-search-with-algolia' ),
				'updated'
			);
		} else {
			$value = 'native';
			add_settings_error(
				$this->option_group,
				'native_search_disabled',
				esc_html__( 'You chose to keep the WordPress native search instead of Algolia. If you are using the autocomplete feature of the plugin we highly recommend you turn Algolia search on instead of the WordPress native search.', 'wp-search-with-algolia' ),
				'updated'
			);
		}

		return $value;
	}

	/**
	 * Display the page.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function display_page() {
		require_once dirname( __FILE__ ) . '/partials/page-search.php';
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

		$settings = $this->plugin->get_settings();

		if ( ! $settings->should_override_search_in_backend() && ! $settings->should_override_search_with_instantsearch() ) {
			return;
		}

		$maybe_get_page = filter_input( INPUT_GET, 'page', FILTER_SANITIZE_SPECIAL_CHARS );

		$searchable_posts_index = $this->plugin->get_index( 'searchable_posts' );
		if ( empty( $searchable_posts_index ) ) {
			return;
		}
		if ( false === $searchable_posts_index->is_enabled() && ( ! empty( $maybe_get_page ) ) && $maybe_get_page === $this->slug ) {
			// translators: placeholder contains the link to the indexing page.
			$message = sprintf( __( 'Searchable posts index needs to be checked on the <a href="%s">Algolia: Indexing page</a> for the search results to be powered by Algolia.', 'wp-search-with-algolia' ), esc_url( admin_url( 'admin.php?page=algolia-indexing' ) ) );
			echo '<div class="error notice">
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
		echo '<p>' . esc_html__( 'Choose how WordPress should answer search queries, and pick the InstantSearch template style if you turn that experience on.', 'wp-search-with-algolia' ) . '</p>';

		echo '<details class="algolia-field-help algolia-field-help--inline">';
		echo '<summary>' . esc_html__( 'About the Re-index All Content and Push Settings buttons', 'wp-search-with-algolia' ) . '</summary>';
		echo '<div class="algolia-field-help__body">';
		echo '<p>' . wp_kses(
			sprintf(
				/* translators: 1: Re-index button label, 2: explanation. */
				__( '<strong>%1$s:</strong> resubmits your content to the Algolia search API. Search results refresh once indexing completes. Run this after switching modes for the first time, or any time you change content to be indexed, like new shared attributes, or bulk importing of content has been performed.', 'wp-search-with-algolia' ),
				esc_html__( 'Re-index All Content', 'wp-search-with-algolia' )
			),
			array( 'strong' => array() )
		) . '</p>';
		echo '<p>' . wp_kses(
			sprintf(
				/* translators: 1: Push Settings button label, 2: explanation, 3: warning. */
				__( '<strong>%1$s:</strong> pushes the index settings configured in this plugin (ranking, searchable attributes, facets) up to Algolia. <strong>%2$s</strong>', 'wp-search-with-algolia' ),
				esc_html__( 'Push Settings', 'wp-search-with-algolia' ),
				esc_html__( 'Warning: this overwrites changes you may have made directly in the Algolia dashboard.', 'wp-search-with-algolia' )
			),
			array( 'strong' => array() )
		) . '</p>';
		echo '</div></details>';

		// @Todo: replace this with a check on the searchable_posts_index.
		$indices = $this->plugin->get_indices(
			array(
				'enabled'  => true,
				'contains' => 'posts',
			)
		);

		if ( empty( $indices ) ) {
			echo '<div class="notice notice-warning inline algolia-inline-notice"><p>' .
				esc_html__( 'No posts have been indexed yet. Click "Re-index All Content" at the top of this page once your credentials are saved.', 'wp-search-with-algolia' ) .
				'</p></div>';
		}
	}
}
