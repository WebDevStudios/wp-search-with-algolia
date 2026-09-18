<?php
/**
 * Algolia_Pro class file.
 *
 * Single source of truth for everything the free plugin says about
 * WP Search with Algolia Pro: the feature set, pricing, requirements, and
 * outbound links.
 *
 * Every Pro-facing surface in the admin renders from this class so the free
 * plugin only has to be updated in one place when Pro ships a release.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.14.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Algolia_Pro
 *
 * @since 2.14.0
 */
class Algolia_Pro {

	/**
	 * Base URL of the Pro sales page, without any tracking parameters.
	 *
	 * @since 2.14.0
	 * @var string
	 */
	const SALES_URL = 'https://pluginize.com/plugins/wp-search-with-algolia-pro/';

	/**
	 * The Pro release this feature data describes.
	 *
	 * Bump alongside FEATURES when Pro ships a release, so the "New in" band
	 * and the readme stay in sync with what is actually for sale.
	 *
	 * @since 2.14.0
	 * @var string
	 */
	const DOCUMENTED_VERSION = '1.7';

	/**
	 * Display price of a Pro license.
	 *
	 * Kept as a constant rather than fetched remotely so the admin never makes
	 * an outbound request just to render a settings screen. This MUST be
	 * updated in lockstep with pluginize.com — a stale price shown inside
	 * wp-admin is worse than showing no price at all. Site owners can override
	 * it with the `algolia_pro_price` filter.
	 *
	 * @since 2.14.0
	 * @var string
	 */
	const PRICE = '$99';

	/**
	 * Minimum WordPress version required by Pro.
	 *
	 * @since 2.14.0
	 * @var string
	 */
	const MIN_WP_VERSION = '6.5';

	/**
	 * Minimum PHP version required by Pro.
	 *
	 * @since 2.14.0
	 * @var string
	 */
	const MIN_PHP_VERSION = '8.0';

	/**
	 * Minimum WP Search with Algolia (free) version required by Pro.
	 *
	 * @since 2.14.0
	 * @var string
	 */
	const MIN_FREE_VERSION = '2.10.2';

	/**
	 * Whether WP Search with Algolia Pro is active on this site.
	 *
	 * IMPORTANT: only call this from inside a hook callback (`admin_menu`,
	 * `admin_init`, a render method, and so on) — never from a constructor or
	 * at file scope. Plugin load order is not guaranteed: network-activated
	 * plugins load before site-activated ones, so a network-activated free
	 * plugin can be constructed before Pro has had a chance to define its
	 * version constant.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return bool
	 */
	public static function is_active() {
		return algolia_is_pro_active();
	}

	/**
	 * Get the display price of a Pro license.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return string
	 */
	public static function get_price() {

		/**
		 * Filters the displayed WP Search with Algolia Pro price.
		 *
		 * @since 2.14.0
		 *
		 * @param string $price The display price, including currency symbol.
		 */
		return (string) apply_filters( 'algolia_pro_price', self::PRICE );
	}

	/**
	 * Get the licensing terms shown alongside the price.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return string
	 */
	public static function get_terms() {

		/**
		 * Filters the licensing terms shown alongside the Pro price.
		 *
		 * @since 2.14.0
		 *
		 * @param string $terms Short, human-readable licensing terms.
		 */
		return (string) apply_filters(
			'algolia_pro_terms',
			__( 'Includes six months of updates and technical support, plus a 30-day money-back guarantee.', 'wp-search-with-algolia' )
		);
	}

	/**
	 * Build a tracked link to the Pro sales page.
	 *
	 * Each admin surface passes its own $placement so conversions can be
	 * attributed to the specific placement that produced them.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @param string $placement Short slug identifying where the link lives.
	 * @param string $fragment  Optional URL fragment, without the leading '#'.
	 *
	 * @return string
	 */
	public static function get_url( $placement, $fragment = '' ) {
		$url = add_query_arg(
			array(
				'utm_source'   => 'wpswa-free',
				'utm_medium'   => 'admin',
				'utm_campaign' => 'pro-upgrade',
				'utm_content'  => sanitize_key( $placement ),
			),
			self::SALES_URL
		);

		if ( '' !== $fragment ) {
			$url .= '#' . rawurlencode( $fragment );
		}

		/**
		 * Filters an outbound WP Search with Algolia Pro link.
		 *
		 * @since 2.14.0
		 *
		 * @param string $url       The fully built, tracked URL.
		 * @param string $placement Slug identifying where the link lives.
		 */
		return (string) apply_filters( 'algolia_pro_url', $url, $placement );
	}

