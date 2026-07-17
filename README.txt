=== WP Search with Algolia ===
Contributors: WebDevStudios, williamsba1, tw2113, mrasharirfan, scottbasgaard, gregrickaby, richaber, daveromsey
Tags: algolia, autocomplete, instantsearch, relevance search, ai search
Requires at least: 6.2.9
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 2.13.0
License: GNU General Public License v2.0, MIT License

Use the power of Algolia AI Search & Discovery to enhance your website's search. Enable AI-powered Autocomplete and InstantSearch for fast, accurate results and relevance.

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
Introducing **WP Search with Algolia Pro**, our new premium version of WP Search with Algolia! Pro features include:

* Multisite Network-wide support!
	* Create a global search for content across all the sites in your network all in one Algolia index.
* WooCommerce support
  * Indexing Product data including SKU, pricing (standard and variable), short descriptions, dimensions, and more.
  * Total sales and total ratings indexed for popularity
* Advanced SEO support with Yoast SEO, All in One SEO, Rank Math SEO, SEOPress, and The SEO Framework.
  * Content level settings to exclude individual content from the search index
  * Set Algolia’s indexing to match with existing search engine “noindex” settings

Are you ready to go Pro? Check out [WP Search with Algolia Pro on Pluginize](https://pluginize.com/plugins/wp-search-with-algolia-pro/)!

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

When you purchase a copy of [WP Search with Algolia Pro](https://pluginize.com/plugins/wp-search-with-algolia-pro/) you are getting access to the start of WooCommerce integration as well as Search Engine Optimization mirroring.

With WooCommerce, you'll be able to manage settings to start including product information as part of indexed products, including out of box display with both Autocomplete and Instantsearch hit templates. You can also include details like product SKU values, total sales, and ratings to help with index ranking and relevance.

With SEO settings, you can configure your content to manage itself in your Algolia indexes based on your "noindex" settings from your dedicated SEO plugins.

We intend to continue adding and evolving all the extra features in WP Search with Algolia Pro

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
