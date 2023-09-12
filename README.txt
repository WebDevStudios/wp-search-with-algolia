=== WP Search with Algolia ===
Contributors: WebDevStudios, williamsba1, tw2113, mrasharirfan, scottbasgaard, gregrickaby, richaber
Tags: search, algolia, autocomplete, instantsearch, relevance search, faceted search, find-as-you-type search, ecommerce, seo, woocommerce, advanced search
Requires at least: 5.0
Tested up to: 6.3.1
Requires PHP: 7.4
Stable tag: 2.6.1
License: GNU General Public License v2.0, MIT License

Use the power of Algolia to enhance your website's search. Enable Autocomplete and Instantsearch for fast and accurate results. Control the look, feel, and relevance.

== Description ==

Easily integrate the powerful search tool Algolia directly into your WordPress website. Quickly index all of your website’s content and provide lightning fast and accurate search results within minutes!

Built and supported by WebDevStudios, the website agency behind Custom Post Type UI, WP Search with Algolia immediately improves search on your website. Your users will be impressed!

Enable Autocomplete and Instantsearch to immediately provide a more robust search experience to your visitors. Plus, you receive full control over the look, feel, and relevance of your users' search experience.

= Features =
* One-click indexing of all content in WordPress
* Relevant, faceted ready search results in milliseconds with native typo-tolerance from Algolia Search
* Super granular control on search content relevancy and content positioning
* Language-agnostic
* WordPress hooks and filters available for easy customization of indexed content.

