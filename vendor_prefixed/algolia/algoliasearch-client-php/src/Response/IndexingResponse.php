<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Response;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchIndex;

final class IndexingResponse extends AbstractResponse
{
    /**
     * @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\SearchIndex
     */
    private $index;

    public function __construct(array $apiResponse, SearchIndex $index)
    {
        $this->apiResponse = $apiResponse;
        $this->index = $index;
    }

    public function wait($requestOptions = [])
    {
        if (isset($this->index)) {
            $this->index->waitTask($this->apiResponse['taskID'], $requestOptions);
            unset($this->index);
        }

        return $this;
    }
}
