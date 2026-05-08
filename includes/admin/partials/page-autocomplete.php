<?php
/**
 * Autocomplete admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$algolia_header_subtitle = __( 'Configure the autocomplete dropdown that appears as visitors type in your site search.', 'wp-search-with-algolia' );
$algolia_header_actions  = '';
?>

<div class="wrap algolia-settings-page">
	<?php require dirname( __FILE__ ) . '/admin-header.php'; ?>

	<div class="algolia-settings-card">
		<form method="post" action="options.php">
			<?php
			settings_fields( $this->option_group );
			do_settings_sections( $this->slug );
			submit_button();
			?>
		</form>
	</div>
</div>
