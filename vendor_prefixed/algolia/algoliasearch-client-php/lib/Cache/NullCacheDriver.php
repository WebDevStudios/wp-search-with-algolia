<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 27-May-2026 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Cache;

use WebDevStudios\WPSWA\Psr\SimpleCache\CacheInterface;

final class NullCacheDriver implements CacheInterface
{
    public function get($key, $default = null): mixed
    {
        return $default;
    }

    public function set($key, $value, $ttl = null): bool
    {
        return true;
    }

    public function delete($key): bool
    {
        return true;
    }

    public function clear(): bool
    {
        return true;
    }

    public function getMultiple($keys, $default = null): iterable
    {
        $return = [];

        foreach ($keys as $key) {
            $return[$key] = $default;
        }

        return $return;
    }

    public function setMultiple($values, $ttl = null): bool
    {
        return true;
    }

    public function deleteMultiple($keys): bool
    {
        return true;
    }

    public function has($key): bool
    {
        return false;
    }
}
