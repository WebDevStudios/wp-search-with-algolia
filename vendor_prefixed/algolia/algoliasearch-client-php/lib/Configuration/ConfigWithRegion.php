<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 27-May-2026 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Configuration;

abstract class ConfigWithRegion extends Configuration
{
    public static function create($appId, $apiKey, $region = null)
    {
        $config = [
            'appId' => $appId,
            'apiKey' => $apiKey,
            'region' => $region,
        ];

        return new static($config);
    }

    public function getRegion()
    {
        return $this->config['region'];
    }
}
