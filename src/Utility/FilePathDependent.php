<?php
/**
 * Trait for classes that need to locate assets relative to a file path.
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Utility
 * @since 2019-01-04
 */

namespace WebDevStudios\WPSWA\Utility;

/**
 * Trait FilePathDependent
 *
 * @author  Jeremy Ward <jeremy.ward@webdevstudios.com>
 * @package WebDevStudios\WPSWA\Utility
 * @since   2019-01-04
 */
trait FilePathDependent {
	/**
	 * The root file path.
	 *
	 * @since 2019-01-04
	 *
	 * @var string
	 */
	protected $file_path;

	/**
	 * Set the relative root path for an object.
	 *
	 * @param string $path The root file path.
	 *
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since  2019-01-04
	 */
	public function set_file_path( string $path ) {
		$this->file_path = $path;
	}

	/**
	 * Get the root file path.
	 *
	 * @author Jeremy Ward <jeremy.ward@webdevstudios.com>
	 * @since  2019-01-04
	 * @return string
	 */
	public function get_file_path() : string {
		return $this->file_path;
	}
}
