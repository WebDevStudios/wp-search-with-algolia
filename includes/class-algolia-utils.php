<?php
/**
 * Algolia_Utils class file.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

/**
 * Class Algolia_Utils
 *
 * @since 1.0.0
 */
class Algolia_Utils {

	/**
	 * Retrieve term parents with separator.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int    $id        Term ID.
	 * @param string $taxonomy  The taxonomy.
	 * @param string $separator Optional, default is '/'. How to separate terms.
	 * @param bool   $nicename  Optional, default is false. Whether to use nice name for display.
	 * @param array  $visited   Optional. Already linked to terms to prevent duplicates.
	 *
	 * @return string|WP_Error A list of terms parents on success, WP_Error on failure.
	 */
	public static function get_term_parents( $id, $taxonomy, $separator = '/', $nicename = false, $visited = array() ) {
		$chain  = '';
		$parent = get_term( $id, $taxonomy );
		if ( is_wp_error( $parent ) ) {
			return $parent;
		}

		if ( $nicename ) {
			$name = $parent->slug;
		} else {
			$name = $parent->name;
		}

		if ( $parent->parent && ( $parent->parent !== $parent->term_id ) && ! in_array( $parent->parent, $visited, true ) ) {
			$visited[] = $parent->parent;
			$chain    .= self::get_term_parents( $parent->parent, $taxonomy, $separator, $nicename, $visited );
		}

		$chain .= $name . $separator;

		return $chain;
	}

	/**
	 * Get taxonomy tree.
	 *
	 * This is useful when building hierarchical menus.
	 *
	 * Returns an array like:
	 * array(
	 *    'lvl0' => ['Sales', 'Marketing'],
	 *    'lvl1' => ['Sales > Strategies', 'Marketing > Tips & Tricks']
	 *    ...
	 * );.
	 *
	 * @link    https://community.algolia.com/instantsearch.js/documentation/#hierarchicalmenu
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param array  $terms     The terms.
	 * @param string $taxonomy  The taxonomy.
	 * @param string $separator The separator.
	 *
	 * @return array
	 */
	public static function get_taxonomy_tree( array $terms, $taxonomy, $separator = ' > ' ) {
		$term_ids = wp_list_pluck( $terms, 'term_id' );

		$parents = array();
		foreach ( $term_ids as $term_id ) {
			$path      = self::get_term_parents( $term_id, $taxonomy, $separator );
			$parents[] = rtrim( $path, $separator );
		}

		$terms = array();
		foreach ( $parents as $parent ) {
			$levels = explode( $separator, $parent );

			$previous_lvl = '';
			foreach ( $levels as $index => $level ) {
				$terms[ 'lvl' . $index ][] = $previous_lvl . $level;
				$previous_lvl             .= $level . $separator;

				// Make sure we have not duplicate.
				// The call to `array_values` ensures that we do not end up with an object in JSON.
				$terms[ 'lvl' . $index ] = array_values( array_unique( $terms[ 'lvl' . $index ] ) );
			}
		}

		return $terms;
	}

	/**
	 * Get post images.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param int $post_id The post ID.
	 *
	 * @return array
	 */
	public static function get_post_images( $post_id ) {
		$images = array();

		if ( get_post_type( $post_id ) === 'attachment' ) {
			$post_thumbnail_id = (int) $post_id;
		} else {
			$post_thumbnail_id = get_post_thumbnail_id( (int) $post_id );
		}

		if ( $post_thumbnail_id ) {
			$sizes = (array) apply_filters( 'algolia_post_images_sizes', array( 'thumbnail' ) );
			foreach ( $sizes as $size ) {
				$info = wp_get_attachment_image_src( $post_thumbnail_id, $size );
				if ( ! $info ) {
					continue;
				}

				$images[ $size ] = array(
					'url'    => $info[0],
					'width'  => $info[1],
					'height' => $info[2],
				);
			}
		}

		return (array) apply_filters( 'algolia_get_post_images', $images );
	}

