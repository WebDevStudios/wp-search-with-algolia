<?php
/**
 * Reusable WP Search with Algolia Pro presentation blocks.
 *
 * Every Pro-facing surface in the admin renders through these functions so the
 * messaging, markup, and link tracking stay consistent, and so a Pro release
 * only needs content updated in Algolia_Pro.
 *
 * All of these are no-ops when Pro is already active — nothing here should
 * ever be shown to someone who has already purchased.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.14.0
 * @package WebDevStudios\WPSWA
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'algolia_pro_render_new_in_band' ) ) {
	/**
	 * Render the "New in Pro x.y" band.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @param string $placement Attribution slug for the link.
	 */
	function algolia_pro_render_new_in_band( $placement ) {
		$new_features = Algolia_Pro::get_new_features();

		if ( empty( $new_features ) ) {
			return;
		}
		?>
		<div class="algolia-pro-whats-new">
			<span class="algolia-pro-whats-new__badge">
				<?php
				printf(
					/* translators: %s: Pro version number, e.g. "1.7". */
					esc_html__( 'New in Pro %s', 'wp-search-with-algolia' ),
					esc_html( Algolia_Pro::DOCUMENTED_VERSION )
				);
				?>
			</span>
			<ul class="algolia-pro-whats-new__list">
				<?php foreach ( $new_features as $feature ) : ?>
					<li>
						<span class="dashicons <?php echo esc_attr( $feature['icon'] ); ?>" aria-hidden="true"></span>
						<?php echo esc_html( $feature['subtitle'] ); ?>
					</li>
				<?php endforeach; ?>
				<li>
					<span class="dashicons dashicons-update" aria-hidden="true"></span>
					<?php esc_html_e( 'Completed-order event tracking', 'wp-search-with-algolia' ); ?>
				</li>
			</ul>
			<a class="algolia-pro-whats-new__link" href="<?php echo esc_url( Algolia_Pro::get_url( $placement ) ); ?>" target="_blank" rel="noopener noreferrer">
				<?php esc_html_e( 'See what changed', 'wp-search-with-algolia' ); ?>
				<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
			</a>
		</div>
		<?php
	}
}

if ( ! function_exists( 'algolia_pro_render_requirements' ) ) {
	/**
	 * Render a live check of this site against Pro's requirements.
	 *
	 * Shown before purchase so nobody buys a plugin their server cannot run.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 */
	function algolia_pro_render_requirements() {
		$requirements = Algolia_Pro::check_requirements();
		$all_met      = Algolia_Pro::meets_requirements();
		?>
		<section class="algolia-pro-requirements <?php echo $all_met ? 'is-compatible' : 'is-incompatible'; ?>" aria-labelledby="algolia-pro-requirements-heading">
			<h3 id="algolia-pro-requirements-heading" class="algolia-pro-requirements__title">
				<span class="dashicons <?php echo $all_met ? 'dashicons-yes-alt' : 'dashicons-warning'; ?>" aria-hidden="true"></span>
				<?php
				if ( $all_met ) {
					esc_html_e( 'This site meets every requirement for Pro.', 'wp-search-with-algolia' );
				} else {
					esc_html_e( 'This site does not meet Pro\'s requirements yet.', 'wp-search-with-algolia' );
				}
				?>
			</h3>

			<ul class="algolia-pro-requirements__list">
				<?php foreach ( $requirements as $requirement ) : ?>
					<li class="<?php echo ! empty( $requirement['met'] ) ? 'is-met' : 'is-unmet'; ?>">
						<span class="dashicons <?php echo ! empty( $requirement['met'] ) ? 'dashicons-yes' : 'dashicons-no-alt'; ?>" aria-hidden="true"></span>
						<span class="algolia-pro-requirements__label"><?php echo esc_html( $requirement['label'] ); ?></span>
						<span class="algolia-pro-requirements__detail">
							<?php
							printf(
								/* translators: 1: installed version, 2: version Pro requires. */
								esc_html__( 'You have %1$s — Pro requires %2$s or higher', 'wp-search-with-algolia' ),
								esc_html( $requirement['current'] ),
								esc_html( $requirement['required'] )
							);
							?>
						</span>
					</li>
				<?php endforeach; ?>
			</ul>

			<?php if ( ! $all_met ) : ?>
				<p class="algolia-pro-requirements__note">
					<?php esc_html_e( 'Upgrading your hosting environment will resolve this. Talk to your host before purchasing, so you are not paying for something you cannot run yet.', 'wp-search-with-algolia' ); ?>
				</p>
			<?php endif; ?>
		</section>
		<?php
	}
}

