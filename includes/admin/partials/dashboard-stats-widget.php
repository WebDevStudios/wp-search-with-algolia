<?php
/**
 * Dashboard stats widget partial.
 *
 * @author WebDevStudios <contact@webdevstudios.com>
 * @since  1.5.0
 *
 * @package WebDevStudios\WPSWA
 */

if ( $is_reachable ) {
	$api_status = __( 'Reachable', 'wp-search-with-algolia' ); // @codingStandardsIgnoreLine WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
} else {
	$api_status = __( 'Not reachable', 'wp-search-with-algolia' ); // @codingStandardsIgnoreLine WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
}
?>

<div class="main">
	<p>
		<?php
		echo sprintf(
			/* translators: API status */
			esc_html__( 'Algolia API Status: %s', 'wp-search-with-algolia' ),
			esc_html( $api_status )
		);
		?>
	</p>
	<?php if ( ! empty( $indices['items'] ) ) : ?>
		<table class="fixed striped widefat">
			<thead>
				<tr>
					<td><?php esc_html_e( 'Index', 'wp-search-with-algolia' ); ?></td>
					<td><?php esc_html_e( 'Entries', 'wp-search-with-algolia' ); ?></td>
					<td><?php esc_html_e( 'Data Size', 'wp-search-with-algolia' ); ?></td>
					<td><?php esc_html_e( 'Last Updated', 'wp-search-with-algolia' ); ?></td>
				</tr>
			</thead>
			<?php
			foreach ( $indices['items'] as $index ) : // @codingStandardsIgnoreLine WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
				?>
				<tr>
					<td><?php echo esc_html( $index['name'] ); ?></td>
					<td><?php echo esc_html( $index['entries'] ); ?></td>
					<td>
						<?php
						echo esc_html(
							Algolia_Utils::get_display_size(
								(int) $index['dataSize']
							)
						);
						?>
					</td>
					<td>
						<?php
						echo esc_html(
							Algolia_Utils::format_datetime( $index['updatedAt'] )
						);
						?>
					</td>
				</tr>
			<?php endforeach; ?>
		</table>
	<?php endif; ?>
</div>
