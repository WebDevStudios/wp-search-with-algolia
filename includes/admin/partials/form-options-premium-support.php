<?php
/**
 * Premium Support admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$algolia_header_subtitle = __( 'Get hands-on help from the team behind WP Search with Algolia, and explore the Pro add-on.', 'wp-search-with-algolia' );
$algolia_header_actions  = '';

$wds_url = 'https://webdevstudios.com/contact/';
$pro_url = 'https://pluginize.com/plugins/wp-search-with-algolia-pro/'; // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
?>

<div class="wrap algolia-settings-page">
	<?php require dirname( __FILE__ ) . '/admin-header.php'; ?>

	<div class="algolia-settings-card">
		<div class="algolia-premium-wrap-block">

			<div class="algolia-premium-support-block">
				<h2><?php esc_html_e( 'Premium Support &amp; Integration Services', 'wp-search-with-algolia' ); ?></h2>
				<p>
					<?php esc_html_e( 'Going beyond what the free plugin offers? WebDevStudios, the team behind WP Search with Algolia, can help you ship a polished, production-ready Algolia search experience without burning your own engineering hours on it.', 'wp-search-with-algolia' ); ?>
				</p>

				<div class="algolia-premium-support-list">
					<div class="algolia-premium-support-list__item">
						<span class="dashicons dashicons-admin-tools" aria-hidden="true"></span>
						<div>
							<h3><?php esc_html_e( 'Setup &amp; configuration', 'wp-search-with-algolia' ); ?></h3>
							<p><?php esc_html_e( 'Account provisioning, key management, index strategy, ranking tuning, and autocomplete or results-page wiring tailored to your content model.', 'wp-search-with-algolia' ); ?></p>
						</div>
					</div>

					<div class="algolia-premium-support-list__item">
						<span class="dashicons dashicons-screenoptions" aria-hidden="true"></span>
						<div>
							<h3><?php esc_html_e( 'Custom integrations', 'wp-search-with-algolia' ); ?></h3>
							<p><?php esc_html_e( 'Custom post types, ACF fields, faceted filters, multi-language sites, headless front ends. We build the integration to fit your site.', 'wp-search-with-algolia' ); ?></p>
						</div>
					</div>

					<div class="algolia-premium-support-list__item">
						<span class="dashicons dashicons-performance" aria-hidden="true"></span>
						<div>
							<h3><?php esc_html_e( 'Scale &amp; performance', 'wp-search-with-algolia' ); ?></h3>
							<p><?php esc_html_e( 'Multisite networks, large catalogs, and high-traffic eCommerce stores. We profile bottlenecks, optimize indexing, and design for the way your visitors actually search.', 'wp-search-with-algolia' ); ?></p>
						</div>
					</div>
				</div>

				<aside class="algolia-premium-support-highlight" aria-labelledby="algolia-wds-partnership-heading">
					<div class="algolia-premium-support-highlight__icon" aria-hidden="true">
						<span class="dashicons dashicons-sos"></span>
					</div>
					<div class="algolia-premium-support-highlight__body">
						<span class="algolia-premium-support-highlight__eyebrow"><?php esc_html_e( 'A long-term WordPress partner', 'wp-search-with-algolia' ); ?></span>
						<h3 id="algolia-wds-partnership-heading" class="algolia-premium-support-highlight__title">
							<?php esc_html_e( 'WebDevStudios is a premier WordPress agency. We can do anything with WordPress.', 'wp-search-with-algolia' ); ?>
						</h3>
						<p class="algolia-premium-support-highlight__lede">
							<?php esc_html_e( 'Beyond Algolia search, our team designs, builds, and operates every part of your WordPress site: eCommerce, headless front ends, multisite networks, custom plugin and block development, content migrations, performance work, and ongoing maintenance retainers. Whatever your roadmap calls for, we have shipped it before and can ship it for you.', 'wp-search-with-algolia' ); ?>
						</p>
						<div class="algolia-premium-support-highlight__cta">
							<a class="wds-premium" href="<?php echo esc_url( $wds_url ); ?>" target="_blank" rel="noopener noreferrer">
								<?php esc_html_e( 'Talk to WebDevStudios', 'wp-search-with-algolia' ); ?>
								<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
							</a>
							<span class="algolia-premium-support-highlight__note">
								<?php esc_html_e( 'Free, no-pressure scoping call. We will tell you honestly whether you need our help or just need to flip a setting.', 'wp-search-with-algolia' ); ?>
							</span>
						</div>
					</div>
				</aside>
			</div>

		</div>
	</div>

	<aside class="algolia-pro-upsell" aria-labelledby="algolia-pro-upsell-heading">
		<div class="algolia-pro-upsell__hero">
			<div class="algolia-pro-upsell__hero-intro">
				<div class="algolia-pro-upsell__eyebrow">
					<span class="algolia-pro-upsell__logomark" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500.34" focusable="false"><path fill="currentColor" d="M250,0C113.38,0,2,110.16,.03,246.32c-2,138.29,110.19,252.87,248.49,253.67,42.71,.25,83.85-10.2,120.38-30.05,3.56-1.93,4.11-6.83,1.08-9.52l-23.39-20.74c-4.75-4.22-11.52-5.41-17.37-2.92-25.5,10.85-53.21,16.39-81.76,16.04-111.75-1.37-202.04-94.35-200.26-206.1,1.76-110.33,92.06-199.55,202.8-199.55h202.83V407.68l-115.08-102.25c-3.72-3.31-9.43-2.66-12.43,1.31-18.47,24.46-48.56,39.67-81.98,37.36-46.36-3.2-83.92-40.52-87.4-86.86-4.15-55.28,39.65-101.58,94.07-101.58,49.21,0,89.74,37.88,93.97,86.01,.38,4.28,2.31,8.28,5.53,11.13l29.97,26.57c3.4,3.01,8.8,1.17,9.63-3.3,2.16-11.55,2.92-23.6,2.07-35.95-4.83-70.39-61.84-127.01-132.26-131.35-80.73-4.98-148.23,58.18-150.37,137.35-2.09,77.15,61.12,143.66,138.28,145.36,32.21,.71,62.07-9.42,86.2-26.97l150.36,133.29c6.45,5.71,16.62,1.14,16.62-7.48V9.49C500,4.25,495.75,0,490.51,0H250Z"/></svg>
					</span>
					<span class="algolia-pro-upsell__eyebrow-text"><?php esc_html_e( 'WP Search with Algolia', 'wp-search-with-algolia' ); ?></span>
					<span class="algolia-pro-upsell__pro-pill"><?php esc_html_e( 'PRO', 'wp-search-with-algolia' ); ?></span>
				</div>

				<h2 id="algolia-pro-upsell-heading" class="algolia-pro-upsell__title">
					<?php esc_html_e( 'Take WordPress search further.', 'wp-search-with-algolia' ); ?>
				</h2>

				<p class="algolia-pro-upsell__lede">
					<?php esc_html_e( 'Multisite network search, deep WooCommerce indexing, and turnkey integrations with the SEO plugins your site already runs on, without writing a line of code.', 'wp-search-with-algolia' ); ?>
				</p>

				<div class="algolia-pro-upsell__actions">
					<a class="algolia-pro-upsell__button-primary" href="<?php echo esc_url( $pro_url ); ?>" target="_blank" rel="noopener noreferrer">
						<?php esc_html_e( 'Get WP Search with Algolia Pro', 'wp-search-with-algolia' ); ?>
						<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
					</a>
					<a class="algolia-pro-upsell__button-secondary" href="<?php echo esc_url( $pro_url ); ?>#features" target="_blank" rel="noopener noreferrer">
						<?php esc_html_e( 'See all features', 'wp-search-with-algolia' ); ?>
					</a>
				</div>

				<ul class="algolia-pro-upsell__trust">
					<li>
						<span class="dashicons dashicons-yes" aria-hidden="true"></span>
						<?php esc_html_e( 'Built by the team behind WP Search with Algolia', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes" aria-hidden="true"></span>
						<?php esc_html_e( 'No-code configuration that works with your existing theme', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes" aria-hidden="true"></span>
						<?php esc_html_e( 'Backed by WebDevStudios premium support', 'wp-search-with-algolia' ); ?>
					</li>
				</ul>
			</div>
		</div>

		<section class="algolia-pro-upsell__ai" aria-labelledby="algolia-pro-upsell-ai-heading">
			<div class="algolia-pro-upsell__ai-icon" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" focusable="false">
					<path d="M12 1.5l1.6 6.9 6.9 1.6-6.9 1.6L12 18.5l-1.6-6.9-6.9-1.6 6.9-1.6z"/>
					<path d="M19.2 14.4l.7 2.7 2.7.7-2.7.7-.7 2.7-.7-2.7-2.7-.7 2.7-.7z" opacity="0.65"/>
					<path d="M4.6 2.4l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5z" opacity="0.55"/>
				</svg>
			</div>
			<div class="algolia-pro-upsell__ai-body">
				<span class="algolia-pro-upsell__ai-eyebrow"><?php esc_html_e( 'Advanced AI', 'wp-search-with-algolia' ); ?></span>
				<h3 id="algolia-pro-upsell-ai-heading" class="algolia-pro-upsell__ai-title">
					<?php esc_html_e( 'Advanced Algolia AI Support', 'wp-search-with-algolia' ); ?>
				</h3>
				<p class="algolia-pro-upsell__ai-lede">
					<?php esc_html_e( 'WP Search with Algolia Pro turns on Algolia Insights tracking, so your site collects the interaction data Algolia\'s advanced AI features need to work. Real-time events stream to Algolia for smarter personalization and product recommendations.', 'wp-search-with-algolia' ); ?>
				</p>
				<ul class="algolia-pro-upsell__ai-features">
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Semantic search', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'AI re-ranking', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Shopping guides', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Dynamic personalization', 'wp-search-with-algolia' ); ?>
					</li>
				</ul>
			</div>
		</section>

		<div class="algolia-pro-upsell__features">
			<article class="algolia-pro-feature">
				<div class="algolia-pro-feature__icon" aria-hidden="true">
					<span class="dashicons dashicons-networking"></span>
				</div>
				<h3 class="algolia-pro-feature__title"><?php esc_html_e( 'Multisite Indexing', 'wp-search-with-algolia' ); ?></h3>
				<p class="algolia-pro-feature__lede"><?php esc_html_e( 'One search index for an entire network. Visitors search every site in the network from a single box.', 'wp-search-with-algolia' ); ?></p>
				<ul class="algolia-pro-feature__list">
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Aggregate every subsite into one Algolia index for a unified, network-wide search experience.', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Per-site filters and badges so visitors can drill down to a specific subsite when they need to.', 'wp-search-with-algolia' ); ?>
					</li>
				</ul>
			</article>

			<article class="algolia-pro-feature">
				<div class="algolia-pro-feature__icon" aria-hidden="true">
					<span class="dashicons dashicons-cart"></span>
				</div>
				<h3 class="algolia-pro-feature__title"><?php esc_html_e( 'WooCommerce Support', 'wp-search-with-algolia' ); ?></h3>
				<p class="algolia-pro-feature__lede"><?php esc_html_e( 'Catalog-grade search for WooCommerce stores. Surface the right product on the first keystroke.', 'wp-search-with-algolia' ); ?></p>
				<ul class="algolia-pro-feature__list">
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Index SKUs, prices, short descriptions, and product dimensions or weight for richer result display.', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Use total sales and product ratings as ranking signals so popular items rise to the top.', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Toggle indexing of sold-out products, hidden products, and shop-only items per your store policy.', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Restrict the index to WooCommerce products only when you need a pure product search.', 'wp-search-with-algolia' ); ?>
					</li>
					<li class="algolia-pro-feature__list-item--ai">
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Track add-to-cart events', 'wp-search-with-algolia' ); ?>
						<span class="algolia-pro-feature__ai-tag" aria-label="<?php esc_attr_e( 'AI-powered feature', 'wp-search-with-algolia' ); ?>"><?php esc_html_e( 'AI', 'wp-search-with-algolia' ); ?></span>
					</li>
					<li class="algolia-pro-feature__list-item--ai">
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Track remove-from-cart events', 'wp-search-with-algolia' ); ?>
						<span class="algolia-pro-feature__ai-tag" aria-label="<?php esc_attr_e( 'AI-powered feature', 'wp-search-with-algolia' ); ?>"><?php esc_html_e( 'AI', 'wp-search-with-algolia' ); ?></span>
					</li>
					<li class="algolia-pro-feature__list-item--ai">
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Track begin-checkout events', 'wp-search-with-algolia' ); ?>
						<span class="algolia-pro-feature__ai-tag" aria-label="<?php esc_attr_e( 'AI-powered feature', 'wp-search-with-algolia' ); ?>"><?php esc_html_e( 'AI', 'wp-search-with-algolia' ); ?></span>
					</li>
				</ul>
			</article>

			<article class="algolia-pro-feature">
				<div class="algolia-pro-feature__icon" aria-hidden="true">
					<span class="dashicons dashicons-search"></span>
				</div>
				<h3 class="algolia-pro-feature__title"><?php esc_html_e( 'SEO Plugin Integrations', 'wp-search-with-algolia' ); ?></h3>
				<p class="algolia-pro-feature__lede"><?php esc_html_e( 'Honor the editorial controls your team already uses. Indexing respects "noindex" decisions automatically.', 'wp-search-with-algolia' ); ?></p>
				<ul class="algolia-pro-feature__list">
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Fine-tune indexing on individual posts, pages, or custom post types from the editor screen.', 'wp-search-with-algolia' ); ?>
					</li>
					<li>
						<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
						<?php esc_html_e( 'Drop-in support for Yoast SEO, All in One SEO, Rank Math, SEOPress, and The SEO Framework.', 'wp-search-with-algolia' ); ?>
					</li>
				</ul>
			</article>
		</div>

		<div class="algolia-pro-upsell__footer">
			<div>
				<strong><?php esc_html_e( 'Ready to upgrade?', 'wp-search-with-algolia' ); ?></strong>
				<span><?php esc_html_e( 'Add WP Search with Algolia Pro to your site today and give your visitors a faster, smarter search experience.', 'wp-search-with-algolia' ); ?></span>
			</div>
			<a class="algolia-pro-upsell__button-primary algolia-pro-upsell__button-primary--inverse" href="<?php echo esc_url( $pro_url ); ?>" target="_blank" rel="noopener noreferrer">
				<?php esc_html_e( 'Get Pro now', 'wp-search-with-algolia' ); ?>
				<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
			</a>
		</div>
	</aside>
</div>
