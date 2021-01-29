
=== WP Search with Algolia ===
Contributors: WebDevStudios, williamsba1, gregrickaby, tw2113, richaber, mrasharirfan
Tags: Search, Algolia, Autocomplete, instant-search, relevant search, search highlight, faceted search, find-as-you-type search, suggest, search by category, ajax search, better search, custom search
Requires at least: 5.0
Tested up to: 5.5
Requires PHP: 7.2
Stable tag: 1.7.0
License: GNU General Public License v2.0, MIT License

Improve search on your site. Autocomplete is included, along with full control over look, feel and relevance.

== Description ==

Improve search on your site. Autocomplete is included, along with full control over look, feel and relevance.

= Features =
* Relevant search results in milliseconds
* Native typo-tolerance
* Is language-agnostic
* Offers hooks and filters for easy customization
* Built by developers, for developers

This plugin requires API keys from [Algolia](https://www.algolia.com/). API keys are free for small personal projects and non-commercial use. Learn more about [commercial use pricing](https://www.algolia.com/pricing/).

= Links =
* [WebDevStudios](https://webdevstudios.com)
* [Algolia](https://algolia.com)
* [Documentation](https://community.algolia.com/wordpress/configuration.html)
* [Support](https://github.com/WebDevStudios/wp-search-with-algolia/issues)

*This plugin is a derivative work of the code from the [Search by Algolia – Instant & Relevant results](https://wordpress.org/plugins/search-by-algolia-instant-relevant-results/) plugin for WordPress, which is licensed under the GPLv2.*

== Installation ==

**If you have the *Search by Algolia – Instant & Relevant results* plugin installed, please deactivate it first.**

From your WordPress dashboard:

1. **Visit** Plugins > Add New
2. **Search** for "WP Search with Algolia"
3. **Activate** WP Search with Algolia from your Plugins page
4. **Click** on the new menu item "Algolia Search" and enter your API keys
5. **Read** the step by step [configuration guide](https://community.algolia.com/wordpress/configuration.html)

== Frequently Asked Questions ==

= Is this plugin a fork? =

Yes. The Algolia Team **[no longer supports their original plugin](https://community.algolia.com/wordpress/)**. The engineering team at WebDevStudios has forked the original plugin, and is now maintaining it.

= Should I switch to this plugin? =

Yes. Because Algolia no longer supports their plugin, you will no longer receive updates. WebDevStudios uses Algolia on many of it's projects, and is committed to maintaining this plugin for years to come.

= How do I switch from the "Search by Algolia – Instant & Relevant results" plugin? =

1. **Deactivate** the *Search by Algolia – Instant & Relevant results* plugin
2. **Follow** the [installation instructions](https://wordpress.org/plugins/wp-search-with-algolia/#installation)
3. **Activate** *WP Search with Algolia*
4. **Check** for your API Keys. They should already be there, if not, enter them and then save settings
5. **Delete** the *Search by Algolia – Instant & Relevant results* plugin

= What are the minimum requirements? =

* Requires WordPress 5.0+
* PHP version 7.2 or greater (PHP 7.3 is recommended)
* MySQL version 5.0 or greater (MySQL 5.6 or greater is recommended)
* cURL PHP extension
* mbstring PHP extension
* OpenSSL greater than 1.0.1
* Some payment gateways require fsockopen support (for IPN access)

Visit the [Search by Algolia server requirements documentation](https://community.algolia.com/wordpress/installation.html) for a detailed list of server requirements.

= Where can I find Algolia documentation and user guides? =

- For help setting up and configuring Search by Algolia please refer to the [user guide](https://community.algolia.com/wordpress/installation.html).
- For extending or theming the Autocomplete dropdown, see the [Autocomplete Customization guide](https://community.algolia.com/wordpress/customize-autocomplete.html).
- For extending or theming the Instant Search results page, see the [Search Page Customization guide](https://community.algolia.com/wordpress/customize-search-page.html).

= Will it work with my theme? =

Yes. This plugin will work with any theme, but the Instant Search results page may require some styling to make it match nicely. See the [Search Page Customization](https://community.algolia.com/wordpress/customize-search-page.html).

= Where can I report bugs, request features, or contribute to the project? =

All development is handled on [GitHub](https://github.com/WebDevStudios/wp-search-with-algolia/issues).

= About Algolia =

Algolia offers its Search as a Service provider on a incremental payment program, including a free Community Plan which includes 10,000 records & 50,000 operations per month. Beyond that, [plans](https://www.algolia.com/pricing/) start at $29/month.

*Note: there isn't a direct correlation between the number of posts in WordPress and the number of records in Algolia. Also note that we only offer support starting from the PRO plan.On average, you can expect to have about 10 times more records than you have posts, though this is not a golden rule and you could end up with more records.*

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
