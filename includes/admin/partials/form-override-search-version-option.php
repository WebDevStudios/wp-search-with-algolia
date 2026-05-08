<?php
/**
 * Form override search option admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.9.0
 *
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div class="input-radio">

	<div class="algolia-radio-option">
		<label>
			<input type="radio" value="legacy" name="algolia_instantsearch_template_version" <?php checked( $value, 'legacy' ); ?>>
			<?php esc_html_e( 'Legacy', 'wp-search-with-algolia' ); ?>
			<span class="algolia-radio-filename"><code>instantsearch.php</code></span>
		</label>
		<div class="radio-info">
			<?php esc_html_e( 'Uses the older WP Utils JavaScript helpers. Stick with Legacy on existing sites that already have customizations targeting this template, or if you depend on the WP Utils helper functions.', 'wp-search-with-algolia' ); ?>
		</div>
	</div>

	<div class="algolia-radio-option algolia-radio-option--recommended">
		<label>
			<input type="radio" value="modern" name="algolia_instantsearch_template_version" <?php checked( $value, 'modern' ); ?>>
			<?php esc_html_e( 'Modern', 'wp-search-with-algolia' ); ?>
			<span class="algolia-radio-filename"><code>instantsearch-modern.php</code></span>
			<span class="algolia-radio-badge"><?php esc_html_e( 'Recommended', 'wp-search-with-algolia' ); ?></span>
		</label>
		<div class="radio-info">
			<?php esc_html_e( 'Uses native JavaScript template literals and follows the patterns shown in current Algolia documentation. Best choice for new installs and any site without legacy template customizations.', 'wp-search-with-algolia' ); ?>
		</div>
	</div>

	<p class="algolia-radio-footnote">
		<span class="dashicons dashicons-info-outline" aria-hidden="true"></span>
		<?php esc_html_e( 'If you have customized the InstantSearch template in your active theme (under an "algolia" folder), keep this setting on the version your custom file is based on.', 'wp-search-with-algolia' ); ?>
	</p>

</div>
