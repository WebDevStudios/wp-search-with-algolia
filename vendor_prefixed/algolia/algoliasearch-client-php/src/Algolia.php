<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 05-August-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Algolia\AlgoliaSearch;

use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Cache\NullCacheDriver;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\HttpClientInterface;
use WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Log\DebugLogger;
use WebDevStudios\WPSWA\Psr\Log\LoggerInterface;
use WebDevStudios\WPSWA\Psr\SimpleCache\CacheInterface;

final class Algolia
{
    const VERSION = '3.4.1';

    /**
     * Holds an instance of the simple cache repository (PSR-16).
     *
     * @var \WebDevStudios\WPSWA\Psr\SimpleCache\CacheInterface|null
     */
    private static $cache;

    /**
     * Holds an instance of the logger (PSR-3).
     *
     * @var \WebDevStudios\WPSWA\Psr\Log\LoggerInterface|null
     */
    private static $logger;

    /**
     * @var \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\HttpClientInterface
     */
    private static $httpClient;

    public static function isCacheEnabled()
    {
        if (null === self::$cache) {
            return false;
        }

        return !self::getCache() instanceof NullCacheDriver;
    }

    /**
     * Gets the cache instance.
     *
     * @return \WebDevStudios\WPSWA\Psr\SimpleCache\CacheInterface
     */
    public static function getCache()
    {
        if (null === self::$cache) {
            self::setCache(new NullCacheDriver());
        }

        return self::$cache;
    }

    /**
     * Sets the cache instance.
     */
    public static function setCache(CacheInterface $cache)
    {
        self::$cache = $cache;
    }

    /**
     * Gets the logger instance.
     *
     * @return \WebDevStudios\WPSWA\Psr\Log\LoggerInterface
     */
    public static function getLogger()
    {
        if (null === self::$logger) {
            self::setLogger(new DebugLogger());
        }

        return self::$logger;
    }

    /**
     * Sets the logger instance.
     */
    public static function setLogger(LoggerInterface $logger)
    {
        self::$logger = $logger;
    }

    public static function getHttpClient()
    {
        $guzzleVersion = null;
        if (interface_exists('\GuzzleHttp\ClientInterface')) {
            if (defined('\GuzzleHttp\ClientInterface::VERSION')) {
                $guzzleVersion = (int) substr(\GuzzleHttp\Client::VERSION, 0, 1);
            } else {
                $guzzleVersion = \GuzzleHttp\ClientInterface::MAJOR_VERSION;
            }
        }

        if (null === self::$httpClient) {
            if (class_exists('\GuzzleHttp\Client') && 6 <= $guzzleVersion) {
                self::setHttpClient(new \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\GuzzleHttpClient());
            } else {
                self::setHttpClient(new \WebDevStudios\WPSWA\Algolia\AlgoliaSearch\Http\CurlHttpClient());
            }
        }

        return self::$httpClient;
    }

    public static function setHttpClient(HttpClientInterface $httpClient)
    {
        self::$httpClient = $httpClient;
    }

    public static function resetHttpClient()
    {
        self::$httpClient = null;
    }
}
