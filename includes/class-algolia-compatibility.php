<?php
/**
 * Algolia_Compatibility class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

use Yoast\WP\SEO\Memoizers\Meta_Tags_Context_Memoizer;
use Yoast\WP\SEO\Surfaces\Helpers_Surface;

/**
 * Class Algolia_Compatibility
 *
 * @since 1.0.0
 */
class Algolia_Compatibility {

	/**
	 * The "current language" from WPML, if available, else null.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @var string|null
	 */
	private $current_language;

	/**
	 * Algolia_Compatibility constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function __construct() {
		add_action( 'algolia_before_get_records', array( $this, 'register_vc_shortcodes' ) );
		add_action( 'algolia_before_get_records', array( $this, 'enable_yoast_frontend' ) );
		add_action( 'algolia_before_get_records', array( $this, 'wpml_switch_language' ) );
		add_action( 'algolia_after_get_records', array( $this, 'wpml_switch_back_language' ) );
		add_action( 'algolia_excluded_post_types', [ $this, 'woocommerce_post_types' ] );
		add_action( 'algolia_excluded_taxonomies', [ $this, 'woocommerce_internal_taxonomies' ] );
		add_filter( 'algolia_is_block_theme', [ $this, 'maybe_block_theme' ] );
	}

	/**
	 * Enable Yoast frontend.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function enable_yoast_frontend() {
		if ( ! function_exists( 'YoastSEO' ) ) {
			return;
		}

		if (
			class_exists( 'Meta_Tags_Context_Memoizer' ) &&
			class_exists( 'WPSEO_Replace_Vars' ) &&
			class_exists( 'Helpers_Surface' )
		) {
			YoastSEO()->classes->get( Meta_Tags_Context_Memoizer::class );
			YoastSEO()->classes->get( WPSEO_Replace_Vars::class );
			YoastSEO()->classes->get( Helpers_Surface::class );
		}
	}

	/**
	 * Register VC shortcodes.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 */
	public function register_vc_shortcodes() {
		if ( class_exists( 'WPBMap' ) && method_exists( 'WPBMap', 'addAllMappedShortcodes' ) ) {
			WPBMap::addAllMappedShortcodes();
		}
	}

	/**
	 * WPML switch language.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @global \SitePress $sitepress The WPML global SitePress instance.
	 *
	 * @param mixed $post Maybe post object.
	 *
	 * @return void
	 */
	public function wpml_switch_language( $post ) {
		if ( ! $post instanceof WP_Post || ! $this->is_wpml_enabled() ) {
			return;
		}

		global $sitepress;
		$lang_info              = wpml_get_language_information( null, $post->ID );
		$this->current_language = $sitepress->get_current_language();
		$sitepress->switch_lang( $lang_info['language_code'] );
	}

	/**
	 * WPML switch back language.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @global \SitePress $sitepress The WPML global SitePress instance.
	 *
	 * @param mixed $post Maybe post object.
	 *
	 * @return void
	 */
	public function wpml_switch_back_language( $post ) {
		if ( ! $post instanceof WP_Post || ! $this->is_wpml_enabled() ) {
			return;
		}

		global $sitepress;

		$sitepress->switch_lang( $this->current_language );
	}

	/**
	 * Check if WPML is enabled.
	 *
	 * @link https://github.com/algolia/algoliasearch-wordpress/issues/567
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.0.0
	 *
	 * @return bool
	 */
	private function is_wpml_enabled() {
		return function_exists( 'icl_object_id' ) && ! class_exists( 'Polylang' );
	}

	/**
	 * Add internal WooCommerce post types to our excluded list on Autocomplete page.
	 *
	 * @since 2.10.0
	 *
	 * @param array $post_types Array of post types to exclude from listing.
	 * @return array
	 */
	public function woocommerce_post_types( array $post_types ) {
		if ( ! defined( 'WC_PLUGIN_FILE' ) ) {
			return $post_types;
		}

		$post_types[] = 'patterns_ai_data';
		$post_types[] = 'shop_order';
		$post_types[] = 'shop_order_placehold';
		$post_types[] = 'shop_order_refund';
		return $post_types;
	}

	/**
	 * Add internal WooCommerce taxonomies to our excluded list on Autocomplete page.
	 *
	 * @since 2.10.0
	 *
	 * @param array $taxonomies Array of taxonomies to exclude from listing.
	 * @return array
	 */
	public function woocommerce_internal_taxonomies( array $taxonomies ) {
		if ( ! defined( 'WC_PLUGIN_FILE' ) ) {
			return $taxonomies;
		}

		$taxonomies[] = 'product_visibility';
		$taxonomies[] = 'product_shipping_class';

		return $taxonomies;
	}

	/**
	 * Return whether or not the current theme is block based.
	 *
	 * @since 2.10.3
	 *
	 * @param bool $maybe_block_theme Whether or not a block theme is active.
	 * @return bool
	 */
	public function maybe_block_theme( $maybe_block_theme ) {
		// return early if it has already been determined.
		if ( true === $maybe_block_theme ) {
			return $maybe_block_theme;
		}

		return wp_is_block_theme();
	}
}
