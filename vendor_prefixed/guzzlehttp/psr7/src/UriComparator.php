<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 27-May-2026 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

declare(strict_types=1);

namespace WebDevStudios\WPSWA\GuzzleHttp\Psr7;

use WebDevStudios\WPSWA\Psr\Http\Message\UriInterface;

/**
 * Provides methods to determine if a modified URL should be considered cross-origin.
 *
 * @author Graham Campbell
 */
final class UriComparator
{
    /**
     * Determines if a modified URL should be considered cross-origin with
     * respect to an original URL.
     */
    public static function isCrossOrigin(UriInterface $original, UriInterface $modified): bool
    {
        if (\strcasecmp($original->getHost(), $modified->getHost()) !== 0) {
            return true;
        }

        if ($original->getScheme() !== $modified->getScheme()) {
            return true;
        }

        if (self::computePort($original) !== self::computePort($modified)) {
            return true;
        }

        return false;
    }

    private static function computePort(UriInterface $uri): int
    {
        $port = $uri->getPort();

        if (null !== $port) {
            return $port;
        }

        return 'https' === $uri->getScheme() ? 443 : 80;
    }

    private function __construct()
    {
        // cannot be instantiated
    }
}
