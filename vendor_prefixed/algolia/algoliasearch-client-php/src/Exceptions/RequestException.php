<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 01-July-2025 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Exceptions;

use WebDevStudios\WPSWA\Psr\Http\Message\RequestInterface;

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
