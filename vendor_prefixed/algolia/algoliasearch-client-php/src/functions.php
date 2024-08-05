<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 05-August-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Support\Helpers;

function api_path($pathFormat, $args = null, $_ = null)
{
    return call_user_func_array([Helpers::class, 'apiPath'], func_get_args());
}
