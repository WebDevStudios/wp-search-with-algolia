<?php
/**
 * Form options admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.5.0
 *
 * @package WebDevStudios\WPSWA
 */

?>

<div class="wrap">
	<h1>WP Search with Algolia and WooCommerce</h1>
	<form method="post" action="options.php">
		<h2>Algolia search relevance</h2>
		<p>These details aid in relevance and ranking.</p>
		<table class="form-table" role="presentation">
			<tbody>
			<tr>
				<th scope="row"><label for="wpswa_premium_include_sku">Product SKU</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_include_sku" name="wpswa_premium_include_sku" value="yes" checked="checked">
					<label for="wpswa_premium_include_sku">Include SKU value in the index</label>
					<p>Useful to help look up products directly.</p>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_include_short_description">Short description</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_include_short_description" name="wpswa_premium_include_short_description" value="yes" checked="checked">
					<label for="wpswa_premium_include_short_description">Include the short description in the index</label>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_include_total_sales">Total sales</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_include_total_sales" name="wpswa_premium_include_total_sales" value="yes" checked="checked">
					<label for="wpswa_premium_include_total_sales">Include total sales in index</label>
					<p>Useful for popularity relevance. This will only be included for ranking and not template display.</p>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_include_ratings">Product rating</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_include_ratings" name="wpswa_premium_include_ratings" value="yes" checked="checked">
					<label for="wpswa_premium_include_ratings">Include product cumulative rating in index</label>
				</td>
			</tr>
			</tbody>
		</table>
		<h2>Algolia results display</h2>
		<p>These details aid in content indexed for template and results display.</p>
		<table class="form-table" role="presentation">
			<tbody>
			<tr>
				<th scope="row"><label for="wpswa_premium_include_price">Price</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_include_price" name="wpswa_premium_include_price" value="yes" checked="checked">
					<label for="wpswa_premium_include_price">Include price in index</label>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_include_sale_price">Sale price</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_include_sale_price" name="wpswa_premium_include_sale_price" value="yes" checked="checked">
					<label for="wpswa_premium_include_sale_price">Include sale price in index</label>
				</td>
			</tr>
			</tbody>
		</table>
	</form>
</div>
