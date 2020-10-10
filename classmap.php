<?php
/**
 * WP Search With Algolia "Classmap" file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ALGOLIA_PATH' ) ) {
	exit();
}

// The Algolia Search PHP API SearchClient.
if ( apply_filters( 'algolia_should_require_search_client', true ) ) {
	require_once ALGOLIA_PATH . 'includes/libraries/algoliasearch-client-php/autoload.php';
}

require_once ALGOLIA_PATH . 'includes/factories/class-algolia-http-client-interface-factory.php';
require_once ALGOLIA_PATH . 'includes/factories/class-algolia-search-client-factory.php';
require_once ALGOLIA_PATH . 'includes/factories/class-algolia-plugin-factory.php';

require_once ALGOLIA_PATH . 'includes/class-algolia-api.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-autocomplete-config.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-compatibility.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-plugin.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-search.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-settings.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-template-loader.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-utils.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-styles.php';
require_once ALGOLIA_PATH . 'includes/class-algolia-scripts.php';

require_once ALGOLIA_PATH . 'includes/indices/class-algolia-index.php';
require_once ALGOLIA_PATH . 'includes/indices/class-algolia-index-replica.php';
require_once ALGOLIA_PATH . 'includes/indices/class-algolia-searchable-posts-index.php';
require_once ALGOLIA_PATH . 'includes/indices/class-algolia-posts-index.php';
require_once ALGOLIA_PATH . 'includes/indices/class-algolia-terms-index.php';
require_once ALGOLIA_PATH . 'includes/indices/class-algolia-users-index.php';

require_once ALGOLIA_PATH . 'includes/watchers/class-algolia-changes-watcher.php';
require_once ALGOLIA_PATH . 'includes/watchers/class-algolia-post-changes-watcher.php';
require_once ALGOLIA_PATH . 'includes/watchers/class-algolia-term-changes-watcher.php';
require_once ALGOLIA_PATH . 'includes/watchers/class-algolia-user-changes-watcher.php';

if ( is_admin() ) {
	require_once ALGOLIA_PATH . 'includes/admin/class-algolia-admin.php';
	require_once ALGOLIA_PATH . 'includes/admin/class-algolia-admin-page-autocomplete.php';
	require_once ALGOLIA_PATH . 'includes/admin/class-algolia-admin-page-native-search.php';
	require_once ALGOLIA_PATH . 'includes/admin/class-algolia-admin-page-settings.php';
}
