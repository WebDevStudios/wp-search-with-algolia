<?php
/**
 * Search admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

?>

<div class="wrap">
	<h1>
		<?php echo esc_html( get_admin_page_title() ); ?>
		<button type="button" class="algolia-reindex-button button button-primary" data-index="searchable_posts">
			<?php esc_html_e( 'Re-index search page records', 'wp-search-with-algolia' ); ?>
		</button>
		<button type="button" class="algolia-push-settings-button button" data-index="searchable_posts">
			<?php esc_html_e( 'Push Settings', 'wp-search-with-algolia' ); ?>
		</button>
	</h1>
	<form method="post" action="options.php">
		<?php
		settings_fields( $this->option_group );
		do_settings_sections( $this->slug );
		submit_button();
		?>
	</form>
</div>
