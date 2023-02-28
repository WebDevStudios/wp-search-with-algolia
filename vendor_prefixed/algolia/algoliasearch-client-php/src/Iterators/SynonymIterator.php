<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Iterators;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Support\Helpers;

final class SynonymIterator extends AbstractAlgoliaIterator
{
    protected function formatHit(array $hit)
    {
        unset($hit['_highlightResult']);

        return $hit;
    }

    protected function fetchNextPage()
    {
        if (is_array($this->response) && $this->key >= $this->response['nbHits']) {
            return;
        }

        $this->response = $this->api->read(
            'POST',
            Helpers::apiPath('/1/indexes/%s/synonyms/search', $this->indexName),
            array_merge(
                $this->requestOptions,
                ['page' => $this->page]
            )
        );

        $this->batchKey = 0;
        $this->page++;
    }
}
