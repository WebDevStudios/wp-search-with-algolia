<?php
/**
 * Form options admin template partial.
 *
 * @author  WebDevStudios <contact@webdevstudios.com>
 * @since   2.4.0
 *
 * @package WebDevStudios\WPSWA
 */

?>

<div class="wrap">
	<h1>WP Search with Algolia and Search Engine Optimization</h1>
	<form method="post" action="options.php">
		<h2>Noindex settings</h2>
		<p>Respect a post or content type noindex status for various SEO plugins</p>
		<table class="form-table" role="presentation">
			<tbody>
			<tr>
				<th scope="row"><label for="wpswa_premium_yoast_noindex">Yoast SEO</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_yoast_noindex" name="wpswa_premium_yoast_noindex" value="yes">
					<label for="wpswa_premium_yoast_noindex"></label>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_aioseo_noindex">All in One SEO</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_aioseo_noindex" name="wpswa_premium_aioseo_noindex" value="yes">
					<label for="wpswa_premium_aioseo_noindex"></label>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_rankmath_noindex">Rank Math SEO</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_rankmath_noindex" name="wpswa_premium_rankmath_noindex" value="yes" checked="checked">
					<label for="wpswa_premium_rankmath_noindex"></label>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_seoframework_noindex">The SEO Framework</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_seoframework_noindex" name="wpswa_premium_seoframework_noindex" value="yes">
					<label for="wpswa_premium_seoframework_noindex"></label>
				</td>
			</tr>
			<tr>
				<th scope="row"><label for="wpswa_premium_seopress_noindex">SEOPress</label></th>
				<td>
					<input type="checkbox" id="wpswa_premium_seopress_noindex" name="wpswa_premium_seopress_noindex" value="yes">
					<label for="wpswa_premium_seopress_noindex"></label>
				</td>
			</tr>
			</tbody>
		</table>
	</form>
</div>
