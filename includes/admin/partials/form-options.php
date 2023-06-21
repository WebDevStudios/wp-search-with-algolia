<?php
/**
 * Form options admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

?>

<div class="wrap">
	<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
	<?php if ( ! has_action( 'wpswa_pro_override_settings_output' ) ) : ?>
		<form method="post" action="options.php">
			<?php
			settings_fields( $this->option_group );
			do_settings_sections( $this->slug );
			submit_button();
			?>
		</form>
	<?php else : ?>
		<?php do_action( 'wpswa_pro_override_settings_output' ); ?>
	<?php endif; ?>
</div>
