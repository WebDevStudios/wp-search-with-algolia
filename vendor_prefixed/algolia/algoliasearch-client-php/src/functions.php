<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 01-July-2025 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Support\Helpers;

function api_path($pathFormat, $args = null, $_ = null)
{
    return call_user_func_array([Helpers::class, 'apiPath'], func_get_args());
}