	/**
	 * Get the canonical Pro feature set.
	 *
	 * Ordered for the audience that actually sees it in wp-admin: people
	 * already running the free plugin. The two features that resolve friction
	 * the free plugin creates — indexing custom fields, and knowing whether the
	 * index is healthy — lead. The sales page orders these differently because
	 * it addresses visitors who have not installed anything yet.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return array[] {
	 *     @type string   $id       Machine name.
	 *     @type string   $title    Benefit-led headline.
	 *     @type string   $subtitle Product name, where it differs from title.
	 *     @type string   $icon     Dashicons class.
	 *     @type string   $lede     One-sentence summary.
	 *     @type string[] $points   Supporting bullet points.
	 *     @type bool     $is_new   Whether it arrived in DOCUMENTED_VERSION.
	 * }
	 */
	public static function get_features() {
		$features = array(
			array(
				'id'       => 'meta-field-mapper',
				'title'    => __( 'Index Any Custom Field, No Code Required', 'wp-search-with-algolia' ),
				'subtitle' => __( 'Meta Field Mapper', 'wp-search-with-algolia' ),
				'icon'     => 'dashicons-editor-table',
				'lede'     => __( 'Drag custom fields into your Algolia index from a visual screen. No PHP, no filters, no developer required.', 'wp-search-with-algolia' ),
				'points'   => array(
					__( 'Auto-detects fields from Advanced Custom Fields, Meta Box, CMB2, and native WordPress post meta.', 'wp-search-with-algolia' ),
					__( 'Drag fields into Searchable Attributes or Attributes for Faceting, and reorder them to tune ranking.', 'wp-search-with-algolia' ),
					__( 'Configure a separate field map for every indexable post type.', 'wp-search-with-algolia' ),
					__( 'Toggle a field out of the index temporarily without losing its configuration.', 'wp-search-with-algolia' ),
					__( 'Works alongside your existing hook-based customizations — mapped fields never overwrite them.', 'wp-search-with-algolia' ),
				),
				'is_new'   => true,
			),
			array(
				'id'       => 'index-health',
				'title'    => __( 'Know Your Index Is Healthy', 'wp-search-with-algolia' ),
				'subtitle' => __( 'Index Health and Troubleshooting', 'wp-search-with-algolia' ),
				'icon'     => 'dashicons-chart-area',
				'lede'     => __( 'Stop guessing whether your content actually made it into Algolia.', 'wp-search-with-algolia' ),
				'points'   => array(
					__( 'An index health panel and dashboard widget that surface configuration and indexing problems.', 'wp-search-with-algolia' ),
					__( 'See the live index status of any post, right on the edit screen.', 'wp-search-with-algolia' ),
					__( 'Re-index a single post on demand with a button in the editor, instead of re-running everything.', 'wp-search-with-algolia' ),
				),
				'is_new'   => true,
			),
			array(
				'id'       => 'woocommerce',
				'title'    => __( 'Catalog-Grade WooCommerce Search', 'wp-search-with-algolia' ),
				'subtitle' => __( 'WooCommerce Support', 'wp-search-with-algolia' ),
				'icon'     => 'dashicons-cart',
				'lede'     => __( 'Surface the right product on the first keystroke, and rank by what actually sells.', 'wp-search-with-algolia' ),
				'points'   => array(
					__( 'Index SKUs, standard and variable pricing, short descriptions, image sizes, and product dimensions or weight.', 'wp-search-with-algolia' ),
					__( 'Use total sales and product ratings as ranking signals so popular items rise to the top.', 'wp-search-with-algolia' ),
					__( 'Control whether sold-out, hidden, and "shop only" products are indexed.', 'wp-search-with-algolia' ),
					__( 'Restrict the index to WooCommerce products only when you need a pure product search.', 'wp-search-with-algolia' ),
					__( 'Send add-to-cart, remove-from-cart, begin-checkout, and completed-order events to Algolia.', 'wp-search-with-algolia' ),
				),
				'is_new'   => false,
			),
			array(
				'id'       => 'multisite',
				'title'    => __( 'One Search Box for an Entire Network', 'wp-search-with-algolia' ),
				'subtitle' => __( 'WordPress Multisite Network Indexing', 'wp-search-with-algolia' ),
				'icon'     => 'dashicons-networking',
				'lede'     => __( 'Aggregate every subsite into a single Algolia index for unified, network-wide search.', 'wp-search-with-algolia' ),
				'points'   => array(
					__( 'Push content from all sites in a multisite network into one searchable index.', 'wp-search-with-algolia' ),
					__( 'Exclude specific sites from network-wide indexing when they should stay private.', 'wp-search-with-algolia' ),
					__( 'Track per-site indexing status from a column in the network sites list.', 'wp-search-with-algolia' ),
				),
				'is_new'   => false,
			),
			array(
				'id'       => 'seo',
				'title'    => __( 'Respect the Editorial Rules You Already Set', 'wp-search-with-algolia' ),
				'subtitle' => __( 'Advanced SEO Support', 'wp-search-with-algolia' ),
				'icon'     => 'dashicons-search',
				'lede'     => __( 'Indexing honors the "noindex" decisions your team already made in your SEO plugin.', 'wp-search-with-algolia' ),
				'points'   => array(
					__( 'Drop-in support for Yoast SEO, All in One SEO, Rank Math, SEOPress, and The SEO Framework.', 'wp-search-with-algolia' ),
					__( 'Fine-tune indexing on individual posts, pages, or custom post types from the editor screen.', 'wp-search-with-algolia' ),
				),
				'is_new'   => false,
			),
			array(
				'id'       => 'ai',
				'title'    => __( 'Unlock Algolia\'s Advanced AI', 'wp-search-with-algolia' ),
				'subtitle' => __( 'Advanced Algolia AI Support', 'wp-search-with-algolia' ),
				'icon'     => 'dashicons-superhero',
				'lede'     => __( 'Pro turns on Algolia Insights tracking, so your site collects the interaction data Algolia\'s AI features need to work.', 'wp-search-with-algolia' ),
				'points'   => array(
					__( 'Semantic search and AI re-ranking driven by real visitor behavior.', 'wp-search-with-algolia' ),
					__( 'Dynamic personalization and shopping guides.', 'wp-search-with-algolia' ),
					__( 'Real-time event streaming from your site to Algolia.', 'wp-search-with-algolia' ),
				),
				'is_new'   => false,
			),
		);

		/**
		 * Filters the canonical WP Search with Algolia Pro feature set.
		 *
		 * @since 2.14.0
		 *
		 * @param array[] $features The Pro feature set.
		 */
		return (array) apply_filters( 'algolia_pro_features', $features );
	}

