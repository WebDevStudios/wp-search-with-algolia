<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 23-February-2023 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\RetryStrategy;

interface ApiWrapperInterface
{
    public function read($method, $path, $requestOptions = [], $defaultRequestOptions = []);

    public function write($method, $path, $data = [], $requestOptions = [], $defaultRequestOptions = []);

    public function send($method, $path, $requestOptions = [], $hosts = null);
}
