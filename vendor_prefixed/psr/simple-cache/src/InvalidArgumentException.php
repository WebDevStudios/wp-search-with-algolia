<?php
/**
 * @license MIT
 *
 * Modified by WebDevStudios on 05-August-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace WebDevStudios\WPSWA\Psr\SimpleCache;

/**
 * Exception interface for invalid cache arguments.
 *
 * When an invalid argument is passed it must throw an exception which implements
 * this interface
 */
interface InvalidArgumentException extends CacheException
{
}
