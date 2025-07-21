<?php
/**
 * Debug admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.10.1
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<div class="wrap">
	<h1><?php esc_html_e( 'Algolia Debugging Tools', 'wp-search-with-algolia' ); ?></h1>
	<p><?php esc_html_e( 'Use the tools below to inspect the plugin environment, check indexing status, and view recent logs.', 'wp-search-with-algolia' ); ?></p>

	<h2><?php esc_html_e( 'Plugin Environment', 'wp-search-with-algolia' ); ?></h2>
	<table class="widefat striped">
		<tbody>
			<tr>
				<th><?php esc_html_e( 'Plugin Version', 'wp-search-with-algolia' ); ?></th>
				<td><?php echo esc_html( defined( 'ALGOLIA_VERSION' ) ? ALGOLIA_VERSION : 'N/A' ); ?></td>
			</tr>
			<tr>
				<th><?php esc_html_e( 'PHP Version', 'wp-search-with-algolia' ); ?></th>
				<td><?php echo esc_html( PHP_VERSION ); ?></td>
			</tr>
			<tr>
				<th><?php esc_html_e( 'WP Version', 'wp-search-with-algolia' ); ?></th>
				<td><?php echo esc_html( get_bloginfo( 'version' ) ); ?></td>
			</tr>
			<tr>
				<th><?php esc_html_e( 'Algolia API Key Present', 'wp-search-with-algolia' ); ?></th>
				<td><?php echo esc_html( get_option( 'algolia_application_id' ) && get_option( 'algolia_search_api_key' ) ? 'Yes' : 'No' ); ?></td>
			</tr>
		</tbody>
	</table>

	<h2><?php esc_html_e( 'Debug Log Status', 'wp-search-with-algolia' ); ?></h2>
	<p><?php esc_html_e( 'To view debug logs, enable WP_DEBUG and WP_DEBUG_LOG in wp-config.php. Logs are written to wp-content/debug.log.', 'wp-search-with-algolia' ); ?></p>

<?php
$debug_log_path = ABSPATH . 'wp-content/debug.log';
if ( file_exists( $debug_log_path ) && is_readable( $debug_log_path ) ) {
	$lines = file( $debug_log_path );
	// Filter for lines containing 'algolia' (case-insensitive).
	$algolia_lines = array_filter( $lines, function( $line ) {
		return stripos( $line, 'algolia' ) !== false;
	} );
	$line_count = count( $algolia_lines );
	$max_lines = 50;
	$start = max( 0, $line_count - $max_lines );
	$recent_lines = array_slice( $algolia_lines, $start );
	if ( $recent_lines ) {
		?>
		<b><?php esc_html_e( 'Recent Algolia Debug Log Entries', 'wp-search-with-algolia' ); ?></b>
		<pre class="debug-log-output"><?php echo esc_html( implode( '', $recent_lines ) ); ?></pre>
		<?php
	} else {
		?>
		<p><em><?php esc_html_e( 'No Algolia-related log entries found in debug.log.', 'wp-search-with-algolia' ); ?></em></p>
		<?php
	}
} else {
	?>
	<p><em><?php esc_html_e( 'No debug log found or debug log is not readable.', 'wp-search-with-algolia' ); ?></em></p>
	<?php
}
?>
</div>
