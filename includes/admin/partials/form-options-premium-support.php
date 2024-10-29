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
				<?php esc_html_e( 'Thank you for using Algolia and WP Search with Algolia to enhance your website\'s search experience. We are happy to have you as a user.', 'wp-search-with-algolia' ); ?>
			</p>
			<div class="cptui-badge"></div>
		</div>

		<div class="algolia-premium-support-block">
			<h2><?php esc_html_e( 'Seeking help?', 'wp-search-with-algolia' ); ?></h2>
			<p>
				<?php esc_html_e( 'Are you struggling to get Algolia and WP Search with Algolia working like you\'ve envisioned, and wanting some help?', 'wp-search-with-algolia' ); ?>
			</p>
			<p>
				<?php esc_html_e( 'WebDevStudios, the folks behind WP Search with Algolia and WP Search with Algolia Pro would love to be in touch to see if we can work together to get your site to where it needs to be.', 'wp-search-with-algolia' ); ?>
			</p>
		</div>

		<div class="algolia-premium-support-block">
			<h2>Ready to work with us?</h2>
			<div class="algolia-flex">
				<div class="algolia-flex-item">
					<p><a class="wds-premium" href="https://webdevstudios.com/contact/" target="_blank" rel="noopener">Contact WebDevStudios</a>
					</p>
				</div>
				<div class="algolia-flex-item">
					<p>If this sounds like you, please reach out and lets get a discussion going!</p>
				</div>
			</div>
		</div>

		<div class="algolia-premium-support-block algolia-pro-block">
			<h2>WP Search with Algolia Pro</h2>
			<div class="algolia-pro-flex-wrap">
				<div class="algolia-pro-flex-item">
					<h3>Multisite Indexing</h3>
					<ul class="algolia-pro-features">
						<li>Multisite indexing into a single network index to provide a global Algolia-powered search experience.</li>
					</ul>
				</div>
				<div class="algolia-pro-flex-item">
					<h3>WooCommerce</h3>
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
