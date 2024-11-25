## NEXT
* Added an option to set the debounce timeout value which applies to all indexes by default, but can be customized for each index with a filter:

Dynamic filter name: `algolia_autocomplete_debounce_{$index_name}_{$index_type}`

Where `$index_name` is defined by the Index name prefix set on the WP Search with Algolia settings page and `$index_type` is the type of index.

Assuming `wp_` is the Index name prefix, the debounce timeout filters would be:
```
algolia_autocomplete_debounce_wp_searchable_posts
algolia_autocomplete_debounce_wp_post
algolia_autocomplete_debounce_wp_page
algolia_autocomplete_debounce_wp_my_custom_post_type
algolia_autocomplete_debounce_wp_users
algolia_autocomplete_debounce_wp_terms_category
algolia_autocomplete_debounce_wp_terms_post_tag
algolia_autocomplete_debounce_wp_terms_my_custom_taxonomy
```
Note that the Algolia Autocomplete settings must be saved after creating one of the above filters.

## 2.8.0
* Added: Filter to customize Algolia SearchClient configuration with connect/read/write timeouts.
* Updated: Prevent table content from being concatenated. Thanks @rodrigo-arias
* Updated: Pass `$post_id` to `algolia_get_post_images` filter.
* Updated: Confirmed compatibility with WP 6.5

## 2.7.1
* Fixed: Instantsearch.php template file. "Powered By Algolia" Instantsearch widget wrapped in a check for if the "Remove powered by" option is checked. This should match already working behavior with Autocomplete dropdown.

## 2.7.0
* Updated: Moved post sync action from `save_post` to `wp_after_insert_post`. This allows for the sync to wait until after post meta and terms have been updated. Removes need to click save twice to sync everything.
* Updated: WP Search with Algolia feature list.

## 2.6.2
* Fixed: More performance updates and resolutions around WP All Import.

## 2.6.1
* Fixed: Performance issues related to delete operations.

* Fixed: Performance issues around WP All Import.

## 2.6.0

* Added: Support for syncing imported items when "fast mode" from WP All Import enabled.
* Added: Support for updating child posts if parent post's slug has been updated.
* Added: Support for updating posts when an associated term has been updatd.
* Added: Wait for delete operations to complete before moving to updates.
* Updated: Algolia Search library to 4.18.x
* Updated: InstantSearch library to 4.56.x

## 2.5.4

* Updated: Ensure reindexing completes when using the from_batch flag with CLI.
* Updated: Assigned Algolia_Admin instance to a property for access elsewhere.

## 2.5.3

* Updated: Autocomplete template file with user link fix when cmd/ctrl clicking.
* Updated: Class method visibility from protected to public.

## 2.5.2

* Updated: Fixed hits per page configuration for instantsearch
* Added: Custom hook for settings page override.

## 2.5.1

* Updated readme.txt with more plugin information.
* Repositioned help info on settings screens.

## 2.5.0

* Introduction of WP Search with Algolia Pro availability.
* Added `algolia_custom_template_location` filter to allow specifying custom template locations besides just your active
  theme.
* Templates: added action hooks at the end of Autocomplete and Instantsearch hit template blocks.
* Updated `algolia_changes_watchers` filter to also receive the current indices.
* Added watcher support for term and user meta updates.
* Updated bundled CSS to better match selectors for default used widgets in the templates.
* Clarified some details around Autocomplete settings and what can be done in each setting state.
* Updated admin menu icon to use Algolia logo when no settings configured.

## 2.4.0

* Increase minimum PHP version to PHP 7.4
* Fixed PHP8 compatibility issues
* Prefixed Algolia library to avoid potential conflicts with other code using the same libraries.
* Revised copy and wording around the plugin for better clarity.
* Deprecate the `algolia_should_require_search_client` filter in favor of prefixed Algolia PHP Client namespace

## 2.3.1

* Update autocomplete template to use addEventListener instead of onload function
* Update Algolia InstantSearch.js to 4.49.1

## 2.3.0

* Add algolia_should_override_autocomplete filter to override enable/disable status of Autocomplete
* Add from_batch argument to the re-index WP-CLI command
* Update excluded custom post types and taxonomies to include Core WordPress' internal CPTs and taxonomies
* Update Algolia logos to match the latest version
* Remove jQuery usage and dependency from templates
* Update Algolia JavaScript API Client to 4.14.2
* Update Algolia InstantSearch.js to 4.49.0
* Update Algolia PHP API Client to 3.3.2

