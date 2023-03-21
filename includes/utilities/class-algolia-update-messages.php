<?php
/**
 * Algolia_Update_Messages class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.8.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Update_Messages
 *
 * @since 1.8.0
 */
class Algolia_Update_Messages {

	/**
	 * Constructor.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0
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
	 * @since  1.8.0
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
	public function in_plugin_update_message( $plugin_data, $response ) {

		$h4_open  = '<h4 class="update-available">';
		$h4_close = '</h4>';

		$ul_open  = '<ul class="update-available">';
		$ul_close = '</ul>';

		$changelist = '';

		$current_major_version = Algolia_Version_Utils::get_major_version(
			$plugin_data['Version']
		);

		$new_major_version = Algolia_Version_Utils::get_major_version(
			$response->new_version
		);

		if ( $current_major_version === $new_major_version ) {
			return;
		}

		$update_title = sprintf(
			// translators: placeholder 1 is current plugin version, placeholder 2 is the available update version.
			esc_html__( 'This is a major version update, from %1$s to %2$s, which may contain backwards incompatible changes.', 'wp-search-with-algolia' ),
			$plugin_data['Version'],
			$response->new_version
		);

		require_once ABSPATH . 'wp-admin/includes/plugin-install.php';

		$plugin_information = plugins_api(
			'plugin_information',
			[ 'slug' => $response->slug ]
		);

		if (
			! $plugin_information
			|| is_wp_error( $plugin_information )
			|| empty( $plugin_information->sections['changelog'] )
		) {
			echo wp_kses_post( $h4_open . $update_title . $h4_close );
			return;
		}

		$changelog = $plugin_information->sections['changelog'];

		$changes = preg_replace( '#<\s*?p\b[^>]*>(.*?)</p\b[^>]*>#s', '', $changelog );

		$pos = stripos( $changes, '<h4>' . $plugin_data['Version'] . '</h4>' );

		if ( false === $pos ) {
			echo wp_kses_post( $h4_open . $update_title . $h4_close );
			return;
		}

		$changes = trim( substr( $changes, 0, $pos ) );

		$changes = preg_replace( '/<h4>(.*)<\/h4>.*/iU', '', $changes );

		$changelist .= $ul_open . strip_tags( $changes, '<li>' ) . $ul_close;

		echo wp_kses_post( $h4_open . $update_title . $h4_close . $changelist );
	}
}
