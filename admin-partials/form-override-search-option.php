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
				'Do not use Algolia for searching at all.<br/>This is only a valid option if you wish to search on your content from another website.',
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
		<?php esc_html_e( 'Use Algolia in the backend', 'wp-search-with-algolia' ); ?>
	</label>
	<div class="radio-info">
		<?php
		echo wp_kses(
			__(
				'With this option WordPress search will be powered by Algolia behind the scenes.<br/>This will allow your search results to be typo tolerant.<br/><b>This option does not support filtering and displaying instant search results but has the advantage to play nicely with any theme.</b>',
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
				'This will replace the search page with an instant search experience powered by Algolia.<br/>By default you will be able to filter by post type, categories, tags and authors.<br/>Please note that the plugin is shipped with some sensible default styling rules<br/>but it could require some CSS adjustments to provide an optimal search experience.',
				'wp-search-with-algolia'
			),
			[
				'br' => [],
			]
		);
		?>
	</div>
</div>
