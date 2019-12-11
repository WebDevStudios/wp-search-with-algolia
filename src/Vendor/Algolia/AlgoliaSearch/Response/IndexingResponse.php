<?php

namespace WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\Response;

use WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\SearchIndex;

final class IndexingResponse extends AbstractResponse
{
    /**
     * @var \WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\SearchIndex
     */
    private $index;

    public function __construct(array $apiResponse, SearchIndex $index)
    {
        $this->apiResponse = $apiResponse;
        $this->index = $index;
    }

    public function wait($requestOptions = array())
    {
        if (isset($this->index)) {
            $this->index->waitTask($this->apiResponse['taskID'], $requestOptions);
            unset($this->index);
        }

        return $this;
    }
}
