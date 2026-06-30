<?php
/**
 * Form options admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$algolia_header_subtitle = __( 'Connect WordPress to Algolia, and control how search results behave across your site.', 'wp-search-with-algolia' );
$algolia_header_actions  = '';
?>

<div class="wrap algolia-settings-page">
	<?php require dirname( __FILE__ ) . '/admin-header.php'; ?>

	<?php if ( ! has_action( 'wpswa_pro_override_settings_output' ) ) : ?>
		<div class="algolia-settings-card">
			<form method="post" action="options.php">
				<?php
				settings_fields( $this->option_group );
				do_settings_sections( $this->slug );
				submit_button();
				?>
			</form>
		</div>
	<?php else : ?>
		<?php
		/**
		 * Allows for custom output of settings page content.
		 *
		 * Most specifically used for WP Search with Algolia Pro
		 *
		 * @since 2.5.2
		 */
		do_action( 'wpswa_pro_override_settings_output' );
		?>
	<?php endif; ?>
</div>