	/**
	 * Get the features introduced in the currently documented Pro release.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return array[]
	 */
	public static function get_new_features() {
		return array_values(
			array_filter(
				self::get_features(),
				function ( $feature ) {
					return ! empty( $feature['is_new'] );
				}
			)
		);
	}

	/**
	 * Get the free vs Pro comparison rows.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return array[] Each row is [ label, free, pro ], where free/pro are
	 *                 either a bool or a short string qualifier.
	 */
	public static function get_comparison_rows() {
		$rows = array(
			array(
				'label' => __( 'Index posts, pages, custom post types, terms, and users', 'wp-search-with-algolia' ),
				'free'  => true,
				'pro'   => true,
			),
			array(
				'label' => __( 'Autocomplete and InstantSearch results', 'wp-search-with-algolia' ),
				'free'  => true,
				'pro'   => true,
			),
			array(
				'label' => __( 'Index custom fields (ACF, Meta Box, CMB2, post meta)', 'wp-search-with-algolia' ),
				'free'  => __( 'Requires custom code', 'wp-search-with-algolia' ),
				'pro'   => __( 'Drag and drop, no code', 'wp-search-with-algolia' ),
			),
			array(
				'label' => __( 'Index health panel and dashboard widget', 'wp-search-with-algolia' ),
				'free'  => false,
				'pro'   => true,
			),
			array(
				'label' => __( 'Per-post index status and one-click re-index', 'wp-search-with-algolia' ),
				'free'  => false,
				'pro'   => true,
			),
			array(
				'label' => __( 'WooCommerce product data (SKU, pricing, dimensions, ratings)', 'wp-search-with-algolia' ),
				'free'  => false,
				'pro'   => true,
			),
			array(
				'label' => __( 'WooCommerce event tracking for Algolia AI', 'wp-search-with-algolia' ),
				'free'  => false,
				'pro'   => true,
			),
			array(
				'label' => __( 'Multisite network-wide indexing', 'wp-search-with-algolia' ),
				'free'  => false,
				'pro'   => true,
			),
			array(
				'label' => __( 'SEO plugin "noindex" mirroring', 'wp-search-with-algolia' ),
				'free'  => false,
				'pro'   => __( '5 SEO plugins', 'wp-search-with-algolia' ),
			),
			array(
				'label' => __( 'Support', 'wp-search-with-algolia' ),
				'free'  => __( 'Community forums', 'wp-search-with-algolia' ),
				'pro'   => __( 'Direct technical support', 'wp-search-with-algolia' ),
			),
		);

		/**
		 * Filters the free vs Pro comparison rows.
		 *
		 * @since 2.14.0
		 *
		 * @param array[] $rows The comparison rows.
		 */
		return (array) apply_filters( 'algolia_pro_comparison_rows', $rows );
	}

