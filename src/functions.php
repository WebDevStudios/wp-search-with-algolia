<?php
/**
 * Functions file.
 *
 * @since   2.0.0
 * @package WebDevStudios\WPSWA
 */

/*
 * Require functions from vendor libs.
 *
 * These are "function files" that we would prefer to include in composer.json for autoloading,
 * but they cause php-scoper to fatally error when running prefix commands.
 */
require_once WPSWA_PLUGIN_DIR . '/vendor_prefixed/algoliasearch-client-php/src/functions.php';
require_once WPSWA_PLUGIN_DIR . '/vendor_prefixed/algoliasearch-client-php/src/Http/Psr7/functions.php';
require_once WPSWA_PLUGIN_DIR . '/vendor_prefixed/guzzlehttp/guzzle/src/functions_include.php';
require_once WPSWA_PLUGIN_DIR . '/vendor_prefixed/guzzlehttp/promises/src/functions_include.php';
require_once WPSWA_PLUGIN_DIR . '/vendor_prefixed/guzzlehttp/psr7/src/functions_include.php';
