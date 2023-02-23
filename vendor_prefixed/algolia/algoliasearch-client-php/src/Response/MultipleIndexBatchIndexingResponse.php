<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Response;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient;

final class MultipleIndexBatchIndexingResponse extends AbstractResponse
{
    /**
     * @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient
     */
    private $client;

    public function __construct(array $apiResponse, SearchClient $client)
    {
        $this->apiResponse = $apiResponse;
        $this->client = $client;
    }

    public function wait($requestOptions = [])
    {
        if (!isset($this->client)) {
            return $this;
        }

        foreach ($this->apiResponse['taskID'] as $indexName => $taskId) {
            $this->client->waitTask($indexName, $taskId, $requestOptions);
        }

        unset($this->client);

        return $this;
    }
}
