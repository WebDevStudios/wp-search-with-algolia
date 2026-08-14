=== WP Search with Algolia ===
Contributors: WebDevStudios, williamsba1, tw2113, mrasharirfan, scottbasgaard, gregrickaby, richaber
Tags: algolia, search, autocomplete, instantsearch, ai search
Requires at least: 6.2.9
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 2.14.0
License: GNU General Public License v2.0, MIT License

Use Algolia AI Search & Discovery to power your website's search with AI-powered Autocomplete and InstantSearch for fast, accurate, relevant results.

== Description ==

Easily integrate the powerful search tool Algolia AI Search & Discovery directly into your WordPress website. Quickly index all of your website’s content and provide lightning fast and accurate search results within minutes!

Built and supported by WebDevStudios, the website agency behind Custom Post Type UI, WP Search with Algolia immediately improves search on your website. Your users will be impressed!

Enable Autocomplete and Instantsearch to immediately provide a more robust search experience to your visitors. Plus, you receive full control over the look, feel, and relevance of your users' search experience.

= Features =
* One-click indexing of all content in WordPress
* Relevant, faceted ready search results in milliseconds with native typo-tolerance from Algolia AI Search & Discovery
* Super granular control on search content relevancy and content positioning
* Language-agnostic
* WordPress hooks and filters available for easy customization of indexed content.