if ( ! function_exists( 'algolia_pro_render_pricing_cta' ) ) {
	/**
	 * Render the price, terms, and primary purchase call to action.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @param string $placement Attribution slug for the links.
	 */
	function algolia_pro_render_pricing_cta( $placement ) {
		?>
		<div class="algolia-pro-pricing">
			<div class="algolia-pro-pricing__amount">
				<span class="algolia-pro-pricing__price"><?php echo esc_html( Algolia_Pro::get_price() ); ?></span>
				<span class="algolia-pro-pricing__terms"><?php echo esc_html( Algolia_Pro::get_terms() ); ?></span>
			</div>
			<div class="algolia-pro-pricing__actions">
				<a class="algolia-pro-upsell__button-primary" href="<?php echo esc_url( Algolia_Pro::get_url( $placement ) ); ?>" target="_blank" rel="noopener noreferrer">
					<?php esc_html_e( 'Get WP Search with Algolia Pro', 'wp-search-with-algolia' ); ?>
					<span class="dashicons dashicons-arrow-right-alt" aria-hidden="true"></span>
				</a>
			</div>
		</div>
		<?php
	}
}

if ( ! function_exists( 'algolia_pro_render_feature_cards' ) ) {
	/**
	 * Render the canonical Pro feature cards.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @param string[] $only Optional feature IDs to limit output to, in the
	 *                       order given. Defaults to the full canonical set.
	 */
	function algolia_pro_render_feature_cards( array $only = array() ) {
		$features = Algolia_Pro::get_features();

		if ( ! empty( $only ) ) {
			// array_column() with a null column key returns whole rows keyed by
			// 'id'. wp_list_pluck() cannot do this — it requires a field name.
			$indexed  = array_column( $features, null, 'id' );
			$features = array();

			foreach ( $only as $id ) {
				if ( isset( $indexed[ $id ] ) ) {
					$features[] = $indexed[ $id ];
				}
			}
		}

		if ( empty( $features ) ) {
			return;
		}
		?>
		<?php
		// Let the grid match the number of cards, so rendering a subset (the
		// WooCommerce and SEO screens each show two) does not leave an empty
		// column. Anything over three falls back to the default three-up grid.
		$column_class = count( $features ) < 3
			? ' algolia-pro-upsell__features--' . count( $features )
			: '';
		?>
		<div class="algolia-pro-upsell__features<?php echo esc_attr( $column_class ); ?>">
			<?php foreach ( $features as $feature ) : ?>
				<article class="algolia-pro-feature<?php echo ! empty( $feature['is_new'] ) ? ' algolia-pro-feature--new' : ''; ?>">
					<div class="algolia-pro-feature__icon" aria-hidden="true">
						<span class="dashicons <?php echo esc_attr( $feature['icon'] ); ?>"></span>
					</div>

					<?php if ( ! empty( $feature['is_new'] ) ) : ?>
						<span class="algolia-pro-feature__new-tag">
							<?php
							printf(
								/* translators: %s: Pro version number, e.g. "1.7". */
								esc_html__( 'New in %s', 'wp-search-with-algolia' ),
								esc_html( Algolia_Pro::DOCUMENTED_VERSION )
							);
							?>
						</span>
					<?php endif; ?>

					<h3 class="algolia-pro-feature__title"><?php echo esc_html( $feature['title'] ); ?></h3>

					<?php if ( ! empty( $feature['subtitle'] ) && $feature['subtitle'] !== $feature['title'] ) : ?>
						<p class="algolia-pro-feature__subtitle"><?php echo esc_html( $feature['subtitle'] ); ?></p>
					<?php endif; ?>

					<p class="algolia-pro-feature__lede"><?php echo esc_html( $feature['lede'] ); ?></p>

					<ul class="algolia-pro-feature__list">
						<?php foreach ( $feature['points'] as $point ) : ?>
							<li>
								<span class="dashicons dashicons-yes-alt" aria-hidden="true"></span>
								<?php echo esc_html( $point ); ?>
							</li>
						<?php endforeach; ?>
					</ul>
				</article>
			<?php endforeach; ?>
		</div>
		<?php
	}
}

