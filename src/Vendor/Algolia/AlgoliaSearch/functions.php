<?php

namespace WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch;

function api_path($pathFormat, $args = null, $_ = null)
{
    return call_user_func_array(array('\WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\Support\Helpers', 'apiPath'), func_get_args());
}
