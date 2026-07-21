<?php
/**
 * Autocomplete config admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   1.0.0
 *
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$algolia_prefix = $this->settings->get_index_name_prefix();
?>

<?php if ( empty( $indices ) ) : ?>
	<div class="algolia-autocomplete-config algolia-autocomplete-config--empty">
		<p>
			<span class="dashicons dashicons-info-outline" aria-hidden="true"></span>
			<?php esc_html_e( 'No indices are available yet. Once you have at least one index configured on the Indexing page, it will appear here as a card you can drag, toggle, and tune.', 'wp-search-with-algolia' ); ?>
		</p>
	</div>
<?php else : ?>
	<div class="algolia-autocomplete-config">
		<div class="algolia-autocomplete-list" role="list">
			<?php foreach ( $indices as $alg_index ) : // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound ?>
				<div class="algolia-autocomplete-row" role="listitem" data-index-id="<?php echo esc_attr( $alg_index['index_id'] ); ?>">
					<div class="algolia-autocomplete-row__handle" aria-label="<?php esc_attr_e( 'Drag to reorder', 'wp-search-with-algolia' ); ?>">
						<span class="dashicons dashicons-move" aria-hidden="true"></span>
						<input
							type="hidden"
							class="position-input"
							name="algolia_autocomplete_config[<?php echo esc_attr( $alg_index['index_id'] ); ?>][position]"
							value="<?php echo (int) $alg_index['position']; ?>"
						/>
					</div>

					<div class="algolia-autocomplete-row__main">
						<div class="algolia-autocomplete-row__header">
							<label class="algolia-autocomplete-row__toggle">
								<input
									type="checkbox"
									name="algolia_autocomplete_config[<?php echo esc_attr( $alg_index['index_id'] ); ?>][enabled]"
									<?php checked( ! empty( $alg_index['enabled'] ) ); ?>
								/>
								<span class="screen-reader-text"><?php esc_html_e( 'Enable this index in the autocomplete dropdown', 'wp-search-with-algolia' ); ?></span>
							</label>
							<h3 class="algolia-autocomplete-row__title"><?php echo esc_html( $alg_index['admin_name'] ); ?></h3>

							<span class="algolia-autocomplete-row__index-name">
								<span class="screen-reader-text"><?php esc_html_e( 'Index name:', 'wp-search-with-algolia' ); ?></span>
								<code><?php echo esc_html( $algolia_prefix . $alg_index['index_id'] ); ?></code>
							</span>
							<?php if ( ! empty( $alg_index['debounce'] ) && $alg_index['debounce'] > 0 ) : ?>
								<span class="algolia-autocomplete-row__debounce">
									<?php
									printf(
									/* translators: %s: custom debounce timing in milliseconds. */
										esc_html__( 'Custom debounce: %s ms', 'wp-search-with-algolia' ),
										esc_html( (string) $alg_index['debounce'] )
									);
									?>
								</span>
							<?php endif; ?>
						</div>

						<div class="algolia-autocomplete-row__fields">
							<label class="algolia-autocomplete-row__field">
								<span class="algolia-autocomplete-row__field-label"><?php esc_html_e( 'Section label', 'wp-search-with-algolia' ); ?></span>
								<input
									type="text"
									name="algolia_autocomplete_config[<?php echo esc_attr( $alg_index['index_id'] ); ?>][label]"
									value="<?php echo esc_attr( $alg_index['label'] ); ?>"
									placeholder="<?php echo esc_attr( $alg_index['admin_name'] ); ?>"
								/>
							</label>
							<label class="algolia-autocomplete-row__field algolia-autocomplete-row__field--narrow">
								<span class="algolia-autocomplete-row__field-label"><?php esc_html_e( 'Max. suggestions', 'wp-search-with-algolia' ); ?></span>
								<input
									type="number"
									class="small-text"
									min="1"
									name="algolia_autocomplete_config[<?php echo esc_attr( $alg_index['index_id'] ); ?>][max_suggestions]"
									value="<?php echo (int) $alg_index['max_suggestions']; ?>"
								/>
							</label>
						</div>
					</div>

					<div class="algolia-autocomplete-row__actions">
						<button
							type="button"
							class="algolia-reindex-button button button-primary"
							data-index="<?php echo esc_attr( $alg_index['index_id'] ); ?>"
						>
							<span class="dashicons dashicons-update" aria-hidden="true"></span>
							<?php esc_html_e( 'Re-index', 'wp-search-with-algolia' ); ?>
						</button>
						<button
							type="button"
							class="algolia-push-settings-button button"
							data-index="<?php echo esc_attr( $alg_index['index_id'] ); ?>"
						>
							<span class="dashicons dashicons-cloud-upload" aria-hidden="true"></span>
							<?php esc_html_e( 'Push settings', 'wp-search-with-algolia' ); ?>
						</button>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php endif; ?>
