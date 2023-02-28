<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Response;

final class NullResponse extends AbstractResponse
{
    public function __construct()
    {
        $this->apiResponse = [];
    }

    public function wait($requestOptions = [])
    {
        return $this;
    }
}
