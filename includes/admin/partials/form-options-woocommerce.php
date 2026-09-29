<?php
/**
 * WooCommerce (Pro) admin template partial.
 *
 * Registered by the free plugin only when Pro is inactive. Pro replaces this
 * screen with the real WooCommerce settings.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once dirname( __FILE__ ) . '/pro-parts.php';

$algolia_woo_active    = Algolia_Pro::is_woocommerce_active();
$algolia_product_count = Algolia_Pro::get_product_count();

$algolia_header_subtitle = $algolia_woo_active
	? __( 'Index your product catalog with the detail an online store actually needs.', 'wp-search-with-algolia' )
	: __( 'Index your product catalog with the detail an online store actually needs. Requires WooCommerce.', 'wp-search-with-algolia' );
$algolia_header_actions  = '';
?>

<div class="wrap algolia-settings-page">
	<?php require dirname( __FILE__ ) . '/admin-header.php'; ?>

	<div class="algolia-settings-card">
		<?php if ( $algolia_woo_active ) : ?>
			<div class="algolia-pro-context-callout">
				<span class="dashicons dashicons-cart" aria-hidden="true"></span>
				<p>
					<?php
					if ( $algolia_product_count > 0 ) {
						/* translators: %s: number of published products. */
						$algolia_woo_message = _n(
							'WooCommerce is active on this site with %s published product. Right now WP Search with Algolia indexes it as a generic post — no SKU, no price, no ratings.',
							'WooCommerce is active on this site with %s published products. Right now WP Search with Algolia indexes them as generic posts — no SKU, no price, no ratings.',
							$algolia_product_count,
							'wp-search-with-algolia'
						);

						printf(
							esc_html( $algolia_woo_message ),
							esc_html( number_format_i18n( $algolia_product_count ) )
						);
					} else {
						esc_html_e( 'WooCommerce is active on this site. WP Search with Algolia indexes products as generic posts — no SKU, no price, no ratings.', 'wp-search-with-algolia' );
					}
					?>
				</p>
			</div>
		<?php else : ?>
			<div class="algolia-pro-context-callout is-neutral">
				<span class="dashicons dashicons-info-outline" aria-hidden="true"></span>
				<p><?php esc_html_e( 'WooCommerce is not active on this site. These features apply to stores running WooCommerce.', 'wp-search-with-algolia' ); ?></p>
			</div>
		<?php endif; ?>

		<div class="algolia-pro-stack">
			<?php algolia_pro_render_feature_cards( array( 'woocommerce', 'ai' ) ); ?>

			<?php algolia_pro_render_requirements(); ?>

			<?php algolia_pro_render_pricing_cta( 'woocommerce-page' ); ?>
		</div>

	</div>
</div>
