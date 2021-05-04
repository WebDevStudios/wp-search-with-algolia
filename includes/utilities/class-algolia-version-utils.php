<?php
/**
 * Algolia_Version_Utils class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.8.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Version_Utils
 *
 * @since 1.8.0
 */
class Algolia_Version_Utils {

	/**
	 * Semantic versioning regular expression pattern.
	 *
	 * @link https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
	 * @link https://regex101.com/r/Ly7O1x/3/
	 *
	 * @since   1.8.0
	 *
	 * @var string
	 */
	const SEMVER_PATTERN = '%^(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)(?:-(?P<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?P<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$%';

	/**
	 * Parse version string into array of semver components.
	 *
	 * Supports MAJOR.MINOR.PATCH-prerelease+buildmetadata.
	 * Given a valid semantic version string, such as '1.8.0-dev+build.1',
	 * will return an array of matches that follow Semantic Versioning 2.0.0.
	 * Example return...
	 *     $matches = [
	 *         0               => '1.8.0-dev+build.1',
	 *         'major'         => '1',
	 *         1               => '1',
	 *         'minor'         => '8',
	 *         2               => '8',
	 *         'patch'         => '0',
	 *         3               => '0',
	 *         'prerelease'    => 'dev',
	 *         4               => 'dev',
	 *         'buildmetadata' => 'build.1',
	 *         5               => 'build.1',
	 *     ];
	 *
	 * @link https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @param string $version Version number string.
	 *
	 * @return array
	 */
	public static function parse_semver_version_string( string $version ): array {
		$matches = [];
		preg_match(
			self::SEMVER_PATTERN,
			$version,
			$matches
		);

		return $matches;
	}

	/**
	 * Get the MAJOR version number from version string.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @param string $version Version number string.
	 *
	 * @return int|null
	 */
	public static function get_major_version( string $version ): ?int {
		$matches = self::parse_semver_version_string( $version );
		if ( empty( $matches['major'] ) ) {
			return null;
		}

		return (int) $matches['major'];
	}

	/**
	 * Get the MINOR version number from version string.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @param string $version Version number string.
	 *
	 * @return int|null
	 */
	public static function get_minor_version( string $version ): ?int {
		$matches = self::parse_semver_version_string( $version );
		if ( empty( $matches['minor'] ) ) {
			return null;
		}

		return (int) $matches['minor'];
	}

	/**
	 * Get the PATCH version number from version string.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
	 *
	 * @param string $version Version number string.
	 *
	 * @return int|null
	 */
	public static function get_patch_version( string $version ): ?int {
		$matches = self::parse_semver_version_string( $version );
		if ( empty( $matches['patch'] ) ) {
			return null;
		}

		return (int) $matches['patch'];
	}
}
