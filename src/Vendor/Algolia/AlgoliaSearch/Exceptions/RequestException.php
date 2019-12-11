<?php

namespace WebDevStudios\WPSWA\Vendor\Algolia\AlgoliaSearch\Exceptions;

use WebDevStudios\WPSWA\Vendor\Psr\Http\Message\RequestInterface;

class RequestException extends AlgoliaException
{
    private $request;

    public function setRequest(RequestInterface $request)
    {
        $this->request = $request;

        return $this;
    }

    public function getRequest()
    {
        return $this->request;
    }
}
