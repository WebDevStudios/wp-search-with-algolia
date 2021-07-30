<?php
/**
 * Algolia_Plugin class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

namespace WebDevStudios\WPSWA;

use WebDevStudios\WPSWA\Admin\Admin;
use WebDevStudios\WPSWA\Admin\UpdateMessages;
use WebDevStudios\WPSWA\Factories\PluginFactory;
use WebDevStudios\WPSWA\Indices\AbstractIndex;
use WebDevStudios\WPSWA\Indices\PostsIndex;
use WebDevStudios\WPSWA\Indices\SearchablePostsIndex;
use WebDevStudios\WPSWA\Indices\TermsIndex;
use WebDevStudios\WPSWA\Indices\UsersIndex;
use WebDevStudios\WPSWA\Utilities\TemplateUtils;
use WebDevStudios\WPSWA\Watchers\PostChangesWatcher;
use WebDevStudios\WPSWA\Watchers\TermChangesWatcher;
use WebDevStudios\WPSWA\Watchers\UserChangesWatcher;

/**
 * Class Algolia_Plugin
 *
 * @since 1.0.0
 */
class Plugin {

	const NAME = 'algolia';

	/**
	 * Instance of Algolia_API.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Api
	 */
	protected $api;

	/**
	 * Instance of Algolia_Settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Settings
	 */
	private $settings;

	/**
	 * Instance of Algolia_Autocomplete_Config.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var AutocompleteConfig
	 */
	private $autocomplete_config;

	/**
	 * Array of indices.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var array
	 */
	private $indices;

	/**
	 * Array of watchers.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var array
	 */
	private $changes_watchers;

	/**
	 * Instance of Algolia_Styles.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @var Styles
	 */
	private $styles;

	/**
	 * Instance of Algolia_Scripts.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @var Scripts
	 */
	private $scripts;

	/**
	 * Instance of Algolia_Update_Messages.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @var UpdateMessages
	 */
	private $update_messages;

	/**
	 * Instance of Algolia_Template_Loader.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var TemplateLoader
	 */
	private $template_loader;

	/**
	 * Instance of Algolia_Compatibility.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var Compatibility
	 */
	private $compatibility;

	/**
	 * Get the singleton instance of Algolia_Plugin.
	 *
	 * @author     WebDevStudios <contact@webdevstudios.com>
	 * @since      1.0.0
	 * @deprecated 1.6.0 Use Algolia_Plugin_Factory::create()
	 * @see        PluginFactory::create()
	 *
	 * @return Plugin
	 */
	public static function get_instance() {
		_deprecated_function( __METHOD__, '1.6.0', 'Algolia_Plugin_Factory::create();' );
		return PluginFactory::create();
	}