if ( ! function_exists( 'algolia_pro_render_comparison' ) ) {
	/**
	 * Render the free vs Pro comparison table.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 */
	function algolia_pro_render_comparison() {
		$rows = Algolia_Pro::get_comparison_rows();

		if ( empty( $rows ) ) {
			return;
		}

		/**
		 * Render a single comparison cell.
		 *
		 * @param bool|string $value Cell value.
		 */
		$render_cell = function ( $value ) {
			if ( true === $value ) {
				printf(
					'<span class="dashicons dashicons-yes" aria-hidden="true"></span><span class="screen-reader-text">%s</span>',
					esc_html__( 'Included', 'wp-search-with-algolia' )
				);
				return;
			}

			if ( false === $value ) {
				printf(
					'<span class="dashicons dashicons-minus" aria-hidden="true"></span><span class="screen-reader-text">%s</span>',
					esc_html__( 'Not included', 'wp-search-with-algolia' )
				);
				return;
			}

			echo esc_html( $value );
		};
		?>
		<section class="algolia-pro-comparison" aria-labelledby="algolia-pro-comparison-heading">
			<h3 id="algolia-pro-comparison-heading" class="algolia-pro-comparison__title">
				<?php esc_html_e( 'Free vs Pro', 'wp-search-with-algolia' ); ?>
			</h3>

			<div class="algolia-pro-comparison__scroll">
				<table class="algolia-pro-comparison__table">
					<thead>
						<tr>
							<th scope="col"><?php esc_html_e( 'Capability', 'wp-search-with-algolia' ); ?></th>
							<th scope="col"><?php esc_html_e( 'Free', 'wp-search-with-algolia' ); ?></th>
							<th scope="col"><?php esc_html_e( 'Pro', 'wp-search-with-algolia' ); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ( $rows as $row ) : ?>
							<tr>
								<th scope="row"><?php echo esc_html( $row['label'] ); ?></th>
								<td class="algolia-pro-comparison__cell"><?php $render_cell( $row['free'] ); ?></td>
								<td class="algolia-pro-comparison__cell algolia-pro-comparison__cell--pro"><?php $render_cell( $row['pro'] ); ?></td>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		</section>
		<?php
	}
}

if ( ! function_exists( 'algolia_pro_render_inline_nudge' ) ) {
	/**
	 * Render a single-line, contextual Pro nudge.
	 *
	 * Deliberately static markup rather than a dismissible admin notice: it
	 * only ever appears on this plugin's own screens, in context, and never
	 * interrupts anything.
	 *
	 * @author WebDevStudios <contact@webdevstudios.com>
	 * @since  2.14.0
	 *
	 * @param string $message   The contextual message.
	 * @param string $link_text Call to action text.
	 * @param string $placement Attribution slug for the link.
	 */
	function algolia_pro_render_inline_nudge( $message, $link_text, $placement ) {
		if ( Algolia_Pro::is_active() ) {
			return;
		}
		?>
		<p class="algolia-pro-inline-nudge">
			<span class="algolia-pro-inline-nudge__badge"><?php esc_html_e( 'Pro', 'wp-search-with-algolia' ); ?></span>
			<span class="algolia-pro-inline-nudge__text"><?php echo esc_html( $message ); ?></span>
			<a href="<?php echo esc_url( Algolia_Pro::get_url( $placement ) ); ?>" target="_blank" rel="noopener noreferrer">
				<?php echo esc_html( $link_text ); ?>
			</a>
		</p>
		<?php
	}
}
