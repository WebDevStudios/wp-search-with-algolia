<?php
/**
 * Upgrade to Pro admin template partial.
 *
 * Also carries WebDevStudios agency services, which are the fallback for
 * people whose needs Pro cannot serve on its own.
 *
 * When Pro is already active every Pro-facing block is skipped, and this page
 * becomes a straightforward services page.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once dirname( __FILE__ ) . '/pro-parts.php';

$algolia_pro_active = Algolia_Pro::is_active();

$algolia_header_subtitle = $algolia_pro_active
	? __( 'Get hands-on help from the team behind WP Search with Algolia.', 'wp-search-with-algolia' )
	: __( 'Take WordPress search further with Pro, or get hands-on help from the team behind the plugin.', 'wp-search-with-algolia' );
$algolia_header_actions  = '';

$wds_url = 'https://webdevstudios.com/contact/';

/*
 * In the sidebar the services block is a companion to the Pro pitch, not the
 * page, so it runs a trimmed set of copy. When Pro is active it is the whole
 * page and gets the full treatment.
 */
$algolia_wds_compact = ! $algolia_pro_active;
?>

<div class="wrap algolia-settings-page">
	<?php require dirname( __FILE__ ) . '/admin-header.php'; ?>

	<?php
	/*
	 * Two-column layout only when there is a Pro block to sit beside. With Pro
	 * already active the WebDevStudios section is the entire page, so it runs
	 * full width instead of being squeezed into a sidebar.
	 */
	?>
	<div class="algolia-pro-layout<?php echo $algolia_pro_active ? ' algolia-pro-layout--single' : ''; ?>">

	<?php if ( ! $algolia_pro_active ) : ?>

		<main class="algolia-pro-layout__main">
		<aside class="algolia-pro-upsell" aria-labelledby="algolia-pro-upsell-heading">

			<?php algolia_pro_render_new_in_band( 'pro-page-whats-new' ); ?>

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
						<?php esc_html_e( 'Index anything. Know it worked.', 'wp-search-with-algolia' ); ?>
					</h2>

					<p class="algolia-pro-upsell__lede">
						<?php esc_html_e( 'Map custom fields into your index without writing PHP, see the health of every index at a glance, and add deep WooCommerce, multisite, and SEO support to the plugin you already run.', 'wp-search-with-algolia' ); ?>
					</p>

					<?php algolia_pro_render_pricing_cta( 'pro-page-hero' ); ?>

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

			<?php algolia_pro_render_requirements(); ?>

			<?php algolia_pro_render_feature_cards(); ?>

			<?php algolia_pro_render_comparison(); ?>

			<div class="algolia-pro-upsell__footer">
				<div>
					<strong><?php esc_html_e( 'Ready to upgrade?', 'wp-search-with-algolia' ); ?></strong>
					<span>
						<?php
						printf(
							/* translators: 1: price, 2: licensing terms. */
							esc_html__( '%1$s. %2$s', 'wp-search-with-algolia' ),
							esc_html( Algolia_Pro::get_price() ),
							esc_html( Algolia_Pro::get_terms() )
						);
						?>
					</span>
				</div>
				<a class="algolia-pro-upsell__button-primary algolia-pro-upsell__button-primary--inverse" href="<?php echo esc_url( Algolia_Pro::get_url( 'pro-page-footer' ) ); ?>" target="_blank" rel="noopener noreferrer">
					<?php esc_html_e( 'Get Pro now', 'wp-search-with-algolia' ); ?>
					<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
				</a>
			</div>
		</aside>
		</main>

	<?php endif; ?>

	<aside class="algolia-pro-layout__aside">
	<section class="algolia-wds" aria-labelledby="algolia-wds-heading">

		<header class="algolia-wds__masthead">
			<div class="algolia-wds__brand">
				<?php
				/*
				 * The masthead sits on WDS Charcoal, so this is the white
				 * (reversed) logo variant — a dark-on-light version would
				 * disappear against the background. The styled wordmark below
				 * stands in if the asset is ever missing.
				 */
				$algolia_wds_logo_file = 'includes/admin/img/logo-webdevstudios-white.png';
				$algolia_wds_logo      = ALGOLIA_PATH . $algolia_wds_logo_file;

				if ( file_exists( $algolia_wds_logo ) ) :
					// Intrinsic asset is 1151x292. Rendered at 30px tall, which
					// keeps it crisp on high-DPI displays; width/height are set
					// to the display size to avoid layout shift on load.
					?>
					<img
						class="algolia-wds__logo"
						src="<?php echo esc_url( ALGOLIA_PLUGIN_URL . $algolia_wds_logo_file ); ?>"
						width="118"
						height="30"
						alt="<?php esc_attr_e( 'WebDevStudios', 'wp-search-with-algolia' ); ?>"
					/>
				<?php else : ?>
					<span class="algolia-wds__wordmark" aria-hidden="true">
						<span class="algolia-wds__wordmark-web"><?php esc_html_e( 'WebDev', 'wp-search-with-algolia' ); ?></span><span class="algolia-wds__wordmark-studios"><?php esc_html_e( 'Studios', 'wp-search-with-algolia' ); ?></span>
					</span>
					<span class="screen-reader-text"><?php esc_html_e( 'WebDevStudios', 'wp-search-with-algolia' ); ?></span>
				<?php endif; ?>
			</div>

			<span class="algolia-wds__eyebrow"><?php esc_html_e( 'Premium support &amp; integration services', 'wp-search-with-algolia' ); ?></span>
		</header>

		<div class="algolia-wds__body">

			<div class="algolia-premium-support-block">
				<h2 id="algolia-wds-heading"><?php esc_html_e( 'Work directly with the team that builds this plugin.', 'wp-search-with-algolia' ); ?></h2>
				<p>
					<?php
					if ( $algolia_wds_compact ) {
						esc_html_e( 'We build and maintain this plugin. We can build the search experience around it too.', 'wp-search-with-algolia' );
					} else {
						esc_html_e( 'Going beyond what the plugin offers on its own? WebDevStudios, the team behind WP Search with Algolia, can help you ship a polished, production-ready Algolia search experience without burning your own engineering hours on it.', 'wp-search-with-algolia' );
					}
					?>
				</p>

				<div class="algolia-premium-support-list">
					<div class="algolia-premium-support-list__item">
						<span class="dashicons dashicons-admin-tools" aria-hidden="true"></span>
						<div>
							<h3><?php esc_html_e( 'Setup &amp; configuration', 'wp-search-with-algolia' ); ?></h3>
							<p>
								<?php
								if ( $algolia_wds_compact ) {
									esc_html_e( 'Account setup, index strategy, and relevance tuning.', 'wp-search-with-algolia' );
								} else {
									esc_html_e( 'Account provisioning, key management, index strategy, ranking tuning, and autocomplete or results-page wiring tailored to your content model.', 'wp-search-with-algolia' );
								}
								?>
							</p>
						</div>
					</div>

					<div class="algolia-premium-support-list__item">
						<span class="dashicons dashicons-screenoptions" aria-hidden="true"></span>
						<div>
							<h3><?php esc_html_e( 'Custom integrations', 'wp-search-with-algolia' ); ?></h3>
							<p>
								<?php
								if ( $algolia_wds_compact ) {
									esc_html_e( 'Custom post types, ACF, facets, multi-language, headless.', 'wp-search-with-algolia' );
								} else {
									esc_html_e( 'Custom post types, ACF fields, faceted filters, multi-language sites, headless front ends. We build the integration to fit your site.', 'wp-search-with-algolia' );
								}
								?>
							</p>
						</div>
					</div>

					<div class="algolia-premium-support-list__item">
						<span class="dashicons dashicons-performance" aria-hidden="true"></span>
						<div>
							<h3><?php esc_html_e( 'Scale &amp; performance', 'wp-search-with-algolia' ); ?></h3>
							<p>
								<?php
								if ( $algolia_wds_compact ) {
									esc_html_e( 'Multisite networks, large catalogs, and high-traffic stores.', 'wp-search-with-algolia' );
								} else {
									esc_html_e( 'Multisite networks, large catalogs, and high-traffic eCommerce stores. We profile bottlenecks, optimize indexing, and design for the way your visitors actually search.', 'wp-search-with-algolia' );
								}
								?>
							</p>
						</div>
					</div>
				</div>

				<?php if ( $algolia_wds_compact ) : ?>

					<p class="algolia-wds__beyond">
						<?php esc_html_e( 'Beyond search: eCommerce, headless front ends, multisite, migrations, performance, and ongoing maintenance.', 'wp-search-with-algolia' ); ?>
					</p>

					<div class="algolia-premium-support-highlight__cta">
						<a class="wds-premium" href="<?php echo esc_url( $wds_url ); ?>" target="_blank" rel="noopener noreferrer">
							<?php esc_html_e( 'Talk to WebDevStudios', 'wp-search-with-algolia' ); ?>
							<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
						</a>
					</div>

				<?php else : ?>

					<aside class="algolia-premium-support-highlight" aria-labelledby="algolia-wds-partnership-heading">
						<div class="algolia-premium-support-highlight__brand">
							<?php
							/*
							 * Dark logo variant here: this block sits on WDS Light
							 * Gray, so the reversed version used in the masthead
							 * would be invisible.
							 */
							$algolia_wds_logo_dark_file = 'includes/admin/img/logo-webdevstudios-dark.png';

							if ( file_exists( ALGOLIA_PATH . $algolia_wds_logo_dark_file ) ) :
								?>
								<img
									class="algolia-premium-support-highlight__logo"
									src="<?php echo esc_url( ALGOLIA_PLUGIN_URL . $algolia_wds_logo_dark_file ); ?>"
									width="170"
									height="43"
									alt="<?php esc_attr_e( 'WebDevStudios', 'wp-search-with-algolia' ); ?>"
								/>
							<?php endif; ?>
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
							</div>
						</div>
					</aside>

				<?php endif; ?>
			</div>

		</div>
	</section>
	</aside>

	</div>
</div>