This plugin requires API keys from [Algolia](https://www.algolia.com/). API keys are free for small personal projects and non-commercial use. Learn more about [commercial use pricing](https://www.algolia.com/pricing/).

Introducing **WP Search with Algolia Pro**, our new premium version of WP Search with Algolia! Pro features include:

* WooCommerce support
  * Indexing Product data including SKU, pricing (standard and variable), sales, and short descriptions.
  * Total sales and total ratings indexed for popularity
* Advanced SEO support with Yoast SEO and All in One SEO
  * Content level settings to exclude individual content from the search index
  * Set Algolia’s indexing to match with existing search engine “noindex” settings
* Multisite Network-wide support coming soon!

Are you ready to go Pro? Check out [WP Search with Algolia Pro on Pluginize](https://pluginize.com/plugins/wp-search-with-algolia-pro/)!

= Links =
* [WebDevStudios](https://webdevstudios.com)
* [Algolia](https://algolia.com)
* [Documentation](https://github.com/WebDevStudios/wp-search-with-algolia/wiki)
* [Support](https://wordpress.org/support/plugin/wp-search-with-algolia/)
* [Feature requests and bugs](https://github.com/WebDevStudios/wp-search-with-algolia/issues)

*This plugin is a derivative work of the code from the [Search by Algolia – Instant & Relevant results](https://wordpress.org/plugins/search-by-algolia-instant-relevant-results/) plugin for WordPress, which is licensed under the GPLv2.*

== Installation ==

**If you have the *Search by Algolia – Instant & Relevant results* plugin installed, please deactivate it first.**

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

= How do I switch from the "Search by Algolia – Instant & Relevant results" plugin? =

1. **Deactivate** the *Search by Algolia – Instant & Relevant results* plugin
2. **Follow** the [installation instructions](https://wordpress.org/plugins/wp-search-with-algolia/#installation)
3. **Activate** *WP Search with Algolia*
4. **Check** for your API Keys. They should already be there, if not, enter them and then save settings
5. **Delete** the *Search by Algolia – Instant & Relevant results* plugin

= What are the minimum requirements? =

* Requires WordPress 5.0+
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

Follow along with the changelog on [Github](https://github.com/WebDevStudios/wp-search-with-algolia/releases).

= 2.6.1 =
* Fixed: Performance issues related to delete operations.
* Fixed: Performance issues around WP All Import.

= 2.6.0 =
* Added: Support for syncing imported items when "fast mode" from WP All Import enabled.
* Added: Support for updating child posts if parent post's slug has been updated.
* Added: Support for updating posts when an associated term has been updatd.
* Added: Wait for delete operations to complete before moving to updates.
* Updated: Algolia Search library to 4.18.x
* Updated: InstantSearch library to 4.56.x

= 2.5.4 =
* Updated: Ensure reindexing completes when using the from_batch flag with CLI.
* Updated: Assigned Algolia_Admin instance to a property for access elsewhere.

= 2.5.3 =
* Updated: Autocomplete template file with user link fix when cmd/ctrl clicking.
* Updated: Class method visibility from protected to public.

= 2.5.2 =
* Updated: Fixed hits per page configuration for instantsearch
* Added: Custom hook for settings page override.

= 2.5.1 =
* Updated readme.txt with more plugin information.
* Repositioned help info on settings screens.

= 2.5.0 =
* Introduction of WP Search with Algolia Pro availability.
* Added `algolia_custom_template_location` filter to allow specifying custom template locations besides just your active theme.
* Templates: added action hooks at the end of Autocomplete and Instantsearch hit template blocks.
* Updated `algolia_changes_watchers` filter to also receive the current indices.
* Added watcher support for term and user meta updates.
* Updated bundled CSS to better match selectors for default used widgets in the templates.
* Clarified some details around Autocomplete settings and what can be done in each setting state.
* Updated admin menu icon to use Algolia logo when no settings configured.

= 2.4.0 =
* Increase minimum PHP version to PHP 7.4
* Fixed PHP8 compatibility issues
* Prefixed Algolia library to avoid potential conflicts with other code using the same libraries.
* Revised copy and wording around the plugin for better clarity.
* Deprecate the `algolia_should_require_search_client` filter in favor of prefixed Algolia PHP Client namespace

= 2.3.1 =
* Update autocomplete template to use addEventListener instead of onload function
* Update Algolia InstantSearch.js to 4.49.1

= 2.3.0 =
* Add algolia_should_override_autocomplete filter to override enable/disable status of Autocomplete
* Add from_batch argument to the re-index WP-CLI command
* Update excluded custom post types and taxonomies to include Core WordPress' internal CPTs and taxonomies
* Update Algolia logos to match the latest version
* Remove jQuery usage and dependency from templates
* Update Algolia JavaScript API Client to 4.14.2
* Update Algolia InstantSearch.js to 4.49.0
* Update Algolia PHP API Client to 3.3.2

= 2.2.0 =
* Add alert to Push Settings button on the Search Page.
* Replace attributesToIndex index setting with searchableAttributes.
* Replace outdated Instant Search widget class.
* Improve drag and drop column description text on the Autocomplete page.
* Remove inline CSS for Max. Suggestions input.
* Update Algolia JavaScript API Client to 4.13.0
* Update Algolia InstantSearch.js to 4.40.5
* Update Algolia Autocomplete.js to 0.38.1
* Update Algolia PHP API Client to 3.2.0

= 2.1.0 =
* Add algolia_update_records filter to allow inspection and filtering records during update operation.
* Add algolia_re_index_records filter to allow inspection and filtering records during re-index operation.
* Catch some Aloglia PHP Client exceptions that were previously uncaught during record updating and re-indexing.
* Fix an issue where SearchIndex::saveObjects was called twice during re-index operations.
* Update Algolia PHP API Client to 3.1.0

= 2.0.1 =
* Fix for users that enable intstantsearch but not autocomplete by adding algoliasearch client as direct dependency of both

= 2.0.0 =
* Breaking changes for users with customized autocomplete.php / instantsearch.php template in their theme.
* Update autocomplete.php and instantsearch.php templates for compatibility with new JS libs.
* Update Algolia JavaScript API Client to 4.10.3
* Update Algolia InstantSearch.js to 4.25.2
* Update Algolia Autocomplete.js to 0.38.0
* Update Algolia PHP API Client to 3.0.2