	/**
	 * Prepare content.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param string $content The content to prepare.
	 *
	 * @return string
	 */
	public static function prepare_content( $content ) {
		$content = self::remove_content_noise( $content );

		return wp_strip_all_tags( $content );
	}

	/**
	 * Remove noise from content.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param string $content The content to remove noise from.
	 *
	 * @return string
	 */
	public static function remove_content_noise( $content ) {
		$noise_patterns = array(
			// strip out comments.
			"'<!--(.*?)-->'is",
			// strip out cdata.
			"'<!\[CDATA\[(.*?)\]\]>'is",
			// Per sourceforge http://sourceforge.net/tracker/?func=detail&aid=2949097&group_id=218559&atid=1044037
			// Script tags removal now preceeds style tag removal.
			// strip out <script> tags.
			"'<\s*script[^>]*[^/]>(.*?)<\s*/\s*script\s*>'is",
			"'<\s*script\s*>(.*?)<\s*/\s*script\s*>'is",
			// strip out <style> tags.
			"'<\s*style[^>]*[^/]>(.*?)<\s*/\s*style\s*>'is",
			"'<\s*style\s*>(.*?)<\s*/\s*style\s*>'is",
			// strip out preformatted tags.
			"'<\s*(?:code)[^>]*>(.*?)<\s*/\s*(?:code)\s*>'is",
			// strip out <pre> tags.
			"'<\s*pre[^>]*[^/]>(.*?)<\s*/\s*pre\s*>'is",
			"'<\s*pre\s*>(.*?)<\s*/\s*pre\s*>'is",
		);

		// If there is ET builder (Divi), remove shortcodes.
		if ( function_exists( 'et_pb_is_pagebuilder_used' ) ) {
			$noise_patterns[] = '/\[\/?et_pb.*?\]/';
		}

		$noise_patterns = (array) apply_filters( 'algolia_strip_patterns', $noise_patterns );

		foreach ( $noise_patterns as $pattern ) {
			$content = preg_replace( $pattern, '', $content );
		}

		$content = str_replace( '&nbsp;', ' ', $content );

		return html_entity_decode( $content );
	}

	/**
	 * Explode content.
	 *
	 * @author  WebDevStudios <contact@webdevstudios.com>
	 * @since   1.0.0
	 *
	 * @param string $content The content to explode.
	 *
	 * @return array
	 */
	public static function explode_content( $content ) {
		$max_size = 2000;
		if ( defined( 'ALGOLIA_CONTENT_MAX_SIZE' ) ) {
			$max_size = (int) ALGOLIA_CONTENT_MAX_SIZE;
		}

		$parts  = array();
		$prefix = '';
		while ( true ) {
			$content = trim( (string) $content );
			if ( strlen( $content ) <= $max_size ) {
				$parts[] = $prefix . $content;

				break;
			}

			$offset          = -( strlen( $content ) - $max_size );
			$cut_at_position = strrpos( $content, ' ', $offset );

			if ( false === $cut_at_position ) {
				$cut_at_position = $max_size;
			}
			$parts[] = $prefix . substr( $content, 0, $cut_at_position );
			$content = substr( $content, $cut_at_position );

			$prefix = '… ';
		}

		return $parts;
	}

	/**
	 * Get the `$in_footer` argument for registering scripts.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  1.5.0
	 *
	 * @return bool
	 */
	public static function get_scripts_in_footer_argument() {
		/**
		 * Filters the `$in_footer` argument to `wp_register_script()` for Algolia Scripts.
		 *
		 * @since 1.3.0
		 * @since 1.5.0 The default changed from 'false' to 'true'.
		 *
		 * @param bool $in_footer Whether to enqueue the script before </body> instead of in the <head>. Default 'true'.
		 */
		return (bool) apply_filters(
			'algolia_load_scripts_in_footer',
			true
		);
	}
}
