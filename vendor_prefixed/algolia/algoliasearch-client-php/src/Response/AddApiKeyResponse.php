<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Response;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config\SearchConfig;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions\NotFoundException;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient;

final class AddApiKeyResponse extends AbstractResponse
{
    /**
     * @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient
     */
    private $client;

    /**
     * @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config\SearchConfig
     */
    private $config;

    public function __construct(array $apiResponse, SearchClient $client, SearchConfig $config)
    {
        $this->apiResponse = $apiResponse;
        $this->client = $client;
        $this->config = $config;
    }

    public function wait($requestOptions = [])
    {
        if (!isset($this->client)) {
            return $this;
        }

        $key = $this->apiResponse['key'];
        $retry = 1;
        $time = $this->config->getWaitTaskTimeBeforeRetry();

        do {
            try {
                $this->client->getApiKey($key, $requestOptions);

                unset($this->client, $this->config);

                return $this;
            } catch (NotFoundException $e) {
                // Try again
            }

            $retry++;
            $factor = ceil($retry / 10);
            usleep($factor * $time); // 0.1 second
        } while (true);
    }
}
