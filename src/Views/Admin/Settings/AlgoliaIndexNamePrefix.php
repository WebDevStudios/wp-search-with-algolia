<?php
/**
 * AlgoliaIndexNamePrefix Setting template partial.
 *
 * @package WebDevStudios\WPSWA\Services\Admin\Settings
 * @since   2.0.0
 */

?>

<input name="<?php echo \esc_attr( $this->get_option_name() ); ?>"
	type="text" class="regular-text"
	<?php \disabled( $this->algolia_settings->is_index_prefix_in_config() ); ?>
	value="<?php echo \esc_attr( $this->algolia_settings->get_index_prefix() ); ?>"/>

<p id="<?php echo \esc_attr( $this->get_option_name() ); ?>-description" class="description">
	<?php \esc_html_e( 'This prefix will be prepended to your index names.', 'wp-search-with-algolia' ); ?>
</p>
