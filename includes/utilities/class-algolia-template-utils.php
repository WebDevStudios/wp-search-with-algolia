<?php
/**
 * Algolia_Template_Utils class file.
 *
 * @since   1.8.0
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Template_Utils
 *
 * @since 1.8.0
 */
class Algolia_Template_Utils {

	/**
	 * The plugin template directory name.
	 *
	 * @since 1.8.0
	 *
	 * @var string
	 */
	const PLUGIN_TEMPLATES_DIR = 'templates';

	/**
	 * The theme template directory name.
	 *
	 * @since 1.8.0
	 *
	 * @var string
	 */
	const THEME_TEMPLATES_DIR = 'algolia';

	/**
	 * The template file names.
	 *
	 * @since 1.8.0
	 *
	 * @var string[]
	 */
	const TEMPLATE_FILE_NAMES = [
		'autocomplete.php',
		'instantsearch.php',
	];

	/**
	 * Get the plugin templates directory with trailing slash.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
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
	 * @since  1.8.0
	 *
	 * @return string The theme templates directory name with trailing slash.
	 */
	public static function get_theme_templates_dirname() {
		return (string) self::THEME_TEMPLATES_DIR . '/';
	}

	/**
	 * Get the "filtered" theme templates directory name with trailing slash.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @return string The theme templates directory name with trailing slash.
	 */
	public static function get_filtered_theme_templates_dirname() {

		$path = self::get_theme_templates_dirname();

		/**
		 * Allow developers to override the theme templates dirname.
		 *
		 * @since      1.0.0
		 * @deprecated 1.8.0 Use {@see 'algolia_theme_templates_dirname'} instead.
		 *
		 * @param string $path The theme templates directory name with trailing slash.
		 *                     Defaults to 'algolia/'.
		 */
		$path = (string) apply_filters_deprecated(
			'algolia_templates_path',
			[ $path ],
			'1.8.0',
			'algolia_theme_templates_dirname'
		);

		/**
		 * Allow developers to override the theme templates dirname.
		 *
		 * @since  1.8.0
		 *
		 * @param string $path The theme templates directory name with trailing slash.
		 *                     Defaults to 'algolia/'.
		 */
		return (string) apply_filters(
			'algolia_theme_templates_dirname',
			$path
		);
	}

	/**
	 * Get the "unfiltered" full path to the default template file in the plugin.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0
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
	 * @since   1.8.0
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
	 * There are numerous filters related to changing template locations,
	 * which makes it a little more difficult than it should be
	 * to find where a "customized" template actually exists.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.8.0
	 *
	 * @param string $file The template file.
	 *
	 * @return string Full path to the template file.
	 */
	public static function locate_template( $file ) {

		$custom_location = apply_filters(
			'algolia_custom_template_location',
			null,
			$file
		);

		if ( ! empty( $custom_location ) ) {
			return $custom_location;
		}

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
	 * @since  1.8.0
	 *
	 * @param string $template Full path to the template file.
	 *
	 * @return null|string Template version number string if it exists,
	 *                     empty string if no version number exists,
	 *                     else null if template file is not found or can't be read.
	 */
	public static function get_template_version( $template ): ?string {

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

	/**
	 * Get the Alglia Template File Names.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @return array
	 */
	public static function get_template_file_names(): array {
		return (array) self::TEMPLATE_FILE_NAMES;
	}

	/**
	 * Get unfiltered array of plugin's core template paths.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @return array An array of the plugin's core template paths.
	 */
	public static function get_core_template_paths(): array {
		$plugin_template_paths = [];
		$template_filenames    = self::get_template_file_names();
		foreach ( $template_filenames as $file ) {
			$plugin_template_paths[ $file ] = self::get_default_template( $file );
		}

		return (array) $plugin_template_paths;
	}

	/**
	 * Get array of located template paths.
	 *
	 * There are numerous filters related to changing template locations,
	 * which makes it a little more difficult than it should be
	 * to find where a "customized" template actually exists.
	 * For that reason, we will call this "located template paths."
	 * They aren't necessarily customized template paths from the theme,
	 * they might be the same as the plugin's core templates.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @return array
	 */
	public static function get_located_template_paths(): array {
		$located_template_paths = [];
		$template_filenames     = self::get_template_file_names();
		foreach ( $template_filenames as $file ) {
			$located_template_paths[ $file ] = self::locate_template( $file );
		}

		return (array) $located_template_paths;
	}

	/**
	 * Get array of custom template paths.
	 *
	 * Diffs the plugin's core template paths against the located template paths.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @return array Array of custom template paths,
	 *               else empty array if no custom templates found.
	 */
	public static function get_custom_template_paths(): array {

		$customized_template_paths = array_diff(
			self::get_located_template_paths(),
			self::get_core_template_paths()
		);

		if ( empty( $customized_template_paths ) ) {
			return [];
		}

		return (array) $customized_template_paths;
	}
}
