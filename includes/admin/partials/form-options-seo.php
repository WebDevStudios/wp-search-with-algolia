<?php
/**
 * SEO (Pro) admin template partial.
 *
 * Registered by the free plugin only when Pro is inactive. Pro replaces this
 * screen with the real SEO settings.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once dirname( __FILE__ ) . '/pro-parts.php';

$algolia_seo_plugin = Algolia_Pro::get_active_seo_plugin();

$algolia_header_subtitle = __( 'Keep your Algolia index in step with the "noindex" decisions your team already makes.', 'wp-search-with-algolia' );
$algolia_header_actions  = '';
?>

<div class="wrap algolia-settings-page">
	<?php require dirname( __FILE__ ) . '/admin-header.php'; ?>

	<div class="algolia-settings-card">
		<?php if ( '' !== $algolia_seo_plugin ) : ?>
			<div class="algolia-pro-context-callout">
				<span class="dashicons dashicons-search" aria-hidden="true"></span>
				<p>
					<?php
					printf(
						/* translators: %s: name of the detected SEO plugin, e.g. "Yoast SEO". */
						esc_html__( 'You are running %s on this site. WP Search with Algolia Pro reads its "noindex" settings and keeps them out of your Algolia index automatically — no filters to write, no content to re-check by hand.', 'wp-search-with-algolia' ),
						esc_html( $algolia_seo_plugin )
					);
					?>
				</p>
			</div>
		<?php else : ?>
			<div class="algolia-pro-context-callout is-neutral">
				<span class="dashicons dashicons-info-outline" aria-hidden="true"></span>
				<p><?php esc_html_e( 'No supported SEO plugin detected on this site. Pro mirrors "noindex" settings from Yoast SEO, All in One SEO, Rank Math, SEOPress, and The SEO Framework.', 'wp-search-with-algolia' ); ?></p>
			</div>
		<?php endif; ?>

		<?php algolia_pro_render_feature_cards( array( 'seo', 'index-health' ) ); ?>

		<?php algolia_pro_render_requirements(); ?>

		<?php algolia_pro_render_pricing_cta( 'seo-page' ); ?>
	</div>
</div>