	/**
	 * Algolia_Plugin constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function __construct() {
		$this->settings        = new Settings();
		$this->api             = new Api( $this->settings );
		$this->compatibility   = new Compatibility();
		$this->styles          = new Styles();
		$this->scripts         = new Scripts();
		$this->update_messages = new UpdateMessages();

		add_action( 'init', array( $this, 'load' ), 20 );
	}

	/**
	 * Load.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function load() {
		if ( $this->api->is_reachable() ) {
			$this->load_indices();
			$this->override_wordpress_search();
			$this->autocomplete_config = new AutocompleteConfig( $this );
			$this->template_loader     = new TemplateLoader( $this );
		}

		// Load admin or public part of the plugin.
		if ( is_admin() ) {
			new Admin( $this );
		}
	}

	/**
	 * Get the plugin name.
	 *
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string The name of the plugin.
	 */
	public function get_name() {
		return self::NAME;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string The version number of the plugin.
	 */
	public function get_version() {
		return ALGOLIA_VERSION;
	}

	/**
	 * Get the Aloglia_API.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return Api
	 */
	public function get_api() {
		return $this->api;
	}

	/**
	 * Get the Algolia_Settings.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return Settings
	 */
	public function get_settings() {
		return $this->settings;
	}

	/**
	 * Override WordPress native search.
	 *
	 * Replaces native WordPress search results by Algolia ranked results.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return void
	 */
	private function override_wordpress_search() {
		// Do not override native search if the feature is not enabled.
		if ( ! $this->settings->should_override_search_in_backend() ) {
			return;
		}

		$index_id = $this->settings->get_native_search_index_id();
		$index    = $this->get_index( $index_id );

		if ( null === $index ) {
			return;
		}

		new Search( $index );
	}

	/**
	 * Get the Algolia_Autocomplete_Config.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return AutocompleteConfig
	 */
	public function get_autocomplete_config() {
		return $this->autocomplete_config;
	}

	/**
	 * Load indices.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function load_indices() {
		$synced_indices_ids = $this->settings->get_synced_indices_ids();

		$client            = $this->get_api()->get_client();
		$index_name_prefix = $this->settings->get_index_name_prefix();

		// Add a searchable posts index.
		$searchable_post_types = get_post_types(
			array(
				'exclude_from_search' => false,
			),
			'names'
		);
		$searchable_post_types = (array) apply_filters( 'algolia_searchable_post_types', $searchable_post_types );
		$this->indices[]       = new SearchablePostsIndex( $searchable_post_types );

		// Add one posts index per post type.
		$post_types = get_post_types();

		$excluded_post_types = $this->settings->get_excluded_post_types();
		foreach ( $post_types as $post_type ) {
			// Skip excluded post types.
			if ( in_array( $post_type, $excluded_post_types, true ) ) {
				continue;
			}

			$this->indices[] = new PostsIndex( $post_type );
		}

		// Add one terms index per taxonomy.
		$taxonomies          = get_taxonomies();
		$excluded_taxonomies = $this->settings->get_excluded_taxonomies();
		foreach ( $taxonomies as $taxonomy ) {
			// Skip excluded taxonomies.
			if ( in_array( $taxonomy, $excluded_taxonomies, true ) ) {
				continue;
			}

			$this->indices[] = new TermsIndex( $taxonomy );
		}

		// Add the users index.
		$this->indices[] = new UsersIndex();

		// Allow developers to filter the indices.
		$this->indices = (array) apply_filters( 'algolia_indices', $this->indices );

		foreach ( $this->indices as $index ) {
			$index->set_name_prefix( $index_name_prefix );
			$index->set_client( $client );

			if ( in_array( $index->get_id(), $synced_indices_ids, true ) ) {
				$index->set_enabled( true );

				if ( $index->contains_only( 'posts' ) ) {
					$this->changes_watchers[] = new PostChangesWatcher( $index );
				} elseif ( $index->contains_only( 'terms' ) ) {
					$this->changes_watchers[] = new TermChangesWatcher( $index );
				} elseif ( $index->contains_only( 'users' ) ) {
					$this->changes_watchers[] = new UserChangesWatcher( $index );
				}
			}
		}

		$this->changes_watchers = (array) apply_filters( 'algolia_changes_watchers', $this->changes_watchers );

		foreach ( $this->changes_watchers as $watcher ) {
			$watcher->watch();
		}
	}

	/**
	 * Get indices.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param array $args Array of arguments.
	 *
	 * @return array
	 */
	public function get_indices( array $args = array() ) {
		if ( empty( $args ) ) {
			return $this->indices;
		}

		$indices = $this->indices;

		if ( isset( $args['enabled'] ) && true === $args['enabled'] ) {
			$indices = array_filter(
				$indices,
				function( $index ) {
					return $index->is_enabled();
				}
			);
		}

		if ( isset( $args['contains'] ) ) {
			$contains = (string) $args['contains'];
			$indices  = array_filter(
				$indices,
				function( $index ) use ( $contains ) {
					return $index->contains_only( $contains );
				}
			);
		}

		return $indices;
	}

	/**
	 * Get index.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @param string $index_id The ID of the index to get.
	 *
	 * @return AbstractIndex|null
	 */
	public function get_index( $index_id ) {
		foreach ( $this->indices as $index ) {
			if ( $index_id === $index->get_id() ) {
				return $index;
			}
		}

		return null;
	}

	/**
	 * Get the plugin path.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return string
	 */
	public function get_path() {
		return untrailingslashit( ALGOLIA_PATH );
	}

	/**
	 * Get the templates path.
	 *
	 * Somewhat misleading method name.
	 * Actually returns a path segment (directory name) with trailing slash.
	 *
	 * @author     WebDevStudios <contact@webdevstudios.com>
	 * @since      1.0.0
	 * @deprecated 1.8.0 Use Algolia_Template_Utils::get_filtered_theme_templates_dirname()
	 * @see        TemplateUtils::get_filtered_theme_templates_dirname()
	 *
	 * @return string
	 */
	public function get_templates_path() {
		_deprecated_function(
			__METHOD__,
			'1.8.0',
			'Algolia_Template_Utils::get_filtered_theme_templates_dirname()'
		);
		return (string) TemplateUtils::get_filtered_theme_templates_dirname();
	}

	/**
	 * Get the Algolia_Template_Loader.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return TemplateLoader
	 */
	public function get_template_loader() {
		return $this->template_loader;
	}

	/**
	 * Get the Algolia_Styles.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @return Styles
	 */
	public function get_styles() {
		return $this->styles;
	}

	/**
	 * Get the Algolia_Scripts.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @return Scripts
	 */
	public function get_scripts() {
		return $this->scripts;
	}
}
