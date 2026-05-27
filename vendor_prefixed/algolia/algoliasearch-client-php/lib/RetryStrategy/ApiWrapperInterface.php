<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 27-May-2026 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\RetryStrategy;

interface ApiWrapperInterface
{
    public function sendRequest(
        $method,
        $path,
        $data = [],
        $requestOptions = [],
        $useReadTransporter = false
    );

    public function send($method, $path, $requestOptions = [], $hosts = null);
}
