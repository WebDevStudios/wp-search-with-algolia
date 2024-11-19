<?php
/**
 * Form options admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div class="wrap about-wrap">
	<h1>
		<?php echo get_admin_page_title(); ?>
	</h1>
	<div class="algolia-premium-wrap-block">
		<div class="algolia-premium-support-block">
			<p>
				<?php esc_html_e( 'Thank you for using WP Search with Algolia to enhance your website\'s search experience. We are happy to have you as a user.', 'wp-search-with-algolia' ); ?>
			</p>
			<div class="cptui-badge"></div>
		</div>

		<div class="algolia-premium-support-block">
			<h2><?php esc_html_e( 'Seeking help?', 'wp-search-with-algolia' ); ?></h2>
			<p>
				<?php esc_html_e( 'Our premium support and integration services ensure a seamless implementation of Algolia into your WordPress site. Whether you’re running a blog, eCommerce platform, or enterprise-level application, we’ll handle every detail—from setup and configuration to advanced customizations that match your unique needs.', 'wp-search-with-algolia' ); ?>
			</p>
			<p>
				<?php esc_html_e( 'At WebDevStudios, we’re not just delivering tools—we’re empowering you with a scalable, high-performing search experience. Ready to elevate your WordPress website? Let’s make it happen!', 'wp-search-with-algolia' ); ?>
			</p>
		</div>

		<div class="algolia-premium-support-block">
			<h2>Ready to work with us?</h2>
			<div class="algolia-flex">
				<div class="algolia-flex-item">
					<p><a class="wds-premium" href="https://webdevstudios.com/contact/" target="_blank" rel="noopener">Contact WebDevStudios</a>
					</p>
				</div>
			</div>
		</div>

		<div class="algolia-premium-support-block algolia-pro-block">
			<h2><a href="https://pluginize.com/plugins/wp-search-with-algolia-pro/" target="_blank">WP Search with Algolia Pro</a></h2>
			<div class="algolia-pro-flex-wrap">
				<div class="algolia-pro-flex-item">
					<h3>Multisite Indexing</h3>
					<ul class="algolia-pro-features">
						<li>Multisite network indexing into a single search index to provide a global Algolia-powered search experience.</li>
						<li>Easily search all sites in your Multisite network with a single search experience!</li>
					</ul>
				</div>
				<div class="algolia-pro-flex-item">
					<h3>WooCommerce Support</h3>
					<ul class="algolia-pro-features">
						<li>Index product SKUs, prices, short descriptions and product dimensions/weight for display.</li>
						<li>Index product total sales ratings for relevance.</li>
						<li>Index product total and average ratings for relevance.</li>
						<li>Control whether or not sold out products are indexed</li>
						<li>Control whether or not "shop only" or "hidden" products are indexed.</li>
						<li>Amend indexing to only include WooCommerce products.</li>
					</ul>
				</div>
				<div class="algolia-pro-flex-item">
					<h3>Search Engine Optimization</h3>
					<ul class="algolia-pro-features">
						<li>Fine tune indexing on selected pieces of content</li>
						<li>Yoast SEO</li>
						<li>All in One SEO</li>
						<li>Rank Math SEO</li>
						<li>SEOPress</li>
						<li>and The SEO Framework Support</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</div>
