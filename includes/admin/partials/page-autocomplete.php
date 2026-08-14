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

require_once dirname( __FILE__ ) . '/pro-parts.php';

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

	<?php
	algolia_pro_render_inline_nudge(
		__( 'Want ACF, Meta Box, or CMB2 field values searchable and shown in these results? Pro maps custom fields into your index from a drag-and-drop screen, with no PHP required.', 'wp-search-with-algolia' ),
		__( 'See the Meta Field Mapper in Pro', 'wp-search-with-algolia' ),
		'autocomplete-page-nudge'
	);
	?>
</div>
