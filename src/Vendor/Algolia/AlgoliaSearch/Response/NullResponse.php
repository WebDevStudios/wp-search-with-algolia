<?php

namespace WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\Response;

final class NullResponse extends AbstractResponse
{
    public function __construct()
    {
        $this->apiResponse = array();
    }

    public function wait($requestOptions = array())
    {
        return $this;
    }
}