This plugin requires API keys from [Algolia](https://www.algolia.com/). API keys are free for small personal projects and non-commercial use. Learn more about [commercial use pricing](https://www.algolia.com/pricing/).

=== WP Search with Algolia Pro ===

**WP Search with Algolia Pro** is our premium add-on, built by the same team. It runs alongside this plugin and picks up where the free version stops.

**Index any custom field, no code required.** *(New in Pro 1.7)* Drag custom fields into your Algolia index from a visual screen. The Meta Field Mapper auto-detects fields from Advanced Custom Fields (ACF), Meta Box, CMB2, and native WordPress post meta, then lets you drop them into Searchable Attributes or Attributes for Faceting and reorder them to tune ranking. No PHP, no filters, no developer required.

**Know your index is healthy.** *(New in Pro 1.7)* An index health panel and dashboard widget surface configuration and indexing problems. See the live index status of any post right on the edit screen, and re-index a single post with one button instead of re-running everything.

**Catalog-grade WooCommerce search.** Index SKUs, standard and variable pricing, short descriptions, image sizes, and product dimensions or weight. Rank by total sales and product ratings. Control whether sold-out, hidden, and "shop only" products are indexed. Send add-to-cart, remove-from-cart, begin-checkout, and completed-order events to Algolia.

**One search box for an entire network.** Aggregate every subsite in a multisite network into a single Algolia index, exclude specific sites, and track per-site indexing status from the network sites list.

**Respect the editorial rules you already set.** Indexing honors "noindex" decisions from Yoast SEO, All in One SEO, Rank Math, SEOPress, and The SEO Framework, plus per-post controls in the editor.

**Unlock Algolia's advanced AI.** Pro turns on Algolia Insights tracking, so your site collects the interaction data that semantic search, AI re-ranking, dynamic personalization, and shopping guides need to work.

= Free vs Pro =

Both versions index posts, pages, custom post types, terms, and users, and both power Autocomplete and InstantSearch. Everything below is only in Pro:

* **Custom fields without code** — free requires writing PHP filters; Pro gives you a drag-and-drop screen.
* **Index health panel and dashboard widget** — not available in free.
* **Per-post index status and one-click re-index** — not available in free.
* **WooCommerce product data** (SKU, pricing, dimensions, ratings) — not available in free.
* **WooCommerce event tracking for Algolia AI** — not available in free.
* **Multisite network-wide indexing** — not available in free.
* **SEO plugin "noindex" mirroring** — five SEO plugins supported; not available in free.
* **Direct technical support** — free is supported through the community forums.

WP Search with Algolia Pro is $99, and includes six months of updates and technical support plus a 30-day money-back guarantee.

**Pro requires WordPress 6.5 or higher, PHP 8.0 or higher, and WP Search with Algolia 2.10.2 or higher.** These are higher than this free plugin's own minimums, so check your server before purchasing.

Ready to go Pro? Check out [WP Search with Algolia Pro on Pluginize](https://pluginize.com/plugins/wp-search-with-algolia-pro/?utm_source=wpswa-free&utm_medium=readme&utm_campaign=pro-upgrade&utm_content=description)!

= Links =
* [WebDevStudios](https://webdevstudios.com)
* [Algolia](https://algolia.com)
* [Documentation](https://github.com/WebDevStudios/wp-search-with-algolia/wiki)
* [Support](https://wordpress.org/support/plugin/wp-search-with-algolia/)
* [Feature requests and bugs](https://github.com/WebDevStudios/wp-search-with-algolia/issues)
* [WP Search with Algolia Snippet Library](https://github.com/WebDevStudios/algolia-snippet-library)

*This plugin is a derivative work of the code from the [Search by Algolia – Instant & Relevant results](https://wordpress.org/plugins/search-by-algolia-instant-relevant-results/) plugin for WordPress, which is licensed under the GPLv2.*

== Installation ==

From your WordPress dashboard:

1. **Visit** Plugins > Add New
2. **Search** for "WP Search with Algolia"
3. **Activate** WP Search with Algolia from your Plugins page
4. **Click** on the new menu item "Algolia Search" and enter your API keys
5. **Read** the step by step [configuration guide](https://github.com/WebDevStudios/wp-search-with-algolia/wiki/Getting-Started)

== Frequently Asked Questions ==

= I see you now have a Pro addon, what features are available with it? =

[WP Search with Algolia Pro](https://pluginize.com/plugins/wp-search-with-algolia-pro/?utm_source=wpswa-free&utm_medium=readme&utm_campaign=pro-upgrade&utm_content=faq-features) adds six things to this plugin:

1. **Meta Field Mapper** — map ACF, Meta Box, CMB2, and native post meta fields into your index from a drag-and-drop screen, with no PHP.
2. **Index health** — a health panel and dashboard widget, per-post index status in the editor, and a one-click re-index for a single post.
3. **WooCommerce** — SKUs, standard and variable pricing, short descriptions, image sizes, dimensions and weight, sales and ratings as ranking signals, control over sold-out and hidden products, and cart/checkout/order event tracking.
4. **Multisite** — push every site in a network into one index, exclude specific sites, and monitor per-site indexing status.
5. **SEO** — mirror "noindex" settings from Yoast SEO, All in One SEO, Rank Math, SEOPress, and The SEO Framework, plus per-post controls.
6. **Algolia AI** — Insights tracking that feeds semantic search, AI re-ranking, personalization, and shopping guides.

= I bought Pro. Do I still need this free plugin? =

Yes. WP Search with Algolia Pro is an add-on, not a replacement. Keep this plugin installed and active — Pro extends it, and will deactivate itself if this plugin is not present.

= What are Pro's requirements? =

Pro requires WordPress 6.5 or higher, PHP 8.0 or higher, and WP Search with Algolia 2.10.2 or higher. These minimums are higher than this free plugin's, so confirm your server meets them before purchasing. Once this plugin is installed, the **Algolia Search &rarr; Upgrade to Pro** screen checks your site against all three and tells you where you stand.

= Is this plugin a fork? =

Yes. The Algolia Team **[no longer supports their original plugin](https://community.algolia.com/wordpress/)**. The engineering team at WebDevStudios has forked the original plugin, and is now maintaining it.

= Should I switch to this plugin? =

Yes. Because Algolia no longer supports their plugin, you will no longer receive updates. WebDevStudios uses Algolia on many of its projects, and is committed to maintaining this plugin.

= What are the minimum requirements? =

* Requires WordPress 5.3+
* PHP version 7.4 or greater
* MySQL version 5.0 or greater (MySQL 5.6 or greater is recommended)
* cURL PHP extension
* mbstring PHP extension
* OpenSSL greater than 1.0.1
* Some payment gateways require fsockopen support (for IPN access)

Visit the [WP Search with Algolia server requirements documentation](https://github.com/WebDevStudios/wp-search-with-algolia/wiki/WP-Search-with-Algolia-plugin-Installation) for a detailed list of server requirements.

= Where can I find WP Search with Algolia documentation and user guides? =

- For help setting up and configuring WP Search with Algolia please refer to the [user guide](https://github.com/WebDevStudios/wp-search-with-algolia/wiki/WP-Search-with-Algolia-plugin-Installation).
- For extending or theming the Autocomplete dropdown, see the [Autocomplete Customization guide](https://github.com/WebDevStudios/wp-search-with-algolia/wiki/Customize-the-Autocomplete-dropdown).
- For extending or theming the Instant Search results page, see the [Search Page Customization guide](https://github.com/WebDevStudios/wp-search-with-algolia/wiki/Customize-your-search-page).

= Will it work with my theme? =

Yes. This plugin should work with most themes that do not override the default WordPress search behavior. Instant Search results page may require some styling to make it match nicely. See the [Search Page Customization](https://github.com/WebDevStudios/wp-search-with-algolia/wiki/Customize-your-search-page).

= Where can I report bugs, request features, or contribute to the project? =

All development is handled on [GitHub](https://github.com/WebDevStudios/wp-search-with-algolia/issues).

== Screenshots ==

1. Algolia Settings
2. Search Page Settings
3. Autocomplete Settings
4. InstantSearch Dropdown
5. Search Results

== Changelog ==

Follow along with the changelog on [GitHub](https://github.com/WebDevStudios/wp-search-with-algolia/releases).

= 2.14.0 =
* Added: `Algolia_Pro` class as the single source of truth for Pro feature data, pricing, requirements, and outbound links.
* Added: Pro requirements check so you can confirm your site meets Pro's WordPress, PHP, and plugin version minimums before purchasing.
* Updated: Pro feature descriptions across the admin and readme now reflect Pro 1.7.
* Updated: Pro promotion is hidden throughout the admin when WP Search with Algolia Pro is active.
* Updated: WooCommerce and SEO screens are no longer registered at all when Pro is active.
* Deprecated: `Algolia_Utils::pro_cta_content()`, replaced by `algolia_pro_render_feature_cards()`.

= 2.13.1 =
* No code changes.
* Updated: reduced minimum WP version to return compatibility with ClassicPress
* Updated: Reduced "Premium Support" admin menu priority.

= 2.13.0 =
* Updated: Bundle Autocomplete 1.x as an available update. Not set to default.
* Updated: revises and updates Admin UI AJAX responses.
* Added: filter on search query value for "use with native template" searches and withing `pre_get_posts` callback.

= 2.12.0 =
* Updated: Admin pages and Premium support UI refresh.
* Fixed: Prevent errors in WordPress Health panel if no application/api keys configured yet.

= 2.11.3 =
* Fixed: minimum requirement discrepancies in readme and defined constant.
* Updated: cleaned out some unused CSS selectors from really old functionality.
* Updated: make use of `.card` class from WP core for more consistant styling.
* Updated: Admin notice around term updating when term is assigned to many posts.

= 2.11.2 =
* Fixed: Valid Search key checks for new applications.

= 2.11.1 =
* Fixed: Fatal error if not able to retreive searchable posts index object.
* Fixed: Fatal error potential for non-set debounce array index.

= 2.11.0 =
* Updated: Algolia PHP client (addresses PHP 8.4 compatibility notices)
* Updated: UI wording to match Algolia references and Instantsearch notes.
* Fixed: Return JSON error instead of echo exception message and continue to throw exception.
* Added: Inline documentation for various custom filters and actions.
* Added: Output custom debounce values in Autocomplete settings UI.
