=== WP Search with Algolia ===
Contributors: WebDevStudios, williamsba1, gregrickaby, tw2113, richaber, mrasharirfan
Tags: search, algolia, autocomplete, instantsearch, relevance search, faceted search, find-as-you-type search, ecommerce, seo
Requires at least: 5.0
Tested up to: 6.1.1
Requires PHP: 7.4
Stable tag: 2.4.0
License: GNU General Public License v2.0, MIT License

Use the power of Algolia to fall in love with your website's search. Enable Autocomplete and Instantsearch. Control the look, feel, and relevance.

== Description ==

"I hate my website's search!" We hear it all the time. Look no further than WP Search with Algolia to fall in love with your website's search capabilities.
Forked, built, and supported by WebDevStudios, the website agency behind Custom Post Type UI, WP Search with Algolia immediately improves search on your site. Your users will be impressed.
Autocomplete and Instantsearch are included and enabled. Plus, you receive full control over the look, feel, and relevance of your users' search experience.

= Features =
* Relevant, faceted ready search results in milliseconds with native typo-tolerance from Algolia Search
* Language-agnostic
* WordPress hooks and filters available for easy customization of indexed content.

This plugin requires API keys from [Algolia](https://www.algolia.com/). API keys are free for small personal projects and non-commercial use. Learn more about [commercial use pricing](https://www.algolia.com/pricing/).

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

= About Algolia =

Algolia offers its Search as a Service provider on a incremental payment program, including a free Community Plan which includes 10,000 records & 50,000 operations per month. Beyond that, [plans](https://www.algolia.com/pricing/) start at $29/month.

= About WebDevStudios =

WebDevStudios provides end-to-end WordPress opportunities from strategy and planning to website design and development, as well as full data migration, extensive API integrations, scalability, performance and long-term guidance and maintenance. We have service options and solutions for start-ups, small to mid-size businesses, enterprise organizations and marketing agencies.

== Screenshots ==

1. Algolia Settings
2. Search Page Settings
3. Autocomplete Settings
4. InstantSearch Dropdown
5. Search Results

== Changelog ==

Follow along with the changelog on [Github](https://github.com/WebDevStudios/wp-search-with-algolia/releases).

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

= 1.8.0 =
* Focus on template versioning and update messaging
* Add Algolia_Template_Utils class
* Deprecate Algolia_Template_Loader::locate_template method
* Deprecate Algolia_Plugin::get_templates_path method
* Deprecate algolia_templates_path filter
* Add Algolia_Update_Messages class
* Add Algolia_Admin_Template_Notices class
* Add Algolia_Version_Utils class

= 1.7.0 =
* Remove 'screen' media attribute from enqueued CSS
* Update Algolia PHP Search Client to version 2.7.3.
* Add "exclude" methods and filters
* Deprecate "blacklist" methods and filters
* Fix replica RequestOptions error
* Fix PHP 8 usort deprecation warning
* Fix JQMIGRATE event shorthand is deprecated warnings in instantsearch.php and autocomplete.php templates
* Add "@version" to template file headers

= 1.6.0 =
* Fix deletion of post records created before indexing was enabled
* Update Algolia PHP Search Client to version 2.7.1.
* Add Algolia_Plugin_Factory to create and return a shared Algolia_Plugin instance
* Add Algolia_Search_Client_Factory to return a new Algolia\AlgoliaSearch\SearchClient instance
* Add Algolia_Http_Client_Interface_Factory to create and return a shared Php53HttpClient instance
* Add algolia_php_53_http_client_options filter to supply cURL options to Php53HttpClient instance
* Deprecate Algolia_Plugin:get_instance() which will be removed in an upcoming release

= 1.5.0 =
* Fix an issue where Pinterest follows a link to the Algolia domain to source text and/or images
 * Move Algolia scripts to footer by default
  * Changes algolia_load_scripts_in_footer filter default argument to "true"
 * Move autocomplete.php template output to footer by default

= 1.4.0 =
* Update Algolia PHP Search Client version 2.7.0.
* Update Algolia JS libraries to most recent compatible (non-breaking) versions
 * Updates autocomplete.js to 0.37.1 (current release as of 2020-01-27)
 * Updates algoliasearch to 3.35.1 (last of the 3.x series)
 * Updates instantsearch.js to 1.12.1 (last of the 1.x series)

= 1.3.0 =
* Fix an issue where, under some circumstances, when a post with a featured image was deleted, the post might be accidentally re-indexed
* Fix bug that prevented reindex display notices
* Add algolia_load_scripts_in_footer filter to allow enqueueing the scripts in the footer instead of in the head
* Add new filters for multisite developers

= 1.2.0 =
* Use filtered value of 'hitsPerPage' as 'posts_per_page' query param
* Fix broken SVG
* Add highlighting to backend search results - props @philipnewcomer

= 1.1.0 =
* Minimum PHP version requirement is now PHP 7.2
* Minimum WordPress version requirement is now WP 5.0
* Internationalization/localization improvements, textdomain matches plugin slug
* Addressed a potential WSOD if minimum PHP and WP version requirements were not met
* Tested on WP 5.3

= 1.0.0 =
* Initial release.
