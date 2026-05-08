<?php
/**
 * Algolia_Admin_Field_Helpers class file.
 *
 * Provides reusable rendering helpers for admin settings fields:
 * - A short description plus a collapsible "Learn more" disclosure for
 *   extended help content.
 * - An inline notice shown when a setting is locked by a wp-config.php
 *   constant.
 *
 * Used by the main Settings page and (in later phases) the Autocomplete
 * and Search settings pages.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.11.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Admin_Field_Helpers
 *
 * @since 2.11.0
 */
class Algolia_Admin_Field_Helpers {

	/**
	 * Render the always-visible short description plus an optional
	 * collapsible "Learn more" block containing extended help.
	 *
	 * @since 2.11.0
	 *
	 * @param string   $short_description   Short, one-sentence description (plain text).
	 * @param array    $extended_paragraphs Long-form help blocks rendered in order. Each entry
	 *                                      may be a string (rendered as a paragraph) or an
	 *                                      array of strings (rendered as a bullet list). Limited HTML allowed.
	 * @param string[] $bullets             Optional bullet items rendered after the paragraphs.
	 * @param array    $doc_link {
	 *     Optional doc link rendered at the end of the body.
	 *
	 *     @type string $url   Full URL.
	 *     @type string $label Visible link text.
	 * }
	 * @param string   $summary_label       Optional override for the disclosure label. Defaults to "Learn more".
	 *
	 * @return void
	 */
	public static function render_field_help(
		$short_description,
		array $extended_paragraphs = array(),
		array $bullets = array(),
		array $doc_link = array(),
		$summary_label = ''
	) {
		echo '<p class="description">' . esc_html( $short_description ) . '</p>';

		$has_paragraphs = ! empty( $extended_paragraphs );
		$has_bullets    = ! empty( $bullets );
		$has_doc_link   = ! empty( $doc_link['url'] ) && ! empty( $doc_link['label'] );

		if ( ! $has_paragraphs && ! $has_bullets && ! $has_doc_link ) {
			return;
		}

		$summary = '' !== $summary_label
			? $summary_label
			: __( 'Learn more', 'wp-search-with-algolia' );

		$allowed_html = array(
			'a'      => array(
				'href'   => true,
				'target' => true,
				'rel'    => true,
			),
			'strong' => array(),
			'em'     => array(),
			'code'   => array(),
			'br'     => array(),
		);

		echo '<details class="algolia-field-help">';
		echo '<summary>' . esc_html( $summary ) . '</summary>';
		echo '<div class="algolia-field-help__body">';

		foreach ( $extended_paragraphs as $entry ) {
			if ( is_array( $entry ) ) {
				echo '<ul>';
				foreach ( $entry as $bullet ) {
					echo '<li>' . wp_kses( $bullet, $allowed_html ) . '</li>';
				}
				echo '</ul>';
				continue;
			}
			echo '<p>' . wp_kses( $entry, $allowed_html ) . '</p>';
		}

		if ( $has_bullets ) {
			echo '<ul>';
			foreach ( $bullets as $bullet ) {
				echo '<li>' . wp_kses( $bullet, $allowed_html ) . '</li>';
			}
			echo '</ul>';
		}

		if ( $has_doc_link ) {
			echo '<p class="algolia-field-help__doc-link"><a href="'
				. esc_url( $doc_link['url'] )
				. '" target="_blank" rel="noopener noreferrer">'
				. esc_html( $doc_link['label'] )
				. ' <span class="dashicons dashicons-external" aria-hidden="true"></span>'
				. '<span class="screen-reader-text"> '
				. esc_html__( '(opens in a new tab)', 'wp-search-with-algolia' )
				. '</span>'
				. '</a></p>';
		}

		echo '</div></details>';
	}

	/**
	 * Render an inline notice indicating that a setting is locked by a
	 * wp-config.php constant.
	 *
	 * @since 2.11.0
	 *
	 * @param string $constant_name The PHP constant name (e.g. ALGOLIA_APPLICATION_ID).
	 *
	 * @return void
	 */
	public static function render_constant_locked_notice( $constant_name ) {
		$known_constants = array(
			'ALGOLIA_APPLICATION_ID',
			'ALGOLIA_SEARCH_API_KEY',
			'ALGOLIA_API_KEY',
			'ALGOLIA_INDEX_NAME_PREFIX',
		);

		if ( ! in_array( $constant_name, $known_constants, true ) ) {
			return;
		}

		// Translators: %s is a PHP constant name wrapped in <code> tags.
		$body = sprintf(
			/* translators: %s: PHP constant name (e.g. ALGOLIA_APPLICATION_ID) wrapped in <code>. */
			__( 'This value is set by the %s constant and cannot be edited here.', 'wp-search-with-algolia' ),
			'<code>' . esc_html( $constant_name ) . '</code>'
		);

		echo '<p class="algolia-field-locked">';
		echo '<span class="dashicons dashicons-lock" aria-hidden="true"></span>';
		echo '<span class="algolia-field-locked__text">';
		echo '<strong>' . esc_html__( 'Defined in wp-config.php.', 'wp-search-with-algolia' ) . '</strong> ';
		echo wp_kses( $body, array( 'code' => array() ) );
		echo ' ';
		echo esc_html__( 'Edit your wp-config.php file to change it.', 'wp-search-with-algolia' );
		echo '</span>';
		echo '</p>';
	}
}
