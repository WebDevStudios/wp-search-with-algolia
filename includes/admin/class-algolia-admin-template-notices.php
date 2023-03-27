<?php
/**
 * Algolia_Admin_Template_Notices class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.8.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Template_Notices
 *
 * @since 1.8.0
 */
class Algolia_Admin_Template_Notices {

	/**
	 * Algolia_Admin_Template_Notices constructor.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0
	 */
	public function __construct() {
		add_action( 'admin_notices', [ $this, 'template_version_notices' ] );
	}

	/**
	 * Display template version discrepencany notices.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0
	 *
	 * @return void
	 */
	public function template_version_notices() {

		$core_template_paths = Algolia_Template_Utils::get_core_template_paths();

		$custom_template_paths = Algolia_Template_Utils::get_custom_template_paths();

		if ( empty( $custom_template_paths ) ) {
			return;
		}

		$core_template_versions = [];

		$custom_template_versions = [];

		foreach ( $custom_template_paths as $filename => $file_path ) {
			$core_template_versions[ $filename ]   = Algolia_Template_Utils::get_template_version(
				$core_template_paths[ $filename ]
			);
			$custom_template_versions[ $filename ] = Algolia_Template_Utils::get_template_version(
				$file_path
			);
		}

		foreach ( $custom_template_versions as $filename => $file_version ) {
			// Error if versions do not match, or custom template version unknown.
			if ( version_compare( $file_version, $core_template_versions[ $filename ], '!=' ) ) {
				$error_notices[] = sprintf(
					// translators: placeholder 1 is template filename, placeholder 2 is custom template version, placeholder 3 is core template version.
					esc_html__(
						'Your custom WP Search With Algolia template file, %1$s, version %2$s is out of date. The core version is %3$s',
						'wp-search-with-algolia'
					),
					$filename,
					! empty( $file_version ) ? $file_version : __( 'unknown', 'wp-search-with-algolia' ),
					$core_template_versions[ $filename ]
				);
			}
		}

		if ( empty( $error_notices ) ) {
			return;
		}

		foreach ( $error_notices as $error_notice ) {
			echo '<div class="notice notice-error"><p>' . esc_html( $error_notice ) . '</p></div>';
		}
	}
}
