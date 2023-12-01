<?php
/**
 * Form options admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 * @package WebDevStudios\WPSWA
 */

?>

<div class="wrap">
	<h1>
		<?php esc_html_e( 'WP Search with Algolia and Search Engine Optimization', 'wp-search-with-algolia' ); ?>
	</h1>
	<img style="max-width: 100%;" src="<?php echo esc_url( ALGOLIA_PLUGIN_URL . 'includes/admin/img/algolia-pro-seo.jpg' ); ?>" alt="<?php esc_attr_e( 'Blurry representiation of features available with WP Search with Algolia Pro.', 'wp-search-with-algolia' ); ?>" />
	<?php echo Algolia_Utils::pro_cta_content(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
