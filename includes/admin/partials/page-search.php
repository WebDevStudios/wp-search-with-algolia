<?php
/**
 * Search admin template partial.
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

$algolia_header_subtitle = __( 'Choose how WordPress search uses Algolia, and re-index or push settings to keep results fresh.', 'wp-search-with-algolia' );

ob_start();
?>
<button type="button" class="algolia-reindex-button button button-primary" data-index="searchable_posts">
	<?php esc_html_e( 'Re-index All Content', 'wp-search-with-algolia' ); ?>
</button>
<button type="button" class="algolia-push-settings-button button" data-index="searchable_posts">
	<?php esc_html_e( 'Push Settings', 'wp-search-with-algolia' ); ?>
</button>
<?php
$algolia_header_actions = ob_get_clean();
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
		__( 'Re-indexing everything just to check whether one post made it in? Pro shows per-post index status in the editor, adds a one-click re-index for a single post, and flags index problems on your dashboard.', 'wp-search-with-algolia' ),
		__( 'See Index Health in Pro', 'wp-search-with-algolia' ),
		'search-page-nudge'
	);
	?>
</div>
