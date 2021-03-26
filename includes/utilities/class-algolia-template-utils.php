<?php
/**
 * Algolia_Template_Utils class file.
 *
 * @since   1.8.0-dev
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Template_Utils
 *
 * @since 1.8.0-dev
 */
class Algolia_Template_Utils {

	/**
	 * The plugin template directory name.
	 *
	 * @since 1.8.0-dev
	 *
	 * @var string
	 */
	const PLUGIN_TEMPLATES_DIR = 'templates';

	/**
	 * The theme template directory name.
	 *
	 * @since 1.8.0-dev
	 *
	 * @var string
	 */
	const THEME_TEMPLATES_DIR = 'algolia';

	/**
	 * Get the plugin templates directory with trailing slash.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 *
	 * @return string The plugin templates directory name with trailing slash.
	 */
	public static function get_plugin_templates_dirname() {
		return (string) self::PLUGIN_TEMPLATES_DIR . '/';
	}

	/**
	 * Get the "unfiltered" theme templates directory with trailing slash.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 *
	 * @return string The theme templates directory name with trailing slash.
	 */
	public static function get_theme_templates_dirname() {
		return (string) self::THEME_TEMPLATES_DIR . '/';
	}

	/**
	 * Get the "filtered" theme templates directory with trailing slash.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 *
	 * @return string The theme templates directory name with trailing slash.
	 */
	public static function get_filtered_theme_templates_dirname() {

		/**
		 * Allow developers to override the theme templates dirname.
		 *
		 * @since  1.8.0-dev
		 *
		 * @param string $path The theme templates directory name with trailing slash.
		 *                     Defaults to 'algolia/'.
		 */
		return (string) apply_filters(
			'algolia_theme_templates_dirname',
			self::get_theme_templates_dirname()
		);
	}

	/**
	 * Get the "unfiltered" full path to the default template file in the plugin.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0-dev
	 *
	 * @param string $file The template filename.
	 *
	 * @return string Full path to the template file.
	 */
	public static function get_default_template( $file ) {
		return (string) ALGOLIA_PATH . self::get_plugin_templates_dirname() . $file;
	}

	/**
	 * Get the "filtered" full path to the default template file in the plugin.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0-dev
	 *
	 * @param string $file The template filename.
	 *
	 * @return string Full path to the template file.
	 */
	public static function get_filtered_default_template( $file ) {
		/**
		 * Allow developers to override the default template.
		 *
		 * @todo Should this even be allowed?
		 *
		 * @since  1.0.0
		 *
		 * @param string $template Full path to the default template file.
		 * @param string $file     The default template file.
		 */
		return (string) apply_filters(
			'algolia_default_template',
			self::get_default_template( $file ),
			$file
		);
	}

	/**
	 * Locate a template.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0-dev
	 *
	 * @param string $file The template file.
	 *
	 * @return string Full path to the template file.
	 */
	public static function locate_template( $file ) {

		$locations = [
			$file,
		];

		$templates_path = self::get_filtered_theme_templates_dirname();

		if ( self::get_theme_templates_dirname() !== $templates_path ) {
			$locations[] = self::get_theme_templates_dirname() . $file;
		}

		$locations[] = $templates_path . $file;

		/**
		 * Allow developers to override the template locations.
		 *
		 * @todo Should this even be allowed?
		 *
		 * @since 1.0.0
		 *
		 * @param array  $locations Array of template locations.
		 * @param string $file      The template file.
		 */
		$locations = (array) apply_filters(
			'algolia_template_locations',
			$locations,
			$file
		);

		$template = locate_template(
			array_unique( $locations )
		);

		$filtered_default = self::get_filtered_default_template( $file );

		return (string) $template ? $template : $filtered_default;
	}

	/**
	 * Retrieve template version.
	 *
	 * Based on WooCommerce's WC_Admin_Status::get_file_version() method.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 *
	 * @param string $template Full path to the template file.
	 *
	 * @return string
	 */
	public static function get_version( $template ): ?string {

		// Null, if template file does not exist or cannot be read.
		if ( ! is_file( $template ) || ! is_readable( $template ) ) {
			return null;
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fopen
		$pointer = fopen( $template, 'r' );

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fread
		$file_data = fread( $pointer, 8192 );

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_read_fclose
		fclose( $pointer );

		$file_data = str_replace( "\r", "\n", $file_data );

		// Empty string, if version cannot be determined.
		$version = '';

		preg_match(
			'/^[ \t\/*#@]*' . preg_quote( '@version', '/' ) . '(.*)$/mi',
			$file_data,
			$matches
		);

		if ( empty( $matches[1] ) ) {
			return $version;
		}

		return _cleanup_header_comment( $matches[1] );
	}
}
