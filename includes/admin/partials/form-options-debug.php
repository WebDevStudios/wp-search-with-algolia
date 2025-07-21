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

	<h2><?php esc_html_e( 'Algolia Index Status', 'wp-search-with-algolia' ); ?></h2>
	<?php
	if ( isset( $this ) && property_exists( $this, 'plugin' ) ) {
		$plugin = $this->plugin;
	} elseif ( function_exists( 'Algolia_Plugin_Factory' ) ) {
		$plugin = Algolia_Plugin_Factory::create();
	} elseif ( class_exists( 'Algolia_Plugin_Factory' ) ) {
		$plugin = call_user_func( [ 'Algolia_Plugin_Factory', 'create' ] );
	} else {
		$plugin = null;
	}
	if ( $plugin && method_exists( $plugin, 'get_indices' ) ) {
		$indices = $plugin->get_indices();
		if ( ! empty( $indices ) ) {
			echo '<table class="widefat striped"><thead><tr><th>' . esc_html__( 'Index', 'wp-search-with-algolia' ) . '</th><th>' . esc_html__( 'Enabled', 'wp-search-with-algolia' ) . '</th><th>' . esc_html__( 'Exists in Algolia', 'wp-search-with-algolia' ) . '</th><th>' . esc_html__( 'Status', 'wp-search-with-algolia' ) . '</th></tr></thead><tbody>';
			foreach ( $indices as $index ) {
				$enabled = method_exists( $index, 'is_enabled' ) ? $index->is_enabled() : false;
				$exists = method_exists( $index, 'exists' ) ? $index->exists() : false;
				$name = method_exists( $index, 'get_admin_name' ) ? $index->get_admin_name() : ( method_exists( $index, 'get_id' ) ? $index->get_id() : 'Unknown' );
				$status = $exists ? esc_html__( 'OK', 'wp-search-with-algolia' ) : '';
				echo '<tr>';
				echo '<td>' . esc_html( $name ) . '</td>';
				echo '<td>' . ( $enabled ? esc_html__( 'Yes', 'wp-search-with-algolia' ) : esc_html__( 'No', 'wp-search-with-algolia' ) ) . '</td>';
				echo '<td>' . ( $exists ? esc_html__( 'Yes', 'wp-search-with-algolia' ) : esc_html__( 'No', 'wp-search-with-algolia' ) ) . '</td>';
				if ( $exists ) {
					echo '<td>' . esc_html__( 'OK', 'wp-search-with-algolia' ) . '</td>';
				} else {
					echo '<td><button class="algolia-reindex-button button button-primary" data-index="' . esc_attr( method_exists( $index, 'get_id' ) ? $index->get_id() : '' ) . '">' . esc_html__( 'Reindex Now', 'wp-search-with-algolia' ) . '</button></td>';
				}
				echo '</tr>';
			}
			echo '</tbody></table>';
			?>

			<script type="text/javascript">
			(function($) {
				$(function() {
					var ongoing = 0;
					function updateIndexingPourcentage($btn, amount) {
						$btn.text('Processing... ' + amount + '%');
					}
					function resetButton($btn, originalText) {
						$btn.prop('disabled', false).text(originalText);
					}
					$('.algolia-reindex-button').on('click', function(e) {
						e.preventDefault();
						var $btn = $(this);
						var index = $btn.data('index');
						if (!index) return;
						var originalText = $btn.text();
						ongoing++;
						$btn.prop('disabled', true);
						updateIndexingPourcentage($btn, 0);
						reIndex($btn, index, 1, originalText);
					});
					function reIndex($btn, index, currentPage, originalText) {
						if (!currentPage) currentPage = 1;
						var data = {
							'action': 'algolia_re_index',
							'index_id': index,
							'p': currentPage
						};
						$.post(ajaxurl, data, function(response) {
							if (typeof response.totalPagesCount === 'undefined') {
								alert('An error occurred');
								resetButton($btn, originalText);
								return;
							}
							if (response.totalPagesCount === 0) {
								resetButton($btn, originalText);
								return;
							}
							var progress = Math.round((currentPage / response.totalPagesCount) * 100);
							updateIndexingPourcentage($btn, progress);
							if (response.finished !== true) {
								reIndex($btn, index, ++currentPage, originalText);
							} else {
								$btn.text('Done!');
								setTimeout(function() { resetButton($btn, originalText); location.reload(); }, 1500);
							}
						}).fail(function(response) {
							alert('An error occurred: ' + response.responseText);
							resetButton($btn, originalText);
						});
					}
				});
			})(jQuery);
			</script>
			<?php
		} else {
			echo '<p>' . esc_html__( 'No Algolia indices found.', 'wp-search-with-algolia' ) . '</p>';
		}
	} else {
		echo '<p>' . esc_html__( 'Could not retrieve Algolia indices.', 'wp-search-with-algolia' ) . '</p>';
	}
	?>

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
