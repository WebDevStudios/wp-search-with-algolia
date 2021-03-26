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
			array( $this, 'major_release_notice' ),
			10,
			2
		);
	}

	/**
	 * Major release notice for versions less than 2.0.0
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.8.0-dev
	 *
	 * @param array $plugin_data Plugin data.
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