	/**
	 * Get the display name of the SEO plugin running on this site, if any.
	 *
	 * Used to make the SEO upsell concrete: naming the plugin someone actually
	 * runs is far more useful than a generic list of five.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return string Display name, or an empty string if none detected.
	 */
	public static function get_active_seo_plugin() {
		$candidates = array(
			'WPSEO_VERSION'             => 'Yoast SEO',
			'AIOSEO_VERSION'            => 'All in One SEO',
			'RANK_MATH_VERSION'         => 'Rank Math',
			'SEOPRESS_VERSION'          => 'SEOPress',
			'THE_SEO_FRAMEWORK_VERSION' => 'The SEO Framework',
		);

		foreach ( $candidates as $constant => $name ) {
			if ( defined( $constant ) ) {
				return $name;
			}
		}

		// The SEO Framework does not always define a version constant.
		if ( function_exists( 'tsf' ) || defined( 'THE_SEO_FRAMEWORK_PRESENT' ) ) {
			return 'The SEO Framework';
		}

		return '';
	}

	/**
	 * Whether WooCommerce is active on this site.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return bool
	 */
	public static function is_woocommerce_active() {
		return class_exists( 'WooCommerce' );
	}

	/**
	 * Count published WooCommerce products.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return int Product count, or 0 when WooCommerce is not active.
	 */
	public static function get_product_count() {
		if ( ! self::is_woocommerce_active() ) {
			return 0;
		}

		$counts = wp_count_posts( 'product' );

		return isset( $counts->publish ) ? (int) $counts->publish : 0;
	}

	/**
	 * Check this site against Pro's minimum requirements.
	 *
	 * Rendered before purchase so nobody buys a plugin their server cannot run.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return array[] Each entry has 'label', 'current', 'required', and 'met'.
	 */
	public static function check_requirements() {
		global $wp_version;

		return array(
			array(
				'label'    => __( 'WordPress', 'wp-search-with-algolia' ),
				'current'  => $wp_version,
				'required' => self::MIN_WP_VERSION,
				'met'      => version_compare( $wp_version, self::MIN_WP_VERSION, '>=' ),
			),
			array(
				'label'    => __( 'PHP', 'wp-search-with-algolia' ),
				'current'  => PHP_VERSION,
				'required' => self::MIN_PHP_VERSION,
				'met'      => version_compare( PHP_VERSION, self::MIN_PHP_VERSION, '>=' ),
			),
			array(
				'label'    => __( 'WP Search with Algolia', 'wp-search-with-algolia' ),
				'current'  => ALGOLIA_VERSION,
				'required' => self::MIN_FREE_VERSION,
				'met'      => version_compare( ALGOLIA_VERSION, self::MIN_FREE_VERSION, '>=' ),
			),
		);
	}

	/**
	 * Whether this site meets every one of Pro's requirements.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @return bool
	 */
	public static function meets_requirements() {
		foreach ( self::check_requirements() as $requirement ) {
			if ( empty( $requirement['met'] ) ) {
				return false;
			}
		}

		return true;
	}
}
