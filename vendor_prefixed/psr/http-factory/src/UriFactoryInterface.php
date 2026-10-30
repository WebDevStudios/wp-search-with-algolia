<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 30-October-2026 using {@see https://github.com/BrianHenryIE/strauss}.
 */

namespace WebDevStudios\WPSWA\Psr\Http\Message;

interface UriFactoryInterface
{
    /**
     * Create a new URI.
     *
     * @param string $uri
     *
     * @return UriInterface
     *
     * @throws \InvalidArgumentException If the given URI cannot be parsed.
     */
    public function createUri(string $uri = ''): UriInterface;
}
