<?php
/**
 * PHP-Scoper : PHP-DI configuration file.
 *
 * @link https://github.com/humbug/php-scoper/blob/master/src/scoper.inc.php.tpl
 *
 * @author WebDevStudios <contact@webdevstudios.com>
 * @since  2.0.0
 *
 * @package WebDevStudios\WPSWA
 */

declare( strict_types=1 );

use Isolated\Symfony\Component\Finder\Finder;

return [

	/*
	 * By default when running php-scoper add-prefix, it will prefix all relevant code found in the current working
	 * directory. You can however define which files should be scoped by defining a collection of Finders in the
	 * following configuration key.
	 *
	 * For more see: https://github.com/humbug/php-scoper#finders-and-paths
	 */
	'finders'         => [
		Finder::create()->files()->in( 'vendor/php-di/' ),
	],

	/*
	 * Whitelists a list of files.
	 * Unlike the other whitelist related features,
	 * this one is about completely leaving a file untouched.
	 * Paths are relative to the configuration file unless if they are already absolute.
	 *
	 * Both...
	 * `__DIR__ . '/../../vendor/php-di/php-di/src/Compiler/Template.php'`
	 * and...
	 * `dirname( __FILE__, 3 ) . '/vendor/php-di/php-di/src/Compiler/Template.php'`
	 * appear to work.
	 */
	'files-whitelist' => [
		__DIR__ . '/../../vendor/php-di/php-di/src/Compiler/Template.php',
	],

	/*
	 * When scoping PHP files, there will be scenarios where some of the code being scoped indirectly references the
	 * original namespace. These will include, for example, strings or string manipulations. PHP-Scoper has limited
	 * support for prefixing such strings. To circumvent that, you can define patchers to manipulate the file to your
	 * heart contents.
	 *
	 * For more see: https://github.com/humbug/php-scoper#patchers
	 */
	'patchers'        => [],
];
