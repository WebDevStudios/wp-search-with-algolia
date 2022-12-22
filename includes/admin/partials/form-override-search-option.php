<?php
/**
 * Form override search option admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

?>

<div class="input-radio">
	<label>
		<input type="radio" value="native"
			name="algolia_override_native_search" <?php checked( $value, 'native' ); ?>>
		<?php esc_html_e( 'Do not use Algolia', 'wp-search-with-algolia' ); ?>
	</label>
	<div class="radio-info">
		<?php
		echo wp_kses(
			__(
				'Do not use Algolia for searching at all. This option disables the plugin completely',
				'wp-search-with-algolia'
			),
			[
				'br' => [],
			]
		);
		?>
	</div>

	<label>
		<input type="radio" value="backend"
			name="algolia_override_native_search" <?php checked( $value, 'backend' ); ?>>
		<?php esc_html_e( 'Use Algolia with the native WordPress search template', 'wp-search-with-algolia' ); ?>
	</label>
	<div class="radio-info">
		<?php
		echo wp_kses(
			__(
				'Search results will be powered by Algolia and will use the standard WordPress search template for displaying the results.<br/>This option has the advantage to play nicely with any theme but does not support filtering and displaying instant search results.',
				'wp-search-with-algolia'
			),
			[
				'br' => [],
				'b'  => [],
			]
		);
		?>
	</div>

	<label>
		<input type="radio" value="instantsearch"
			name="algolia_override_native_search" <?php checked( $value, 'instantsearch' ); ?>>
		<?php esc_html_e( 'Use Algolia with Instantsearch.js', 'wp-search-with-algolia' ); ?>
	</label>
	<div class="radio-info">
		<?php
		echo wp_kses(
			__(
				'This will replace the WordPress search page with an instant search experience powered by Algolia.<br/>By default you will be able to filter by post type, categories, tags and authors.',
				'wp-search-with-algolia'
			),
			[
				'br' => [],
			]
		);
		?>
	</div>
</div>
