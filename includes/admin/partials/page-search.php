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
</div>
