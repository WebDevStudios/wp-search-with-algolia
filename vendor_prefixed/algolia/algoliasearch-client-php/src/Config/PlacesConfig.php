<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 01-July-2025 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config;

final class PlacesConfig extends AbstractConfig
{
    public static function create($appId, $apiKey)
    {
        $config = [
            'appId' => $appId,
            'apiKey' => $apiKey,
        ];

        return new static($config);
    }
}
