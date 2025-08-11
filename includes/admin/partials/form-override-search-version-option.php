<?php
/**
 * Form override search option admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.9.0
 *
 * @package WebDevStudios\WPSWA
 */

?>

<div class="input-radio">
	<label>
		<input type="radio" value="legacy"
			name="algolia_instantsearch_template_version" <?php checked( $value, 'legacy' ); ?>>
		<?php esc_html_e( 'Legacy (instantsearch.php)', 'wp-search-with-algolia' ); ?>
	</label>
	<div class="radio-info">
		<?php
		echo wp_kses(
			__(
				'Utilizes WP Utils library.',
				'wp-search-with-algolia'
			),
			[
				'br' => [],
			]
		);
		?>
	</div>

	<label>
		<input type="radio" value="modern"
			name="algolia_instantsearch_template_version" <?php checked( $value, 'modern' ); ?>>
		<?php esc_html_e( 'Modern (instantsearch-modern.php)', 'wp-search-with-algolia' ); ?>
	</label>
	<div class="radio-info">
		<?php
		echo wp_kses(
			__(
				'Uses Javascript template string literals and is more in line with Algolia documentation.',
				'wp-search-with-algolia'
			),
			[
				'br' => [],
			]
		);
		?>
	</div>
	<p><strong><?php esc_html_e( 'Leave on current setting if you have InstantSearch customized via files in your active theme.', 'wp-search-with-algolia' ); ?></strong></p>
</div>