## 2.2.0

* Add alert to Push Settings button on the Search Page.
* Replace attributesToIndex index setting with searchableAttributes.
* Replace outdated Instant Search widget class.
* Improve drag and drop column description text on the Autocomplete page.
* Remove inline CSS for Max. Suggestions input.
* Update Algolia JavaScript API Client to 4.13.0
* Update Algolia InstantSearch.js to 4.40.5
* Update Algolia Autocomplete.js to 0.38.1
* Update Algolia PHP API Client to 3.2.0

## 2.1.0

* Add algolia_update_records filter to allow inspection and filtering records during update operation.
* Add algolia_re_index_records filter to allow inspection and filtering records during re-index operation.
* Catch some Aloglia PHP Client exceptions that were previously uncaught during record updating and re-indexing.
* Fix an issue where SearchIndex::saveObjects was called twice during re-index operations.
* Update Algolia PHP API Client to 3.1.0

## 2.0.1

* Fix for users that enable intstantsearch but not autocomplete by adding algoliasearch client as direct dependency of
  both

## 2.0.0

* Breaking changes for users with customized autocomplete.php / instantsearch.php template in their theme.
* Update autocomplete.php and instantsearch.php templates for compatibility with new JS libs.
* Update Algolia JavaScript API Client to 4.10.3
* Update Algolia InstantSearch.js to 4.25.2
* Update Algolia Autocomplete.js to 0.38.0
* Update Algolia PHP API Client to 3.0.2

## 1.8.0

* Focus on template versioning and update messaging
* Add Algolia_Template_Utils class
* Deprecate Algolia_Template_Loader::locate_template method
* Deprecate Algolia_Plugin::get_templates_path method
* Deprecate algolia_templates_path filter
* Add Algolia_Update_Messages class
* Add Algolia_Admin_Template_Notices class
* Add Algolia_Version_Utils class

## 1.7.0

* Remove 'screen' media attribute from enqueued CSS
* Update Algolia PHP Search Client to version 2.7.3.
* Add "exclude" methods and filters
* Deprecate "blacklist" methods and filters
* Fix replica RequestOptions error
* Fix PHP 8 usort deprecation warning
* Fix JQMIGRATE event shorthand is deprecated warnings in instantsearch.php and autocomplete.php templates
* Add "@version" to template file headers

## 1.6.0

* Fix deletion of post records created before indexing was enabled
* Update Algolia PHP Search Client to version 2.7.1.
* Add Algolia_Plugin_Factory to create and return a shared Algolia_Plugin instance
* Add Algolia_Search_Client_Factory to return a new Algolia\AlgoliaSearch\SearchClient instance
* Add Algolia_Http_Client_Interface_Factory to create and return a shared Php53HttpClient instance
* Add algolia_php_53_http_client_options filter to supply cURL options to Php53HttpClient instance
* Deprecate Algolia_Plugin:get_instance() which will be removed in an upcoming release

## 1.5.0

* Fix an issue where Pinterest follows a link to the Algolia domain to source text and/or images
* Move Algolia scripts to footer by default
* Changes algolia_load_scripts_in_footer filter default argument to "true"
* Move autocomplete.php template output to footer by default

## 1.4.0

* Update Algolia PHP Search Client version 2.7.0.
* Update Algolia JS libraries to most recent compatible (non-breaking) versions
* Updates autocomplete.js to 0.37.1 (current release as of 2020-01-27)
* Updates algoliasearch to 3.35.1 (last of the 3.x series)
* Updates instantsearch.js to 1.12.1 (last of the 1.x series)

## 1.3.0

* Fix an issue where, under some circumstances, when a post with a featured image was deleted, the post might be
  accidentally re-indexed
* Fix bug that prevented reindex display notices
* Add algolia_load_scripts_in_footer filter to allow enqueueing the scripts in the footer instead of in the head
* Add new filters for multisite developers

## 1.2.0

* Use filtered value of 'hitsPerPage' as 'posts_per_page' query param
* Fix broken SVG
* Add highlighting to backend search results - props @philipnewcomer

## 1.1.0

* Minimum PHP version requirement is now PHP 7.2
* Minimum WordPress version requirement is now WP 5.0
* Internationalization/localization improvements, textdomain matches plugin slug
* Addressed a potential WSOD if minimum PHP and WP version requirements were not met
* Tested on WP 5.3

## 1.0.0

* Initial release.
