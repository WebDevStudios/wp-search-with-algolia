<?php
/**
 * AlgoliaPoweredByEnabled Setting template partial.
 *
 * @package WebDevStudios\WPSWA\Services\Admin\Settings
 * @since   2.0.0
 */

?>

<input name="<?php echo \esc_attr( $this->get_option_name() ); ?>"
	type="checkbox" value="no"
	<?php \checked( 'no', $this->algolia_settings->powered_by_enabled() ); ?> />

<p id="<?php echo \esc_attr( $this->get_option_name() ); ?>-description" class="description">
	<?php \esc_html_e( 'This will remove the Algolia logo from the autocomplete and the search page. We require that you keep the Algolia logo if you are using a free plan.', 'wp-search-with-algolia' ); ?>
</p>
