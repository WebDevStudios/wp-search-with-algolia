<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Response;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config\SearchConfig;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\RequestOptions\RequestOptions;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient;

final class DictionaryResponse extends AbstractResponse
{
    /* @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchClient */
    private $client;

    /* @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Config\SearchConfig */
    private $config;

    /* @var bool */
    private $done = false;

    /**
     * DictionaryResponse constructor.
     */
    public function __construct(array $apiResponse, SearchClient $client, SearchConfig $config)
    {
        $this->apiResponse = $apiResponse;
        $this->client = $client;
        $this->config = $config;
    }

    /**
     * Wait for the task from this response to finish.
     *
     * @param array|RequestOptions $requestOptions
     *
     * @return $this
     */
    public function wait($requestOptions = [])
    {
        $retryCount = 1;
        $time = $this->config->getWaitTaskTimeBeforeRetry();

        while (!$this->done) {
            $res = $this->getTask($this->apiResponse['taskID'], $requestOptions);

            if ('published' === $res['status']) {
                $this->done = true;
                break;
            }

            $retryCount++;
            $factor = ceil($retryCount / 10);
            usleep($factor * $time); // 0.1 second
        }

        return $this;
    }

    /**
     * Get the task details.
     *
     * @param int|string           $taskId
     * @param array|RequestOptions $requestOptions
     *
     * @return mixed
     */
    private function getTask($taskId, $requestOptions = [])
    {
        if (!$taskId) {
            throw new \InvalidArgumentException('taskID cannot be empty');
        }

        return $this->client->custom(
            'GET',
            \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\api_path('/1/task/%s', $taskId),
            $requestOptions
        );
    }
}
