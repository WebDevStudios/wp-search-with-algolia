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

	<div class="cptui-intro-devblock">
		<p class="about-text cptui-about-text">
			<?php esc_html_e( 'Thank you for using Algolia and WP Search with Algolia to enhance your website\'s search experience. We are happy to have you as a user.', 'wp-search-with-algolia' ); ?>
		</p>
		<div class="cptui-badge"></div>
	</div>

	<h2><?php esc_html_e( 'Seeking help?', 'wp-search-with-algolia' ); ?></h2>
	<p class="about-text">
		<?php esc_html_e( 'Are you struggling to get Algolia and WP Search with Algolia working like you\'ve envisioned, and wanting some help?', 'wp-search-with-algolia' ); ?>
	</p>
	<p class="about-text">
		<?php esc_html_e( 'WebDevStudios, the folks behind WP Search with Algolia and WP Search with Algolia Pro would love to be in touch to see if we can work together to get your site to where it needs to be.', 'wp-search-with-algolia' ); ?>
	</p>
	<p class="about-text">If this sounds like you, please reach out to WebDevStudios over at <a href="https://webdevstudios.com/contact/">our contact page</a> and lets get a discussion going!</p>
</div>
