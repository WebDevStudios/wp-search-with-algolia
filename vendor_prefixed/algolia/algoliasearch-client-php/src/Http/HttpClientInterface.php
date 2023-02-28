<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http;

use WebDevStudios\WPSWA\Psr\Http\Message\RequestInterface;
use WebDevStudios\WPSWA\Psr\Http\Message\ResponseInterface;

interface HttpClientInterface
{
    /**
     * The method takes a PSR request and 2 timeouts, dispatch
     * the call and must return a PSR Response.
     *
     * If the HTTP layer throws exception in case of error 4xx or 5xx
     * for instance, they must be converted to a Response to keep
     * the retry strategy working as expected.
     *
     * @param int $timeout
     * @param int $connectTimeout
     *
     * @return ResponseInterface
     */
    public function sendRequest(RequestInterface $request, $timeout, $connectTimeout);
}
