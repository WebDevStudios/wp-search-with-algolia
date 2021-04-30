<?php
/**
 * Algolia_Update_Messages class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.8.0-dev
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Update_Messages
 *
 * @since 1.8.0-dev
 */
class Algolia_Update_Messages {

	/**
	 * Constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 */
	public function __construct() {
		add_action(
			'in_plugin_update_message-' . ALGOLIA_PLUGIN_BASENAME,
			[ $this, 'in_plugin_update_message' ],
			10,
			2
		);
	}

	/**
	 * Update notice.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 *
	 * @param array  $plugin_data {
	 *     An array of plugin metadata.
	 *
	 *     @type string $name        The human-readable name of the plugin.
	 *     @type string $plugin_uri  Plugin URI.
	 *     @type string $version     Plugin version.
	 *     @type string $description Plugin description.
	 *     @type string $author      Plugin author.
	 *     @type string $author_uri  Plugin author URI.
	 *     @type string $text_domain Plugin text domain.
	 *     @type string $domain_path Relative path to the plugin's .mo file(s).
	 *     @type bool   $network     Whether the plugin can only be activated network wide.
	 *     @type string $title       The human-readable title of the plugin.
	 *     @type string $author_name Plugin author's name.
	 *     @type bool   $update      Whether there's an available update. Default null.
	 * }
	 *
	 * @param object $response {
	 *     An array of metadata about the available plugin update.
	 *
	 *     @type int    $id          Plugin ID.
	 *     @type string $slug        Plugin slug.
	 *     @type string $new_version New plugin version.
	 *     @type string $url         Plugin URL.
	 *     @type string $package     Plugin update package URL.
	 * }
	 *
	 * @return void
	 */
	public function major_release_notice( $plugin_data ) {

		// Bail if the version is greater or equal to 2.0.0.
		if ( version_compare( $plugin_data['Version'], '2.0.0', '>=' ) ) {
			return;
		}

		// Show the major release message to inform users.
	}
}
