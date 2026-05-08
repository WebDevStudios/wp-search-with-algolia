<?php
/**
 * Form override search option admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
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
			<input type="radio" value="native" name="algolia_override_native_search" <?php checked( $value, 'native' ); ?>>
			<?php esc_html_e( 'Do not use Algolia for search', 'wp-search-with-algolia' ); ?>
		</label>
		<div class="radio-info">
			<?php esc_html_e( 'Keep the standard WordPress search. Algolia is not involved in answering queries. Pick this if you want to disable Algolia search temporarily, or are still configuring autocomplete and not ready to flip the search page.', 'wp-search-with-algolia' ); ?>
		</div>
	</div>

	<div class="algolia-radio-option">
		<label>
			<input type="radio" value="backend" name="algolia_override_native_search" <?php checked( $value, 'backend' ); ?>>
			<?php esc_html_e( 'Use Algolia, keep your theme&rsquo;s search template', 'wp-search-with-algolia' ); ?>
		</label>
		<div class="radio-info">
			<?php
			echo wp_kses(
				__( 'Algolia answers the search query, but results render through your theme&rsquo;s existing <code>search.php</code> (or block search template). The safest choice for compatibility (works with virtually any theme), but <strong>does not</strong> include faceted filters, instant updates, or other InstantSearch UI features.', 'wp-search-with-algolia' ),
				array(
					'code'   => array(),
					'strong' => array(),
				)
			);
			?>
		</div>
	</div>

	<div class="algolia-radio-option algolia-radio-option--recommended">
		<label>
			<input type="radio" value="instantsearch" name="algolia_override_native_search" <?php checked( $value, 'instantsearch' ); ?>>
			<?php esc_html_e( 'Use Algolia with InstantSearch.js', 'wp-search-with-algolia' ); ?>
			<span class="algolia-radio-badge"><?php esc_html_e( 'Recommended', 'wp-search-with-algolia' ); ?></span>
		</label>
		<div class="radio-info">
			<?php
			echo wp_kses(
				__( 'Replaces the WordPress search page with a full Algolia InstantSearch UI: instant results as you type, typo tolerance, and built-in filters for post type, category, tag, and author. Customize by copying <code>templates/instantsearch-modern.php</code> (or <code>instantsearch.php</code>) into <code>your-theme/algolia/</code>. <strong>Block themes:</strong> see "Learn more" below for the extra step required.', 'wp-search-with-algolia' ),
				array(
					'code'   => array(),
					'strong' => array(),
				)
			);
			?>
		</div>
	</div>

</div>
