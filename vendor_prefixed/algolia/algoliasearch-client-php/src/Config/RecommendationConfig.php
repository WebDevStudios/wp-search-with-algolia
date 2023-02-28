<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config;

/**
 * @deprecated Please use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config\PersonalizationConfig instead
 */
final class RecommendationConfig extends AbstractConfig
{
    /**
     * @param string|null $appId
     * @param string|null $apiKey
     * @param string|null $region
     *
     * @return RecommendationConfig
     */
    public static function create($appId = null, $apiKey = null, $region = null)
    {
        $config = [
            'appId' => null !== $appId ? $appId : getenv('ALGOLIA_APP_ID'),
            'apiKey' => null !== $apiKey ? $apiKey : getenv('ALGOLIA_API_KEY'),
            'region' => null !== $region ? $region : 'us',
        ];

        return new self($config);
    }

    public function getRegion()
    {
        return $this->config['region'];
    }
}
